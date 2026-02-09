// resources/js/pages/Welcome.tsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Copy, Check } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Layout from '@/components/homepage/Layout';
import GamemodeCard from '@/components/homepage/gamemode-card';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMaxPlayers } from '@/components/homepage/useMaxPlayers';
import { route } from 'ziggy-js';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
interface Gamemode {
    id: number | string;
    title: string;
    description: string;
    image_url: string;
}

interface WelcomeProps {
    gamemodes: Gamemode[];
}

// ────────────────────────────────────────────────
// Variants (extracted for clarity & reuse)
// ────────────────────────────────────────────────
const floatingVariants = {
    float: {
        y: [0, -18, 0],
        transition: {
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// ────────────────────────────────────────────────
// Hero Background (separated concern)
// ────────────────────────────────────────────────
function HeroBackground() {
    return (
        <>
            {/* Main background + gradient overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `
            linear-gradient(to bottom, rgba(26,26,26,0.88), rgba(26,26,26,0.95)),
            url('https://m.gettywallpapers.com/wp-content/uploads/2023/10/Minecraft-Laptop-Wallpaper-scaled.jpg')
          `,
                    backgroundBlendMode: 'multiply',
                    willChange: 'transform',
                    transform: 'scale(1.02)', // prevent edge flash on scroll/resize
                }}
            />

            {/* Optional Minecraft-style subtle noise */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '300px',
                }}
            />
        </>
    );
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function Welcome({ gamemodes }: WelcomeProps) {
    const onlinePlayers = useMaxPlayers();

    const { count: animatedPlayers, ref: playerCountRef } = useAnimatedCounter(
        onlinePlayers,
        2400,
    );

    const [hasCopied, setHasCopied] = useState(false);

    const copyServerIp = useCallback(async () => {
        try {
            await navigator.clipboard.writeText('nomroti.net');
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2200);
        } catch {
            // TODO: fallback toast / select text (optional)
        }
    }, []);

    // Memoize tooltip content to avoid unnecessary renders
    const tooltipContent = useMemo(
        () => (hasCopied ? 'IP COPIED!' : 'CLICK TO COPY'),
        [hasCopied],
    );

    return (
        <Layout>
            <Head title="NOMROTI | Next-Gen Minecraft Network" />

            {/* ── Hero ─────────────────────────────────────── */}
            <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
                <HeroBackground />

                <div className="relative z-10 container mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Left – Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <h1 className="text-5xl sm:text-6xl leading-[0.9] font-black tracking-tighter uppercase italic md:text-8xl">
                                NOMROTI
                                <br />
                                <span className="text-primary drop-shadow-[0_0_20px_rgba(255,102,0,0.4)]">
                                    NETWORK
                                </span>
                            </h1>

                            <p className="mx-auto max-w-lg text-lg font-medium text-muted-foreground italic opacity-90 md:text-xl lg:mx-0">
                                Experience custom gamemodes engineered for{' '}
                                <span className="font-semibold text-white not-italic">
                                    zero-lag
                                </span>{' '}
                                and high-stakes competition.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row lg:justify-start">
                                {/* IP Copy Button */}
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip open={hasCopied}>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={copyServerIp}
                                                className={cn(
                                                    'group flex cursor-pointer flex-col items-center gap-5 rounded-2xl border p-4 px-7 shadow-2xl backdrop-blur-xl transition-all active:scale-98 sm:flex-row',
                                                    hasCopied
                                                        ? 'border-green-500/60 bg-green-950/30'
                                                        : 'border-white/10 bg-black/65 hover:border-primary/60',
                                                )}
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="relative flex h-3.5 w-3.5 shrink-0">
                                                        <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                                        <span className="relative h-3.5 w-3.5 rounded-full bg-green-500 shadow-[0_0_14px_#22c55e]" />
                                                    </div>

                                                    <span className="font-mono text-2xl font-bold tracking-tight text-white">
                                                        nomroti.net
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 sm:pl-5 sm:border-l border-white/15 ">
                                                    <Users
                                                        className="text-primary"
                                                        size={22}
                                                    />
                                                    <span
                                                        ref={playerCountRef}
                                                        className="text-2xl leading-none font-black text-primary tabular-nums"
                                                    >
                                                        {animatedPlayers.toLocaleString()}
                                                    </span>
                                                </div>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="bottom"
                                            className="border-none bg-primary px-4 py-2.5 font-bold text-white"
                                        >
                                            {tooltipContent}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                {/* Store CTA */}
                                <Link
                                    href="#game-mode" // or better: route('store') if it exists
                                    className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-black tracking-wider uppercase transition hover:border-white/20 hover:bg-white/10"
                                >
                                    Visit Store{' '}
                                    <ArrowRight
                                        size={18}
                                        className="text-primary"
                                    />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right – Floating Hero Image (hidden on mobile) */}
                        <motion.div
                            variants={floatingVariants}
                            animate="float"
                            className="pointer-events-none hidden justify-center select-none lg:flex"
                        >
                            <img
                                src="/assets/img/hero.png"
                                alt="Nomroti Network Logo / Hero Art"
                                className="max-w-[50%] drop-shadow-[0_30px_90px_rgba(0,0,0,0.75)]"
                                loading="eager"
                                width={720}
                                height={720}
                                // Consider adding decoding="async" if image is large
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Gamemodes Grid ─────────────────────────────── */}
            <section
                id="game-mode"
                className="relative z-10 container mx-auto -mt-16 px-5 pb-24 md:-mt-28 md:px-8 md:pb-40"
            >
                <div className="grid gap-7 md:grid-cols-3 md:gap-8 lg:gap-10">
                    {gamemodes.map((mode) => (
                        <GamemodeCard
                            key={mode.id}
                            title={mode.title}
                            description={mode.description}
                            image={mode.image_url}
                            href={route('product.index', { gamemode: mode.id })}
                            //   href={router.resolve('product.index', { gamemodes: mode.id }).href}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    );
}
