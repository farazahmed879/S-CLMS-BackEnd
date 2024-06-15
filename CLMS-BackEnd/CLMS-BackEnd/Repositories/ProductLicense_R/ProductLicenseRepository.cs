using CLMS_BackEnd.Models;
using CLMS_BackEnd.Services.ProductLicenses.Dto;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace CLMS_BackEnd.Repositories.ProductLicense_R
{
    public class ProductLicenseRepository : IProductLicenseRepository
    {

        private ApplicationDbContext _dataContext;
        public ProductLicenseRepository(ApplicationDbContext dataContext)
        {
            this._dataContext = dataContext;
        }
        public async Task<bool> Delete(int Id)
        {
            var data = await GetById(Id);
            _dataContext.License.Remove(data);
            return true;
        }
        public async Task<ProductLicense> GetById(int Id)
        {
            var result = await _dataContext.License.SingleOrDefaultAsync(i => i.Id == Id);
            return result;
        }
        public async Task<List<ProductLicense>> GetProducts()
        {
            return await _dataContext.License.ToListAsync();
        }
        public async Task<bool> InsertProductLicense(ProductLicense product_)
        {
            var result = await _dataContext.License.AddAsync(product_);
            if (result != null)
                return true;
            else return false;
        }
        public void SaveChanges()
        {
            _dataContext.SaveChanges();
        }
        public async Task<bool> UpdateProductLicense(ProductLicense product_)
        {
            var result1 = _dataContext.License.Update(product_);
            if (result1 != null)
                return true;
            else return false;
        }


    }
}
