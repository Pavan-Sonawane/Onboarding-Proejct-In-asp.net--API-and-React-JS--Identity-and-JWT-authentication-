using Domain.ViewModels;
using Infrastrcture.Services.DepartmentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]

        public async Task<IEnumerable<DepartmentViewModel>> GetAllDepartments()
        {
            return await _departmentService.GetAllDepartments();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            DepartmentViewModel department = await _departmentService.GetDepartmentById(id);

            return department == null ? NotFound() : Ok(department);
        }

        [HttpPost]
        public async Task<IActionResult> AddDepartment([FromBody] DepartmentInsertModel departmentModel)
        {
            await _departmentService.AddDepartment(departmentModel);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] DepartmentUpdateModel departmentModel)
        {


            await _departmentService.UpdateDepartment(id, departmentModel);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            await _departmentService.DeleteDepartment(id);
            return Ok();
        }
    }
}