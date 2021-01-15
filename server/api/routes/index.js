import express from "express";
import index from "../controllers";
import auth from "../controllers/auth";
import dashboard from "../controllers/dashboard";

const getRoutes = () => {
  const router = new express.Router();
  router.use(express.json());

  // GET request for Index page
  router.get("/", index.index);

  // GET request for Dashboard page
  router.get("/dashboard", dashboard.dashboard);

  // GET request auth signin page
  router.get("/auth/signin", auth.getSignIn);

  // GET request auth signin page
  router.get("/auth/current-session", auth.currentSession);

  // GET request auth Index page
  router.get("/auth/callback", auth.getCallback);

  // GET request auth Index page
  router.get("/auth/signout", auth.getSignOut);
  return router;
};

export default getRoutes;
