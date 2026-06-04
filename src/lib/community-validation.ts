import {
  questionBodyLimits,
  questionTitleLimits,
  replyBodyLimits,
  type CommunityApiError,
} from "@/lib/community";
import { isLocale, type Locale } from "@/lib/i18n";

type ValidationDetail = NonNullable<CommunityApiError["error"]["details"]>[number];

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; details: ValidationDetail[] };

function stringField(value: unknown, field: string, details: ValidationDetail[]) {
  if (typeof value !== "string") {
    details.push({
      field,
      code: "required",
      message: `${field} is required.`,
    });
    return "";
  }

  return value.trim();
}

function validateLength(
  value: string,
  field: string,
  limits: { min: number; max: number },
  details: ValidationDetail[],
) {
  if (value.length < limits.min || value.length > limits.max) {
    details.push({
      field,
      code: "invalid_length",
      message: `${field} must be between ${limits.min} and ${limits.max} characters.`,
    });
  }
}

export function validateQuestionPayload(
  payload: unknown,
): ValidationResult<{ title: string; body: string; locale: Locale }> {
  const details: ValidationDetail[] = [];
  const object = payload && typeof payload === "object" ? payload : {};
  const input = object as Record<string, unknown>;
  const title = stringField(input.title, "title", details);
  const body = stringField(input.body, "body", details);
  const localeValue = stringField(input.locale, "locale", details);
  let locale: Locale | null = null;

  validateLength(title, "title", questionTitleLimits, details);
  validateLength(body, "body", questionBodyLimits, details);

  if (!isLocale(localeValue)) {
    details.push({
      field: "locale",
      code: "invalid_locale",
      message: "locale must be one of en, zh-cn, zh-tw, or ru.",
    });
  } else {
    locale = localeValue;
  }

  if (details.length > 0) {
    return { ok: false, details };
  }

  if (!locale) {
    return {
      ok: false,
      details: [
        {
          field: "locale",
          code: "invalid_locale",
          message: "locale must be one of en, zh-cn, zh-tw, or ru.",
        },
      ],
    };
  }

  return { ok: true, data: { title, body, locale } };
}

export function validateQuestionPatchPayload(
  payload: unknown,
): ValidationResult<{
  title?: string;
  body?: string;
  locale?: Locale;
  action?: "hide" | "restore" | "delete";
}> {
  const details: ValidationDetail[] = [];
  const object = payload && typeof payload === "object" ? payload : {};
  const input = object as Record<string, unknown>;
  const output: {
    title?: string;
    body?: string;
    locale?: Locale;
    action?: "hide" | "restore" | "delete";
  } = {};

  if ("title" in input) {
    output.title = stringField(input.title, "title", details);
    validateLength(output.title, "title", questionTitleLimits, details);
  }

  if ("body" in input) {
    output.body = stringField(input.body, "body", details);
    validateLength(output.body, "body", questionBodyLimits, details);
  }

  if ("locale" in input) {
    const localeValue = stringField(input.locale, "locale", details);
    if (!isLocale(localeValue)) {
      details.push({
        field: "locale",
        code: "invalid_locale",
        message: "locale must be one of en, zh-cn, zh-tw, or ru.",
      });
    } else {
      output.locale = localeValue;
    }
  }

  if ("action" in input) {
    if (
      input.action === "hide" ||
      input.action === "restore" ||
      input.action === "delete"
    ) {
      output.action = input.action;
    } else {
      details.push({
        field: "action",
        code: "invalid_action",
        message: "action must be hide, restore, or delete.",
      });
    }
  }

  if (
    !output.title &&
    !output.body &&
    !output.locale &&
    !output.action &&
    details.length === 0
  ) {
    details.push({
      field: "body",
      code: "empty_update",
      message: "Provide a field to update or an action.",
    });
  }

  if (details.length > 0) {
    return { ok: false, details };
  }

  return { ok: true, data: output };
}

export function validateReplyPayload(
  payload: unknown,
): ValidationResult<{ body: string }> {
  const details: ValidationDetail[] = [];
  const object = payload && typeof payload === "object" ? payload : {};
  const body = stringField((object as Record<string, unknown>).body, "body", details);

  validateLength(body, "body", replyBodyLimits, details);

  if (details.length > 0) {
    return { ok: false, details };
  }

  return { ok: true, data: { body } };
}

export function validateReplyPatchPayload(
  payload: unknown,
): ValidationResult<{ body?: string; action?: "hide" | "restore" | "delete" }> {
  const details: ValidationDetail[] = [];
  const object = payload && typeof payload === "object" ? payload : {};
  const input = object as Record<string, unknown>;
  const output: { body?: string; action?: "hide" | "restore" | "delete" } = {};

  if ("body" in input) {
    output.body = stringField(input.body, "body", details);
    validateLength(output.body, "body", replyBodyLimits, details);
  }

  if ("action" in input) {
    if (
      input.action === "hide" ||
      input.action === "restore" ||
      input.action === "delete"
    ) {
      output.action = input.action;
    } else {
      details.push({
        field: "action",
        code: "invalid_action",
        message: "action must be hide, restore, or delete.",
      });
    }
  }

  if (!output.body && !output.action && details.length === 0) {
    details.push({
      field: "body",
      code: "empty_update",
      message: "Provide body or an action.",
    });
  }

  if (details.length > 0) {
    return { ok: false, details };
  }

  return { ok: true, data: output };
}
