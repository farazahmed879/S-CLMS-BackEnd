using CLMS_BackEnd.Services.ProductLicenses.Dto;
using CLMS_BackEnd.Services.Products.Dto;

namespace CLMS_BackEnd.Services.ProductLicenses
{
    public interface IProductLicenseService
    {
        Task<List<ProductLicenseListDto>> GetAll(int? productId);

        Task<ResponseMessageDto> CreateOrEditAsync(CreateOrUpdateProductLicenseDto model);

        Task<ProductLicenseDetailsDto> Get(int id);
    }
}
