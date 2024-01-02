using Domain.Models;
using Domain.ViewModels;
using Infrastrcture.Repository;

namespace Infrastrcture.Services.DepartmentService
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IRepository<Department> _repository;

        public DepartmentService(IRepository<Department> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<DepartmentViewModel>> GetAllDepartments()
        {
            IEnumerable<Department> departments = await _repository.GetAllAsync();
            return departments.Select(department => new DepartmentViewModel
            {
                Id = department.Id,
                Name = department.Name,
                Employees = department.Employees
            });
        }

        public async Task<DepartmentViewModel> GetDepartmentById(int id)
        {
            Department department = await _repository.GetByIdAsync(id);
            return new DepartmentViewModel
            {
                Id = department.Id,
                Name = department.Name,
                Employees = department.Employees
            };
        }

        public async Task AddDepartment(DepartmentInsertModel departmentModel)
        {
            Department department = new()
            {
                Name = departmentModel.Name
            };
            await _repository.AddAsync(department);
        }

        public async Task UpdateDepartment(int id, DepartmentUpdateModel departmentModel)
        {
            Department department = await _repository.GetByIdAsync(id);

            if (department != null)
            {
                department.Name = departmentModel.Name;
                await _repository.UpdateAsync(department);
            }
        }

        public async Task DeleteDepartment(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
