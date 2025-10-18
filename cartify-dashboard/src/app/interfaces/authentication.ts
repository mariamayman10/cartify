export interface Signin {
  readonly email: string;
  readonly password: string;
}

export interface SendMail {
  readonly email: string;
}

export interface verifyCode{
  readonly resetCode: string;
}
export interface ResetPassword{
  readonly password: string;
  readonly confirmPassword: string;
}