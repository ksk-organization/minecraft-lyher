import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    ChevronLeft,
    CheckCircle2,
    ShoppingCart,
    QrCode,
    Upload,
    Monitor,
    Gamepad2,
    Smartphone,
} from 'lucide-react';
import Layout from '@/components/homepage/layout';

interface Props {
    // These props come from your Laravel Controller's Inertia::render
    name?: string;
    price?: string | number;
    img?: string;
}

export default function ProductDetail({
    name = 'Premium Rank',
    price = '0.00',
    img = 'https://cdn-icons-png.flaticon.com/512/2317/2317997.png',
}: Props) {
    // 1. STATE MANAGEMENT
    const [activeImg, setActiveImg] = useState(img);
    const [platform, setPlatform] = useState('java');
    const [discount, setDiscount] = useState(0);
    const [promo, setPromo] = useState('');

    // 2. PERFORMANCE: Memoized Price Calculation
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    const finalPrice = useMemo(
        () => Math.max(0, numericPrice - discount),
        [numericPrice, discount],
    );

    const thumbnails = [
        img,
        'https://cdn-icons-png.flaticon.com/512/9630/9630656.png',
        'https://cdn-icons-png.flaticon.com/512/2534/2534168.png',
        'https://cdn-icons-png.flaticon.com/512/7542/7542190.png',
    ];

    return (
        <Layout>
            <Head title={`NOMROTI | ${name}`} />

            {/* Breadcrumb / Back Link */}
            <nav className="border-b border-white/5 bg-black/20 pt-24 pb-4 backdrop-blur-md">
                <div className="container mx-auto px-6">
                    <Link
                        href="/catalog"
                        className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
                    >
                        <ChevronLeft size={16} /> Back to Catalog
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                <div className="grid items-start gap-12 lg:grid-cols-2">
                    {/* LEFT: Image Gallery */}
                    <div className="space-y-4">
                        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#121212] p-12 shadow-2xl">
                            <img
                                src={activeImg}
                                alt={name}
                                className="max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {thumbnails.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(src)}
                                    className={`h-20 w-20 flex-shrink-0 rounded-xl border-2 bg-[#121212] p-2 transition-all ${
                                        activeImg === src
                                            ? 'border-primary'
                                            : 'border-transparent opacity-40'
                                    }`}
                                >
                                    <img
                                        src={src}
                                        className="h-full w-full object-contain"
                                        alt="thumb"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Checkout Column */}
                    <div className="space-y-8">
                        <header>
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                                {name}
                            </h1>
                            <div className="mt-2 font-mono text-3xl font-bold text-primary">
                                ${numericPrice.toFixed(2)}
                            </div>
                        </header>

                        <Card className="border-white/5 bg-[#252525] shadow-2xl">
                            <CardContent className="space-y-6 p-8">
                                {/* User Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                        Minecraft Name
                                    </label>
                                    <Input
                                        placeholder="IGN"
                                        className="h-12 border-white/10 bg-black/20"
                                    />
                                </div>

                                {/* Platform Toggle */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                        Platform
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <PlatformBtn
                                            icon={<Monitor size={14} />}
                                            label="Java"
                                            active={platform === 'java'}
                                            onClick={() => setPlatform('java')}
                                        />
                                        <PlatformBtn
                                            icon={<Gamepad2 size={14} />}
                                            label="Bedrock"
                                            active={platform === 'bedrock'}
                                            onClick={() =>
                                                setPlatform('bedrock')
                                            }
                                        />
                                        <PlatformBtn
                                            icon={<Smartphone size={14} />}
                                            label="Pocket"
                                            active={platform === 'pocket'}
                                            onClick={() =>
                                                setPlatform('pocket')
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Secure Payment Area */}
                                <div className="space-y-4 rounded-2xl border border-white/5 bg-black/40 p-6 text-center">
                                    <span className="text-[10px] font-bold uppercase opacity-40">
                                        Scan to Pay
                                    </span>
                                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl bg-white p-3">
                                        <QrCode
                                            size={100}
                                            className="text-black"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm font-bold">
                                        <span className="uppercase opacity-60">
                                            Total Due
                                        </span>
                                        <span className="font-mono text-xl text-primary">
                                            ${finalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Receipt Upload */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                        Upload Receipt
                                    </label>
                                    <div className="cursor-pointer rounded-xl border-2 border-dashed border-white/10 p-8 text-center transition-colors hover:border-primary/50">
                                        <Upload
                                            size={24}
                                            className="mx-auto mb-2 text-muted-foreground"
                                        />
                                        <span className="text-[10px] font-bold uppercase opacity-40">
                                            Drop Screenshot Here
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full rounded-xl bg-primary py-8 text-lg font-black tracking-tighter text-white uppercase italic hover:bg-primary/90">
                                    <ShoppingCart className="mr-2" /> Submit
                                    Payment
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// Sub-components for cleaner code
function PlatformBtn({
    icon,
    label,
    active,
    onClick,
}: {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                active
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/5 bg-black/20 text-muted-foreground'
            }`}
        >
            {icon}
            <span className="text-[9px] font-black uppercase">{label}</span>
        </button>
    );
}
