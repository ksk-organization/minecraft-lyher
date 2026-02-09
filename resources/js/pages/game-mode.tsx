// resources/js/pages/GamemodeEco.tsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Crown, Package, MapPin } from 'lucide-react';
import Layout from '@/components/homepage/layout';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface ProductImage {
    id: number;
    image_url: string;
    sort_order: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    stock: number;
    main_icon_url: string | null;
    short_description?: string | null;
    long_description?: string | null;
    is_active: boolean;
    images: ProductImage[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
    display_order: number;
    products: Product[];
}

interface Props {
    categories: Category[];
    gamemodes: any;
}

// If ranks come from backend later → replace hardcoded array
interface Rank {
    id?: number;
    name: string;
    price: number;
    description: string;
    icon_url?: string;
}

// For now – can be moved to backend response later
const defaultRanks: Rank[] = [
    {
        name: 'NOMROTI TITAN',
        price: 25.0,
        description:
            'The ultimate prestige. Includes Flight, 50 Homes, and Custom Particles to dominate the server.',
        icon_url: undefined, // can be '/ranks/titan.png' later
    },
];

// ──────────────────────────────────────────────
// Reusable Pieces
// ──────────────────────────────────────────────

function SectionHeader({
    title,
    icon,
    count,
}: {
    title: string;
    icon: React.ReactNode;
    count?: number;
}) {
    return (
        <div className="mb-10 flex items-center gap-4 border-l-4 border-orange-600 pl-5 md:pl-6">
            <div className="rounded-xl bg-orange-950/50 p-3.5 text-orange-500 shadow-inner">
                {icon}
            </div>
            <div className="flex items-baseline gap-4">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl">
                    {title}
                </h2>
                {count !== undefined && (
                    <Badge
                        variant="outline"
                        className="border-orange-600/40 text-orange-400"
                    >
                        {count}
                    </Badge>
                )}
            </div>
        </div>
    );
}

function ProductImageFallback({ name }: { name: string }) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-zinc-900 font-mono text-xs tracking-widest text-zinc-600 uppercase">
            {name.slice(0, 8)}
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const mainImageSrc = product.main_icon_url
        ? `/storage/${product.main_icon_url}`
        : null;

    const hasLowStock = product.stock > 0 && product.stock <= 5;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={route('product.show', { product: product.id })}
                        // href={router.resolve('product.show', { product: product.id }).href}
                        className="group block h-full rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none"
                    >
                        <motion.div
                            whileHover={{ y: -10, scale: 1.025 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                'relative h-full overflow-hidden rounded-2xl border bg-gradient-to-b from-zinc-950 to-black p-5 shadow-xl transition-all md:p-6',
                                'hover:border-orange-600/50 hover:shadow-[0_0_35px_rgba(234,88,12,0.18)]',
                            )}
                        >
                            {hasLowStock && (
                                <Badge className="absolute top-4 right-4 bg-red-600/90 px-2.5 py-1 text-xs font-bold tracking-wide uppercase">
                                    Low Stock
                                </Badge>
                            )}

                            {/* Image container */}
                            <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-xl border border-orange-600/20 bg-black/50">
                                {mainImageSrc ? (
                                    <img
                                        src={mainImageSrc}
                                        alt={product.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <ProductImageFallback name={product.name} />
                                )}
                            </div>

                            <h3 className="mb-2 text-xl font-black tracking-tight text-white uppercase transition-colors group-hover:text-orange-400">
                                {product.name}
                            </h3>

                            <p className="mb-4 font-mono text-2xl font-black text-orange-500">
                                ${Number(product.price).toFixed(2)}
                                {/* ${product.price.toFixed(2)} */}
                            </p>

                            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
                                {product.short_description ||
                                    'Premium item with exclusive perks'}
                            </p>

                            {/* Mini gallery preview */}
                            {product?.images?.length > 0 && (
                                <div className="mt-5 flex justify-center -space-x-2 opacity-70 transition-opacity group-hover:opacity-100">
                                    {product.images.slice(0, 4).map((img) => (
                                        <div
                                            key={img.id}
                                            className="h-9 w-9 overflow-hidden rounded-full border-2 border-black shadow-sm"
                                        >
                                            <img
                                                src={`/storage/${img.image_url}`}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                    {product.images.length > 4 && (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-[10px] font-bold text-zinc-400">
                                            +{product.images.length - 4}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </Link>
                </TooltipTrigger>

                <TooltipContent className="max-w-sm border-zinc-700 bg-zinc-900 text-zinc-200">
                    {product.long_description ||
                        product.short_description ||
                        'No description available.'}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────

export default function GamemodeEco({ categories, gamemodes }: Props) {
    // You can later sort categories by display_order if needed
    // categories.sort((a, b) => a.display_order - b.display_order);

    console.log(categories);

    return (
        <Layout>
            <Head
                title="NOMROTI | Eco Gamemode"
                description="Player-driven economy, town building, auctions, and massive progression in NOMROTI Eco."
            />

            {/* Hero */}
            <header className="relative flex min-h-[55vh] items-center justify-center overflow-hidden pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.92)), url('https://images.unsplash.com/photo-1587573089737-43b8f0f39e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
                    }}
                />
                <div className="relative z-10 container px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="mb-5 text-5xl font-black tracking-tighter text-white uppercase italic drop-shadow-2xl sm:text-6xl md:text-7xl"
                    >
                        {(() => {
                            const title = gamemodes?.title || '';
                            const keyword = 'NOMROTI';

                            // PERFORMANCE: Create a regex that splits while keeping the separator in the array
                            // The parentheses in the regex (keyword) are crucial for keeping the delimiter
                            const parts = title.split(
                                new RegExp(`(${keyword})`, 'gi'),
                            );

                            return parts.map((part, index) =>
                                part.toUpperCase() === keyword ? (
                                    <span key={index} className="text-white">
                                        {part}
                                    </span>
                                ) : (
                                    <span
                                        key={index}
                                        className="text-orange-500"
                                    >
                                        {part}
                                    </span>
                                ),
                            );
                        })()}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.9 }}
                        className="mx-auto max-w-3xl text-lg font-medium text-zinc-300 sm:text-xl md:text-2xl"
                    >
                        {gamemodes?.description}
                    </motion.p>
                </div>
            </header>

            <main className="container mx-auto space-y-20 px-5 py-16 md:space-y-24 md:px-6 md:py-20 lg:px-8">
                {/* Ranks – currently static, ready to become dynamic */}
                {/* <section>
                    <SectionHeader
                        title="Exclusive Ranks"
                        icon={<Crown size={28} />}
                    />

                    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                        {defaultRanks.map((rank) => (
                            <motion.div
                                key={rank.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6 }}
                                className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-zinc-950 to-black p-8 shadow-2xl transition-all hover:border-orange-600/40 hover:shadow-[0_0_40px_rgba(234,88,12,0.15)] md:p-10"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                                <div className="relative z-10 text-center">
                                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-orange-600/30 bg-orange-950/40">
                                        <Crown
                                            size={44}
                                            className="text-orange-500"
                                        />
                                    </div>

                                    <h3 className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                                        {rank.name}
                                    </h3>

                                    <p className="mb-8 text-zinc-300">
                                        {rank.description}
                                    </p>

                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-2xl bg-orange-600 px-10 py-7 text-lg font-black tracking-wide uppercase italic shadow-xl transition-all hover:scale-105 hover:bg-orange-700 active:scale-95"
                                    >
                                        <Link
                                        // href={route('ranks.purchase', { rank: rank.name.toLowerCase().replace(/\s+/g, '-') })}
                                        >
                                            Purchase — ${rank.price.toFixed(2)}
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section> */}

                {/* Product Categories */}
                {categories.map((category) => (
                    <section key={category.id}>
                        <SectionHeader
                            title={category.name}
                            icon={<Package size={28} />}
                            count={category.products.length}
                        />

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                            {category.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {/* World Teaser */}
                <section className="relative overflow-hidden rounded-3xl border border-orange-600/20 bg-black">
                    <img
                        src="/assets/img/bg.webp"
                        alt="NOMROTI Eco gameplay world"
                        loading="lazy"
                        decoding="async"
                        className="h-80 w-full object-cover opacity-75 sm:h-96"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-8 text-center sm:p-10 md:p-12">
                        <h3 className="mb-4 text-3xl font-black text-white md:text-4xl">
                            Endless Worlds Await
                        </h3>
                        <p className="mx-auto max-w-2xl text-lg text-zinc-300">
                            Join a thriving community — build, trade, conquer,
                            and shape the economy of NOMROTI Eco.
                        </p>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
