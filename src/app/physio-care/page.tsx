import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/physio-care");

export default function PhysioCarePage() {
  return <ServiceDetailPage path="/physio-care" />;
}
