// resources/js/pages/admin/GameModes.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────


// ────────────────────────────────────────────────
// Reusable Form (create + edit)
// ────────────────────────────────────────────────
export default function GameModeForm({
  data,
  setData,
  errors,
  processing,
}: {
  data: {
    title: string;
    slug: string;
    description: string;
    server_ip: string;
    image_url: File | string | null;
    is_active: boolean;
  };
  setData: (key: keyof typeof data, value: any) => void;
  errors: Record<string, string>;
  processing: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [revokeUrl, setRevokeUrl] = useState<() => void>(() => () => {});

  // Handle preview when editing or new file selected
  useEffect(() => {
    if (typeof data.image_url === 'string' && data.image_url) {
      setPreviewUrl(data.image_url);
    } else if (data.image_url instanceof File) {
      // already handled in handleImageChange
    } else {
      setPreviewUrl(null);
    }
  }, [data.image_url]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous blob URL if exists
    revokeUrl();

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setData('image_url', file);

    // Store cleanup function
    setRevokeUrl(() => () => URL.revokeObjectURL(objectUrl));
  }, [setData, revokeUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => revokeUrl();
  }, [revokeUrl]);

  return (
    <div className="space-y-6 py-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            placeholder="NOMROTI ECO"
            disabled={processing}
            className={cn(errors.title && 'border-destructive')}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            placeholder="nomroti-eco"
            disabled={processing}
            className={cn(errors.slug && 'border-destructive')}
          />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description ?? ''}
          onChange={(e) => setData('description', e.target.value)}
          placeholder="Describe this game mode... (supports markdown if enabled)"
          rows={4}
          disabled={processing}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="server_ip">Server IP / Domain *</Label>
          <Input
            id="server_ip"
            value={data.server_ip}
            onChange={(e) => setData('server_ip', e.target.value)}
            placeholder="nomroti.net"
            disabled={processing}
            className={cn(errors.server_ip && 'border-destructive')}
          />
          {errors.server_ip && <p className="text-sm text-destructive">{errors.server_ip}</p>}
        </div>

        <div className="space-y-2">
          <Label>Game Mode Image</Label>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1 space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={processing}
                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WebP • Recommended 512×512 • Max 2MB
              </p>
              {errors.image_url && <p className="text-sm text-destructive">{errors.image_url}</p>}
              {typeof data.image_url === 'string' && data.image_url && !previewUrl?.startsWith('blob:') && (
                <p className="text-xs text-muted-foreground italic">
                  Current image will be kept unless a new one is uploaded.
                </p>
              )}
            </div>

            {/* Preview Area */}
            <div className="w-32 h-32 rounded-lg border border-border overflow-hidden bg-muted flex-shrink-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-placeholder.png'; // optional fallback
                    e.currentTarget.className += ' opacity-50';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-3">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3">
        <Switch
          id="is_active"
          checked={data.is_active}
          onCheckedChange={(checked) => setData('is_active', checked)}
          disabled={processing}
        />
        <Label htmlFor="is_active" className="cursor-pointer">
          Active / Visible on frontend
        </Label>
      </div>
    </div>
  );
}