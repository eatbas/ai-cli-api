import { ArrowRight, Copy, Check } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useState } from "react";

const GITHUB_URL = "https://github.com/eatbas/symphony-api";

const INSTALL_COMMANDS = `git clone ${GITHUB_URL}.git
cd symphony-api
python -m venv .venv && . .venv/bin/activate
pip install -e .[dev]
uvicorn symphony.main:app --reload`;

export function GetStarted() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_COMMANDS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="get-started" className="bg-neutral-950 px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="text-center">
          <span className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
            Overture
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to conduct?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
            Clone the repo, install dependencies, and launch. Your AI orchestra
            is playing in under a minute.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-neutral-500">terminal</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-neutral-400 transition-colors duration-200 hover:bg-neutral-800 hover:text-white cursor-pointer"
                aria-label="Copy install commands"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-loose text-neutral-300">
              {INSTALL_COMMANDS.split("\n").map((line, i) => (
                <div key={i}>
                  <span className="select-none text-neutral-600">$ </span>
                  {line}
                </div>
              ))}
            </pre>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.35} className="mt-12 text-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-neutral-200 cursor-pointer"
          >
            View on GitHub
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
