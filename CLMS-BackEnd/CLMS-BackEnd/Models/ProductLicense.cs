using System.ComponentModel.DataAnnotations.Schema;

namespace CLMS_BackEnd.Models
{
    public class ProductLicense
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public bool? IsActivated { get; set; }
        public int ProductId { get; set; }
        public string? UserId { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}
