import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
export const check = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(options),
    method: 'get',
})

check.definition = {
    methods: ["get","head"],
    url: '/checkout/coupon/check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
check.url = (options?: RouteQueryOptions) => {
    return check.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
check.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
check.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: check.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
    const checkForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: check.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
        checkForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::check
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
        checkForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    check.form = checkForm
/**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/coupons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::index
 * @see app/Http/Controllers/Admin/CouponController.php:15
 * @route '/admin/coupons'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/coupons/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::create
 * @see app/Http/Controllers/Admin/CouponController.php:29
 * @route '/admin/coupons/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\CouponController::store
 * @see app/Http/Controllers/Admin/CouponController.php:37
 * @route '/admin/coupons'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/coupons',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::store
 * @see app/Http/Controllers/Admin/CouponController.php:37
 * @route '/admin/coupons'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::store
 * @see app/Http/Controllers/Admin/CouponController.php:37
 * @route '/admin/coupons'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::store
 * @see app/Http/Controllers/Admin/CouponController.php:37
 * @route '/admin/coupons'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::store
 * @see app/Http/Controllers/Admin/CouponController.php:37
 * @route '/admin/coupons'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
export const show = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/coupons/{coupon}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
show.url = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { coupon: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    coupon: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        coupon: args.coupon,
                }

    return show.definition.url
            .replace('{coupon}', parsedArgs.coupon.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
show.get = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
show.head = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
    const showForm = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
        showForm.get = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::show
 * @see app/Http/Controllers/Admin/CouponController.php:57
 * @route '/admin/coupons/{coupon}'
 */
        showForm.head = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
export const edit = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/coupons/{coupon}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
edit.url = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { coupon: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    coupon: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        coupon: args.coupon,
                }

    return edit.definition.url
            .replace('{coupon}', parsedArgs.coupon.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
edit.get = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
edit.head = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
    const editForm = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
        editForm.get = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::edit
 * @see app/Http/Controllers/Admin/CouponController.php:65
 * @route '/admin/coupons/{coupon}/edit'
 */
        editForm.head = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
export const update = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/coupons/{coupon}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
update.url = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { coupon: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { coupon: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    coupon: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        coupon: typeof args.coupon === 'object'
                ? args.coupon.id
                : args.coupon,
                }

    return update.definition.url
            .replace('{coupon}', parsedArgs.coupon.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
update.put = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
update.patch = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
    const updateForm = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
        updateForm.put = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::update
 * @see app/Http/Controllers/Admin/CouponController.php:73
 * @route '/admin/coupons/{coupon}'
 */
        updateForm.patch = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\CouponController::destroy
 * @see app/Http/Controllers/Admin/CouponController.php:93
 * @route '/admin/coupons/{coupon}'
 */
export const destroy = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/coupons/{coupon}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::destroy
 * @see app/Http/Controllers/Admin/CouponController.php:93
 * @route '/admin/coupons/{coupon}'
 */
destroy.url = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { coupon: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    coupon: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        coupon: args.coupon,
                }

    return destroy.definition.url
            .replace('{coupon}', parsedArgs.coupon.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::destroy
 * @see app/Http/Controllers/Admin/CouponController.php:93
 * @route '/admin/coupons/{coupon}'
 */
destroy.delete = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::destroy
 * @see app/Http/Controllers/Admin/CouponController.php:93
 * @route '/admin/coupons/{coupon}'
 */
    const destroyForm = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::destroy
 * @see app/Http/Controllers/Admin/CouponController.php:93
 * @route '/admin/coupons/{coupon}'
 */
        destroyForm.delete = (args: { coupon: string | number } | [coupon: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CouponController = { check, index, create, store, show, edit, update, destroy }

export default CouponController