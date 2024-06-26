﻿using CLMS_BackEnd.Models;
using CLMS_BackEnd.Repositories.ProductLicense_R;
using CLMS_BackEnd.Services.ProductLicenses.Dto;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.ComponentModel;
using CLMS_BackEnd.Services.Users.Dto;
using CLMS_BackEnd.Services.EmailServices;

namespace CLMS_BackEnd.Services.ProductLicenses
{
    public class ProductLicenseService : IProductLicenseService
    {
        private readonly IProductLicenseRepository _productLicenseRepository;
        private readonly IEmailServices _emailService;

        public ProductLicenseService(
          IProductLicenseRepository productLicenseRepository,
          IEmailServices emailService
          )
        {
            _productLicenseRepository = productLicenseRepository;
            _emailService = emailService;
        }



        public async Task<List<ProductLicenseListDto>> GetAll(int? productId)
        {
            var products = await _productLicenseRepository.GetProducts();

            return products
                .Where(i => !productId.HasValue || i.ProductId == productId)
                .Select(x => new ProductLicenseListDto
                {
                    Id = x.Id,
                    ProductName = x.Product.Name,
                    Email = x.User.Email,
                    Key = x.Key
                })
                .ToList();

        }

        public async Task<ProductLicenseDetailsDto> Get(int id)
        {
            try
            {
                var result = await _productLicenseRepository.GetById(id);
                var productDetails = new ProductLicenseDetailsDto
                {
                    Id = result.Id,
                    Key = result.Key,
                    UserId = result.UserId,
                    ProductId = result.ProductId
                };
                return productDetails;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<ResponseMessageDto> CreateOrEditAsync(CreateOrUpdateProductLicenseDto model)
        {
            ResponseMessageDto result;
            if (model.Id.HasValue)
            {
                result = await UpdateAsync(model);

            }
            else
            {
                result = await CreateAsync(model);
            }
            return result;
        }


        private async Task<ResponseMessageDto> CreateAsync(CreateOrUpdateProductLicenseDto model)
        {

            var data = new ProductLicense
            {
                Key = model.Key,
                ProductId = model.ProductId,
                UserId = model.UserId,
                IsActivated = model.IsActivated
            };

            //var data = new Product(model);
            var result = await _productLicenseRepository.InsertProductLicense(data);
            _productLicenseRepository.SaveChanges();


            if (result)
            {
                return new ResponseMessageDto
                {
                    Id = 1,
                    SuccessMessage = AppConsts.SuccessfullyInserted,
                    Success = true,
                    Error = false,
                };
            }
            return new ResponseMessageDto
            {
                Id = 0,
                ErrorMessage = AppConsts.InsertFailure,
                Success = false,
                Error = true,
            };

        }

        private async Task<ResponseMessageDto> UpdateAsync(CreateOrUpdateProductLicenseDto model)
        {

            var data = new ProductLicense
            {
                Id = model.Id.Value,
                Key = model.Key,
                UserId = model.UserId,
                ProductId = model.ProductId,
                IsActivated = false
            };

            var result = await _productLicenseRepository.UpdateProductLicense(data);
            _productLicenseRepository.SaveChanges();


            if (result)
            {
                return new ResponseMessageDto()
                {
                    Id = 1,
                    SuccessMessage = AppConsts.SuccessfullyUpdated,
                    Success = true,
                    Error = false,
                };
            }
            return new ResponseMessageDto()
            {
                Id = 0,
                ErrorMessage = AppConsts.UpdateFailure,
                Success = false,
                Error = true,
            };
        }


        public async Task<ResponseMessageDto> ActivateProduct(CreateOrUpdateProductLicenseDto model)
        {
            try
            {
                var license = await _productLicenseRepository.GetByProductAndUser(model.ProductId, model.UserId);

                if (model.Key != license.Key)
                    throw new ArgumentException("Invalid Key");

                license.IsActivated = true;

                var result = await _productLicenseRepository.UpdateProductLicense(license);
                _productLicenseRepository.SaveChanges();

                if (result)
                {
                    return new ResponseMessageDto()
                    {
                        Id = 1,
                        SuccessMessage = AppConsts.SuccessfullyUpdated,
                        Success = true,
                        Error = false,
                    };
                }
                return new ResponseMessageDto()
                {
                    Id = 0,
                    ErrorMessage = AppConsts.UpdateFailure,
                    Success = false,
                    Error = true,
                };

            }
            catch (Exception)
            {
                throw;
            }

        }


        public async Task<ResponseMessageDto> SendEmaisWithProductKey(SendEmaisWithProductKeyDto model)
        {
            try
            {
                var productLicenses = new List<ProductLicense>();
                foreach (var item in model.Users)
                {
                    var productLicense = new ProductLicense
                    {
                        ProductId = model.ProductId,
                        Key = item.Id,
                        UserId = item.Id,
                        IsActivated = false
                    };
                    productLicenses.Add(productLicense);
                }
                var result = await _productLicenseRepository.InsertRangeProductLicense(productLicenses);

                var key = _emailService.GenerateRandomKey(12);
                await _emailService.SendEmailAsync(key, model.Users);
                if (result)
                {
                    return new ResponseMessageDto()
                    {
                        Id = 1,
                        SuccessMessage = AppConsts.SuccessfullyUpdated,
                        Success = true,
                        Error = false,
                    };
                }
                return new ResponseMessageDto()
                {
                    Id = 0,
                    ErrorMessage = AppConsts.UpdateFailure,
                    Success = false,
                    Error = true,
                };

            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
