using Domain.ViewModels;
using Infrastrcture.Services.Employee_Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {

        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            IEnumerable<EmployeeViewModels> employees = await _employeeService.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            EmployeeViewModels employee = await _employeeService.GetEmployeeById(id);

            return employee == null ? NotFound() : Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeInsertModels employeeModel)
        {
            await _employeeService.AddEmployee(employeeModel);
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeeInsertModels employeeModel)
        {
            await _employeeService.UpdateEmployee(employeeModel);
            return Ok();
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchEmployeesByName([FromQuery] string employeeName)
        {
            try
            {
                IEnumerable<EmployeeViewModels> employees = await _employeeService.SearchEmployeesByNameAsync(employeeName);
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _employeeService.DeleteEmployee(id);
            return Ok();
        }
    }
}


