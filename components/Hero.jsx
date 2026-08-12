import Banner from "@/components/Banner";

/**
 * Home page banner. The search bar is injected as a child so that it can stay a
 * Client Component while the banner itself is rendered on the server.
 */
export default function Hero({ children }) {
  return (
    <Banner className="h-[667px]">
      <div className="mx-auto w-full max-w-[954px]">
        <h1 className="text-brand-yellow mx-auto mb-[45px] max-w-[890px] text-center font-display text-3xl uppercase sm:text-[44px] sm:leading-[66px]">
          Découvrez nos recettes du quotidien, simples et délicieuses
        </h1>
        {children}
      </div>
    </Banner>
  );
}
