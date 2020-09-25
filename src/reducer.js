export const initialState = {
  posts: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: action.payload.posts,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default reducer;
