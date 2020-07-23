export const addUserToState = (idUser, emailUser, role) => {
  return {
    type: "ADD_USER",
    idUser,
    emailUser,
    role,
  };
};

export const deleteUserFromState = (idUser) => {
  return {
    type: "DELETE_USER",
    idUser,
  };
};
