import { commonMetadata } from "@/lib/metadata";
import { ToolsPageClient } from "./tools-page-client";

export const metadata = commonMetadata.tools;

export default function AllToolsPage() {
  return <ToolsPageClient />;
}