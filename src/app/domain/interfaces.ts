export interface JwtDecodedInfo {
  id: number;
  login: string;
  role: string;
  iat: number;
  exp: number;
}
