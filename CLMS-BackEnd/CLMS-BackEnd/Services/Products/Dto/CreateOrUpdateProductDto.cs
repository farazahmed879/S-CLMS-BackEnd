namespace CLMS_BackEnd.Services.Products.Dto
{
    public class CreateOrUpdateProductDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
    }
}
