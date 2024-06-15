using CLMS_BackEnd.Models;
using CLMS_BackEnd.Repositories.ProductLicense_R;
using CLMS_BackEnd.Services.ProductLicenses.Dto;
namespace CLMS_BackEnd.Services.ProductLicenses
{
    public class ProductLicenseService : IProductLicenseService
    {
        private readonly IProductLicenseRepository _productLicenseRepository;

        public ProductLicenseService(
          IProductLicenseRepository productLicenseRepository
          )
        {
            _productLicenseRepository = productLicenseRepository;
        }



        public async Task<List<ProductLicenseListDto>> GetAll(int? productId)
        {
            var products = await _productLicenseRepository.GetProducts();

            return products
                .Where(i=> !productId.HasValue || i.ProductId == productId)
                .Select(x => new ProductLicenseListDto
                {
                    Id = x.Id,
                    ProductName = x.Product.Name,
                    Email = x.User.Email,
                    Key = x.Key
                })
                .ToList();

        }

        public async Task<ProductLicenseDetailsDto> Get(int id)
        {
            try
            {
                var result = await _productLicenseRepository.GetById(id);
                var productDetails = new ProductLicenseDetailsDto
                {
                    Id = result.Id,
                    Key = result.Key,
                    UserId = result.UserId,
                    ProductId = result.ProductId
                };
                return productDetails;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<ResponseMessageDto> CreateOrEditAsync(CreateOrUpdateProductLicenseDto model)
        {
            ResponseMessageDto result;
            if (model.Id.HasValue)
            {
                result = await UpdateAsync(model);

            }
            else
            {
                result = await CreateAsync(model);
            }
            return result;
        }


        private async Task<ResponseMessageDto> CreateAsync(CreateOrUpdateProductLicenseDto model)
        {

            var data = new ProductLicense
            {
                Key = model.Key,
                ProductId = model.ProductId,
                UserId = model.UserId,
                IsActivated = model.IsActivated
            };

            //var data = new Product(model);
            var result = await _productLicenseRepository.InsertProductLicense(data);
            _productLicenseRepository.SaveChanges();


            if (result)
            {
                return new ResponseMessageDto
                {
                    Id = 1,
                    SuccessMessage = AppConsts.SuccessfullyInserted,
                    Success = true,
                    Error = false,
                };
            }
            return new ResponseMessageDto
            {
                Id = 0,
                ErrorMessage = AppConsts.InsertFailure,
                Success = false,
                Error = true,
            };

        }

        private async Task<ResponseMessageDto> UpdateAsync(CreateOrUpdateProductLicenseDto model)
        {
            var data = new ProductLicense
            {
                Id = model.Id.Value,
                Key = model.Key,
                UserId = model.UserId,
                ProductId = model.ProductId,
            };

            var result = await _productLicenseRepository.UpdateProductLicense(data);
            _productLicenseRepository.SaveChanges();


            if (result)
            {
                return new ResponseMessageDto()
                {
                    Id = 1,
                    SuccessMessage = AppConsts.SuccessfullyUpdated,
                    Success = true,
                    Error = false,
                };
            }
            return new ResponseMessageDto()
            {
                Id = 0,
                ErrorMessage = AppConsts.UpdateFailure,
                Success = false,
                Error = true,
            };
        }

    }
}
