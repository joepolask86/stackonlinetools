import { commonMetadata } from "@/lib/metadata";
import { SuggestPageClient } from "./suggest-page-client";

export const metadata = commonMetadata.suggest;

export default function SuggestToolPage() {
  return <SuggestPageClient />;
}
