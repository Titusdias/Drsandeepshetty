"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

const defaultViewport = { once: true, amount: 0.18 } as const;

const transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

type DivProps = PropsWithChildren<
  HTMLMotionProps<"div"> & { delay?: number; as?: "div" }
>;
type LiProps = PropsWithChildren<
  HTMLMotionProps<"li"> & { delay?: number; as: "li" }
>;

export function SectionReveal(props: DivProps | LiProps) {
  const { children, className, delay = 0, ...rest } = props;
  const motionProps = {
    className,
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: defaultViewport,
    transition: { ...transition, delay },
  };

  if (props.as === "li") {
    const { as: _a, ...liRest } = rest as HTMLMotionProps<"li"> & {
      as: "li";
    };
    void _a;
    return (
      <motion.li {...motionProps} {...liRest}>
        {children}
      </motion.li>
    );
  }

  const { as: _a, ...divRest } = rest as HTMLMotionProps<"div"> & {
    as?: "div";
  };
  void _a;

  return (
    <motion.div {...motionProps} {...divRest}>
      {children}
    </motion.div>
  );
}
