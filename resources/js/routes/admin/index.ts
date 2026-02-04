import products from './products'
import gameModes from './game-modes'
import categories from './categories'
import coupons from './coupons'
import orders from './orders'
const admin = {
    products: Object.assign(products, products),
gameModes: Object.assign(gameModes, gameModes),
categories: Object.assign(categories, categories),
coupons: Object.assign(coupons, coupons),
orders: Object.assign(orders, orders),
}

export default admin