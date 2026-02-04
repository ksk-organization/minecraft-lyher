// resources/js/pages/admin/Categories.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ────────────────────────────────────────────────
// Reusable Form (used for both create & edit)
// ────────────────────────────────────────────────
export default function CategoryForm({
  data,
  setData,
  errors,
  processing,
}: {
  data: { name: string; slug: string; display_order: number };
  setData: (key: keyof typeof data, value: any) => void;
  errors: Record<string, string>;
  processing: boolean;
}) {
  return (
    <div className="space-y-6 py-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Ranks, Crates, Keys..."
            disabled={processing}
            className={cn(errors.name && 'border-destructive focus:border-destructive')}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            placeholder="ranks, crates, keys..."
            disabled={processing}
            className={cn(errors.slug && 'border-destructive focus:border-destructive')}
          />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          min="0"
          value={data.display_order}
          onChange={(e) => setData('display_order', Number(e.target.value) || 0)}
          disabled={processing}
        />
        <p className="text-xs text-muted-foreground">
          Lower numbers appear first in menus and listings
        </p>
      </div>
    </div>
  );
}