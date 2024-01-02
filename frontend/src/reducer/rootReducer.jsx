import { combineReducers } from 'redux';
import departmentReducer from './departmentReducer';
import employeeReducer from './employeeReducer';
import salaryReducer from './salaryReducer';
import searchReducer from './searchReducer';
const rootReducer = combineReducers({
  departments: departmentReducer,
  employees: employeeReducer,
  salaries: salaryReducer,
  search: searchReducer,
});

export default rootReducer;
