const INCREMENT = "/INCREMENT";

const filtersReducerDefaultState = {
  count: 1,
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

// Action Creators

export const increment = () => ({
  type: INCREMENT,
});
