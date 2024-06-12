import { Router } from "express";
import userRoute from "../modules/user/user.route";

const routes = Router();

const apiRoutes = [
  {
    path: "/auth",
    routeName: userRoute,
  },
];

apiRoutes.forEach((route) => {
  routes.use(route.path, route.routeName);
});

export default routes;
