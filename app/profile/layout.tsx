import { commonMetadata } from "@/lib/metadata";

export const metadata = commonMetadata.profile;

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
