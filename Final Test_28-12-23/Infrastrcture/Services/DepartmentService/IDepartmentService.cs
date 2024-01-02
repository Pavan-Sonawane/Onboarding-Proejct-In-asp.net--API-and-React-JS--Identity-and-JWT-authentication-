using Domain.ViewModels;

namespace Infrastrcture.Services.DepartmentService
{
    public interface IDepartmentService
    {
        Task<IEnumerable<DepartmentViewModel>> GetAllDepartments();
        Task<DepartmentViewModel> GetDepartmentById(int id);
        Task AddDepartment(DepartmentInsertModel departmentModel);
        Task UpdateDepartment(int id, DepartmentUpdateModel departmentModel);
        Task DeleteDepartment(int id);
    }
}
