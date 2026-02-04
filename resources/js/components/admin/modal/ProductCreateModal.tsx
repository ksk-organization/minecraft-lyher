// resources/js/Pages/Admin/Products/Index.tsx
import React, { useCallback, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
  X,
  UploadCloud,
  Loader2,
} from 'lucide-react';
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

interface Product {
  id: number;
  game_mode_id: number;
  category_id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  is_active: boolean;
  short_description: string | null;
  main_icon_url: string | null;
  game_mode?: { id: number; title: string };
  category?: { id: number; name: string };
  images: { id: number; image_url: string }[];
}


// ────────────────────────────────────────────────
// Reusable Form Component (create + edit)
// ────────────────────────────────────────────────
export default function ProductForm({
  form,
  mode, // 'create' | 'edit'
  onClose,
  game_modes,
  categories,
}: {
  form: ReturnType<typeof useForm>;
  mode: 'create' | 'edit';
  onClose: () => void;
  game_modes: any;
  categories: any;
}) {
  const { data, setData, processing, errors, post, put } = form;

  // Main image preview cleanup
  useEffect(() => {
    return () => {
      if (data.main_icon_preview && data.main_icon_preview.startsWith('blob:')) {
        URL.revokeObjectURL(data.main_icon_preview);
      }
    };
  }, [data.main_icon_preview]);

  const handleMainImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setData({
      main_icon_url: file,
      main_icon_preview: preview,
    });
  }, [setData]);

  const addGalleryImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages = files.map(file => ({
      type: 'file' as const,
      value: URL.createObjectURL(file),
      file,
    }));

    setData('images', [...(data.images || []), ...newImages]);
  }, [data.images, setData]);

  const removeGalleryImage = useCallback((index: number) => {
    const newImages = [...(data.images || [])];
    const removed = newImages.splice(index, 1)[0];

    // Cleanup blob URL if it was a new file
    if (removed?.type === 'file' && removed.value.startsWith('blob:')) {
      URL.revokeObjectURL(removed.value);
    }

    setData('images', newImages);
  }, [data.images, setData]);

  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const method = mode === 'create' ? post : put;
    const routeParams = mode === 'create' ? [] : [data.id];

    method(route(`admin.products.${mode === 'create' ? 'store' : 'update'}`, ...routeParams), {
      forceFormData: true,           // ← very important for file uploads
      preserveScroll: true,
      onSuccess: () => {
        onClose();
      },
    });
  }, [form, mode, data.id, post, put, onClose]);

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ── Left column ── Main fields ── */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Name *</Label>
              <Input
                value={data.name || ''}
                onChange={e => setData('name', e.target.value)}
                className="mt-1.5 border-zinc-700 bg-zinc-900 focus:border-orange-500"
                disabled={processing}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Slug *</Label>
              <Input
                value={data.slug || ''}
                onChange={e => setData('slug', e.target.value)}
                className="mt-1.5 border-zinc-700 bg-zinc-900 focus:border-orange-500"
                disabled={processing}
              />
              {errors.slug && <p className="mt-1.5 text-xs text-red-400">{errors.slug}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Game Mode</Label>
              <Select
                value={String(data.game_mode_id || '')}
                onValueChange={v => setData('game_mode_id', v)}
                disabled={processing}
              >
                <SelectTrigger className="mt-1.5 border-zinc-700 bg-zinc-900">
                  <SelectValue placeholder="Select game mode" />
                </SelectTrigger>
                <SelectContent>
                  {game_modes.map(gm => (
                    <SelectItem key={gm.id} value={String(gm.id)}>
                      {gm.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Category</Label>
              <Select
                value={String(data.category_id || '')}
                onValueChange={v => setData('category_id', v)}
                disabled={processing}
              >
                <SelectTrigger className="mt-1.5 border-zinc-700 bg-zinc-900">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Short Description</Label>
            <Textarea
              value={data.short_description || ''}
              onChange={e => setData('short_description', e.target.value)}
              rows={3}
              className="mt-1.5 border-zinc-700 bg-zinc-900 focus:border-orange-500"
              disabled={processing}
            />
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Price ($)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={data.price ?? ''}
                onChange={e => setData('price', e.target.value)}
                className="mt-1.5 border-zinc-700 bg-zinc-900 font-mono text-orange-400"
                disabled={processing}
              />
            </div>

            <div>
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Stock</Label>
              <Input
                type="number"
                min="0"
                value={data.stock ?? ''}
                onChange={e => setData('stock', e.target.value)}
                className="mt-1.5 border-zinc-700 bg-zinc-900"
                disabled={processing}
              />
            </div>

            <div className="flex items-end gap-3 pb-2">
              <Switch
                checked={data.is_active}
                onCheckedChange={v => setData('is_active', v)}
                disabled={processing}
              />
              <Label className="text-sm font-medium">
                {data.is_active ? 'Active' : 'Hidden'}
              </Label>
            </div>
          </div>
        </div>

        {/* ── Right column ── Images ── */}
        <div className="space-y-8">
          {/* Main Icon */}
          <div>
            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Main Product Icon</Label>
            <div className="mt-3 flex flex-col sm:flex-row gap-5 items-start">
              <div className="shrink-0">
                {data.main_icon_preview || (typeof data.main_icon_url === 'string' && data.main_icon_url) ? (
                  <div className="relative group">
                    <img
                      src={data.main_icon_preview || data.main_icon_url}
                      alt="Main preview"
                      className="h-28 w-28 rounded-lg object-cover border border-zinc-700 shadow-md"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setData({ main_icon_url: null, main_icon_preview: null })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="h-28 w-28 rounded-lg border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-600">
                    <UploadCloud className="h-10 w-10 opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImage}
                  disabled={processing}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p className="text-xs text-zinc-500">
                  PNG, JPG, WebP • Recommended 512×512 • Max 3MB
                </p>
                {errors.main_icon_url && (
                  <p className="text-xs text-red-400">{errors.main_icon_url}</p>
                )}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Gallery Images</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('gallery-upload')?.click()}
                className="h-8 border-orange-600/40 text-orange-400 hover:bg-orange-950/30"
              >
                <UploadCloud className="mr-1.5 h-4 w-4" />
                Add Images
              </Button>
              <input
                id="gallery-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={addGalleryImages}
              />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {data.images?.map((img, idx) => (
                <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950">
                  <img
                    src={img.value}
                    alt={`gallery-${idx}`}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeGalleryImage(idx)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {(!data.images || data.images.length === 0) && (
                <div className="col-span-full h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 text-zinc-600">
                  <UploadCloud className="mb-2 h-10 w-10 opacity-50" />
                  <p className="text-sm">No gallery images yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-zinc-800">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={processing}
          className="border-zinc-700 hover:bg-zinc-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={processing}
          className="min-w-[160px] bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-lg shadow-orange-900/30"
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            </>
          ) : mode === 'create' ? (
            'Create Product'
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
}