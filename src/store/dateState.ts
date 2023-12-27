import { getStartAndEndDateOfThisWeek, getThisYearAndMonth } from "@/lib/utils";
import { atom } from "recoil";

const { startDate, endDate } = getStartAndEndDateOfThisWeek()
const { thisYear, thisMonth } = getThisYearAndMonth()

export const dateState = atom({
  key: 'dateState',
  default: {
    weekStartDate: startDate,
    weekEndDate: endDate,
    thisYear,
    thisMonth,
  },
});