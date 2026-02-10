// resources/js/components/admin/modal/GameModes.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
interface GameModeFormProps {
  data: {
    title: string;
    slug: string;
    description: string;
    server_ip: string;
    image_url: File | string | null;
    image_background: File | string | null;     // ← NEW FIELD
    is_active: boolean;
  };
  setData: (key: keyof typeof data, value: any) => void;
  errors: Record<string, string>;
  processing: boolean;
  onSubmit?: (e: React.FormEvent) => void;      // Optional: if you want to handle form submit here
}

export default function GameModeForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
}: GameModeFormProps) {
  // Preview for main image
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [revokeUrl, setRevokeUrl] = useState<() => void>(() => () => {});

  // Preview for background image
  const [previewBgUrl, setPreviewBgUrl] = useState<string | null>(null);
  const [revokeBgUrl, setRevokeBgUrl] = useState<() => void>(() => () => {});

  // ─── Sync preview when editing (existing URLs) ───────────────────────────────
  useEffect(() => {
    // Main image preview
    if (typeof data.image_url === 'string' && data.image_url) {
      setPreviewUrl(data.image_url);
    } else if (!(data.image_url instanceof File)) {
      setPreviewUrl(null);
    }

    // Background image preview
    if (typeof data.image_background === 'string' && data.image_background) {
      setPreviewBgUrl(data.image_background);
    } else if (!(data.image_background instanceof File)) {
      setPreviewBgUrl(null);
    }
  }, [data.image_url, data.image_background]);

  // ─── Handle main image change ────────────────────────────────────────────────
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    revokeUrl(); // Clean up old blob URL

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setData('image_url', file);

    setRevokeUrl(() => () => URL.revokeObjectURL(objectUrl));
  }, [setData, revokeUrl]);

  // ─── Handle background image change ──────────────────────────────────────────
  const handleBgImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    revokeBgUrl(); // Clean up old blob URL

    const objectUrl = URL.createObjectURL(file);
    setPreviewBgUrl(objectUrl);
    setData('image_background', file);

    setRevokeBgUrl(() => () => URL.revokeObjectURL(objectUrl));
  }, [setData, revokeBgUrl]);

  // ─── Cleanup both blob URLs on unmount ───────────────────────────────────────
  useEffect(() => {
    return () => {
      revokeUrl();
      revokeBgUrl();
    };
  }, [revokeUrl, revokeBgUrl]);

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 py-4"
      encType="multipart/form-data" // Good practice for file uploads
    >
      {/* Title & Slug */}
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
            onChange={(e) =>
              setData('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
            }
            placeholder="nomroti-eco"
            disabled={processing}
            className={cn(errors.slug && 'border-destructive')}
          />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
        </div>
      </div>

      {/* Description */}
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

      {/* Server IP + Images (side by side on desktop) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Server IP */}
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

        {/* Images – stacked vertically */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="space-y-2">
            <Label>Game Mode Image (Preview)</Label>
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

              {/* Preview */}
              <div className="w-32 h-32 rounded-lg border border-border overflow-hidden bg-muted flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/fallback-placeholder.png';
                      e.currentTarget.className += ' opacity-50';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-3">
                    No preview
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div className="space-y-2">
            <Label>Background Image</Label>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleBgImageChange}
                  disabled={processing}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP • Recommended 1920×1080 or wider • Max 3MB
                </p>
                {errors.image_background && (
                  <p className="text-sm text-destructive">{errors.image_background}</p>
                )}
                {typeof data.image_background === 'string' && data.image_background && !previewBgUrl?.startsWith('blob:') && (
                  <p className="text-xs text-muted-foreground italic">
                    Current background will be kept unless a new one is uploaded.
                  </p>
                )}
              </div>

              {/* Background Preview */}
              <div className="w-32 h-32 rounded-lg border border-border overflow-hidden bg-muted flex-shrink-0">
                {previewBgUrl ? (
                  <img
                    src={previewBgUrl}
                    alt="Background Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/fallback-placeholder.png';
                      e.currentTarget.className += ' opacity-50';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-3">
                    No background
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Switch */}
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
    </form>
  );
}
