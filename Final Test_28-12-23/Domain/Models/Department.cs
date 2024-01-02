using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Department
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }


        public ICollection<Employee> Employees { get; set; }
    }
}
