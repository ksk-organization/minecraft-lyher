import StoreController from './StoreController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    StoreController: Object.assign(StoreController, StoreController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers