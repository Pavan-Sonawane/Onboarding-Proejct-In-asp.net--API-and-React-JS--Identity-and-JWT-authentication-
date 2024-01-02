import * as actionTypes from './actionTypes';
import api from '../services/api';


export const fetchEmployees = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.get('Employee', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("Fetch Employees", response);

    const employees = response.data;

    dispatch({ type: actionTypes.FETCH_EMPLOYEE, payload: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};


export const addEmployee = (employee) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.post('Employee', employee, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.ADD_EMPLOYEE, payload: response.data });
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};
export const updateEmployee = (employeeId, employee) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.put(`Employee/${employeeId}`, employee, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.UPDATE_EMPLOYEE, payload: response.data });
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    await api.delete(`Employee/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.DELETE_EMPLOYEE, payload: id });
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};


export const addRegistration = (employee) => async (dispatch) => {
  try {
    const response = await api.post('Auth/Register', employee);
    dispatch({ type: actionTypes.ADD_REGISTRATION, payload: response.data });
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};
