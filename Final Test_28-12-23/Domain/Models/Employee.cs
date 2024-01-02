using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "DOB is required")]
        public DateTime DOB { get; set; }
        public int DeptId { get; set; }

        public ICollection<Salary> Salaries { get; set; }
        [JsonIgnore]
        public Department Department { get; set; }
    }
}
