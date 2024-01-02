import * as actionTypes from './actionTypes';
import api from '../services/api';


export const fetchDepartments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.get('Department', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("Fetch Department", response);
    dispatch({ type: actionTypes.FETCH_DEPARTMENT, payload: response.data });
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};

export const addDepartment = (department) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.post('Department', department, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.ADD_DEPARTMENT, payload: response.data });
  } catch (error) {
    console.error("Error adding department:", error);
  }
};
export const updateDepartment = (Id, department) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await api.put(`Department/${Id}`, department, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.UPDATE_DEPARTMENT, payload: response.data });
  } catch (error) {
    console.error("Error updating department:", error);
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is not available');
      return;
    }

    await api.delete(`Department/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: actionTypes.DELETE_DEPARTMENT, payload: id });
  } catch (error) {
    console.error("Error deleting department:", error);
  }
};