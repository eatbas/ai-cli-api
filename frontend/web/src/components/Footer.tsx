import { Music } from "lucide-react";

const GITHUB_URL = "https://github.com/eatbas/symphony-api";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-black" strokeWidth={2.5} />
          <span className="text-sm font-bold tracking-tight text-black">
            Symphony API
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={`${GITHUB_URL}#readme`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 transition-colors duration-200 hover:text-black cursor-pointer"
          >
            Documentation
          </a>
          <a
            href={`${GITHUB_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 transition-colors duration-200 hover:text-black cursor-pointer"
          >
            Issues
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 transition-colors duration-200 hover:text-black cursor-pointer"
          >
            GitHub
          </a>
        </div>

        <p className="text-xs text-neutral-400">
          Open-source &middot; FastAPI + Python
        </p>
      </div>
    </footer>
  );
}
