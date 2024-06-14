import { Router } from "express";
import userRoute from "../modules/user/user.route";
import serviceRoutes from "../modules/service/service.route";
import slotRoutes from "../modules/slot/slot.routes";

const routes = Router();

const apiRoutes = [
  {
    path: "/auth",
    routeName: userRoute,
  },
  {
    path: "/services",
    routeName: serviceRoutes,
  },
  {
    path: "/slots",
    routeName: slotRoutes,
  },
];

apiRoutes.forEach((route) => {
  routes.use(route.path, route.routeName);
});

export default routes;
