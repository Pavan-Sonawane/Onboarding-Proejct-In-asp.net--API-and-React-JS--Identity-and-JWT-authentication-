﻿using Domain.Models;

namespace WEBAPI.Services
{
    public interface IAuthService
    {
        string GenerateTokenString(LoginUser user);
      
        Task<bool> Login(LoginUser user);
        Task<bool> RegisterUser(LoginUser user);
    }
}
