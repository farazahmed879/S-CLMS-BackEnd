using CLMS_BackEnd.Services.ProductLicenses;
using CLMS_BackEnd.Services.ProductLicenses.Dto;
using CLMS_BackEnd.Services.Products;
using CLMS_BackEnd.Services.Products.Dto;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CLMS_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductLicenseController : ControllerBase
    {
        private readonly IProductLicenseService _productLicenseService;

        public ProductLicenseController(IProductLicenseService productLicenseService)
        {
            _productLicenseService = productLicenseService;
        }
        // GET: api/<ProductLicenseController>
        [HttpGet]
        public async Task<List<ProductLicenseListDto>> Get(int? productId)
        {
            try
            {
                var results = await _productLicenseService.GetAll(productId);
                return results;
            }
            catch (Exception ex) { throw; }
        }

        // GET api/<ProductLicenseController>/5
        [HttpGet("{id}")]
        public async Task<ProductLicenseDetailsDto> Get(int id)
        {
            try
            {
                var results = await _productLicenseService.Get(id);
                return results;
            }
            catch (Exception ex) { throw; }
        }

        // POST api/<ProductLicenseController>
        [HttpPost]
        public async Task<ResponseMessageDto> Create(CreateOrUpdateProductLicenseDto model)
        {
            try
            {
                return await _productLicenseService.CreateOrEditAsync(model);

            }
            catch (Exception ex) { throw; }

        }

        // DELETE api/<ProductLicenseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
