import * as actionTypes from '../action/actionTypes';

const initialState = {
  employees: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EMPLOYEE:
      return { ...state, employees: action.payload };
    case actionTypes.ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };
    case actionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((employee) => employee.id !== action.payload),
      };
    case actionTypes.ADD_REGISTRATION:
        return { ...state, employees: [...state.employees, action.payload] };
    default:
      return state;
  }
};

export default employeeReducer;
