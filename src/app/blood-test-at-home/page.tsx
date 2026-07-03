import { ServiceDetailPage } from "@/components/vathala/service-detail-page";
import { buildServiceMetadata } from "@/lib/service-metadata";

export const metadata = buildServiceMetadata("/blood-test-at-home");

export default function BloodTestAtHomePage() {
  return <ServiceDetailPage path="/blood-test-at-home" />;
}
