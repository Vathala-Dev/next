import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

const base =
  "vathala-gold-button inline-flex h-[55px] min-h-[55px] items-center justify-center gap-2.5 rounded-full px-8 text-base font-bold text-white transition-[filter,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99680D]";

type GoldButtonProps = {
  className?: string;
  showArrow?: boolean;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "className" | "children">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
);

/** Primary gold-gradient CTA with optional trailing arrow. */
export const GoldButton = ({
  className = "",
  showArrow = true,
  children,
  ...props
}: GoldButtonProps) => {
  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowRight className="size-5 shrink-0 stroke-[2.25]" aria-hidden />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={`${base} ${className}`.trim()} {...rest}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as Omit<ComponentProps<"button">, "className" | "children">;
  return (
    <button type="button" className={`${base} ${className}`.trim()} {...buttonProps}>
      {content}
    </button>
  );
};

export const GoldButtonOutline = ({
  className = "",
  ...props
}: ComponentProps<typeof Link>) => (
  <Link
    className={`inline-flex min-h-11 items-center justify-center rounded-full border-2 border-vathala-forest bg-transparent px-6 py-3 text-base font-semibold text-vathala-forest transition-colors hover:bg-vathala-forest/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest ${className}`.trim()}
    {...props}
  />
);
