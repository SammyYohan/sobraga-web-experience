import React from 'react';
import { motion } from 'motion/react';
import {
  BubbleFlavor,
  CondensationBackdrop,
  Effervescence3DBubbles,
  EditorialTextReveal,
} from './LiquidEffects';

interface SubpageBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  bubbleFlavor?: BubbleFlavor;
}

export const SubpageBanner: React.FC<SubpageBannerProps> = ({
  title,
  subtitle,
  image,
  bubbleFlavor = 'mixed',
}) => {
  return (
    <div className="mx-auto max-w-[1380px] px-3 pt-3 md:px-6 md:pt-4">
      <section className="relative h-64 w-full overflow-hidden rounded-2xl bg-neutral-950 shadow-lg ring-1 ring-black/10 md:h-80 md:rounded-3xl">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="animate-ken-burns absolute inset-0 h-full w-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-[#3d0000]/30" />
        <CondensationBackdrop tone="dark" intensity="subtle" />
        <Effervescence3DBubbles flavor={bubbleFlavor} density="subtle" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-8 md:px-10 md:pb-11"
        >
          {subtitle && (
            <p className="mb-1.5 text-xs font-semibold tracking-wider text-red-200 uppercase md:text-sm">
              {subtitle}
            </p>
          )}
          <EditorialTextReveal
            text={title}
            as="h1"
            immediate
            delay={0.05}
            className="max-w-4xl text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          />
        </motion.div>
      </section>
    </div>
  );
};
