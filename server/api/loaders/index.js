import express from "express";
import cors from "cors";
import helmet from "helmet";

export default {
  init: (app) => {
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(
      cors({
        methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
        maxAge: 3600,
        origin: true,
      }),
    );
  },
};
