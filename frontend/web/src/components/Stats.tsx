import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 6, suffix: "", label: "AI Providers" },
  { value: 20, suffix: "+", label: "Models Supported" },
  { value: 1500, suffix: "+", label: "Lines of Tests" },
  { value: 12, suffix: "", label: "Test Suites" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame: number;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <span className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
            By the numbers
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Battle-tested, production-ready
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Comprehensive test coverage across every provider adapter, the
            orchestra engine, musician lifecycle, and the Test Lab verification
            pipeline.
          </p>
        </AnimatedSection>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-neutral-200 p-8 text-center"
            >
              <div className="text-5xl font-black text-black">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-neutral-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
