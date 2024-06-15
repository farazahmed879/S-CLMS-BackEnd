using CLMS_BackEnd.Services.Users.Dto;

namespace CLMS_BackEnd.Services.Users
{
    public interface IUserServices
    {
        Task<List<UserList>> GetAll();
    }
}
