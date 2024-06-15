import config from "../../config";
import { TLoginUser, TUser, TUserTokenData } from "./user.interface";
import { User } from "./user.model";
import { userAuthUtils } from "./user.utils";

const createNewUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  let data = await User.findById(result._id).select("-password");
  return data;
};

const userLoginByEmailPass = async (loginData: TLoginUser) => {
  const user = await User.findOne({ email: loginData.email });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (
    !(await userAuthUtils.isPasswordMatched(loginData.password, user.password))
  ) {
    throw new Error("Wrong Password");
  }

  const jwtpayload: TUserTokenData = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accesToken = userAuthUtils.createAccesstoken(
    jwtpayload,
    config.jwt_accsess_token_sign as string,
    "10d"
  );
  const safeUser = JSON.parse(JSON.stringify(user));
  delete safeUser.password;

  return {
    accesToken,
    safeUser,
  };
};

export const userServices = {
  createNewUserIntoDB,
  userLoginByEmailPass,
};
