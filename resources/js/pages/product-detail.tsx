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
    Plus,
    Minus,
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

interface Category {
    name: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number | string | null;
    stock: number;
    main_icon_url: string | null;
    short_description: string | null;
    long_description: string | null;
    images: ProductImage[];
    category: Category;
}

interface Props {
    product: Product;
}

// Updated to match your actual backend response structure
interface CouponStatus {
    valid: boolean;
    discount: number; // 10 or 1.00
    type: 'percent' | 'fixed';
    min_spend: number | null;
    message: string;
    code?: string;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function formatPrice(value: number): string {
    return Number.isFinite(value)
        ? value.toLocaleString('en-US', {
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

    const unitPrice = useMemo(
        () => Number(product.price ?? 0),
        [product.price],
    );

    // Quantity
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        if (quantity < product.stock) setQuantity((prev) => prev + 1);
    };

    const decreaseQty = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const form = useForm({
        product_id: product.id,
        minecraft_name: '',
        platform: 'java' as 'java' | 'bedrock' | 'pocket',
        promo_code: '',
        qty: '1',
        receipt: null as File | null,
    });

    useEffect(() => {
        form.setData('qty', String(quantity));
    }, [quantity]);

    const [couponStatus, setCouponStatus] = useState<CouponStatus | null>(null);
    const [checkingCoupon, setCheckingCoupon] = useState(false);

    // Debounced coupon validation
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
                    { headers: { Accept: 'application/json' } },
                );

                if (!response.ok) throw new Error('Network error');

                const data = await response.json();
                console.log('Coupon response:', data);

                if (data.valid) {
                    setCouponStatus({
                        valid: true,
                        discount: Number(data.discount) || 0,
                        type: data.type || 'fixed',
                        min_spend: data.min_spend
                            ? Number(data.min_spend)
                            : null,
                        message: data.message || '',
                        code: data.code,
                    });
                    form.clearErrors('promo_code');
                } else {
                    setCouponStatus({
                        valid: false,
                        discount: 0,
                        type: 'fixed',
                        min_spend: null,
                        message: data.message || 'Invalid or expired code',
                        code: data.code,
                    });
                    form.setError('promo_code', data.message || 'Invalid code');
                }
            } catch (err) {
                setCouponStatus({
                    valid: false,
                    discount: 0,
                    type: 'fixed',
                    min_spend: null,
                    message: 'Error checking code. Try again.',
                    code: undefined,
                });
                form.setError('promo_code', 'Network or server error');
            } finally {
                setCheckingCoupon(false);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [form.data.promo_code]);

    // ── Price calculations ───────────────────────────────────────
    const subtotal = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

    const discountAmount = useMemo(() => {
        if (!couponStatus?.valid) return 0;

        const { type, discount, min_spend } = couponStatus;

        // Minimum spend check
        if (min_spend && subtotal < min_spend) {
            return 0; // coupon not applicable
        }

        if (type === 'percent') {
            return subtotal * (discount / 100);
        } else {
            // fixed discount — capped at subtotal
            return Math.min(discount, subtotal);
        }
    }, [couponStatus, subtotal]);

    const finalPrice = Math.max(0, subtotal - discountAmount);

    // ── Warning when coupon exists but min_spend not met ──
    const minSpendWarning = useMemo(() => {
        if (!couponStatus?.valid || !couponStatus.min_spend) return null;
        if (subtotal < couponStatus.min_spend) {
            return `Minimum spend of $${formatPrice(couponStatus.min_spend)} required to use this coupon.`;
        }
        return null;
    }, [couponStatus, subtotal]);

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
        if (quantity < 1 || quantity > product.stock) {
            form.setError(
                'qty',
                `Quantity must be between 1 and ${product.stock}`,
            );
            return;
        }

        form.post(route('payment.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccessModal(true);
            },
        });
    };

    const hasBaseCategory = product.category.name
        .toLowerCase()
        .includes('base');

    return (
        <Layout>
            <Head title={`NOMROTI | ${product.name}`} />

            <main className="container mx-auto mt-8 max-w-7xl px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                    {/* Image Gallery */}
                    <div>
                        <ImageGallery
                            mainImage={activeImg}
                            thumbnails={allImages}
                            alt={product.name}
                            onThumbClick={setActiveImg}
                        />
                        {product.short_description && (
                        <div
                            className="mt-4 text-base leading-relaxed text-zinc-300 whitespace-pre-line"
                        >
                            {product.short_description}
                        </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-5">
                        <header className="space-y-3">
                            <h1 className="text-2xl font-black tracking-tight text-white uppercase italic md:text-3xl lg:text-4xl">
                                {product.name}
                            </h1>

                            <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                                <span className="font-mono text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
                                    ${formatPrice(finalPrice)}
                                </span>

                                {discountAmount > 0 && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through opacity-70 md:text-xl">
                                            ${formatPrice(subtotal)}
                                        </span>
                                        <Badge className="border-green-500/40 bg-green-600/30 text-green-400">
                                            {couponStatus?.type === 'percent'
                                                ? `-${couponStatus.discount}%`
                                                : `-$${formatPrice(discountAmount)}`}
                                        </Badge>
                                    </>
                                )}

                                <Badge
                                    variant="outline"
                                    className={cn(
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

                            {minSpendWarning && (
                                <p className="text-sm font-medium text-amber-400">
                                    {minSpendWarning}
                                </p>
                            )}
                        </header>

                        {/* Conditional Rendering: Form Card or Telegram Button */}
                        {hasBaseCategory ? (
                            <Button
                                asChild
                                className="group relative h-16 w-full overflow-hidden rounded-xl bg-primary transition-all hover:ring-2 hover:ring-primary/20 active:scale-[0.98]"
                            >
                                <a
                                    href="https://t.me/nomrotismp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        <ShoppingCart className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                        <span className="text-lg font-black tracking-widest uppercase italic">
                                            Purchase via Telegram
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                                </a>
                            </Button>
                        ) : (
                            <Card className="overflow-hidden border-white/5 bg-[#0f0f0f] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)]">
                                <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-transparent" />
                                <CardHeader className="px-6 pt-6 md:px-8 md:pt-8">
                                    <CardTitle className="text-sm font-black tracking-[0.3em] text-white/90 uppercase">
                                        Secure Checkout
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-6 p-6 md:p-8">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {/* Quantity Selector */}
                                            <div className="space-y-3">
                                                <Label
                                                    htmlFor="qty"
                                                    className="text-[10px] font-black tracking-widest text-muted-foreground uppercase"
                                                >
                                                    Quantity
                                                </Label>
                                                <div className="flex h-12 items-center rounded-xl border border-white/10 bg-black/40 p-1 transition-colors focus-within:border-primary/50">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-full w-12 rounded-lg hover:bg-white/5"
                                                        onClick={decreaseQty}
                                                        disabled={
                                                            quantity <= 1 ||
                                                            form.processing
                                                        }
                                                    >
                                                        <Minus size={14} />
                                                    </Button>

                                                    <input
                                                        id="qty"
                                                        type="number"
                                                        min="1"
                                                        max={product.stock}
                                                        value={quantity}
                                                        onChange={(e) => {
                                                            const val = Number(
                                                                e.target.value,
                                                            );
                                                            if (
                                                                !isNaN(val) &&
                                                                val >= 1 &&
                                                                val <=
                                                                    product.stock
                                                            ) {
                                                                setQuantity(
                                                                    val,
                                                                );
                                                            }
                                                        }}
                                                        className="h-full w-full [appearance:textfield] bg-transparent text-center text-sm font-bold outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        disabled={
                                                            form.processing ||
                                                            product.stock <= 0
                                                        }
                                                    />

                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-full w-12 rounded-lg hover:bg-white/5"
                                                        onClick={increaseQty}
                                                        disabled={
                                                            quantity >=
                                                                product.stock ||
                                                            form.processing
                                                        }
                                                    >
                                                        <Plus size={14} />
                                                    </Button>
                                                </div>
                                                {form.errors.qty && (
                                                    <p className="text-xs font-medium text-red-400">
                                                        {form.errors.qty}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Minecraft Username */}
                                            <div className="space-y-3">
                                                <Label
                                                    htmlFor="minecraft_name"
                                                    className="text-[10px] font-black tracking-widest text-muted-foreground uppercase"
                                                >
                                                    Minecraft Username
                                                </Label>
                                                <div className="group relative">
                                                    <Input
                                                        id="minecraft_name"
                                                        value={
                                                            form.data
                                                                .minecraft_name
                                                        }
                                                        onChange={(e) =>
                                                            form.setData(
                                                                'minecraft_name',
                                                                e.target.value.trim(),
                                                            )
                                                        }
                                                        placeholder="Enter IGN"
                                                        className="h-12 rounded-xl border-white/10 bg-black/40 px-4 transition-all focus:ring-1 focus:ring-primary/40"
                                                        disabled={
                                                            form.processing
                                                        }
                                                    />
                                                    <div className="absolute top-1/2 right-4 -translate-y-1/2">
                                                        {form.data
                                                            .minecraft_name
                                                            .length > 2 &&
                                                            !form.errors
                                                                .minecraft_name && (
                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            )}
                                                    </div>
                                                </div>
                                                {form.errors.minecraft_name && (
                                                    <p className="text-xs font-medium text-red-400">
                                                        {
                                                            form.errors
                                                                .minecraft_name
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Platform */}
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                                Platform
                                            </Label>
                                            <PlatformSelector
                                                value={form.data.platform}
                                                onChange={(value) =>
                                                    form.setData(
                                                        'platform',
                                                        value,
                                                    )
                                                }
                                                disabled={form.processing}
                                            />
                                        </div>

                                        {/* Promo Code */}
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                                Promo Code
                                            </Label>
                                            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                                                <div className="relative flex-1">
                                                    <Input
                                                        value={
                                                            form.data.promo_code
                                                        }
                                                        onChange={(e) =>
                                                            form.setData(
                                                                'promo_code',
                                                                e.target.value.toUpperCase(),
                                                            )
                                                        }
                                                        placeholder="HAVE A COUPON?"
                                                        className={cn(
                                                            'h-12 rounded-xl border-white/10 bg-black/40 pr-10 transition-all',
                                                            couponStatus?.valid &&
                                                                'border-green-500/40 bg-green-500/5',
                                                            couponStatus?.valid ===
                                                                false &&
                                                                form.data
                                                                    .promo_code &&
                                                                'border-red-500/40',
                                                        )}
                                                        disabled={
                                                            form.processing ||
                                                            checkingCoupon
                                                        }
                                                    />
                                                    <div className="absolute top-1/2 right-3 -translate-y-1/2">
                                                        {checkingCoupon ? (
                                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                        ) : couponStatus?.valid ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        ) : couponStatus?.valid ===
                                                              false &&
                                                          form.data
                                                              .promo_code ? (
                                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
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
                                                    className="h-12 w-full rounded-xl px-8 font-bold tracking-tighter uppercase sm:w-auto sm:px-6"
                                                >
                                                    Apply
                                                </Button>
                                            </div>

                                            {couponStatus && (
                                                <p
                                                    className={cn(
                                                        'px-1 text-[11px] font-bold',
                                                        couponStatus.valid
                                                            ? 'text-green-400'
                                                            : 'text-red-400',
                                                    )}
                                                >
                                                    {couponStatus.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Payment Information Area */}
                                        <div className="space-y-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                                            <PaymentSection
                                                finalPrice={finalPrice}
                                                platform={form.data.platform}
                                            />

                                            <div className="pt-2">
                                                <ReceiptUpload
                                                    file={form.data.receipt}
                                                    onFileChange={(file) =>
                                                        form.setData(
                                                            'receipt',
                                                            file,
                                                        )
                                                    }
                                                    disabled={form.processing}
                                                />
                                                {form.errors.receipt && (
                                                    <p className="mt-2 text-xs font-medium text-red-400">
                                                        {form.errors.receipt}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Global Error Handle */}
                                        {form.errors.general && (
                                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                                                <p className="text-center text-xs font-bold tracking-tight text-red-400 uppercase">
                                                    {form.errors.general}
                                                </p>
                                            </div>
                                        )}

                                        {/* Final Action */}
                                        <Button
                                            type="submit"
                                            disabled={
                                                form.processing ||
                                                product.stock <= 0
                                            }
                                            className="group relative h-16 w-full overflow-hidden rounded-xl bg-primary transition-all hover:ring-2 hover:ring-primary/20 active:scale-[0.98]"
                                        >
                                            <div className="relative z-10 flex items-center justify-center gap-3">
                                                {form.processing ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        <ShoppingCart className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                                        <span className="text-lg font-black tracking-widest uppercase italic">
                                                            Confirm & Pay
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

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
                    <div className="relative w-full max-w-sm rounded-2xl border border-green-500/30 bg-gradient-to-b from-[#1a2a1a] to-[#121f12] p-8 shadow-2xl sm:max-w-md">
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
                                        href="/#game-mode"
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
