using CLMS_BackEnd.Services.Users.Dto;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Security.Cryptography;
using System.Text;
using Mailjet.Client;
using Newtonsoft.Json.Linq;
using Azure.Core;

namespace CLMS_BackEnd.Services.EmailServices
{
    public class EmailServices : IEmailServices
    {

        private readonly string apiKey = "5RSP3XFPD4ACN6A7AUA5BMRS";
        public async Task<bool> SendEmailAsync(string key, List<UserList> users)
        {
            //var apiKey = Environment.GetEnvironmentVariable(key);
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("clinarfaraz@gmail.com", "CLMS"),
                Subject = "Key for CLMS Product",
                PlainTextContent = key
            };
            foreach (var item in users)
            {
                msg.AddTo(new EmailAddress(item.Email, item.Name));
            }

            var response = await client.SendEmailAsync(msg);
            if (response != null) return true;
            return false;
        }

        public string GenerateRandomKey(int length)
        {
            try
            {
                using (var rng = new RNGCryptoServiceProvider())
                {
                    byte[] data = new byte[length];
                    rng.GetBytes(data);
                    StringBuilder result = new StringBuilder(length * 2);
                    foreach (byte b in data)
                    {
                        result.Append(b.ToString("x2"));
                    }
                    return result.ToString();
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

    }


}
