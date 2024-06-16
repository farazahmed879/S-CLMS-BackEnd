using CLMS_BackEnd.Services.Users.Dto;

namespace CLMS_BackEnd.Services.EmailServices
{
    public interface IEmailServices
    {
        Task<bool> SendEmailAsync(string key, List<UserList> users);

        string GenerateRandomKey(int length);

    }
}
