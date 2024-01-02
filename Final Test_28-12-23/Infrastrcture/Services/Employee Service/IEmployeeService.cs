using Domain.ViewModels;

namespace Infrastrcture.Services.Employee_Service
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeViewModels>> GetAllEmployees();
        Task<EmployeeViewModels> GetEmployeeById(int id);
        Task AddEmployee(EmployeeInsertModels employeeModel);
        Task UpdateEmployee(EmployeeInsertModels employeeModel);
        Task DeleteEmployee(int id);

        Task<IEnumerable<EmployeeViewModels>> SearchEmployeesByNameAsync(string name);

    }

}
