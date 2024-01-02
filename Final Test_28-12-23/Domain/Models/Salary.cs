using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Salary
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "EmpId is required")]
        public int EmpId { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        public int Amount { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }

        public Employee Employee { get; set; }
    }
}
