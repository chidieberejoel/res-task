import logger from "../config/winstonlog";
import getRoutes from "../routes";

export default {
  init: (app) => {
    // Mount API routes
    app.use("/", getRoutes());
    app.use((err, req, res, next) => {
      logger.info(err.stack);
      res.status(500);
      res.render(
        "There was an Error processing your request. Something's broken! Check your data and try again",
        { error: err },
      );
      next();
    });
  },
};
