import { EHttpStatus } from "../constants";

export class ApiException<T = any>  {
  public type: string = "DEFAULT";
  public httpCode?: EHttpStatus;
  public businessCode?: number = -1;
  public message?: string;
  public errors?: T

  constructor(
    message: string,
    httpCode: EHttpStatus = EHttpStatus.INTERNAL_SERVER_ERROR,
    errors: T = undefined,
    type: string = "DEFAULT",
    businessCode: number = -1,
  ) {
    this.httpCode = httpCode;
    this.message = message;
    this.type = type;
    this.businessCode = businessCode;
    this.errors = errors;
  }

}
