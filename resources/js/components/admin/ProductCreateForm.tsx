// ProductCreateForm.tsx (used inside modal)
import React, { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { DialogFooter } from '@/components/ui/dialog';

interface ProductCreateFormProps {
  game_modes: { id: number; title: string }[];
  categories: { id: number; name: string }[];
  onSuccess: () => void;
}

export function ProductCreateModalContent({ game_modes, categories, onSuccess }: ProductCreateFormProps) {
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
    return data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }, [data.name]);

  React.useEffect(() => {
    if (autoSlug && !data.slug) setData('slug', autoSlug);
  }, [autoSlug, data.slug, setData]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onSuccess: () => {
        reset();
        setPreview(null);
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* GameMode + Category */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Game Mode *</Label>
          <Select value={data.game_mode_id} onValueChange={v => setData('game_mode_id', v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {game_modes.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.title}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.game_mode_id && <p className="text-red-400 text-sm mt-1">{errors.game_mode_id}</p>}
        </div>
        <div>
          <Label>Category *</Label>
          <Select value={data.category_id} onValueChange={v => setData('category_id', v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.category_id && <p className="text-red-400 text-sm mt-1">{errors.category_id}</p>}
        </div>
      </div>

      {/* Name + Slug */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Product Name *</Label>
          <Input value={data.name} onChange={e => setData('name', e.target.value)} />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label>Slug *</Label>
          <Input value={data.slug} onChange={e => setData('slug', e.target.value)} />
          {errors.slug && <p className="text-red-400 text-sm mt-1">{errors.slug}</p>}
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div>
          <Label>Short Description</Label>
          <Textarea value={data.short_description} onChange={e => setData('short_description', e.target.value)} rows={2} />
        </div>
        <div>
          <Label>Full Description</Label>
          <Textarea value={data.long_description} onChange={e => setData('long_description', e.target.value)} rows={5} />
        </div>
      </div>

      <Separator />

      {/* Price + Stock + Active */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <Label>Price (USD) *</Label>
          <Input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} />
          {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
        </div>
        <div>
          <Label>Stock</Label>
          <Input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} />
        </div>
        <div className="flex items-center gap-3 pt-8">
          <Switch checked={data.is_active} onCheckedChange={v => setData('is_active', v)} id="active" />
          <Label htmlFor="active">Active</Label>
        </div>
      </div>

      <Separator />

      {/* Image */}
      <div>
        <Label>Main Icon</Label>
        <div className="flex gap-6 items-start mt-2">
          <div className="shrink-0">
            {preview ? (
              <img src={preview} alt="preview" className="h-32 w-32 object-cover rounded border border-white/20" />
            ) : (
              <div className="h-32 w-32 rounded border-2 border-dashed border-white/30 flex center">
                <Upload className="h-10 w-10 text-muted-foreground m-auto" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Input type="file" accept="image/*" onChange={handleImage} />
            {errors.main_icon_url && <p className="text-red-400 text-sm mt-1">{errors.main_icon_url}</p>}
          </div>
        </div>
      </div>

      <DialogFooter className="pt-6 border-t border-white/10">
        <Button type="button" variant="outline" onClick={() => {/* parent closes modal */}}>
          Cancel
        </Button>
        <Button type="submit" disabled={processing}>
          {processing ? 'Creating...' : 'Create Product'}
        </Button>
      </DialogFooter>
    </form>
  );
}
