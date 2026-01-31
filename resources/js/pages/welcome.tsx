import React, { useState, useCallback, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react'; // Performance: SPA-style navigation
import { Users, ArrowRight, Copy, Check } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Layout from '@/components/homepage/layout';
import GamemodeCard from '@/components/homepage/gamemode-card';

import { motion } from 'framer-motion';

// Optimized Counter: Uses requestAnimationFrame for 60FPS smoothness
const useAnimatedCounter = (endValue: number, duration: number = 2000) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        let startTime: number | null = null;
        let frame: number;

        const animate = (now: number) => {
            if (!startTime) startTime = now;
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * endValue));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame); // Security: Prevent memory leaks on page navigation
    }, [endValue, duration]);
    return count;
};

export default function NomrotiLanding() {
    const [copied, setCopied] = useState(false);
    const playerCount = useAnimatedCounter(1420);

    // Memoized Copy Function: Fast and secure
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText('nomroti.net');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Secure copy failed', err);
        }
    }, []);

    return (
        <Layout>
            <Head title="NOMROTI | The Next Generation Network" />

            {/* Hero Section: Optimized Background rendering */}
            <header className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.85), #1a1a1a), url('https://m.gettywallpapers.com/wp-content/uploads/2023/10/Minecraft-Laptop-Wallpaper-scaled.jpg')`,
                        willChange: 'transform', // Performance: Hardware acceleration
                    }}
                />

                <div className="relative z-10 container mx-auto px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="animate-in space-y-8 text-center duration-700 fade-in slide-in-from-left-8 lg:text-left">
                            <h1 className="text-6xl leading-[0.9] font-black tracking-tighter uppercase italic md:text-8xl">
                                NOMROTI <br />
                                <span className="text-primary drop-shadow-[0_0_15px_rgba(255,102,0,0.3)]">
                                    NETWORK
                                </span>
                            </h1>

                            <p className="mx-auto max-w-lg text-lg font-medium text-muted-foreground italic opacity-80 md:text-xl lg:mx-0">
                                Experience custom gamemodes engineered for{' '}
                                <span className="text-white">zero-lag</span> and
                                high-stakes competition.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip open={copied}>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={handleCopy}
                                                className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-white/10 bg-black/60 p-4 px-8 shadow-2xl backdrop-blur-2xl transition-all hover:border-primary/50 active:scale-95"
                                            >
                                                <div className="relative flex h-3 w-3">
                                                    <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]"></span>
                                                </div>
                                                <span className="font-mono text-2xl font-bold tracking-tighter text-white">
                                                    nomroti.net
                                                </span>
                                                <div className="flex items-center gap-3 border-l border-white/10 pl-5">
                                                    <Users
                                                        className="text-primary"
                                                        size={20}
                                                    />
                                                    <span className="text-2xl leading-none font-black text-primary">
                                                        {playerCount.toLocaleString()}
                                                    </span>
                                                </div>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="bottom"
                                            className="border-none bg-primary font-bold text-white"
                                        >
                                            {copied
                                                ? 'IP COPIED!'
                                                : 'CLICK TO COPY'}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <Link
                                    href="/store"
                                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 px-8 text-sm font-black tracking-widest uppercase transition-all hover:bg-white/10"
                                >
                                    Visit Store{' '}
                                    <ArrowRight
                                        size={16}
                                        className="text-primary"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="pointer-events-none flex hidden justify-center lg:flex">
                            <motion.img
                                src="/assets/img/hero.png"
                                alt="Logo"
                                className="max-w-[85%] drop-shadow-[0_35px_100px_rgba(0,0,0,0.8)]"
                                loading="eager"
                                // Initial state
                                initial={{ y: 0 }}
                                // Floating/Bouncing Animation
                                animate={{
                                    y: [0, -20, 0], // Moves up 20px and back
                                }}
                                transition={{
                                    duration: 4, // 4 seconds for a full loop makes it feel "heavy" and epic
                                    repeat: Infinity, // Loop forever
                                    ease: 'easeInOut', // Smooth acceleration/deceleration
                                }}
                                // Interactive: Subtle reaction if the user manages to hover nearby
                                whileHover={{ scale: 1.02 }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Gamemodes Section */}
            <section className="relative z-20 container mx-auto -mt-24 px-6 pb-32">
                <div className="grid gap-8 md:grid-cols-3">
                    <GamemodeCard
                        title="NOMROTI ECO"
                        desc="The ultimate economy experience. Build towns and dominate the player-driven market."
                        img="https://images.unsplash.com/photo-1599583724135-236357e937d3?q=80&w=600&auto=format&fit=crop"
                        href="/product?name=Eco-Rank&price=19.99" // Performance: Static props for speed
                    />
                    <GamemodeCard
                        title="SKYBLOCK"
                        desc="Expand your floating empire with custom automation and unique RPG-style level ups."
                        img="https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=600&auto=format&fit=crop"
                        href="/product?name=Sky-Crate&price=5.00"
                    />
                    <GamemodeCard
                        title="PRACTICE"
                        desc="Sharpen your sword skills in ranked duels and bridge practice on high-performance nodes."
                        img="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
                        href="/product?name=Global-Unban&price=25.00"
                    />
                </div>
            </section>
        </Layout>
    );
}
