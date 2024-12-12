import { LoginDto, LoginResponse, RegistrationDto, User } from "@/types/Users";
import { BlogAppClientInstance } from "../rest-client";

export class AuthenticationService {
  signupUser = async (registrationDto: RegistrationDto) => {
    return await BlogAppClientInstance.post<User>(
      `auth/signup`,
      registrationDto
    );
  };

  loginUser = async (loginDto: LoginDto) => {
    return await BlogAppClientInstance.post<LoginResponse>(
      `auth/login`,
      loginDto
    );
  };

  //   async logoutUser(): Promise<User> {
  //     return await BlogAppClientInstance.get<User>(`auth/logout`);
  //   }
}

export const AuthService = new AuthenticationService();
