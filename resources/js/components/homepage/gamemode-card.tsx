import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // ← shadcn/ui utility (cn helper)

interface GamemodeCardProps {
  title: string;
  description: string; // renamed 'desc' → more semantic
  image: string;       // renamed 'img' → clearer
  href?: string;
  className?: string;  // allow override / composition
}

const cardVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  inView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // modern easeOutBack-ish
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  tap: {
    scale: 0.98,
    y: -2,
  },
};

const imageVariants = {
  initial: { scale: 1.03 },
  hover: {
    scale: 1.12,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function GamemodeCard({
  title,
  description,
  image,
  href = '#',
  className,
}: GamemodeCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {} // no animation if user prefers reduced motion
    : {
        initial: 'initial',
        whileInView: 'inView',
        whileHover: 'hover',
        whileTap: 'tap',
        viewport: { once: true, margin: '-80px' },
      };

  return (
    <Link
      href={href}
      className={cn('group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl', className)}
      aria-label={`Go to ${title} gamemode page`}
    >
      <motion.div
        variants={cardVariants}
        {...motionProps}
        className="h-full"
      >
        <Card
          className={cn(
            'h-full overflow-hidden border border-white/5 bg-gradient-to-b from-[#0f0f0f] to-[#121212]',
            'shadow-xl shadow-black/40 transition-colors duration-300',
            'group-hover:border-primary/30 group-hover:shadow-primary/10'
          )}
        >
          {/* Image + Overlay */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={image}
              alt={`${title} gamemode preview`}
              className="h-full w-full object-cover transition-transform"
              variants={imageVariants}
              initial="initial"
              whileHover={shouldReduceMotion ? undefined : 'hover'}
              loading="lazy"
              decoding="async"
            />

            {/* Gradient overlay + subtle shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent/0 pointer-events-none" />

            {/* Optional shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <CardContent className="p-6 md:p-8 space-y-4">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic text-white drop-shadow-sm">
              {title}
            </h3>

            <p className="text-base leading-relaxed text-muted-foreground/90 line-clamp-3">
              {description}
            </p>

            <div className="flex items-center gap-2.5 text-sm font-black uppercase tracking-wider text-primary/90 group-hover:text-primary transition-colors pt-3">
              Explore {title}
              <motion.div
                animate={shouldReduceMotion ? {} : { x: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse' }}
              >
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
