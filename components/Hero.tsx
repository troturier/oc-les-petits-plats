import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Home page banner. The search bar is injected as a child so that it can stay a
 * Client Component while the banner itself is rendered on the server.
 */
export default function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-[667px] flex-col items-center justify-center px-6">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-[954px]">
        <h1 className="text-brand-yellow mx-auto mb-[45px] max-w-[890px] text-center font-display text-3xl uppercase sm:text-[44px] sm:leading-[66px]">
          Découvrez nos recettes du quotidien, simples et délicieuses
        </h1>
        {children}
      </div>
    </section>
  );
}
