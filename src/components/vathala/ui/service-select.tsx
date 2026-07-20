"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { OTHER_SERVICES_SLUG, vathalaServices } from "@/lib/vathala-services";

const serviceSelectOptions = [
  ...vathalaServices,
  { slug: OTHER_SERVICES_SLUG, title: "Other Services" },
];

type ServiceSelectProps = {
  id: string;
  value: string;
  onChange: (slug: string) => void;
  triggerClassName: string;
  placeholder?: string;
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  placement: "above" | "below";
};

export const ServiceSelect = ({
  id,
  value,
  onChange,
  triggerClassName,
  placeholder = "Select a service",
}: ServiceSelectProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState<MenuPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const selected = serviceSelectOptions.find((service) => service.slug === value);
  const displayLabel = selected?.title ?? placeholder;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 6;
    const viewportPadding = 12;
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;
    const preferredMax = 240;
    const openAbove = spaceBelow < 160 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(
      preferredMax,
      openAbove ? spaceAbove - gap : spaceBelow - gap,
    );

    setMenuStyle({
      top: openAbove ? rect.top - gap : rect.bottom + gap,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(120, maxHeight),
      placement: openAbove ? "above" : "below",
    });
  };

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return;
    }

    updateMenuPosition();

    const onScrollOrResize = () => updateMenuPosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);

    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (
        document
          .getElementById(listId)
          ?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, listId]);

  const menu =
    open && menuStyle && mounted ? (
      <ul
        id={listId}
        role="listbox"
        aria-labelledby={id}
        className="fixed z-[120] overflow-y-auto overscroll-contain rounded-xl border border-black/10 bg-[#F7F4EB] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.14)] ring-1 ring-white/50"
        style={{
          top: menuStyle.top,
          left: menuStyle.left,
          width: menuStyle.width,
          maxHeight: menuStyle.maxHeight,
          transform:
            menuStyle.placement === "above" ? "translateY(-100%)" : undefined,
        }}
      >
        {serviceSelectOptions.map((service) => {
          const isSelected = value === service.slug;
          return (
            <li key={service.slug} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(service.slug);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-base transition-colors ${
                  isSelected
                    ? "bg-vathala-forest/12 font-semibold text-vathala-forest"
                    : "text-vathala-text hover:bg-[#EAF6F6]"
                }`}
              >
                <Check
                  className={`size-4 shrink-0 text-vathala-forest ${isSelected ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
                <span>{service.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={`${triggerClassName} flex w-full items-center justify-between gap-2 pr-10 text-left ${
          value ? "text-vathala-text" : "text-vathala-muted"
        }`}
      >
        <span className="truncate">{displayLabel}</span>
      </button>
      <ChevronDown
        className={`pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-vathala-muted transition-transform ${
          open ? "rotate-180" : ""
        }`}
        aria-hidden
      />
      {mounted && menu ? createPortal(menu, document.body) : null}
    </div>
  );
};
