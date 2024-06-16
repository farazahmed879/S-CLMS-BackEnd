using CLMS_BackEnd.Services.Products;
using CLMS_BackEnd.Services.Products.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CLMS_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService producService)
        {
            _productService = producService;
        }


        [HttpGet]
        public async Task<List<ProductList>> GetAll(string? userId)
        {
            try
            {
                var results = await _productService.GetAll(userId);
                return results;
            }
            catch (Exception ex) { throw; }

        }


        [HttpGet("{id}")]
        public async Task<ProductDetails> Get(int id)
        {
            try
            {
                var results = await _productService.Get(id);
                return results;
            }
            catch (Exception ex) { throw; }

        }

        [HttpPost]
        public async Task<ResponseMessageDto> Create(CreateOrUpdateProductDto model)
        {
            try
            {
                return await _productService.CreateOrEditAsync(model);

            }
            catch (Exception ex) { throw; }

        }



    }
}
