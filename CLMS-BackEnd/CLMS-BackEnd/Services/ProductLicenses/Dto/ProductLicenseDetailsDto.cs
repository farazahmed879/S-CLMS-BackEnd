
namespace CLMS_BackEnd.Services.ProductLicenses.Dto
{
    public class ProductLicenseDetailsDto
    {
        public int? Id { get; set; }
        public string? Key { get; set; }
        public bool? IsActivated { get; set; }
        public int ProductId { get; set; }
        public string? UserId { get; set; }
    }
}
