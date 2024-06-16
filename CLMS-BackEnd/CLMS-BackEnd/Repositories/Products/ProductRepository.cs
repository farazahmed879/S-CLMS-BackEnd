using CLMS_BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace CLMS_BackEnd.Repositories.Products
{
    public class ProductRepository : IProductRepository
    {
        private ApplicationDbContext _dataContext;
        public ProductRepository(ApplicationDbContext dataContext)
        {
            this._dataContext = dataContext;
        }
        public void DeleteProduct(int ProductId)
        {
            Product product_ = _dataContext.Products.Find(ProductId);
            _dataContext.Products.Remove(product_);
        }
        public async Task<Product> GetProductById(int ProductId)
        {
            return await _dataContext.Products.SingleOrDefaultAsync(i => i.Id == ProductId);
        }
        public async Task<List<Product>> GetProducts()
        {
            return await _dataContext.Products.Include(i=> i.License).ToListAsync();
        }
        public async Task<bool> InsertProduct(Product product_)
        {
            var result = await _dataContext.Products.AddAsync(product_);
            if (result != null)
                return true;
            else return false;
        }
        public void SaveChanges()
        {
            _dataContext.SaveChanges();
        }
        public async Task<bool> UpdateProduct(Product product_)
        {
            var result1 = _dataContext.Products.Update(product_);
            if (result1 != null)
                return true;
            else return false;
        }
    }
}
