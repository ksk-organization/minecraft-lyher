// resources/js/Pages/Admin/Products/Index.tsx

import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    PlusCircle,
    Pencil,
    Trash2,
    Search,
    RefreshCw,
    Eye,
    AlertCircle,
    ImageIcon,
} from 'lucide-react';
import { debounce } from 'lodash';

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
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';
import ProductForm from '@/components/admin/modal/ProductCreateModal';

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

interface ProductFormData {
    id?: number;
    name: string;
    slug: string;
    short_description?: string;
    price?: string | number;
    stock?: string | number;
    is_active: boolean;
    game_mode_id?: string | number;
    category_id?: string | number;
    main_icon?: File | null;
    main_icon_url?: string | null;
    images: any[];
    deleted_image_ids: number[];
}

interface Props {
    products: {
        data: Product[];
        total: number;
        from: number;
        to: number;
        prev_page_url: string | null;
        next_page_url: string | null;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search?: string;
    };
    game_modes: { id: number; title: string }[];
    categories: { id: number; name: string }[];
}

export default function AdminProductsIndex({
    products,
    filters,
    game_modes,
    categories,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const form = useForm<ProductFormData>({
        id: undefined,
        name: '',
        slug: '',
        short_description: '',
        price: '',
        stock: '',
        is_active: true,
        game_mode_id: '',
        category_id: '',
        main_icon: null,
        main_icon_url: null,
        images: [],
        deleted_image_ids: [],
    });

    // ────────────────────────────────────────────────
    // Server-side Search (Debounced)
    // ────────────────────────────────────────────────
    useEffect(() => {
        const handler = debounce(() => {
            router.get(
                route('admin.products.index'),
                { search },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 400);

        handler();
        return () => handler.cancel();
    }, [search]);

    const openCreate = () => {
        form.reset();
        setModalMode('create');
    };

    const openEdit = (product: Product) => {
        form.clearErrors();
        form.setData({
            id: product.id,
            name: product.name,
            slug: product.slug,
            short_description: product.short_description ?? '',
            price: String(product.price),
            stock: String(product.stock),
            is_active: !!product.is_active,
            game_mode_id: String(product.game_mode_id),
            category_id: String(product.category_id),
            main_icon: null,
            main_icon_url: product.main_icon_url
                ? `/storage/${product.main_icon_url}`
                : null,
            images: product.images.map((img) => ({
                id: img.id,
                url: `/storage/${img.image_url}`,
            })),
            deleted_image_ids: [],
        });

        setModalMode('edit');
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.products.destroy', id), {
            preserveScroll: true,
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const goToPage = (url: string | null) => {
        if (!url) return;
        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Products • Admin" />

            <div className="space-y-8 p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                    <div>
                        <h1 className="text-3xl font-black text-white">
                            Products
                        </h1>
                        <p className="mt-1 text-zinc-400">
                            Total: <strong>{products.total}</strong>
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-72">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            <Input
                                placeholder="Search name or slug..."
                                className="border-zinc-700 bg-zinc-900 pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.reload()}
                        >
                            <RefreshCw size={18} />
                        </Button>
                        <Button
                            onClick={openCreate}
                            className="gap-2 bg-orange-600"
                        >
                            <PlusCircle size={18} />
                            New Product
                        </Button>
                    </div>
                </div>
                {/* Table */}
                <Card className="border-zinc-800 bg-black">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Preview</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Description
                                    </TableHead>
                                    <TableHead>Price / Stock</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            {product.main_icon_url ? (
                                                <img
                                                    src={`/storage/${product.main_icon_url}`}
                                                    className="h-14 w-14 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center bg-zinc-800">
                                                    <ImageIcon />
                                                </div>
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-white">
                                                {product.name}
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {product.game_mode?.title} •{' '}
                                                {product.category?.name}
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden text-zinc-400 md:table-cell">
                                            {product.short_description ?? '—'}
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-mono text-orange-400">
                                                $
                                                {Number(product.price).toFixed(
                                                    2,
                                                )}
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {product.stock} in stock
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    openEdit(product)
                                                }
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    setDeleteConfirm(product.id)
                                                }
                                            >
                                                <Trash2
                                                    size={16}
                                                    className="text-red-500"
                                                />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {products.links.length > 1 && (
                            <div className="flex flex-col items-center gap-2 py-6">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() =>
                                                    goToPage(
                                                        products.prev_page_url,
                                                    )
                                                }
                                                className={
                                                    !products.prev_page_url
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>

                                        {products.links
                                            .filter((l) =>
                                                /^\d+$/.test(l.label),
                                            )
                                            .map((link) => (
                                                <PaginationItem
                                                    key={link.label}
                                                >
                                                    <PaginationLink
                                                        isActive={link.active}
                                                        onClick={() =>
                                                            goToPage(link.url)
                                                        }
                                                    >
                                                        {link.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() =>
                                                    goToPage(
                                                        products.next_page_url,
                                                    )
                                                }
                                                className={
                                                    !products.next_page_url
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>

                                <p className="text-sm text-zinc-500">
                                    Showing {products.from}–{products.to} of{' '}
                                    {products.total}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                {/* Create / Edit Modal */}
                <Dialog
                    open={!!modalMode}
                    onOpenChange={() => setModalMode(null)}
                >
                    <DialogContent className="max-h-[95vh] overflow-hidden rounded-2xl border-zinc-700/40 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-0 shadow-2xl sm:max-w-6xl">
                        <DialogHeader className="border-b border-zinc-800 bg-black/40 px-8 py-6 backdrop-blur-sm">
                            <DialogTitle className="text-3xl font-black text-orange-500">
                                {modalMode === 'create'
                                    ? 'Create New Product'
                                    : 'Edit Product'}
                            </DialogTitle>
                            {modalMode === 'edit' && form.data.id && (
                                <DialogDescription className="mt-1 text-zinc-400">
                                    Product ID:
                                    <span className="font-mono text-orange-400">
                                        #{form.data.id}
                                    </span>
                                </DialogDescription>
                            )}
                        </DialogHeader>
                        <div className="overflow-y-auto p-8 md:p-10 lg:p-12">
                            
                            <ProductForm
                                form={form}
                                mode={modalMode!}
                                onClose={() => setModalMode(null)}
                                game_modes={game_modes}
                                categories={categories}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
                {/* Delete Confirmation */}
                <Dialog
                    open={deleteConfirm !== null}
                    onOpenChange={() => setDeleteConfirm(null)}
                >
                    <DialogContent className="bg-zinc-950 sm:max-w-md">
                        <div className="py-6 text-center">
                            <AlertCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
                            <h3 className="text-xl font-bold text-white">
                                Delete Product?
                            </h3>
                            <p className="mt-2 mb-6 text-zinc-400">
                                This action cannot be undone.
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
                                    onClick={() =>
                                        deleteConfirm &&
                                        handleDelete(deleteConfirm)
                                    }
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
