"use client";

import { ArrowRight } from "lucide-react";
import { useCallbackModal } from "@/components/vathala/callback-modal-context";

type ServiceBookNowButtonProps = {
  serviceSlug: string;
};

export const ServiceBookNowButton = ({
  serviceSlug,
}: ServiceBookNowButtonProps) => {
  const { openModal } = useCallbackModal();

  return (
    <button
      type="button"
      onClick={() => openModal({ serviceSlug })}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-vathala-forest px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-vathala-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
    >
      Book now
      <ArrowRight className="size-4 shrink-0" aria-hidden />
    </button>
  );
};
