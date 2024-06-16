using CLMS_BackEnd.Services.Products;
using CLMS_BackEnd.Services.Users;
using CLMS_BackEnd.Services.Users.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CLMS_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userService;
        public UserController(IUserServices userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<List<UserList>> GetAllUser()
        {
            try
            {
                return await _userService.GetAll();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
