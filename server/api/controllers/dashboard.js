/* eslint-disable no-param-reassign */
const moment = require("moment");
const logger = require("../config/winstonlog");
const getOpenRes = require("../middleware/getOpenRes");
const Restaurant = require("../models/restaurant");

class GetRestaurant {
  static async dashboard(req, res) {
    // Get all DB elements
    const findAll = await Restaurant.find({}).lean();

    // Get List of restaurants' names
    const restaurantNames = findAll.map((a) => a.name);

    // Get List of restaurants' open hours
    const openHours = findAll.map((a) => a.open_hours);
    const initAppointments = openHours.map((a) => a.trim().split("  / "));

    try {
      const d = new Date();

      // Get restaurants' daily opening and closing hours
      const r = getOpenRes(initAppointments, restaurantNames, d);

      // Function to check if a restaurant is closing soon
      const closesSoonCheck = (objVal) => {
        const getTime = moment().format("ddd");
        const closeTime = objVal.hours[getTime].close;
        const b = moment(closeTime, "hh:mm a");
        const curTime = moment();
        const diff = Number(b.diff(curTime, "minutes"));

        if (diff >= 0 && diff <= 60) {
          return true;
        }
        return false;
      };

      await r.map((el) => Object.assign(el, { closing: closesSoonCheck(el) }));

      const restNames = r.map((el) => el.name);

      const searchDB = findAll.filter((e) => restNames.includes(e.name));

      // Add "closing soon" tag to open restaurants at a time
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

module.exports = GetRestaurant;
