export class AuthRegisterRequest {
  constructor(
    readonly login: string,
    readonly email: string,
    readonly userName: string,
    readonly password: string
  ) {}
}
