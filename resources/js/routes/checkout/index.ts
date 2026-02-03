import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
export const checkCoupon = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkCoupon.url(options),
    method: 'get',
})

checkCoupon.definition = {
    methods: ["get","head"],
    url: '/checkout/coupon/check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
checkCoupon.url = (options?: RouteQueryOptions) => {
    return checkCoupon.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
checkCoupon.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkCoupon.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
checkCoupon.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkCoupon.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
    const checkCouponForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkCoupon.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
        checkCouponForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkCoupon.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CouponController::checkCoupon
 * @see app/Http/Controllers/Admin/CouponController.php:130
 * @route '/checkout/coupon/check'
 */
        checkCouponForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkCoupon.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkCoupon.form = checkCouponForm
const checkout = {
    checkCoupon: Object.assign(checkCoupon, checkCoupon),
}

export default checkout