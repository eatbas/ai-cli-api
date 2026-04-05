import {
  Zap,
  Plug,
  RotateCcw,
  RefreshCw,
  FlaskConical,
  Layers,
} from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import type { ElementType } from "react";

interface Feature {
  icon: ElementType;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Warm Musicians",
    description:
      "Pre-spawned CLI processes sit ready in the background. Zero cold-start — your prompts execute instantly the moment they arrive.",
  },
  {
    icon: Plug,
    title: "Polling & WebSocket",
    description:
      "Track scores via HTTP polling or connect a WebSocket for real-time token-by-token output. Two integration paths, zero lock-in.",
  },
  {
    icon: RotateCcw,
    title: "Session Resume",
    description:
      "Continue conversations across requests with provider-native session references. Context is never lost between turns.",
  },
  {
    icon: RefreshCw,
    title: "Auto Updates",
    description:
      "Symphony periodically checks every CLI for new versions and can auto-update idle musicians — no manual intervention needed.",
  },
  {
    icon: FlaskConical,
    title: "Test Lab",
    description:
      "Automated two-step testing across all models in parallel. AI-generated scenarios, keyword verification, and PASS/FAIL grading.",
  },
  {
    icon: Layers,
    title: "Multi-Provider",
    description:
      "Six providers, twenty-plus models, one unified REST API. Add new providers by implementing a single adapter class.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-neutral-950 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <span className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
            Capabilities
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Everything you need to conduct AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            Symphony wraps six AI CLIs into a single, production-ready FastAPI
            service with polling, WebSocket, concurrency, and automated testing built in.
          </p>
        </AnimatedSection>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-neutral-800 bg-neutral-900 p-8 transition-all duration-300 hover:border-neutral-600 cursor-pointer">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  <feature.icon
                    className="h-6 w-6 text-black"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
