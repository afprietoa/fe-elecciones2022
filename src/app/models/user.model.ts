import { Rol } from "./rol.model";

export class User {
    id?: number;
    nickname?: string;
    email?: string;
    password?: string;
    rol?: Rol;
    token?: string;
}
