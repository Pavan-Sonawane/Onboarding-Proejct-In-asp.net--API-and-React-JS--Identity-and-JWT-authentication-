using Domain.Models;

namespace Domain.ViewModels
{
    public class EmployeeViewModels
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public int DeptId { get; set; }
        public Salary Salary { get; set; }
        public Department Department { get; set; }
        public ICollection<Salary> Salaries { get; set; }

    }
    public class EmployeeInsertModels
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public int DeptId { get; set; }
    }
    public class LoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }


}
