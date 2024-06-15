
namespace CLMS_BackEnd.Services.ProductLicenses.Dto
{
    public class ProductLicenseListDto
    {
        public int? Id { get; set; }
        public string? Key { get; set; }
        public bool? IsActivated { get; set; }
        public int ProductId { get; set; }
        public string? UserId { get; set; }
        public string? ProductName { get; set; }    
        public string? Email { get; set; }    
    }
}
