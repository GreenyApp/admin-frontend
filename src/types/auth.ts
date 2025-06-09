export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expireAccessToken: number;
  expireRefreshToken: number;
}