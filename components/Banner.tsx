import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Darkened full-width image strip the logo sits on. Shared by the home page,
 * the recipe page and the 404 page, which only differ by height and content.
 */
export default function Banner({
  className,
  overlayClassName = "bg-black/30",
  children,
}: {
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center overflow-hidden ${className ?? ""}`}
    >
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {children ? <div className="relative w-full px-6">{children}</div> : null}
    </section>
  );
}
