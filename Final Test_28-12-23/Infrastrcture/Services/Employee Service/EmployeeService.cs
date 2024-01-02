using Domain.Models;
using Domain.ViewModels;
using Infrastrcture.Database;
using Infrastrcture.Repository;

namespace Infrastrcture.Services.Employee_Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _employeeRepository;
        private readonly MainDbconetxt _context;

        public EmployeeService(IRepository<Employee> employeeRepository, MainDbconetxt dbconetxt)
        {
            _employeeRepository = employeeRepository;
            _context = dbconetxt;
        }

        public async Task<IEnumerable<EmployeeViewModels>> GetAllEmployees()
        {
            IEnumerable<Employee> employees = await _employeeRepository.GetAllAsync();
            return employees.Select(e => new EmployeeViewModels
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Phone = e.Phone,
                Gender = e.Gender,
                DOB = e.DOB,
                DeptId = e.DeptId,
                Department = e.Department
            });
        }

        public async Task<EmployeeViewModels> GetEmployeeById(int id)
        {
            Employee? employee = await _employeeRepository.GetByIdAsync(id);
            return new EmployeeViewModels
            {
                Id = employee?.Id ?? 0,
                Name = employee?.Name,
                Email = employee?.Email,
                Phone = employee?.Phone,
                Gender = employee?.Gender,
                DOB = employee?.DOB ?? default,
                DeptId = employee?.DeptId ?? 0,
                Department = employee?.Department
            };
        }

        public async Task AddEmployee(EmployeeInsertModels employeeModel)
        {
            Employee employee = new()
            {
                Id = employeeModel.Id,
                Name = employeeModel.Name,
                Email = employeeModel.Email,
                Phone = employeeModel.Phone,
                Gender = employeeModel.Gender,
                DOB = employeeModel.DOB,
                DeptId = employeeModel.DeptId,
            };

            await _employeeRepository.AddAsync(employee);
        }

        public async Task UpdateEmployee(EmployeeInsertModels employeeModel)
        {
            Employee employee = await _employeeRepository.GetByIdAsync(employeeModel.Id);

            if (employee != null)
            {
                employee.Name = employeeModel.Name;
                employee.Email = employeeModel.Email;
                employee.Phone = employeeModel.Phone;
                employee.Gender = employeeModel.Gender;
                employee.DOB = employeeModel.DOB;
                employee.DeptId = employeeModel.DeptId;

                await _employeeRepository.UpdateAsync(employee);
            }
        }

        public async Task DeleteEmployee(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }
        public async Task<IEnumerable<EmployeeViewModels>> SearchEmployeesByNameAsync(string name)
        {
            ICollection<Employee> employees = await _employeeRepository.FindAll(
                e => e.Name.ToLower().Contains(name.ToLower()),
                e => e.Department
            );

            return employees.Select(e => new EmployeeViewModels
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Phone = e.Phone,
                Gender = e.Gender,
                DOB = e.DOB,
                DeptId = e.DeptId,
                Salary = e.Salaries?.FirstOrDefault(),
                Department = e.Department,
                Salaries = e.Salaries
            });
        }

    }
}

