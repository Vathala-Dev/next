import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/wound-care-dressing");

export default function WoundCareDressingPage() {
  return <ServiceDetailPage path="/wound-care-dressing" />;
}
