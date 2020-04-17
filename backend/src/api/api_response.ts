export class ApiResponse {
  private request: String;

  private message: String;

  private status: Number;

  private data: any; //DTO interface

  private error?: Error;

  constructor(request: String, message: String, status: Number, data: any, error?: Error) {
    this.request = request;
    this.message = message;
    this.status = status;
    this.data = data; 
    if(error)
        this.error = error;
}
}
