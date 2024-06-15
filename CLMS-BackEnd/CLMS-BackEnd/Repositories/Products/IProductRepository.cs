using CLMS_BackEnd.Models;

namespace CLMS_BackEnd.Repositories.Products
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProducts();
        Task<Product> GetProductById(int ProductId);
        Task<bool> InsertProduct(Product product_);
        Task<bool> UpdateProduct(Product product_);
        void DeleteProduct(int ProductId);
        void SaveChanges();
    }
}
