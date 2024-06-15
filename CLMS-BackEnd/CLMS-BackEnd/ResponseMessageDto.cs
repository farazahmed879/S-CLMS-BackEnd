namespace CLMS_BackEnd
{
    public class ResponseMessageDto
    {
        public int Id { get; set; }
        public string SuccessMessage { get; set; }
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public bool Error { get; set; }
        public Object result { get; set; }
        public List<Object> array { get; set; }
    }
}
