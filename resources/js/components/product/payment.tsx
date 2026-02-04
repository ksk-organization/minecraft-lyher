import { QrCode } from "lucide-react";

export function PaymentSection({
    finalPrice,
    platform,
}: {
    finalPrice: number;
    platform: string;
}) {
    return (
        <div className="space-y-5 rounded-2xl border border-white/5 bg-black/40 p-6 text-center">
            <div className="text-xs font-black tracking-widest uppercase opacity-50">
                Scan to Pay ({platform.toUpperCase()})
            </div>

            <div className="mx-auto flex justify-center ">
                {/* <QrCode size={128} className="mx-auto text-black" /> */}
                <img className="max-w-68 shadow-inner rounded-2xl " src="/assets/qr/qr.jpg" alt="" />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold">
                <span className="uppercase opacity-70">Total Due</span>
                <span className="font-mono text-2xl text-primary">
                    ${finalPrice}
                </span>
            </div>
        </div>
    );
}