using CLMS_BackEnd.Models;
using System.ComponentModel;

namespace CLMS_BackEnd.Repositories.ProductLicense_R
{
    public interface IProductLicenseRepository
    {
        Task<bool> Delete(int Id);

        Task<ProductLicense> GetById(int Id);

        Task<List<ProductLicense>> GetProducts();

        Task<bool> InsertProductLicense(ProductLicense product_);

        Task<bool> UpdateProductLicense(ProductLicense product_);

        void SaveChanges();
    }
}
