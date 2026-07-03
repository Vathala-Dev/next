import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/elder-care");

export default function ElderCarePage() {
  return <ServiceDetailPage path="/elder-care" />;
}
