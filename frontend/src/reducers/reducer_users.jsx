const initState = {
  idUser: "x",
  emailUser: "x",
  roleUser: "user",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        idUser: action.idUser,
        emailUser: action.emailUser,
        roleUser: action.roleUser,
      };
    case "DELETE_USER":
      return {};
    default:
      return state;
  }
};

export default userReducer;
