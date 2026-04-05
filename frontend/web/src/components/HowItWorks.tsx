import { AnimatedSection } from "./AnimatedSection";

interface Step {
  number: string;
  title: string;
  description: string;
  code: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Configure",
    description:
      "Define your providers and models in config.toml. Set concurrency limits, CLI paths, and default options.",
    code: `[providers.claude]
enabled = true
models = ["opus", "sonnet", "haiku"]
concurrency = 4`,
  },
  {
    number: "02",
    title: "Launch",
    description:
      "Start the server. Symphony pre-warms a pool of CLI musicians for every configured provider-model pair.",
    code: `pip install -e .[dev]
uvicorn symphony.main:app --reload`,
  },
  {
    number: "03",
    title: "Prompt",
    description:
      "Submit prompts via the REST API. Get an immediate score ID back, then poll or connect a WebSocket for results.",
    code: `POST /v1/chat  →  202 Accepted
{ "score_id": "a1b2c3..." }

GET  /v1/chat/{score_id}     # poll
WS   /v1/chat/{score_id}/ws  # live`,
  },
  {
    number: "04",
    title: "Resume",
    description:
      "Continue any conversation by passing the session reference from the previous response.",
    code: `POST /v1/chat
{
  "mode": "resume",
  "provider_session_ref": "e3c7d...",
  "prompt": "Now explain it simply"
}`,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-neutral-950 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <span className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
            The Score
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From silence to symphony in four bars
          </h2>
        </AnimatedSection>

        <div className="mt-20 space-y-12">
          {STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.12}>
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-neutral-800">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-md leading-relaxed text-neutral-400">
                    {step.description}
                  </p>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
                    <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
                      <span className="h-3 w-3 rounded-full bg-neutral-700" />
                      <span className="h-3 w-3 rounded-full bg-neutral-700" />
                      <span className="h-3 w-3 rounded-full bg-neutral-700" />
                    </div>
                    <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-neutral-300">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
