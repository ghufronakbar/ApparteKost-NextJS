export type Role = "ADMIN" | "BOARDING_HOUSE" | "USER";

export interface LoginRes {
  accessToken: string;
  role: Role;
}

export interface Decoded {
  id: number;
  role: Role;
}
