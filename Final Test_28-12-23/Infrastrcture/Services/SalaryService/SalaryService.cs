using Domain.Models;
using Domain.ViewModels;
using Infrastrcture.Database;
using Infrastrcture.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastrcture.Services.SalaryService
{
    public class SalaryService : ISalaryService
    {
        private readonly IRepository<Salary> _salaryRepository;
        private readonly MainDbconetxt _context;

        public SalaryService(IRepository<Salary> salaryRepository, MainDbconetxt context)
        {
            _salaryRepository = salaryRepository;
            _context = context;
        }


        public async Task<IEnumerable<SalaryViewModel>> GetAllSalaries()
        {
            ICollection<Salary> salaries = await _salaryRepository.FindAll(
                match: s => true,
                includes: s => s.Employee
            );

            return salaries.Select(s => new SalaryViewModel
            {
                Id = s.Id,
                EmpId = s.EmpId,
                Amount = s.Amount,
                Date = s.Date,
                Employee = new Employee
                {
                    Id = s.Employee.Id,
                    Name = s.Employee.Name,
                    Email = s.Employee.Email,
                    Phone = s.Employee.Phone,
                    Gender = s.Employee.Gender,
                    DOB = s.Employee.DOB,
                }
            });
        }

        public async Task<SalaryViewModel> GetSalaryById(int id)
        {
            Salary? salary = await _salaryRepository.GetByIdAsync(id);
            return new SalaryViewModel
            {
                Id = salary?.Id ?? 0,
                EmpId = salary?.EmpId ?? 0,
                Amount = salary?.Amount ?? 0,
                Date = salary?.Date ?? default,
                Employee = salary?.Employee
            };
        }

        public async Task AddSalary(SalaryInsertModel salaryModel)
        {
            Salary salary = new()
            {
                Id = salaryModel.Id,
                EmpId = salaryModel.EmpId,
                Amount = salaryModel.Amount,
                Date = salaryModel.Date,

            };

            await _salaryRepository.AddAsync(salary);
        }

        public async Task UpdateSalary(SalaryInsertModel salaryModel)
        {
            Salary salary = await _salaryRepository.GetByIdAsync(salaryModel.Id);

            if (salary != null)
            {
                salary.EmpId = salaryModel.EmpId;
                salary.Amount = salaryModel.Amount;
                salary.Date = salaryModel.Date;


                await _salaryRepository.UpdateAsync(salary);
            }
        }

        public async Task DeleteSalary(int id)
        {
            await _salaryRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<SalaryViewModel>> GetSalariesInSalaryRange(int minSalary, int maxSalary)
        {
            ICollection<Salary> salaries = await _salaryRepository.FindAll(s => s.Amount >= minSalary && s.Amount <= maxSalary);

            return salaries.Select(s => new SalaryViewModel
            {
                Id = s.Id,
                EmpId = s.EmpId,
                Amount = s.Amount,
                Date = s.Date
            });
        }



        public async Task<IEnumerable<DepartmentMonthlySalaryViewModel>> GetDepartmentWiseMonthlySalary(int year)
        {
            List<DepartmentMonthlySalaryViewModel> departmentMonthlySalaries = await _context.Departments
                .Include(d => d.Employees)
                .ThenInclude(e => e.Salaries)
                .Select(department => new DepartmentMonthlySalaryViewModel
                {
                    DepartmentId = department.Id,
                    DepartmentName = department.Name,
                    MonthlySalaries = department.Employees
                        .SelectMany(e => e.Salaries.Where(s => s.Date.Year == year)
                            .GroupBy(s => s.Date.Month)
                            .Select(group => new MonthlySalaryViewModel
                            {
                                Month = group.Key,
                                TotalSalary = group.Sum(s => s.Amount)
                            }))
                })
                .ToListAsync();

            return departmentMonthlySalaries;
        }
    }
}


