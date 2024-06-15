using CLMS_BackEnd.Models;

namespace CLMS_BackEnd.Repositories.User_R
{
    public interface IUserRepository
    {
        Task<List<ApplicationUser>> GetAll();
    }
}
