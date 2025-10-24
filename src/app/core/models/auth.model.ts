export interface LoginRequest{
        username : string;
        password : string;
}

export interface RegisterRequest{
        username : string;
        password : string;
        email : string;
        firstName : string;
        lastName : string;
        phone : string;
        address : string;
}

export interface LoginResponse {
  username: string;
  message: string;
  jwt: string;
  status: boolean;
}

export interface RawLoginResponse {
  message?: string;
  data?: LoginResponse;
}