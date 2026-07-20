import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/yoga-at-home");

export default function YogaAtHomePage() {
  return <ServiceDetailPage path="/yoga-at-home" />;
}
