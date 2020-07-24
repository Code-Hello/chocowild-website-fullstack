export const addProductToState = (
  idProduct,
  nameProduct,
  priceProduct,
  quantity
) => {
  return {
    type: "ADD_PRODUCT",
    idProduct,
    nameProduct,
    priceProduct,
    quantity,
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
