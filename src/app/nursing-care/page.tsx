import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/nursing-care");

export default function NursingCarePage() {
  return <ServiceDetailPage path="/nursing-care" />;
}
