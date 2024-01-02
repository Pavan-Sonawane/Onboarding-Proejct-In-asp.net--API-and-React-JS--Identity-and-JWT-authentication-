import { SALARY_RANGE_SEARCH, SALARY_SEARCH_BY_DEPARTMENT, EMPLOYEE_SEARCH } from '../action/actionTypes';

const initialState = {
  salaries: [],
  employees: [],
  
};

const searchReducer = (state = initialState, action) => {
  console.log('Action received:', action);
  switch (action.type) {
   
    case SALARY_RANGE_SEARCH:
      return { ...state, salaries: action.payload };
    case SALARY_SEARCH_BY_DEPARTMENT:
      return { ...state, salaries: action.payload };
      case EMPLOYEE_SEARCH:
      return { ...state, employees: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
