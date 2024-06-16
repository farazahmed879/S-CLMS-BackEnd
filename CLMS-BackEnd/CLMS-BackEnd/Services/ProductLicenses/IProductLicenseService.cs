using CLMS_BackEnd.Models;
using CLMS_BackEnd.Services.ProductLicenses.Dto;
using CLMS_BackEnd.Services.Products.Dto;

namespace CLMS_BackEnd.Services.ProductLicenses
{
    public interface IProductLicenseService
    {
        Task<List<ProductLicenseListDto>> GetAll(int? productId);

        Task<ResponseMessageDto> CreateOrEditAsync(CreateOrUpdateProductLicenseDto model);

        Task<ProductLicenseDetailsDto> Get(int id);

        Task<ResponseMessageDto> ActivateProduct(CreateOrUpdateProductLicenseDto model);

        Task<ResponseMessageDto> SendEmaisWithProductKey(SendEmaisWithProductKeyDto model);
    }
}
