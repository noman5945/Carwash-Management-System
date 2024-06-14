import { TSlotTimes, TSlotTimesArray } from "./slot.interface";

const createSlots = (
  startTime: string,
  endTime: string,
  timePerSlot: number = 60
) => {
  const slotsArray: TSlotTimesArray = [];

  const hourStringStartTime = startTime.split(":")[0];
  const minStringStartTime = startTime.split(":")[1];

  const hourStringEndTime = endTime.split(":")[0];
  const minStringEndTime = endTime.split(":")[1];

  const startTimeHourToMin =
    parseInt(hourStringStartTime) * 60 + parseInt(minStringStartTime);
  const endTimeHourToMin =
    parseInt(hourStringEndTime) * 60 + parseInt(minStringEndTime);

  const duration = endTimeHourToMin - startTimeHourToMin;

  const numberOfSlots: number = duration / timePerSlot;
  let counter: number = 0;
  let startingMin: number = startTimeHourToMin;
  for (counter; counter < numberOfSlots; counter++) {
    let endingMin: number = startingMin + 60;
    let startingHour: number = startingMin / 60;
    let endingHour: number = endingMin / 60;
    let startMIN: number = startingMin % 60;
    let endMIN: number = endingMin % 60;

    const start: string =
      (startingHour.toString().length < 2
        ? "0" + startingHour.toString()
        : startingHour.toString()) +
      ":" +
      (startMIN.toString().length < 2
        ? "0" + startMIN.toString()
        : startMIN.toString());
    const end: string =
      (endingHour.toString().length < 2
        ? "0" + endingHour.toString()
        : endingHour.toString()) +
      ":" +
      (endMIN.toString().length < 2
        ? "0" + endMIN.toString()
        : endMIN.toString());

    const slot: TSlotTimes = {
      startTime: start,
      endTime: end,
    };

    slotsArray.push(slot);
    startingMin = endingMin;
  }

  return slotsArray;
};

export default createSlots;
