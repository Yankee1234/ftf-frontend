export class UserInfo {
  constructor(
    private readonly login: string,
    private readonly id: number,
    private readonly role: string,
    private readonly token: string
  ) {}
}
