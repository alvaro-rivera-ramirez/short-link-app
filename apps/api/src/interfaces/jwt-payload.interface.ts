export interface PayloadJwt extends UserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
}
