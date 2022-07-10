import { GameItem } from "./GameItem.dto";

export class UserProfile {
    constructor(readonly userName: string, readonly email: string, readonly games: GameItem[]) {}
}