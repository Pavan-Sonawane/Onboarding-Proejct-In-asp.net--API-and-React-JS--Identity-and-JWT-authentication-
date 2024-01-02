using Domain.ViewModels;
using Infrastrcture.Services.SalaryService;
using Microsoft.AspNetCore.Mvc;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSalaries()
        {
            IEnumerable<SalaryViewModel> salaries = await _salaryService.GetAllSalaries();
            return Ok(salaries);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSalaryById(int id)
        {
            SalaryViewModel salary = await _salaryService.GetSalaryById(id);

            return salary == null ? NotFound() : Ok(salary);
        }

        [HttpPost]
        public async Task<IActionResult> AddSalary([FromBody] SalaryInsertModel salaryModel)
        {
            await _salaryService.AddSalary(salaryModel);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalary(int id, [FromBody] SalaryInsertModel salaryModel)
        {
            await _salaryService.UpdateSalary(salaryModel);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalary(int id)
        {
            await _salaryService.DeleteSalary(id);
            return Ok();
        }

        [HttpGet("salary-range")]
        public async Task<IActionResult> GetSalariesInSalaryRange([FromQuery] int minSalary, [FromQuery] int maxSalary)
        {
            IEnumerable<SalaryViewModel> salaries = await _salaryService.GetSalariesInSalaryRange(minSalary, maxSalary);
            return Ok(salaries);
        }
        [HttpGet("department-salary")]
        public async Task<IActionResult> GetDepartmentWiseMonthlySalary([FromQuery] int year)
        {
            IEnumerable<DepartmentMonthlySalaryViewModel> departmentMonthlySalaries = await _salaryService.GetDepartmentWiseMonthlySalary(year);

            if (departmentMonthlySalaries == null || !departmentMonthlySalaries.Any())
            {
                return NotFound();
            }

            var flatMonthlySalaries = departmentMonthlySalaries
                .SelectMany(department => department.MonthlySalaries
                    .Select(salary => new
                    {
                        department.DepartmentId,
                        department.DepartmentName,
                        salary.Month,
                        salary.TotalSalary
                    }));

            return Ok(flatMonthlySalaries);
        }


    }
}

