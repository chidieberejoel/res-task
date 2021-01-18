const moment = require("moment");

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Function to show only open restaurants and open hours
const parseData = (initAppointments, restaurantNames) => {
  const appointments = initAppointments.map((ia) => {
    if (ia) {
      const daysClock = ia.map((a) => {
        const i = a.search(/\d/);
        let days = a.substr(0, i - 1);
        const clocks = a.substr(i, a.length - i);
        const [open, close] = clocks.split(" - ");
        days = days.split(", ");
        const res = {};
        Object.keys(days).forEach((dayIndex) => {
          const day = days[dayIndex];
          const [lDay, RDay] = day.split("-");
          const lDayIndex = weekDays.findIndex((d) => d === lDay);
          let RDayIndex = RDay
            ? weekDays.findIndex((d) => d === RDay)
            : lDayIndex;
          if (RDayIndex < lDayIndex) RDayIndex = 6 + RDayIndex + 1;
          for (let dI = lDayIndex; dI <= RDayIndex; dI += 1) {
            const j = dI % 7;
            res[weekDays[j]] = { open, close };
          }
        });
        return res;
      });

      return daysClock.reduce((acc, x) => {
        Object.keys(x).forEach((k) => {
          acc[k] = x[k];
        });
        return acc;
      });
    }
    return null;
  });
  return restaurantNames.map((r, i) => ({
    name: r,
    hours: appointments[i],
  }));
};

const findOpenRestaurants = (
  initAppointments,
  restaurantNames,
  searchDatetime,
) => {
  const data = parseData(initAppointments, restaurantNames);
  const day = searchDatetime.getDay();
  const res = data.filter((d) => {
    if (!d.hours || !d.hours[weekDays[day]]) return 0;
    const { open, close } = d.hours[weekDays[day]];
    let openDate = moment(
      `${searchDatetime.toDateString()} ${open}`,
      "dddd MMMM Do YYYY h:mm a",
    );
    let closeDate = moment(
      `${searchDatetime.toDateString()} ${close}`,
      "dddd MMMM Do YYYY h:mm a",
    );
    openDate = openDate.toDate();
    closeDate = closeDate.toDate();
    return searchDatetime >= openDate && searchDatetime <= closeDate;
  });
  return res;
};

module.exports = findOpenRestaurants;
