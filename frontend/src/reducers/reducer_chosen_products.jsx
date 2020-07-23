const initState = [];

const chosenProductsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [
        ...state,
        {
          idProduct: action.idProduct,
          nameProduct: action.nameProduct,
        },
      ];
    case "DELETE_PRODUCT":
      return state.filter((item) => item.idProduct !== action.idProduct);
    case "DELETE_ALL_PRODUCT":
      return [];
    default:
      return state;
  }
};

export default chosenProductsReducer;
