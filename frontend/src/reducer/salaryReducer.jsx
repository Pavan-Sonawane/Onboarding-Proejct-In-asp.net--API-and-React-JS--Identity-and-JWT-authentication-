import * as actionTypes from '../action/actionTypes';

const initialState = {
  salaries: [],
};

const salaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SALARY:
      return { ...state, salaries: action.payload };
    case actionTypes.ADD_SALARY:
      return { ...state, salaries: [...state.salaries, action.payload] };
    case actionTypes.UPDATE_SALARY:
      return {
        ...state,
        salaries: state.salaries.map((salary) =>
          salary.id === action.payload.id ? action.payload : salary
        ),
      };
    case actionTypes.DELETE_SALARY:
      return {
        ...state,
        salaries: state.salaries.filter((salary) => salary.id !== action.payload),
      };

    default:
      return state;
  }
};

export default salaryReducer;
