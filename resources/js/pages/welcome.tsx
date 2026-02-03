// resources/js/pages/Welcome.tsx
import { Head, Link } from '@inertiajs/react';
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
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

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

export default function Welcome({ gamemodes }: { gamemodes: any }) {
    console.log(gamemodes);
    // [
    //     {
    //         "id": 1,
    //         "title": "Aut dolorem soluta e",
    //         "slug": "Commodi vitae ipsum",
    //         "description": "Voluptatibus sit cum",
    //         "server_ip": "Est error quo distin",
    //         "image_url": "/storage/game-modes/f5a6e4fc-fa97-4b84-85cb-9a3310c63c0d.png",
    //         "is_active": 1,
    //         "created_at": "2026-02-02T05:09:42.000000Z",
    //         "updated_at": "2026-02-02T05:09:42.000000Z"
    //     },
    //     {
    //         "id": 2,
    //         "title": "Aut ipsum dolores s",
    //         "slug": "Exercitationem quae",
    //         "description": "Esse nisi nulla et",
    //         "server_ip": "Cupidatat voluptatem",
    //         "image_url": "/storage/game-modes/9b873cf7-f8be-4957-a6a1-6e8d95af5306.png",
    //         "is_active": 1,
    //         "created_at": "2026-02-02T05:09:51.000000Z",
    //         "updated_at": "2026-02-02T05:09:51.000000Z"
    //     },
    //     {
    //         "id": 3,
    //         "title": "Suscipit est amet a",
    //         "slug": "Distinctio Odio id",
    //         "description": "Accusamus dolore off",
    //         "server_ip": "Cupiditate quis vel",
    //         "image_url": "/storage/game-modes/8273a993-654f-4bd3-9b87-9d378e0b48b8.png",
    //         "is_active": 1,
    //         "created_at": "2026-02-02T05:10:08.000000Z",
    //         "updated_at": "2026-02-02T05:10:08.000000Z"
    //     }
    // ]
    const [copied, setCopied] = useState(false);
    const { count: playerCount, ref: playerRef } = useAnimatedCounter(
        1420,
        2400,
    );

    const copyIp = useCallback(async () => {
        try {
            await navigator.clipboard.writeText('nomroti.net');
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            // fallback: select text or show toast
        }
    }, []);

    return (
        <Layout>
            <Head title="NOMROTI | Next-Gen Minecraft Network" />

            {/* Hero */}
            <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
                {/* Background layers */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                    style={{
                        backgroundImage: `
        linear-gradient(to bottom, rgba(26, 26, 26, 0.88), rgba(26, 26, 26, 0.95)),
        url('https://m.gettywallpapers.com/wp-content/uploads/2023/10/Minecraft-Laptop-Wallpaper-scaled.jpg')
      `,
                        backgroundBlendMode: 'multiply', // better darkening control
                        willChange: 'transform', // helps with smooth scrolling on some devices
                        transform: 'scale(1.02)', // subtle overscan → prevents edge flashing
                    }}
                />

                {/* Optional subtle overlay grain/noise (very Minecraft vibe) – optional, comment out if not wanted */}
                <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: '300px',
                    }}
                />

                <div className="relative z-10 container mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Left column - text content (same as before) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <h1 className="text-6xl leading-[0.9] font-black tracking-tighter uppercase italic md:text-8xl">
                                NOMROTI <br />
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
                                {/* Copy IP button – same as before */}
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip open={copied}>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={copyIp}
                                                className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-white/10 bg-black/65 p-4 px-7 shadow-2xl backdrop-blur-xl transition-all hover:border-primary/60 active:scale-98"
                                            >
                                                <div className="relative flex h-3.5 w-3.5 shrink-0">
                                                    <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                                    <span className="relative h-3.5 w-3.5 rounded-full bg-green-500 shadow-[0_0_14px_#22c55e]" />
                                                </div>
                                                <span className="font-mono text-2xl font-bold tracking-tight text-white">
                                                    nomroti.net
                                                </span>
                                                <div className="flex items-center gap-3 border-l border-white/15 pl-5">
                                                    <Users
                                                        className="text-primary"
                                                        size={22}
                                                    />
                                                    <span
                                                        ref={playerRef}
                                                        className="text-2xl leading-none font-black text-primary tabular-nums"
                                                    >
                                                        {playerCount.toLocaleString()}
                                                    </span>
                                                </div>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="bottom"
                                            className="border-none bg-primary px-4 py-2.5 font-bold text-white"
                                        >
                                            {copied
                                                ? 'IP COPIED!'
                                                : 'CLICK TO COPY'}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <Link
                                    href="/store"
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

                        {/* Right column - floating logo/image (same as before) */}
                        <motion.div
                            variants={floatingVariants}
                            animate="float"
                            className="pointer-events-none hidden justify-center select-none lg:flex"
                        >
                            <img
                                src="/assets/img/hero.png"
                                alt="Nomroti Network"
                                className="max-w-[50%] drop-shadow-[0_30px_90px_rgba(0,0,0,0.75)]"
                                loading="eager"
                                width={720}
                                height={720}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gamemodes */}
            <section className="relative z-10 container mx-auto -mt-16 px-5 pb-24 md:-mt-28 md:px-8 md:pb-40">
                <div className="grid gap-7 md:grid-cols-3 md:gap-8 lg:gap-10">
                    {gamemodes.map((gamemodes, index) => (
                        <GamemodeCard
                            title={gamemodes.title}
                            description={gamemodes.description}
                            image={gamemodes.image_url}
                            href={route('product.index' , {gamemodes: gamemodes.id})}
                        />
                    ))}

                    {/* <GamemodeCard
                        title="SKYBLOCK"
                        description="Custom islands, automation, RPG progression, crates."
                        image="/assets/img/gaming.avif"
                        href="/crates/sky"
                    />

                    <GamemodeCard
                        title="PRACTICE"
                        description="Ranked 1v1, bridge, speed bridging, low-latency nodes."
                        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                        href="/practice"
                    /> */}
                </div>
            </section>
        </Layout>
    );
}
