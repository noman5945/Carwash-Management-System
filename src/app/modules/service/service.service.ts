import { TService } from "./service.interface";
import { Service } from "./service.model";

const createNewServiceIntoDB = async (serviceData: TService) => {
  const result = await Service.create(serviceData);
  return result;
};

const getAllServicesfromDB = async () => {
  const result = await Service.find({});
  return result;
};

export const CarwashServices = {
  createNewServiceIntoDB,
  getAllServicesfromDB,
};
