using CLMS_BackEnd.Repositories.User_R;
using CLMS_BackEnd.Services.Users.Dto;

namespace CLMS_BackEnd.Services.Users
{
    public class UserServices: IUserServices
    {
        private readonly IUserRepository _userRepository;
        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<UserList>> GetAll()
        {
            try
            {
                var results = await _userRepository.GetAll();

                return results.Select(i=> new UserList
                {
                    Id = i.Id,
                    Email = i.Email,
                    Name = i.UserName,
                    Type = ""
                }).ToList();

            }
            catch(Exception ex) { throw;  }
        }
    }
}
