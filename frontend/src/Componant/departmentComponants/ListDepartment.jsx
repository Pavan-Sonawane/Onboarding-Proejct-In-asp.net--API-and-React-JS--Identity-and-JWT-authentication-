
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, updateDepartment, deleteDepartment } from '../../action/DepartmentAction';
import AddDepartment from './AddDepartmant';
import UpdateDepartment from './UpdateDepartment';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
const ListDepartment = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isAddEmployeeVisible, setAddEmployeeVisible] = useState(false);
  const handleToggleAddEmployee = () => {
    setAddEmployeeVisible((prevVisible) => !prevVisible);
  };
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleUpdateClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteDepartment(id));
  };

  const handleUpdateDepartment = (updatedDepartment) => {
    if (selectedDepartment) {
      dispatch(updateDepartment(selectedDepartment.id, updatedDepartment));
      setSelectedDepartment(null);
    }
  };

  return (
    <div>
    <Button variant="contained" color="primary" onClick={handleToggleAddEmployee}>
        {isAddEmployeeVisible ? 'Close' : 'Insert Department'}
      </Button>

      {isAddEmployeeVisible && <AddDepartment />}
    <h2>Department List</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: '#818181', color: 'white' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateClick(department)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteClick(department.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {selectedDepartment && (
      <UpdateDepartment
        department={selectedDepartment}
        onUpdateDepartment={handleUpdateDepartment}
        onCancel={() => setSelectedDepartment(null)}
      />
    )}
  </div>
  );
};

export default ListDepartment;
