import Banner from "@/components/Banner";

export default function NotFoundScreen({ message }: { message: string }) {
  return (
    <Banner className="min-h-[600px] flex-1" overlayClassName="bg-black/70">
      <div className="text-center">
        <p className="text-brand-yellow font-display text-6xl sm:text-7xl">
          404 :(
        </p>
        <h1 className="mt-6 font-display text-2xl text-white sm:text-4xl">
          {message}
        </h1>
      </div>
    </Banner>
  );
}
