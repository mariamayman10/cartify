export interface User{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}