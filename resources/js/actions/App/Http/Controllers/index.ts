import StoreController from './StoreController'
import PaymentController from './PaymentController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    StoreController: Object.assign(StoreController, StoreController),
PaymentController: Object.assign(PaymentController, PaymentController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers