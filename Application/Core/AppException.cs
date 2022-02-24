namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details = "")
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        private int StatusCode { set; get; }
        private string Message { set; get; }
        private string Details { set; get; }
    }
}