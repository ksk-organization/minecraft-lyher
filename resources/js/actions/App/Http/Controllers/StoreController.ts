import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
const index3061d1e453eae72af66960c6525ad9ee = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3061d1e453eae72af66960c6525ad9ee.url(options),
    method: 'get',
})

index3061d1e453eae72af66960c6525ad9ee.definition = {
    methods: ["get","head"],
    url: '/store',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
index3061d1e453eae72af66960c6525ad9ee.url = (options?: RouteQueryOptions) => {
    return index3061d1e453eae72af66960c6525ad9ee.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
index3061d1e453eae72af66960c6525ad9ee.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3061d1e453eae72af66960c6525ad9ee.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
index3061d1e453eae72af66960c6525ad9ee.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3061d1e453eae72af66960c6525ad9ee.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
    const index3061d1e453eae72af66960c6525ad9eeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index3061d1e453eae72af66960c6525ad9ee.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
        index3061d1e453eae72af66960c6525ad9eeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3061d1e453eae72af66960c6525ad9ee.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/store'
 */
        index3061d1e453eae72af66960c6525ad9eeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3061d1e453eae72af66960c6525ad9ee.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index3061d1e453eae72af66960c6525ad9ee.form = index3061d1e453eae72af66960c6525ad9eeForm
    /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
const index431eb3176f0b3b6628922509e73230e6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index431eb3176f0b3b6628922509e73230e6.url(options),
    method: 'get',
})

index431eb3176f0b3b6628922509e73230e6.definition = {
    methods: ["get","head"],
    url: '/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
index431eb3176f0b3b6628922509e73230e6.url = (options?: RouteQueryOptions) => {
    return index431eb3176f0b3b6628922509e73230e6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
index431eb3176f0b3b6628922509e73230e6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index431eb3176f0b3b6628922509e73230e6.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
index431eb3176f0b3b6628922509e73230e6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index431eb3176f0b3b6628922509e73230e6.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
    const index431eb3176f0b3b6628922509e73230e6Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index431eb3176f0b3b6628922509e73230e6.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
        index431eb3176f0b3b6628922509e73230e6Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index431eb3176f0b3b6628922509e73230e6.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:34
 * @route '/products'
 */
        index431eb3176f0b3b6628922509e73230e6Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index431eb3176f0b3b6628922509e73230e6.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index431eb3176f0b3b6628922509e73230e6.form = index431eb3176f0b3b6628922509e73230e6Form

export const index = {
    '/store': index3061d1e453eae72af66960c6525ad9ee,
    '/products': index431eb3176f0b3b6628922509e73230e6,
}

/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/products/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/create'
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
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/products',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
export const show = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/products/{product}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
show.url = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: args.product,
                }

    return show.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
show.get = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
show.head = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
    const showForm = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
        showForm.get = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StoreController::show
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/products/{product}'
 */
        showForm.head = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
export const edit = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/products/{product}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
edit.url = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: args.product,
                }

    return edit.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
edit.get = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
edit.head = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
    const editForm = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
        editForm.get = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}/edit'
 */
        editForm.head = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
export const update = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/products/{product}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
update.url = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: args.product,
                }

    return update.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
update.put = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
update.patch = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
    const updateForm = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
        updateForm.put = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
        updateForm.patch = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
export const destroy = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/products/{product}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
destroy.url = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: args.product,
                }

    return destroy.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
destroy.delete = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
    const destroyForm = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:0
 * @route '/products/{product}'
 */
        destroyForm.delete = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const StoreController = { index, create, store, show, edit, update, destroy }

export default StoreController