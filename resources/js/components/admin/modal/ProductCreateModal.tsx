import React, { useCallback, useEffect, useMemo } from 'react';
import { router, useForm } from '@inertiajs/react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { route } from 'ziggy-js';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────

interface GalleryImage {
    id?: number;
    url: string;        // Preview URL
    file?: File | null; // Actual File object for new uploads
}

interface ProductFormData {
    id?: number;
    name: string;
    slug: string;
    short_description: string;
    price: string | number;
    stock: string | number;
    is_active: boolean;
    game_mode_id: string | number;
    category_id: string | number;
    main_icon_url: File | string | null;
    main_icon_preview?: string | null;
    images: GalleryImage[];
}

interface ProductFormProps {
    form: ReturnType<typeof useForm<ProductFormData>>;
    mode: 'create' | 'edit';
    onClose: () => void;
    game_modes: { id: number; title: string }[];
    categories: { id: number; name: string }[];
}

export default function ProductForm({ form, mode, onClose, game_modes, categories }: ProductFormProps) {
    const { data, setData, processing, errors, post, reset } = form;
    const isEdit = useMemo(() => mode === 'edit', [mode]);

    // ────────────────────────────────────────────────
    // Image Handlers (Optimized for Latency)
    // ────────────────────────────────────────────────

    const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        // Revoke memory reference for performance
        if (data.main_icon_preview?.startsWith('blob:')) {
            URL.revokeObjectURL(data.main_icon_preview);
        }
        
        setData((prev) => ({
            ...prev,
            main_icon_url: file,
            main_icon_preview: URL.createObjectURL(file),
        }));
    };

    const addGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages: GalleryImage[] = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));

        setData('images', [...data.images, ...newImages]);
    };

    const removeGalleryImage = (index: number) => {
        const newImages = [...data.images];
        const removed = newImages.splice(index, 1)[0];
        
        if (removed.url.startsWith('blob:')) {
            URL.revokeObjectURL(removed.url);
        }
        
        setData('images', newImages);
    };

    // ────────────────────────────────────────────────
    // Submission Logic (Mirroring your working flow)
    // ────────────────────────────────────────────────

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            /**
             * PERFORMANCE FIX: 
             * We use router.post instead of put() to ensure multipart/form-data 
             * is parsed by PHP correctly via method spoofing.
             */
            router.post(route('admin.products.update', data.id), {
                ...data,
                _method: 'put', // Explicitly spoof PUT method
            }, {
                forceFormData: true,
                onSuccess: () => onClose(),
                onError: (err: any) => console.error("Update Errors:", err),
            });
        } else {
            post(route('admin.products.store'), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left Column: Details */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Name *</Label>
                            <Input 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                className="bg-zinc-900 border-zinc-700" 
                                disabled={processing}
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Slug *</Label>
                            <Input 
                                value={data.slug} 
                                onChange={e => setData('slug', e.target.value)} 
                                className="bg-zinc-900 border-zinc-700" 
                                disabled={processing}
                            />
                            {errors.slug && <p className="text-red-400 text-xs">{errors.slug}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Game Mode</Label>
                            <Select 
                                value={String(data.game_mode_id || "")} 
                                onValueChange={v => setData('game_mode_id', v)}
                                disabled={processing}
                            >
                                <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200">
                                    {game_modes.map(gm => (
                                        <SelectItem key={gm.id} value={String(gm.id)}>{gm.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Category</Label>
                            <Select 
                                value={String(data.category_id || "")} 
                                onValueChange={v => setData('category_id', v)}
                                disabled={processing}
                            >
                                <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200">
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Price ($)</Label>
                            <Input 
                                type="number" 
                                step="0.01"
                                value={data.price} 
                                onChange={e => setData('price', e.target.value)} 
                                className="bg-zinc-900 border-zinc-700 text-orange-400" 
                                disabled={processing}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Stock</Label>
                            <Input 
                                type="number" 
                                value={data.stock} 
                                onChange={e => setData('stock', e.target.value)} 
                                className="bg-zinc-900 border-zinc-700" 
                                disabled={processing}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold uppercase text-zinc-400">Short Description</Label>
                        <Textarea 
                            value={data.short_description} 
                            onChange={e => setData('short_description', e.target.value)} 
                            className="bg-zinc-900 border-zinc-700 min-h-[100px]" 
                            disabled={processing}
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Switch checked={data.is_active} onCheckedChange={v => setData('is_active', v)} disabled={processing} />
                        <Label className="text-sm font-medium">{data.is_active ? 'Active' : 'Hidden'}</Label>
                    </div>
                </div>

                {/* Right Column: Images */}
                <div className="space-y-8">
                    <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase text-zinc-400">Main Product Icon</Label>
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            <div className="relative h-28 w-28 shrink-0 rounded-lg border-2 border-dashed border-zinc-700 overflow-hidden bg-zinc-900 flex items-center justify-center group">
                                {data.main_icon_preview || (typeof data.main_icon_url === 'string' && data.main_icon_url) ? (
                                    <>
                                        <img 
                                            src={data.main_icon_preview || (data.main_icon_url as string)} 
                                            className="h-full w-full object-cover" 
                                            alt="Preview" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setData(prev => ({ ...prev, main_icon_url: null, main_icon_preview: null }))}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="text-white w-6 h-6" />
                                        </button>
                                    </>
                                ) : (
                                    <UploadCloud className="text-zinc-600 w-8 h-8 opacity-40" />
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <Input type="file" accept="image/*" onChange={handleMainImage} className="cursor-pointer bg-zinc-900 border-zinc-700" disabled={processing} />
                                {errors.main_icon_url && <p className="text-red-400 text-xs">{errors.main_icon_url}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label className="text-xs font-bold uppercase text-zinc-400">Gallery</Label>
                            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('gallery-upload')?.click()} className="h-8 border-orange-600/30 text-orange-500">
                                <UploadCloud className="mr-2 h-3 w-3" /> Add Images
                            </Button>
                            <input id="gallery-upload" type="file" multiple hidden onChange={addGalleryImages} disabled={processing} />
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {data.images.map((img, idx) => (
                                <div key={idx} className="group relative aspect-square rounded-md border border-zinc-800 bg-zinc-900 overflow-hidden">
                                    <img src={img.url} className="h-full w-full object-cover" alt="Gallery" />
                                    <button 
                                        type="button"
                                        onClick={() => removeGalleryImage(idx)}
                                        className="absolute top-1 right-1 p-1 bg-red-600/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} className="text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                <Button type="button" variant="ghost" onClick={onClose} disabled={processing}>Cancel</Button>
                <Button 
                    type="submit" 
                    disabled={processing} 
                    className="bg-orange-600 min-w-[140px]"
                >
                    {processing ? <Loader2 className="animate-spin h-4 w-4" /> : (isEdit ? 'Save Changes' : 'Create Product')}
                </Button>
            </div>
        </form>
    );
}