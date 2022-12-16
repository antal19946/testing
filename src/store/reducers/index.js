import { combineReducers } from "redux";
import authReducer from './authReducer';
import forgotPassReducer from './forgotPassReducer';
import ChangePasswordReduser from './ChangePasswordReduser'
import deviceTokenReducer from './deviceTokenReducer';
import propertyReducer from './propertyReducer';
import profileReducer from './profileReducer';
import imageReducer from './imageLightBoxReducer';
import updateProfileReducer from './UpdateProfile'
import TrainingReducer from './TrainingReducer'
import AgronomistReducer from './AgronomistReducer'
import GetQueriesReducer from './GetQueriesReducer'

// const rootReducer = combineReducers({
//     auth: authReducer,
//     forgotPass: forgotPassReducer,
//     device_token: deviceTokenReducer,
//     user: profileReducer,
//     property: propertyReducer,
//     image_lightbox: imageReducer
// });

const rootReducer = {
    auth: authReducer,
    GetQueries:GetQueriesReducer,
    Agro: AgronomistReducer,
    TrainingData: TrainingReducer,
    update: updateProfileReducer,
    Change: ChangePasswordReduser,
    forgotPass: forgotPassReducer,
    device_token: deviceTokenReducer,
    user: profileReducer,
    property: propertyReducer,
    image_lightbox: imageReducer
};

export default rootReducer;