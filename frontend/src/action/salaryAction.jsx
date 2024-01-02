import * as actionTypes from './actionTypes';
import api from '../services/api';

export const fetchSalaries = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.get('Salary', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("Fetch Salaries", response);

    dispatch({ type: actionTypes.FETCH_SALARY, payload: response.data });
  } catch (error) {
    console.error("Error fetching salaries:", error);
  }
};

export const addSalary = (salary) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.post('Salary', salary, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.ADD_SALARY, payload: response.data });
  } catch (error) {
    console.error("Error adding salary:", error);
  }
};

export const updateSalary = (salaryId, salary) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case when the token is not available
      console.error('Token is not available');
      return;
    }

    const response = await api.put(`Salary/${salaryId}`, salary, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.UPDATE_SALARY, payload: response.data });
  } catch (error) {
    console.error("Error updating salary:", error);
  }
};

export const deleteSalary = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case when the token is not available
      console.error('Token is not available');
      return;
    }

    await api.delete(`Salary/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.DELETE_SALARY, payload: id });
  } catch (error) {
    console.error("Error deleting salary:", error);
  }
};