import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle2, Upload } from 'lucide-react';
export default function ReceiptUpload({
    file,
    onFileChange,
}: {
    file: File | null;
    onFileChange: (f: File | null) => void;
}) {
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files[0];
        if (dropped?.type.startsWith('image/')) onFileChange(dropped);
    };

    return (
        <div className="space-y-2">
            <Label className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                Upload Payment Proof
            </Label>

            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={cn(
                    'cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all',
                    file
                        ? 'border-green-600/50 bg-green-950/20'
                        : 'border-white/10 bg-black/20 hover:border-primary/40',
                )}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                    className="hidden"
                    id="receipt-upload"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                    {file ? (
                        <div className="space-y-2">
                            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
                            <p className="text-sm font-medium text-green-400">
                                {file.name}
                            </p>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                            <p className="text-xs font-bold uppercase opacity-60">
                                Drop Screenshot or Click to Browse
                            </p>
                        </>
                    )}
                </label>
            </div>
        </div>
    );
}
