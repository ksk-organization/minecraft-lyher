// resources/js/components/admin/ProductCreateModal.tsx
import React, { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface ProductCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game_modes: { id: number; title: string }[];
  categories: { id: number; name: string }[];
  onSuccess?: () => void;
}

export function ProductCreateModal({
  open,
  onOpenChange,
  game_modes,
  categories,
  onSuccess,
}: ProductCreateModalProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    game_mode_id: '',
    category_id: '',
    name: '',
    slug: '',
    short_description: '',
    long_description: '',
    price: '19.99',
    stock: '10',
    main_icon_url: null as File | null,
    is_active: true,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const autoSlug = useMemo(() => {
    return data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, [data.name]);

  React.useEffect(() => {
    if (autoSlug && !data.slug) {
      setData('slug', autoSlug);
    }
  }, [autoSlug, data.slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData('main_icon_url', file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.products.store'), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setPreview(null);
        onOpenChange(false);
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Product</DialogTitle>
          <DialogDescription>
            Add a new item to the store (rank, crate, perk, etc.)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Game Mode + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Game Mode *</Label>
              <Select value={data.game_mode_id} onValueChange={v => setData('game_mode_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {game_modes.map(m => (
                    <SelectItem key={m.id} value={m.id.toString()}>
                      {m.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.game_mode_id && <p className="text-red-400 text-sm">{errors.game_mode_id}</p>}
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={data.category_id} onValueChange={v => setData('category_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && <p className="text-red-400 text-sm">{errors.category_id}</p>}
            </div>
          </div>

          {/* Name + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Product Name *</Label>
              <Input
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                placeholder="Titan Rank"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input
                value={data.slug}
                onChange={e => setData('slug', e.target.value)}
                placeholder="titan-rank"
              />
              {errors.slug && <p className="text-red-400 text-sm">{errors.slug}</p>}
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea
                value={data.short_description}
                onChange={e => setData('short_description', e.target.value)}
                placeholder="Brief one-liner for listings"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea
                value={data.long_description}
                onChange={e => setData('long_description', e.target.value)}
                placeholder="Detailed features, perks, limitations..."
                rows={5}
              />
            </div>
          </div>

          <Separator />

          {/* Price, Stock, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Price (USD) *</Label>
              <Input
                type="number"
                step="0.01"
                value={data.price}
                onChange={e => setData('price', e.target.value)}
              />
              {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                type="number"
                value={data.stock}
                onChange={e => setData('stock', e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <Switch
                checked={data.is_active}
                onCheckedChange={checked => setData('is_active', checked)}
                id="active"
              />
              <Label htmlFor="active">Active / Visible in store</Label>
            </div>
          </div>

          <Separator />

          {/* Main Image */}
          <div className="space-y-4">
            <Label>Main Icon / Thumbnail</Label>
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border border-white/20"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                <p className="text-xs text-muted-foreground">
                  Recommended: square PNG, 512×512 or larger
                </p>
                {errors.main_icon_url && (
                  <p className="text-red-400 text-sm">{errors.main_icon_url}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Creating...' : 'Create Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
