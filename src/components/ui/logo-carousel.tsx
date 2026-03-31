import Image from "next/image";
import clsx from "clsx";
import { logos } from "@/lib/landing-constants";

export function LogoCarousel() {
  return (
    <section className="bg-background relative my-10 overflow-hidden border-y py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-6">
          <p className="text-muted-foreground hidden text-sm whitespace-nowrap md:block">
            Trusted by the best
            <span className="block">service providers in the world</span>
          </p>

          <div className="relative flex-1 overflow-hidden">
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />

            <div
              className={clsx(
                "animate-logo-scroll flex w-max gap-14",
                "hover:[animation-play-state:paused]",
              )}
            >
              {[...logos, ...logos].map((logo, i) => (
                <Image
                  key={`${logo.name}-${i}`}
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
