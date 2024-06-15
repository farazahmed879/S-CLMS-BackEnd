using CLMS_BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace CLMS_BackEnd.Repositories.User_R
{
    public class UserRepository : IUserRepository
    {
        private ApplicationDbContext _dataContext;
        public UserRepository(ApplicationDbContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public async Task<List<ApplicationUser>> GetAll()
        {
            try
            {
                var result = await _dataContext.Users.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
