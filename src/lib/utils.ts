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