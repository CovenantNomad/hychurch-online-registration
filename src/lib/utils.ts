import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStartAndEndDateOfThisWeek() {
  const today = new Date();
  const day = today.getDay(); // 오늘 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const diffToSunday = today.getDate() - day; // 이번 주 일요일과의 차이 계산

  const startDate = new Date(today.setDate(diffToSunday)); // 이번 주 일요일 설정
  startDate.setHours(0, 0, 0, 0); // 일요일 0시 0분 0초로 설정
  const endDate = new Date(today.setDate(diffToSunday + 6)); // 이번 주 토요일(6일 후) 설정
  endDate.setHours(23, 59, 59, 999); // 토요일 23시 59분 59초 999밀리초로 설정

  return {
    startDate,
    endDate,
  };
}

export function getLastWeekStartAndEndDate() {
  const today = new Date();
  const day = today.getDay(); // 오늘 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const diffToSunday = today.getDate() - day - 7; // 이번 주 일요일과의 차이 계산하고 1주일 더 빼기

  const lastWeekStartDate = new Date(today.setDate(diffToSunday)); // 지난 주 시작일
  const lastWeekEndDate = new Date(today.setDate(lastWeekStartDate.getDate() + 6)); // 지난 주 종료일

  lastWeekStartDate.setHours(0, 0, 0, 0); // 시작일 설정 (일요일 0시 0분 0초)
  lastWeekEndDate.setHours(23, 59, 59, 999); // 종료일 설정 (토요일 23시 59분 59초 999밀리초)

  return {
    lastWeekStartDate,
    lastWeekEndDate,
  };
}

export function getThisYearAndMonth() {
  const today = new Date();
  const thisYear = today.getFullYear().toString()
  const thisMonth = (today.getMonth() + 1).toString()

  return {
    thisYear,
    thisMonth,
  };
}

export function getMonthRange(thisYear: string, thisMonth: string) {
  let previousYear
  let previousMonth
  let nextYear
  let nextMonth

  if (thisMonth === '01') {
    previousYear = (Number(thisYear) - 1).toString()
    previousMonth = '12'
  } else {
    previousYear = thisYear
    previousMonth = (Number(thisMonth) - 1).toString().padStart(2, '0')
  }

  if (thisMonth === '12') {
    nextYear = (Number(thisYear) + 1).toString()
    nextMonth = `01`
  } else {
    nextYear = thisYear
    nextMonth = (Number(thisMonth) + 1).toString().padStart(2, '0')
  }

  return {
    previousYear,
    previousMonth,
    nextYear,
    nextMonth,
  }
}

export function getPreviousFiveYears() {
  const currentYear = new Date().getFullYear();
  const previousYears = [];

  for (let i = 0; i < 5; i++) {
    previousYears.push((Number(currentYear) - i).toString());
  }

  return previousYears;
}