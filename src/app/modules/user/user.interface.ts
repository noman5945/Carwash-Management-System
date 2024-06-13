export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserTokenData = {
  userId: string;
  role: string;
};
