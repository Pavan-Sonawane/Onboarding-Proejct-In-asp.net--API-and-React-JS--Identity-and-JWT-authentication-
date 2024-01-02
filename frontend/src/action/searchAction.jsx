
import { SALARY_RANGE_SEARCH} from '../action/actionTypes';
import api from '../services/api';


export const searchSalariesByRange = (minSalary, maxSalary) => async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token is not available');
        return;
      }
  
      const response = await api.get(`Salary/salary-range?minSalary=${minSalary}&maxSalary=${maxSalary}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const payload = response.data.map((salary) => ({
        id: salary.id,
        empId: salary.empId,
        amount: salary.amount,
        date: salary.date,
      }));
  
      dispatch({
        type: SALARY_RANGE_SEARCH,
        payload,
      });
    } catch (error) {
      console.error("Error searching salaries by range:", error);
    }
  };