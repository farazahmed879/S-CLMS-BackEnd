using CLMS_BackEnd.Models;
using CLMS_BackEnd.Repositories.Products;
using CLMS_BackEnd.Services.Products.Dto;
using System.Text.RegularExpressions;

namespace CLMS_BackEnd.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(
          IProductRepository productRepository
          )
        {
            _productRepository = productRepository;
        }



        public async Task<List<ProductList>> GetAll(string? userId)
        {
            var products = await _productRepository.GetProducts();

            return products
                .Select(x => new ProductList
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Version = x.Description,
                    IsActivated = userId != null ? x.License
                    .Where(i => i.ProductId == x.Id && i.UserId == userId).Select(y => y.IsActivated).FirstOrDefault() : false
                })
                .ToList();

        }

        public async Task<ProductDetails> Get(int id)
        {
            try
            {
                var result = await _productRepository.GetProductById(id);
                var productDetails = new ProductDetails
                {
                    Id = result.Id,
                    Name = result.Name,
                    Version = result.Version,
                    Description = result.Description
                };
                return productDetails;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<ResponseMessageDto> CreateOrEditAsync(CreateOrUpdateProductDto model)
        {
            ResponseMessageDto result;
            if (model.Id.HasValue)
            {
                result = await UpdateMatchAsync(model);

            }
            else
            {
                result = await CreateMatchAsync(model);
            }
            return result;
        }


        private async Task<ResponseMessageDto> CreateMatchAsync(CreateOrUpdateProductDto model)
        {

            var data = new Product
            {
                Name = model.Name,
                Description = model.Description,
                Version = model.Version,
            };

            //var data = new Product(model);
            var result = await _productRepository.InsertProduct(data);
            _productRepository.SaveChanges();


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

        private async Task<ResponseMessageDto> UpdateMatchAsync(CreateOrUpdateProductDto model)
        {
            var data = new Product
            {
                Id = model.Id.Value,
                Name = model.Name,
                Description = model.Description,
                Version = model.Version,
            };

            var result = await _productRepository.UpdateProduct(data);
            _productRepository.SaveChanges();


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
