/* eslint-disable no-param-reassign */
import moment from "moment";
import logger from "../config/winstonlog";
import getOpenRes from "../middleware/getOpenRes";
import Restaurant from "../models/restaurant";

class GetRestaurant {
  static async dashboard(req, res) {
    // Get all DB elements
    const findAll = await Restaurant.find({}).lean();

    // GET List of restaurants' names
    const restaurantNames = findAll.map((a) => a.name);

    // GET List of restaurants' open hours
    const openHours = findAll.map((a) => a.open_hours);
    const initAppointments = openHours
      .map((a) => a.trim().split("  / "));

    try {
      const d = new Date("Fri Jan 15 2021 21:10:04");
      const r = getOpenRes(initAppointments, restaurantNames, d);

      const closeSoonCheck = (objVal) => {
        const getTime = moment().format("ddd");
        const closeTime = objVal.hours[getTime].close;
        const b = moment(closeTime, "hh:mm a");
        const curTime = moment();
        const diff = Number(b.diff(curTime, "minutes"));

        if (diff <= 60) {
          return true;
        }
        return false;
      };

      await r.map((el) => Object.assign(el, { closing: closeSoonCheck(el) }));

      const restNames = r.map((el) => el.name);

      const searchDB = findAll.filter((e) => restNames.includes(e.name));

      const result = [
        ...searchDB
          .concat(r)
          .reduce(
            (m, o) => m.set(o.name, Object.assign(m.get(o.name) || {}, o)),
            new Map(),
          )
          .values(),
      ];

      result.map((el) => delete el.hours);

      res.status(200).send(result);
    } catch (error) {
      logger.info(`Error: ${error}`);
      res.redirect("/");
    }
  }
}

export default GetRestaurant;
