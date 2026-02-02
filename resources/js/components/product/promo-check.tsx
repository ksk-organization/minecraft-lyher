import { useState, useEffect, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // assuming you have Shadcn cn helper

// Adjust route name if different
const CHECK_COUPON_ROUTE = route('checkout.check-coupon'); // e.g. GET /checkout/coupon/check?code=XXX

export default function YourCheckoutComponent() {
  const [promoCode, setPromoCode] = useState('');
  const [debouncedPromoCode, setDebouncedPromoCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [couponStatus, setCouponStatus] = useState<
    | { valid: true; discount: number; message?: string } // or whatever your backend returns
    | { valid: false; message: string }
    | null
  >(null);

  // Debounce logic (no extra library needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPromoCode(promoCode.trim());
    }, 500); // 500ms — feel free to tune (300–800ms common)

    return () => clearTimeout(timer);
  }, [promoCode]);

  // Check coupon when debounced value changes (and it's not empty)
  useEffect(() => {
    if (!debouncedPromoCode) {
      setCouponStatus(null);
      return;
    }

    setIsChecking(true);
    setCouponStatus(null);

    router.get(
      CHECK_COUPON_ROUTE,
      { code: debouncedPromoCode },
      {
        preserveState: true,
        preserveScroll: true,
        only: ['coupon'], // optional: if you pass back only coupon data
        onBefore: () => {
          // optional
        },
        onSuccess: (page) => {
          // Assuming Laravel returns props like:
          // { coupon: { valid: true, discount: 15, message: "10% off" } } or { valid: false, message: "Expired" }
          const couponData = page.props.coupon;

          if (couponData?.valid) {
            setCouponStatus({
              valid: true,
              discount: couponData.discount ?? 0,
              message: couponData.message,
            });
          } else {
            setCouponStatus({
              valid: false,
              message: couponData?.message ?? 'Invalid or expired code',
            });
          }
        },
        onError: () => {
          setCouponStatus({
            valid: false,
            message: 'Something went wrong. Try again.',
          });
        },
        onFinish: () => setIsChecking(false),
      }
    );
  }, [debouncedPromoCode]);

  // Manual "Apply" button (still useful for forcing check or applying to cart)
  const applyPromo = useCallback(() => {
    if (!promoCode.trim()) return;
    // Force immediate check (bypass debounce)
    setDebouncedPromoCode(promoCode.trim());
  }, [promoCode]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Promo Code
        </Label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())} // often codes are uppercase
              placeholder="Enter code (e.g. WELCOME10)"
              className={cn(
                "h-12 bg-black/30 border-white/10 pr-10",
                couponStatus?.valid === true && "border-green-500/50 focus:border-green-500",
                couponStatus?.valid === false && "border-red-500/50 focus:border-red-500"
              )}
            />

            {/* Live status icon inside input */}
            {isChecking && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            )}
            {!isChecking && couponStatus?.valid === true && (
              <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
            )}
            {!isChecking && couponStatus?.valid === false && promoCode && (
              <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={applyPromo}
            className="h-12 px-6"
            disabled={isChecking || !promoCode.trim()}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Feedback message */}
      {couponStatus && (
        <div
          className={cn(
            "text-sm px-3 py-2 rounded-md border",
            couponStatus.valid
              ? "bg-green-950/30 border-green-500/30 text-green-400"
              : "bg-red-950/30 border-red-500/30 text-red-400"
          )}
        >
          {couponStatus.valid ? (
            <>Applied! {couponStatus.message || `-${couponStatus.discount}% off`}</>
          ) : (
            couponStatus.message
          )}
        </div>
      )}
    </div>
  );
}