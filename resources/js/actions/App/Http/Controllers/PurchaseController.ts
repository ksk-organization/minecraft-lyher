import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/purchase',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PurchaseController::index
 * @see app/Http/Controllers/PurchaseController.php:12
 * @route '/purchase'
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
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/purchase/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PurchaseController::create
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/create'
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
* @see \App\Http\Controllers\PurchaseController::store
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/purchase',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::store
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::store
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PurchaseController::store
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::store
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
export const show = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/purchase/{purchase}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
show.url = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { purchase: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    purchase: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        purchase: args.purchase,
                }

    return show.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
show.get = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
show.head = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
    const showForm = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
        showForm.get = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PurchaseController::show
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
        showForm.head = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
export const edit = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/purchase/{purchase}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
edit.url = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { purchase: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    purchase: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        purchase: args.purchase,
                }

    return edit.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
edit.get = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
edit.head = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
    const editForm = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
        editForm.get = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PurchaseController::edit
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}/edit'
 */
        editForm.head = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
export const update = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/purchase/{purchase}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
update.url = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { purchase: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    purchase: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        purchase: args.purchase,
                }

    return update.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
update.put = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
update.patch = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
    const updateForm = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
        updateForm.put = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PurchaseController::update
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
        updateForm.patch = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PurchaseController::destroy
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
export const destroy = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/purchase/{purchase}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PurchaseController::destroy
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
destroy.url = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { purchase: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    purchase: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        purchase: args.purchase,
                }

    return destroy.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::destroy
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
destroy.delete = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PurchaseController::destroy
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
    const destroyForm = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PurchaseController::destroy
 * @see app/Http/Controllers/PurchaseController.php:0
 * @route '/purchase/{purchase}'
 */
        destroyForm.delete = (args: { purchase: string | number } | [purchase: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PurchaseController = { index, create, store, show, edit, update, destroy }

export default PurchaseController