"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type HorizontalCarouselProps = {
  children: ReactNode;
  /** Applied to each slide wrapper */
  itemClassName?: string;
  /** Applied to the scroll track */
  className?: string;
  ariaLabel?: string;
};

export const HorizontalCarousel = ({
  children,
  itemClassName = "w-[min(88vw,22rem)]",
  className = "",
  ariaLabel = "Carousel",
}: HorizontalCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const { scrollLeft, clientWidth } = track;
    const index = Math.round(scrollLeft / Math.max(clientWidth, 1));
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className={`snap-center shrink-0 ${itemClassName}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 ? (
        <div
          className="mt-5 flex justify-center gap-2"
          role="tablist"
          aria-label={`${ariaLabel} pagination`}
        >
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={`size-2.5 rounded-full transition-colors ${
                index === activeIndex
                  ? "bg-vathala-forest"
                  : "bg-vathala-forest/25 hover:bg-vathala-forest/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
