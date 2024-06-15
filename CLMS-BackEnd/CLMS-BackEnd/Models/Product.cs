using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace CLMS_BackEnd.Models
{
    public class Product
    {
        public Product()
        {
            License = new List<ProductLicense>();
        }
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Version is required")]
        public string Version { get; set; }
        public string Description { get; set; }

        public List<ProductLicense> License { get; set; }
    }
}
