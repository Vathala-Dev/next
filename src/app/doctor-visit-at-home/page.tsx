import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/doctor-visit-at-home");

export default function DoctorVisitAtHomePage() {
  return <ServiceDetailPage path="/doctor-visit-at-home" />;
}
