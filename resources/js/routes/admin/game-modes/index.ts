import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/game-modes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GameModeController::index
 * @see app/Http/Controllers/Admin/GameModeController.php:15
 * @route '/admin/game-modes'
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
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/game-modes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GameModeController::create
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/create'
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
* @see \App\Http\Controllers\Admin\GameModeController::store
 * @see app/Http/Controllers/Admin/GameModeController.php:22
 * @route '/admin/game-modes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/game-modes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::store
 * @see app/Http/Controllers/Admin/GameModeController.php:22
 * @route '/admin/game-modes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::store
 * @see app/Http/Controllers/Admin/GameModeController.php:22
 * @route '/admin/game-modes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::store
 * @see app/Http/Controllers/Admin/GameModeController.php:22
 * @route '/admin/game-modes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::store
 * @see app/Http/Controllers/Admin/GameModeController.php:22
 * @route '/admin/game-modes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
export const show = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/game-modes/{game_mode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
show.url = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { game_mode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    game_mode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        game_mode: args.game_mode,
                }

    return show.definition.url
            .replace('{game_mode}', parsedArgs.game_mode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
show.get = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
show.head = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
    const showForm = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
        showForm.get = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GameModeController::show
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}'
 */
        showForm.head = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
export const edit = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/game-modes/{game_mode}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
edit.url = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { game_mode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    game_mode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        game_mode: args.game_mode,
                }

    return edit.definition.url
            .replace('{game_mode}', parsedArgs.game_mode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
edit.get = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
edit.head = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
    const editForm = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
        editForm.get = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GameModeController::edit
 * @see app/Http/Controllers/Admin/GameModeController.php:0
 * @route '/admin/game-modes/{game_mode}/edit'
 */
        editForm.head = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
export const update = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/game-modes/{game_mode}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
update.url = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { game_mode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    game_mode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        game_mode: args.game_mode,
                }

    return update.definition.url
            .replace('{game_mode}', parsedArgs.game_mode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
update.put = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
update.patch = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
    const updateForm = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
        updateForm.put = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\GameModeController::update
 * @see app/Http/Controllers/Admin/GameModeController.php:54
 * @route '/admin/game-modes/{game_mode}'
 */
        updateForm.patch = (args: { game_mode: string | number } | [game_mode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GameModeController::destroy
 * @see app/Http/Controllers/Admin/GameModeController.php:91
 * @route '/admin/game-modes/{game_mode}'
 */
export const destroy = (args: { game_mode: number | { id: number } } | [game_mode: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/game-modes/{game_mode}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GameModeController::destroy
 * @see app/Http/Controllers/Admin/GameModeController.php:91
 * @route '/admin/game-modes/{game_mode}'
 */
destroy.url = (args: { game_mode: number | { id: number } } | [game_mode: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { game_mode: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { game_mode: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    game_mode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        game_mode: typeof args.game_mode === 'object'
                ? args.game_mode.id
                : args.game_mode,
                }

    return destroy.definition.url
            .replace('{game_mode}', parsedArgs.game_mode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GameModeController::destroy
 * @see app/Http/Controllers/Admin/GameModeController.php:91
 * @route '/admin/game-modes/{game_mode}'
 */
destroy.delete = (args: { game_mode: number | { id: number } } | [game_mode: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\GameModeController::destroy
 * @see app/Http/Controllers/Admin/GameModeController.php:91
 * @route '/admin/game-modes/{game_mode}'
 */
    const destroyForm = (args: { game_mode: number | { id: number } } | [game_mode: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GameModeController::destroy
 * @see app/Http/Controllers/Admin/GameModeController.php:91
 * @route '/admin/game-modes/{game_mode}'
 */
        destroyForm.delete = (args: { game_mode: number | { id: number } } | [game_mode: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const gameModes = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default gameModes