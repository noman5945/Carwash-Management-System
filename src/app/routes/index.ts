import { Router } from "express";
import serviceRoutes from "../modules/service/service.route";
import slotRoutes from "../modules/slot/slot.routes";
import bookingRoutes from "../modules/booking/booking.route";
import { userAllRoutes } from "../modules/user/user.route";

const routes = Router();

const apiRoutes = [
  {
    path: "/auth",
    routeName: userAllRoutes.userAuthRoute,
  },
  {
    path: "/my-bookings",
    routeName: userAllRoutes.userRoute,
  },
  {
    path: "/services",
    routeName: serviceRoutes,
  },
  {
    path: "/slots",
    routeName: slotRoutes,
  },
  {
    path: "/bookings",
    routeName: bookingRoutes,
  },
];

apiRoutes.forEach((route) => {
  routes.use(route.path, route.routeName);
});

export default routes;
