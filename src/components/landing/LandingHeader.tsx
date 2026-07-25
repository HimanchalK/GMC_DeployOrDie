import Link from "next/link";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Hamro Saathi home"
        >
          <Image src="/logo.svg" alt="" width={32} height={32} priority />
          <span className="font-semibold text-foreground">Hamro Saathi</span>
        </Link>
      </div>
    </header>
  );
}
