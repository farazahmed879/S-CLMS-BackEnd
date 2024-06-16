using CLMS_BackEnd.Services.Users.Dto;

namespace CLMS_BackEnd.Services.ProductLicenses.Dto
{
    public class SendEmaisWithProductKeyDto
    {
        public int ProductId { get; set; }
        public List<UserList>? Users { get; set; }
    }
}
