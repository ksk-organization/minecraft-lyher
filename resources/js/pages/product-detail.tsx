// resources/js/Pages/ProductDetail.tsx
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';
import {
    ChevronLeft,
    ShoppingCart,
    CheckCircle2,
    AlertCircle,
    Loader2,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Layout from '@/components/homepage/layout';
import { ImageGallery } from '@/components/product/image-preview';
import ReceiptUpload from '@/components/product/receipt-upload';
import { PaymentSection } from '@/components/product/payment';
import { PlatformSelector } from '@/components/product/plateform';
import { route } from 'ziggy-js';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface ProductImage {
    id: number;
    product_id: number;
    image_url: string;
    sort_order: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number | string | null; // ← accept string from Laravel JSON
    stock: number;
    main_icon_url: string | null;
    short_description: string | null;
    long_description: string | null;
    images: ProductImage[];
    // ... other fields
}

interface Props {
    product: Product;
}

interface CouponResponse {
    valid: boolean;
    discount?: number;
    message?: string;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function formatPrice(value: number | string | null): string {
    const num = Number(value ?? 0);
    return Number.isFinite(num)
        ? num.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })
        : '0.00';
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export default function ProductDetail({ product }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const [showSuccessModal, setShowSuccessModal] = useState(!!flash?.success);

    const allImages = useMemo(() => {
        const fallback =
            'https://cdn-icons-png.flaticon.com/512/2317/2317997.png';
        const main = product.main_icon_url
            ? `/storage/${product.main_icon_url}`
            : fallback;
        const extras =
            product.images?.map((img) => `/storage/${img.image_url}`) ?? [];
        return [main, ...extras].filter((v, i, a) => a.indexOf(v) === i)
            .length > 0
            ? [main, ...extras]
            : [fallback];
    }, [product]);

    const [activeImg, setActiveImg] = useState(allImages[0]);

    const numericPrice = useMemo(
        () => Number(product.price ?? 0),
        [product.price],
    );

    const form = useForm({
        product_id: product.id,
        minecraft_name: '',
        platform: 'java' as 'java' | 'bedrock' | 'pocket',
        promo_code: '',
        qty: '',
        receipt: null as File | null,
    });

    const [couponStatus, setCouponStatus] = useState<{
        valid: boolean;
        discount: number;
        message: string;
    } | null>(null);

    const [checkingCoupon, setCheckingCoupon] = useState(false);

    // Debounced coupon validation via Inertia (preserves CSRF, shows progress)
    useEffect(() => {
        const code = form.data.promo_code.trim().toUpperCase();
        if (!code) {
            setCouponStatus(null);
            form.clearErrors('promo_code');
            return;
        }

        const timer = setTimeout(async () => {
            setCheckingCoupon(true);
            try {
                const response = await fetch(
                    `${route('checkout.check-coupon')}?code=${encodeURIComponent(code)}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            // If needed: 'X-Requested-With': 'XMLHttpRequest' (Laravel often auto-detects)
                        },
                    },
                );

                if (!response.ok)
                    throw new Error('Network response was not ok');

                const data = await response.json();

                if (data.valid) {
                    setCouponStatus({
                        valid: true,
                        discount: data.discount ?? 0,
                        message:
                            data.message || `${data.discount}% off applied`,
                    });
                    form.clearErrors('promo_code');
                } else {
                    setCouponStatus({
                        valid: false,
                        discount: 0,
                        message: data.message || 'Invalid or expired code',
                    });
                    form.setError('promo_code', data.message || 'Invalid code');
                }
            } catch (err) {
                setCouponStatus({
                    valid: false,
                    discount: 0,
                    message: 'Error checking code. Try again.',
                });
                form.setError('promo_code', 'Network or server error');
            } finally {
                setCheckingCoupon(false);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [form.data.promo_code]);

    const discountPercent = couponStatus?.valid ? couponStatus.discount : 0;
    const finalPrice = formatPrice(Math.max(0, numericPrice * (1 - discountPercent / 100)));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.data.minecraft_name.trim()) {
            form.setError('minecraft_name', 'Minecraft username is required');
            return;
        }
        if (!form.data.receipt) {
            form.setError('receipt', 'Please upload a payment receipt');
            return;
        }
        if (product.stock <= 0) {
            form.setError('general', 'Product is out of stock');
            return;
        }

        form.post(route('payment.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccessModal(true);
            },
        });
    };

    return (
        <Layout>
            <Head title={`NOMROTI | ${product.name}`} />

            {/* ... nav unchanged ... */}

            <main className="container max-w-7xl mx-auto mt-8 px-5 py-10 md:px-6 md:py-16">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <ImageGallery
                        mainImage={activeImg}
                        thumbnails={allImages}
                        alt={product.name}
                        onThumbClick={setActiveImg}
                    />

                    <div className="space-y-4">
                        <header className="space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic md:text-4xl">
                                {product.name}
                            </h1>

                            <div className="flex flex-wrap items-baseline gap-4">
                                <span className="font-mono text-3xl font-bold text-primary md:text-4xl">
                                    {/* ${formatPrice(numericPrice)} */}
                                    {discountPercent
                                        ? formatPrice(finalPrice)
                                        : formatPrice(numericPrice)}
                                </span>

                                {discountPercent > 0 && (
                                    <>
                                        <span className="text-xl text-muted-foreground line-through opacity-70 md:text-2xl">
                                            ${formatPrice(numericPrice)}
                                        </span>
                                        <Badge className="border-green-500/40 bg-green-600/30 text-green-400">
                                            -{discountPercent}%
                                        </Badge>
                                    </>
                                )}

                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'ml-2',
                                        product.stock > 0
                                            ? 'border-green-600/40 bg-green-950/30 text-green-400'
                                            : 'border-red-600/40 bg-red-950/30 text-red-400',
                                    )}
                                >
                                    {product.stock > 0
                                        ? `${product.stock} in stock`
                                        : 'Out of stock'}
                                </Badge>
                            </div>

                            {product.short_description && (
                                <p className="text-md leading-relaxed text-zinc-300">
                                    {product.short_description}
                                </p>
                            )}
                        </header>

                        {/* Form Card */}
                        <Card className="border-white/5 bg-gradient-to-b from-[#1a1a1a] to-[#121212] shadow-2xl gap-0">
                            <CardHeader className="pt-6">
                                <CardTitle className="text-xl font-black tracking-wide uppercase">
                                    Complete Your Purchase
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-6 p-6 md:p-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    {/* Minecraft Username */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="minecraft_name"
                                            className="text-xs font-black tracking-widest text-muted-foreground uppercase"
                                        >
                                            Minecraft Username (IGN)
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="minecraft_name"
                                                value={form.data.minecraft_name}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'minecraft_name',
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Your in-game name"
                                                className="h-10 border-white/10 bg-black/30 pr-10"
                                                disabled={form.processing}
                                            />
                                            {form.data.minecraft_name.length >
                                                2 &&
                                                !form.errors.minecraft_name && (
                                                    <CheckCircle2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500" />
                                                )}
                                        </div>
                                        {form.errors.minecraft_name && (
                                            <p className="text-sm text-red-400">
                                                {form.errors.minecraft_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="minecraft_name"
                                            className="text-xs font-black tracking-widest text-muted-foreground uppercase"
                                        >
                                            Quantity
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="qty"
                                                value={form.data.qty}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'qty',
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="eg. 1"
                                                className="h-10 border-white/10 bg-black/30 pr-10"
                                                disabled={form.processing}
                                                type='number'
                                            />
                                            {form.data.qty.length >
                                                2 &&
                                                !form.errors.qty && (
                                                    <CheckCircle2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500" />
                                                )}
                                        </div>
                                        {form.errors.qty && (
                                            <p className="text-sm text-red-400">
                                                {form.errors.qty}
                                            </p>
                                        )}
                                    </div>

                                    {/* Platform Selector */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                                            Platform
                                        </Label>
                                        <PlatformSelector
                                            value={form.data.platform}
                                            onChange={(value) =>
                                                form.setData('platform', value)
                                            }
                                            disabled={form.processing}
                                        />
                                    </div>

                                    {/* Promo Code */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                                            Promo Code
                                        </Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    value={form.data.promo_code}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            'promo_code',
                                                            e.target.value.toUpperCase(),
                                                        )
                                                    }
                                                    placeholder="e.g. WELCOME10"
                                                    className={cn(
                                                        'h-10 border-white/10 bg-black/30 pr-10 transition-colors',
                                                        couponStatus?.valid &&
                                                            'border-green-500/60',
                                                        couponStatus?.valid ===
                                                            false &&
                                                            form.data
                                                                .promo_code &&
                                                            'border-red-500/60',
                                                    )}
                                                    disabled={
                                                        form.processing ||
                                                        checkingCoupon
                                                    }
                                                />
                                                {checkingCoupon && (
                                                    <Loader2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground" />
                                                )}
                                                {!checkingCoupon &&
                                                    couponStatus?.valid && (
                                                        <CheckCircle2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500" />
                                                    )}
                                                {!checkingCoupon &&
                                                    couponStatus?.valid ===
                                                        false &&
                                                    form.data.promo_code && (
                                                        <AlertCircle className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-red-500" />
                                                    )}
                                            </div>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    form.setData(
                                                        'promo_code',
                                                        form.data.promo_code
                                                            .trim()
                                                            .toUpperCase(),
                                                    )
                                                }
                                                disabled={
                                                    form.processing ||
                                                    checkingCoupon ||
                                                    !form.data.promo_code.trim()
                                                }
                                                className="h-10 px-6"
                                            >
                                                Apply
                                            </Button>
                                        </div>

                                        {couponStatus && (
                                            <p
                                                className={cn(
                                                    'mt-1.5 text-sm',
                                                    couponStatus.valid
                                                        ? 'text-green-400'
                                                        : 'text-red-400',
                                                )}
                                            >
                                                {couponStatus.message}
                                            </p>
                                        )}
                                        {form.errors.promo_code && (
                                            <p className="text-sm text-red-400">
                                                {form.errors.promo_code}
                                            </p>
                                        )}
                                    </div>

                                    <PaymentSection
                                        finalPrice={finalPrice}
                                        platform={form.data.platform}
                                    />

                                    <ReceiptUpload
                                        file={form.data.receipt}
                                        onFileChange={(file) =>
                                            form.setData('receipt', file)
                                        }
                                        disabled={form.processing}
                                    />
                                    {form.errors.receipt && (
                                        <p className="text-sm text-red-400">
                                            {form.errors.receipt}
                                        </p>
                                    )}

                                    {form.errors.general && (
                                        <p className="text-center text-red-400">
                                            {form.errors.general}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={
                                            form.processing ||
                                            product.stock <= 0
                                        }
                                        className="h-14 w-full bg-primary text-lg font-black tracking-wider uppercase hover:bg-primary/90"
                                    >
                                        {form.processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="mr-2 h-5 w-5" />
                                                Submit Payment
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {product.long_description && (
                            <Card className="border-white/5 bg-[#1a1a1a] shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-lg font-black uppercase">
                                        Product Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="leading-relaxed whitespace-pre-line text-zinc-300">
                                    {product.long_description}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-2xl border border-green-500/30 bg-gradient-to-b from-[#1a2a1a] to-[#121f12] p-8 shadow-2xl">
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-5 right-5 text-zinc-400 hover:text-white"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-900/40">
                                <CheckCircle2 className="h-10 w-12 text-green-500" />
                            </div>
                            <h2 className="mb-4 text-3xl font-black text-white">
                                Payment Submitted!
                            </h2>
                            <p className="mb-8 text-lg text-zinc-300">
                                {flash?.success ||
                                    'Your receipt has been received. We will verify it shortly and activate your order.'}
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSuccessModal(false)}
                                    className="border-green-600/50 text-green-400 hover:bg-green-950/50"
                                >
                                    Close
                                </Button>
                                <Button
                                    asChild
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <Link
                                        href="/products"
                                        onClick={() =>
                                            setShowSuccessModal(false)
                                        }
                                    >
                                        Back to Catalog
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
