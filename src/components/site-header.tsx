import Link from "next/link";
import Reveal from "./reveal";
import { CashuMark } from "./cashu-mark";

type SiteHeaderProps = {
  /** Inverted scheme for on-Ink routes (e.g. /wallets). */
  onInk?: boolean;
};

/**
 * Top-bar wordmark + return link. Used on every route so a deep-linked page
 * has the site identity above the H1, never just the H1 alone.
 */
export default function SiteHeader({ onInk = false }: SiteHeaderProps) {
  const textColor = onInk ? "text-white" : "text-black";
  return (
    <header
      className={`page-shell pt-6 lg:pt-8 flex items-center ${textColor}`}
    >
      <Reveal immediate variant="fade" as="div">
        <Link href="/" className="flex items-center gap-2.5 t-title focus-ring">
          <CashuMark className="h-7 w-7" inverted={onInk} />
          <span>cashu</span>
        </Link>
      </Reveal>
    </header>
  );
}
