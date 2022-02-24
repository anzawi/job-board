namespace Application.Core
{
    public class ResponseResult<T>
    {
        public bool IsSuccess { set; get; }
        public T Value { set; get; }
        public string Error { set; get; }


        public static ResponseResult<T> Success(T value) => new ResponseResult<T>{IsSuccess = true, Value = value};
        public static ResponseResult<T> Failure(string error) => new ResponseResult<T>{IsSuccess = false, Error = error};
    }
}