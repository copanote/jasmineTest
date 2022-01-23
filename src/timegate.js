const timeGate = (now) => {
  const kst_time_diff = 9 * 60 * 60 * 1000;

  const now_kst = now;
  // const now_kst = new Date(2022, 0, 29, 0, 0, 0); //Sun Jan 30 2022 00:00:00 GMT+0900 (Korean Standard Time)
  //

  const startDate = new Date(2022, 0, 30, 0, 0, 0); //Sun Jan 30 2022 00:00:00 GMT+0900 (Korean Standard Time)
  // const startDate = new Date(2021, 0, 30, 0, 0, 0);

  const utcStartDate =
    startDate.getTime() + startDate.getTimezoneOffset() * 60 * 1000;
  const startDate_kst = new Date(utcStartDate + kst_time_diff);

  const dueDate = new Date(2022, 1, 2, 0, 0, 0); // Wed Feb 02 2022 00:00:00 GMT+0900 (Korean Standard Time)
  // const dueDate = new Date(2022, 0, 21, 17, 44, 0); // Wed Feb 02 2022 00:00:00 GMT+0900 (Korean Standard Time)

  const utcDueDate =
    dueDate.getTime() + dueDate.getTimezoneOffset() * 60 * 1000;
  const dueDate_kst = new Date(utcDueDate + kst_time_diff);

  console.log("now_kst: " + now_kst);
  console.log("dueDate_kst:" + dueDate_kst);
  console.log("startDate_kst:" + startDate_kst);

  const isUnavailablePointDeposit = () => {
    return (
      Number(startDate) < Number(now_kst) && Number(now_kst) < Number(dueDate)
    );
  };

  const isPopupOpen = () => {
    return Number(now_kst) < Number(dueDate);
  };

  const publicAPI = {
    isPopupOpen: isPopupOpen,
    isUnavailablePointDeposit: isUnavailablePointDeposit,
  };

  return publicAPI;
};

const TIME_GATE_WITH_PREVIOUS_STARTDATE = timeGate(new Date());
console.log(TIME_GATE_WITH_PREVIOUS_STARTDATE.isPopupOpen()); //expected true
console.log(TIME_GATE_WITH_PREVIOUS_STARTDATE.isUnavailablePointDeposit()); //extendted false

const TIME_GATE_WITH_OVER_DUEDATE = timeGate(new Date(2022, 2, 2, 0, 1, 0));
console.log(TIME_GATE_WITH_OVER_DUEDATE.isPopupOpen()); //expected false
console.log(TIME_GATE_WITH_OVER_DUEDATE.isUnavailablePointDeposit()); //expected false

const TIME_GATE_WITH_BETWEEN_START_AND_DUEDATE = timeGate(
  new Date(2022, 1, 1, 0, 1, 0)
);
console.log(TIME_GATE_WITH_BETWEEN_START_AND_DUEDATE.isPopupOpen()); //expected true
console.log(
  TIME_GATE_WITH_BETWEEN_START_AND_DUEDATE.isUnavailablePointDeposit()
); //expected true
