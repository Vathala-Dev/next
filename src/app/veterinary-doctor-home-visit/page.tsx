import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/veterinary-doctor-home-visit");

export default function VeterinaryDoctorHomeVisitPage() {
  return <ServiceDetailPage path="/veterinary-doctor-home-visit" />;
}
