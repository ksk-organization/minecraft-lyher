import CouponController from './CouponController'
import DashboardController from './DashboardController'
import ProductController from './ProductController'
import GameModeController from './GameModeController'
import CategoryController from './CategoryController'
const Admin = {
    CouponController: Object.assign(CouponController, CouponController),
DashboardController: Object.assign(DashboardController, DashboardController),
ProductController: Object.assign(ProductController, ProductController),
GameModeController: Object.assign(GameModeController, GameModeController),
CategoryController: Object.assign(CategoryController, CategoryController),
}

export default Admin