import products from './products'
import gameModes from './game-modes'
import categories from './categories'
import coupons from './coupons'
const admin = {
    products: Object.assign(products, products),
gameModes: Object.assign(gameModes, gameModes),
categories: Object.assign(categories, categories),
coupons: Object.assign(coupons, coupons),
}

export default admin