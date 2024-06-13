import { TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  let data = await User.findById(result._id).select("-password");
  return data;
};

export const userServices = {
  createNewUserIntoDB,
};
