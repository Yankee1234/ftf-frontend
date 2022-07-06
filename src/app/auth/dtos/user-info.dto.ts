export class UserInfo {
  constructor(
    readonly login: string,
    readonly id: number,
    readonly role: string,
    readonly token: string
  ) {}
}
