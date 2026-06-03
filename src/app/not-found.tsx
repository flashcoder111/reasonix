import { NotFoundContent } from "@/components/LocalizedPages";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export default function NotFound() {
  return <NotFoundContent locale={DEFAULT_LOCALE} />;
}
