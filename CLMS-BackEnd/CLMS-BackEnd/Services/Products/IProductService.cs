using CLMS_BackEnd.Services.Products.Dto;

namespace CLMS_BackEnd.Services.Products
{
    public interface IProductService
    {
        Task<List<ProductList>> GetAll(string? userId)

        Task<ResponseMessageDto> CreateOrEditAsync(CreateOrUpdateProductDto model);

        Task<ProductDetails> Get(int id);

    }
}
