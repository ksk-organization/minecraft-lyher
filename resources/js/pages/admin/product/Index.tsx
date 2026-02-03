// resources/js/Pages/Admin/Products/Index.tsx
import React, { useState, useCallback } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    PlusCircle,
    Pencil,
    Trash2,
    Search,
    RefreshCw,
    Eye,
    X,
    Upload,
    Image as ImageIcon,
    AlertCircle,
    UploadCloud,
} from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface ProductImage {
    id?: number; // existing images from DB
    type: 'url' | 'file';
    value: string; // URL or preview URL
    file?: File | null; // only for new uploads
}

interface Product {
    id: number;
    game_mode_id: number;
    category_id: number;
    name: string;
    slug: string;
    price: number;
    stock: number;
    is_active: boolean;
    main_icon_url: string | null;
    game_mode?: { id: number; title: string };
    category?: { id: number; name: string };
    images: { id: number; image_url: string }[];
}

interface Props {
    products: { data: Product[]; total: number; links: any[] };
    game_modes: { id: number; title: string }[];
    categories: { id: number; name: string }[];
}

// ──────────────────────────────────────────────
// Reusable Product Form Modal Content
// ──────────────────────────────────────────────

function ProductFormModalContent({
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
    const { data, setData, post, put, processing, errors, reset } = form;

    const handleMainImage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const preview = URL.createObjectURL(file);
            setData((prev: any) => ({
                ...prev,
                main_icon_url: file,
                main_icon_preview: preview,
            }));
        },
        [setData],
    );

    const addGalleryImage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);
            if (!files.length) return;

            const newImages = files.map((file) => ({
                type: 'file' as const,
                value: URL.createObjectURL(file),
                file,
            }));

            setData('images', [...(data.images || []), ...newImages]);
        },
        [data.images, setData],
    );

    const removeGalleryImage = useCallback(
        (index: number) => {
            setData(
                'images',
                (data.images || []).filter((_, i) => i !== index),
            );
        },
        [data.images, setData],
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = mode === 'create' ? post : put;
        const routeName =
            mode === 'create'
                ? 'admin.products.store'
                : `admin.products.update`;

        method(route(routeName, mode === 'edit' ? data.id : undefined), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Left column – main fields */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Name
                            </Label>
                            <Input
                                value={data.name || ''}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="mt-1 border-zinc-700 bg-zinc-900 focus:border-orange-500"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Slug
                            </Label>
                            <Input
                                value={data.slug || ''}
                                onChange={(e) =>
                                    setData('slug', e.target.value)
                                }
                                className="mt-1 border-zinc-700 bg-zinc-900 focus:border-orange-500"
                            />
                            {errors.slug && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.slug}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Game Mode
                            </Label>
                            <Select
                                value={String(data.game_mode_id || '')}
                                onValueChange={(v) =>
                                    setData('game_mode_id', v)
                                }
                            >
                                <SelectTrigger className="mt-1 border-zinc-700 bg-zinc-900">
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {game_modes.map((gm) => (
                                        <SelectItem
                                            key={gm.id}
                                            value={String(gm.id)}
                                        >
                                            {gm.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Category
                            </Label>
                            <Select
                                value={String(data.category_id || '')}
                                onValueChange={(v) => setData('category_id', v)}
                            >
                                <SelectTrigger className="mt-1 border-zinc-700 bg-zinc-900">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem
                                            key={cat.id}
                                            value={String(cat.id)}
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Price ($)
                            </Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={data.price || ''}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className="mt-1 border-zinc-700 bg-zinc-900 font-mono text-orange-400"
                            />
                        </div>
                        <div>
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Stock
                            </Label>
                            <Input
                                type="number"
                                value={data.stock || ''}
                                onChange={(e) =>
                                    setData('stock', e.target.value)
                                }
                                className="mt-1 border-zinc-700 bg-zinc-900"
                            />
                        </div>
                        <div className="flex items-end gap-3 pb-2">
                            <Switch
                                checked={data.is_active}
                                onCheckedChange={(v) => setData('is_active', v)}
                                className="data-[state=checked]:bg-orange-600"
                            />
                            <span className="text-xs font-bold text-zinc-400 uppercase">
                                {data.is_active ? 'ACTIVE' : 'HIDDEN'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right column – images */}
                <div className="space-y-6">
                    {/* Main Icon */}
                    <div>
                        <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                            Main Icon
                        </Label>
                        <div className="mt-2 flex items-start gap-4">
                            <div className="shrink-0">
                                {data.main_icon_preview ||
                                data.main_icon_url ? (
                                    <div className="relative">
                                        <img
                                            src={
                                                data.main_icon_preview ||
                                                data.main_icon_url
                                            }
                                            alt="Main preview"
                                            className="h-24 w-24 rounded-md border border-zinc-700 object-cover"
                                        />
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 h-6 w-6"
                                            onClick={() => {
                                                setData({
                                                    main_icon_url: null,
                                                    main_icon_preview: null,
                                                });
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed border-zinc-700">
                                        <ImageIcon className="h-8 w-8 text-zinc-600" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMainImage}
                                    className="cursor-pointer"
                                />
                                <p className="mt-1 text-xs text-zinc-500">
                                    PNG, JPG, WebP • max 3MB
                                </p>
                                {errors.main_icon_url && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.main_icon_url}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                                Gallery Images
                            </Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    document
                                        .getElementById('gallery-upload')
                                        ?.click()
                                }
                                className="h-7 border-orange-600/30 text-xs text-orange-400 hover:bg-orange-950/30"
                            >
                                <Upload className="mr-1.5 h-3.5 w-3.5" />
                                Add Images
                            </Button>
                            <input
                                id="gallery-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={addGalleryImage}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                            {data.images?.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="group relative aspect-square overflow-hidden rounded-md border border-zinc-700 bg-zinc-950"
                                >
                                    <img
                                        src={img.value}
                                        alt="gallery"
                                        className="h-full w-full object-cover"
                                    />
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="absolute top-1 right-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        onClick={() => removeGalleryImage(idx)}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            ))}
                            {(!data.images || data.images.length === 0) && (
                                <div className="col-span-3 flex h-28 flex-col items-center justify-center rounded-md border-2 border-dashed border-zinc-700 text-zinc-600 sm:col-span-4">
                                    <UploadCloud className="mb-2 h-8 w-8 opacity-50" />
                                    <p className="text-xs">
                                        No gallery images yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit area */}
            <div className="mt-6 flex justify-end gap-3 border-t border-zinc-800 pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-zinc-700 hover:bg-zinc-800"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                    className="min-w-32 bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg shadow-orange-900/30 hover:from-orange-500 hover:to-orange-400"
                >
                    {processing ? (
                        <span className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Saving...
                        </span>
                    ) : mode === 'create' ? (
                        'Create Product'
                    ) : (
                        'Update Product'
                    )}
                </Button>
            </div>
        </form>
    );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────

export default function AdminProductsIndex({
    products,
    game_modes,
    categories,
}: Props) {
    // console.log(products);

    const [search, setSearch] = useState('');
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const form = useForm({
        id: null as number | null,
        game_mode_id: '',
        category_id: '',
        name: '',
        slug: '',
        price: '',
        stock: '',
        is_active: true,
        main_icon_url: null as File | string | null,
        main_icon_preview: null as string | null,
        images: [] as ProductImage[],
    });

    const openCreate = () => {
        form.reset();
        setModal('create');
    };

    const openEdit = useCallback(
        (product: Product) => {
            form.clearErrors();
            form.setData({
                id: product.id,
                game_mode_id: String(product.game_mode_id),
                category_id: String(product.category_id),
                name: product.name,
                slug: product.slug,
                price: String(product.price),
                stock: String(product.stock),
                is_active: !!product.is_active,
                main_icon_url: product.main_icon_url,
                main_icon_preview: null,
                images: product.images.map((img) => ({
                    id: img.id,
                    type: 'url',
                    value: img.image_url.startsWith('http')
                        ? img.image_url
                        : `/storage/${img.image_url}`,
                    file: null,
                })),
            });
            setSelectedProduct(product);
            setModal('edit');
        },
        [form],
    );

    const handleDelete = (id: number) => {
        router.delete(route('admin.products.destroy', id), {
            preserveScroll: true,
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const filtered = products.data.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.slug.toLowerCase().includes(search.toLowerCase()),
            // p.name.toLowerCase().includes(search.toLowerCase()) ||
            // p.slug.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <AppLayout>
            <Head title="Products • Admin" />

            <div className="space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                            Products
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            Manage all store items • {products.total} total
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="relative min-w-[220px]">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            <Input
                                placeholder="Search name or slug..."
                                className="border-zinc-700 bg-zinc-900 pl-10 focus:border-orange-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={openCreate}
                            className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg shadow-orange-900/30 hover:from-orange-500 hover:to-orange-400"
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Product
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.reload()}
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <Card className="overflow-hidden border-zinc-800/50 bg-gradient-to-b from-zinc-950 to-black">
                    <Table>
                        <TableHeader className="bg-zinc-900/60">
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="w-24 text-xs font-bold text-orange-400 uppercase">
                                    Preview
                                </TableHead>
                                <TableHead className="text-xs font-bold text-zinc-300 uppercase">
                                    Product
                                </TableHead>
                                <TableHead className="text-xs font-bold text-zinc-300 uppercase">
                                    Price / Stock
                                </TableHead>
                                <TableHead className="text-right text-xs font-bold text-zinc-300 uppercase">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((product) => (
                                <TableRow
                                    key={product.id}
                                    className="group border-zinc-800 transition-colors hover:bg-orange-950/10"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-12 w-12 rounded-md border border-zinc-700">
                                                {/* <AvatarImage
                                                    src={product.main_icon_url || undefined}
                                                    alt={product.name}
                                                /> */}
                                                {/* <AvatarFallback className="bg-zinc-900 text-zinc-500 text-xs">
                                                    {product.name.slice(0, 2)}
                                                </AvatarFallback> */}
                                                <img
                                                    className="w-full"
                                                    src={
                                                        '/storage/' +
                                                        product.main_icon_url
                                                    }
                                                    alt=""
                                                />
                                            </Avatar>

                                            {product.images?.length > 0 && (
                                                <div className="flex -space-x-2">
                                                    {product.images
                                                        .slice(0, 3)
                                                        .map((img, i) => (
                                                            <Avatar
                                                                key={i}
                                                                className="h-8 w-8 rounded-full border-2 border-black"
                                                            >
                                                                {/* <AvatarImage src={img.image_url} />
                                                            <AvatarFallback className="text-[10px]">Img</AvatarFallback> */}
                                                                <img
                                                                    className="w-full"
                                                                    src={
                                                                        '/storage/' +
                                                                        img.image_url
                                                                    }
                                                                    alt=""
                                                                />
                                                            </Avatar>
                                                        ))}
                                                    {product.images.length >
                                                        3 && (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-[10px] text-zinc-400">
                                                            +
                                                            {product.images
                                                                .length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="font-medium text-white transition-colors group-hover:text-orange-400">
                                            {product.name}
                                        </div>
                                        <div className="mt-0.5 font-mono text-xs text-zinc-500">
                                            {product.game_mode?.title || '—'} •{' '}
                                            {product.category?.name ||
                                                'Uncategorized'}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="font-mono font-bold text-orange-400">
                                            ${product.price}
                                        </div>
                                        <div className="mt-0.5 text-xs text-zinc-500">
                                            {product.stock} in stock
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Eye className="h-4 w-4 text-zinc-400" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                    openEdit(product)
                                                }
                                            >
                                                <Pencil className="h-4 w-4 text-blue-400" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                    setDeleteConfirm(product.id)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-64 text-center text-zinc-500"
                                    >
                                        No products found matching your filter
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                {/* Create / Edit Modal – Enlarged & Polished */}
                <Dialog open={!!modal} onClose={() => setModal(null)}>
                    <DialogContent
                        className={cn(
                            // Ultra-wide on large screens, still responsive and safe on mobile/tablet
                            '2xl:max-w-max-w-6xl max-w-[95vw] sm:max-w-[92vw] md:max-w-[88vw] lg:max-w-7xl xl:max-w-7xl',
                            // Very tall – almost full viewport height
                            'max-h-[94vh] sm:max-h-[92vh] md:max-h-[90vh]',
                            // No outer padding → content uses full space
                            'p-0',
                            // Premium dark gradient + subtle borders/shadows
                            'bg-gradient-to-br from-zinc-950 via-black to-zinc-950',
                            'border border-zinc-700/40',
                            'shadow-2xl shadow-black/80',
                            // Smooth rounded corners + overflow handling
                            'overflow-hidden rounded-2xl sm:rounded-3xl',
                            // Nice scrollbar styling
                            'scrollbar scrollbar-thumb-zinc-700 scrollbar-track-zinc-950 scrollbar-thumb-rounded-full',
                        )}
                    >
                        {/* Header – slim but elegant */}
                        <DialogHeader className="border-b border-zinc-800/70 bg-black/40 px-6 pt-5 pb-4 backdrop-blur-sm sm:px-8 md:px-10">
                            <DialogTitle className="text-2xl font-black tracking-tight text-orange-500 drop-shadow-md sm:text-3xl md:text-4xl">
                                {modal === 'create'
                                    ? 'Create New Product'
                                    : 'Edit Product'}
                            </DialogTitle>
                            {modal === 'edit' && selectedProduct && (
                                <DialogDescription className="mt-1 text-sm text-zinc-400 md:text-base">
                                    ID:{' '}
                                    <span className="font-mono text-orange-400/80">
                                        #{selectedProduct.id}
                                    </span>
                                    {' • '}
                                    {/* Last updated: <span className="font-mono">{new Date(selectedProduct.updated_at).toLocaleDateString()}</span> */}
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        {/* Main scrollable content area – generous padding */}
                        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12">
                            <ProductFormModalContent
                                form={form}
                                mode={modal!}
                                onClose={() => setModal(null)}
                                categories={categories}
                                game_modes={game_modes}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation */}
                <Dialog
                    open={!!deleteConfirm}
                    onOpenChange={() => setDeleteConfirm(null)}
                >
                    <DialogContent className="max-w-md border-red-900/40 bg-zinc-950">
                        <div className="py-6 text-center">
                            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Delete Product?
                            </h3>
                            <p className="mb-6 text-sm text-zinc-400">
                                This action cannot be undone. All associated
                                data will be permanently removed.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteConfirm(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        router.delete(
                                            route(
                                                'admin.products.destroy',
                                                deleteConfirm,
                                            ),
                                            {
                                                onSuccess: () =>
                                                    setDeleteConfirm(null),
                                            },
                                        );
                                    }}
                                >
                                    Delete Forever
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
