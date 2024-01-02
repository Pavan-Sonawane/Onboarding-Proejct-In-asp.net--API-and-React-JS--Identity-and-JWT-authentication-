using Domain.ViewModels;

namespace Infrastrcture.Services.SalaryService
{
    public interface ISalaryService
    {
        Task<IEnumerable<SalaryViewModel>> GetAllSalaries();
        Task<SalaryViewModel> GetSalaryById(int id);
        Task AddSalary(SalaryInsertModel salaryModel);
        Task UpdateSalary(SalaryInsertModel salaryModel);
        Task DeleteSalary(int id);
        Task<IEnumerable<SalaryViewModel>> GetSalariesInSalaryRange(int minSalary, int maxSalary);
        Task<IEnumerable<DepartmentMonthlySalaryViewModel>> GetDepartmentWiseMonthlySalary(int year);
 
    }
}
