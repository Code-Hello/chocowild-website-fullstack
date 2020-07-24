import { combineReducers } from "redux";

import userReducer from "./reducer_users";
import chosenProductsReducer from "./reducer_chosen_products";

const rootReducer = combineReducers({
  user: userReducer,
  chosenProducts: chosenProductsReducer,
});

export default rootReducer;
