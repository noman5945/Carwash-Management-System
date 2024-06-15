import { TSlotTimes, TSlotTimesArray } from "./slot.interface";
/**
 * Function to create slots dynamicaly based on given start time ,end time and time alotted per slot. \n
 * Step 1: Take the time in string format(HH:MM). \n
 * Step 2: Split the time string and separete the hour and minute values. \n
 * Step 3: Convert hour into minute value and add the minute value to get the start and end time in minute.Also convert the string into int \n
 * Step 4: Get the duration by EndTime - StartTime \n
 * Step 5: Calculate numberofslots by duration/timeperslot \n
 * Step 6: Create start time and end time for each slot by adding time per slot with starting time and making ending time staring time of next slot
 * Step 7: Return the array slots with time
 *
 * @param startTime Starting time in string format (HH:MM)
 * @param endTime Ending time in string format (HH:MM)
 * @param timePerSlot Time alotted for each slot. By default its 60 mins
 * @returns Array slots with start time and end time
 */
const createSlots = (
  startTime: string,
  endTime: string,
  timePerSlot: number = 60
) => {
  const slotsArray: TSlotTimesArray = [];
  //Step 1 & 2
  const hourStringStartTime = startTime.split(":")[0];
  const minStringStartTime = startTime.split(":")[1];

  const hourStringEndTime = endTime.split(":")[0];
  const minStringEndTime = endTime.split(":")[1];

  //Step 3
  const startTimeHourToMin =
    parseInt(hourStringStartTime) * 60 + parseInt(minStringStartTime);
  const endTimeHourToMin =
    parseInt(hourStringEndTime) * 60 + parseInt(minStringEndTime);

  //Step 4
  const duration = endTimeHourToMin - startTimeHourToMin;

  //Step 5
  const numberOfSlots: number = duration / timePerSlot;
  //Step 6
  let counter: number = 0;
  let startingMin: number = startTimeHourToMin;
  for (counter; counter < numberOfSlots; counter++) {
    let endingMin: number = Math.trunc(startingMin + 60);
    let startingHour: number = Math.trunc(startingMin / 60);
    let endingHour: number = Math.trunc(endingMin / 60);
    let startMIN: number = Math.trunc(startingMin % 60);
    let endMIN: number = Math.trunc(endingMin % 60);

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
  //Step 7
  return slotsArray;
};

export default createSlots;
