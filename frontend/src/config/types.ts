export interface iUser {
	id: number;
  name: string;
	admin: 0 | 1;
	email: string;
	password: string;
}

export interface createUser {
  name: string;
	admin: 0 | 1;
	email: string;
	password: string;
}

export interface userLogin {
	email: string;
	password: string;
	admin: 0 | 1;
}

export interface updateUser {
	name: string;
	admin: 0 | 1;
	email: string;
	password: string;
}