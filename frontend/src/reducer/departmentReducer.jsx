import * as actionTypes from '../action/actionTypes';

const initialState = {
  departments: [],
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEPARTMENT:
      return { ...state, departments: action.payload };
    
    case actionTypes.ADD_DEPARTMENT:
      return { ...state, departments: [...state.departments, action.payload] };
    case actionTypes.UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.map((department) =>
          department.id === action.payload.id ? action.payload : department
        ),
      };
    case actionTypes.DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter((department) => department.id !== action.payload),
      };

    default:
      return state;
  }
};

export default departmentReducer;
