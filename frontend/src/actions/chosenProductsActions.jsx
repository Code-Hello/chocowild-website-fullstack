export const addProductToState = (idProduct, nameProduct) => {
  return {
    type: "ADD_PRODUCT",
    idProduct,
    nameProduct,
  };
};

export const deleteProductFromState = (idProduct) => {
  return {
    type: "DELETE_PRODUCT",
    idProduct,
  };
};

export const deleteAllProductsFromState = () => {
  return {
    type: "DELETE_ALL_PRODUCT",
  };
};
