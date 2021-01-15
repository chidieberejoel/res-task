import logger from "../config/winstonlog";
import config from "../config";

class GetIndex {
  static async index(req, res) {
    try {
      res.redirect(config.clientHost);
      logger.info("Index page visited");
    } catch (err) {
      res.status(500).send(err);
      logger.warn(`Error: ${err}`);
    }
  }
}

export default GetIndex;
