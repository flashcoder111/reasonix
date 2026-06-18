#!/usr/bin/env node

const DEFAULT_SITE_URL = "https://deepseekreasonix.com";
const DEFAULT_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_BATCH_SIZE = 10_000;

function readFlagValue(name, fallback) {
  const prefix = `${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));

  if (inline) {
    return inline.slice(prefix.length);
  }

  const index = process.argv.indexOf(name);
  if (index !== -1 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }

  return fallback;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function readBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeSiteUrl(value) {
  return String(value || DEFAULT_SITE_URL).replace(/\/$/, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'");
}

function getTagValue(block, tagName) {
  const pattern = new RegExp(
    `<(?:[^:>]+:)?${escapeRegExp(tagName)}[^>]*>([\\s\\S]*?)<\\/(?:[^:>]+:)?${escapeRegExp(tagName)}>`,
    "i",
  );
  const match = block.match(pattern);
  return match ? decodeXml(match[1].trim()) : null;
}

function parseSitemap(xml) {
  const urlBlocks = xml.match(/<url\b[\s\S]*?<\/url>/gi) || [];

  return urlBlocks
    .map((block) => {
      const loc = getTagValue(block, "loc");
      const lastmod = getTagValue(block, "lastmod");

      if (!loc) {
        return null;
      }

      return {
        loc,
        lastmod,
        lastModifiedAt: lastmod ? new Date(lastmod) : null,
      };
    })
    .filter(Boolean);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Reasonix IndexNow submitter/1.0",
      accept: "application/xml,text/xml,text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed with HTTP ${response.status}`);
  }

  return response.text();
}

async function verifyKeyFile(keyLocation, key) {
  const body = await fetchText(keyLocation);
  const actual = body.trim();

  if (actual !== key) {
    throw new Error(
      `IndexNow key file mismatch at ${keyLocation}: expected the configured key as the only file content.`,
    );
  }
}

function selectUrls(entries, options) {
  const siteUrl = new URL(options.siteUrl);
  const cutoff = options.all
    ? null
    : new Date(Date.now() - options.sinceDays * 24 * 60 * 60 * 1000);

  return entries
    .filter((entry) => {
      let parsed;

      try {
        parsed = new URL(entry.loc);
      } catch {
        return false;
      }

      if (parsed.host !== siteUrl.host) {
        return false;
      }

      if (!cutoff) {
        return true;
      }

      return (
        entry.lastModifiedAt instanceof Date &&
        !Number.isNaN(entry.lastModifiedAt.valueOf()) &&
        entry.lastModifiedAt >= cutoff
      );
    })
    .sort((left, right) => {
      const leftTime = left.lastModifiedAt?.valueOf() || 0;
      const rightTime = right.lastModifiedAt?.valueOf() || 0;

      if (rightTime !== leftTime) {
        return rightTime - leftTime;
      }

      return left.loc.localeCompare(right.loc);
    })
    .slice(0, options.maxUrls)
    .map((entry) => entry.loc);
}

function chunk(array, size) {
  const chunks = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}

async function submitBatch(urlList, options) {
  const response = await fetch(options.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "user-agent": "Reasonix IndexNow submitter/1.0",
    },
    body: JSON.stringify({
      host: new URL(options.siteUrl).host,
      key: options.key,
      keyLocation: options.keyLocation,
      urlList,
    }),
  });

  const body = await response.text();

  if (![200, 202].includes(response.status)) {
    throw new Error(
      `IndexNow submission failed with HTTP ${response.status}: ${body.trim()}`,
    );
  }

  return {
    status: response.status,
    body: body.trim(),
  };
}

async function main() {
  const key = process.env.INDEXNOW_KEY?.trim();

  if (!key) {
    throw new Error("INDEXNOW_KEY is required.");
  }

  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error(
      "INDEXNOW_KEY must be 8-128 characters and contain only letters, numbers, and hyphens.",
    );
  }

  const siteUrl = normalizeSiteUrl(process.env.INDEXNOW_SITE_URL);
  const sitemapUrl =
    process.env.INDEXNOW_SITEMAP_URL || `${siteUrl}/sitemap.xml`;
  const keyLocation =
    process.env.INDEXNOW_KEY_LOCATION || `${siteUrl}/indexnow-key.txt`;
  const endpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT;
  const sinceDays = readPositiveInteger(
    readFlagValue("--since-days", process.env.INDEXNOW_SINCE_DAYS || "2"),
    2,
  );
  const maxUrls = Math.min(
    readPositiveInteger(
      readFlagValue("--max-urls", process.env.INDEXNOW_MAX_URLS || "200"),
      200,
    ),
    MAX_BATCH_SIZE,
  );
  const all = hasFlag("--all") || readBoolean(process.env.INDEXNOW_ALL);
  const dryRun =
    hasFlag("--dry-run") || readBoolean(process.env.INDEXNOW_DRY_RUN);
  const skipKeyCheck = readBoolean(process.env.INDEXNOW_SKIP_KEY_CHECK);

  if (!skipKeyCheck) {
    await verifyKeyFile(keyLocation, key);
  }

  const sitemapXml = await fetchText(sitemapUrl);
  const entries = parseSitemap(sitemapXml);
  const urls = selectUrls(entries, {
    siteUrl,
    sinceDays,
    maxUrls,
    all,
  });

  console.log(
    `IndexNow selected ${urls.length} URL(s) from ${entries.length} sitemap entries.`,
  );

  if (!urls.length) {
    console.log("No recently changed sitemap URLs matched the submission window.");
    return;
  }

  for (const url of urls) {
    console.log(url);
  }

  if (dryRun) {
    console.log("Dry run enabled; no IndexNow request was sent.");
    return;
  }

  for (const [index, batch] of chunk(urls, MAX_BATCH_SIZE).entries()) {
    const result = await submitBatch(batch, {
      endpoint,
      siteUrl,
      key,
      keyLocation,
    });

    console.log(
      `Submitted batch ${index + 1} (${batch.length} URL(s)); IndexNow HTTP ${result.status}.`,
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
