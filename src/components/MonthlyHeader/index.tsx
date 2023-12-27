'use client'

import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import MonthPicker from "../MonthPicker";

type MonthlyHeaderProps = {
  isLoading: boolean;
  isFetching: boolean;
  thisYear: string;
  thisMonth: string;
  previousYear: string;
  previousMonth: string;
  currentYear: string;
  currentMonth: string;
  nextYear: string;
  nextMonth: string;
  setCurrentYear: Dispatch<SetStateAction<string>>;
  setCurrentMonth: Dispatch<SetStateAction<string>>;
}

const MonthlyHeader = ({ isLoading, isFetching, thisYear, thisMonth, previousYear, previousMonth, currentYear, currentMonth, nextYear, nextMonth, setCurrentYear, setCurrentMonth }: MonthlyHeaderProps) => {
  

  const onClickHandler = (year: string, month: string) => {
    setCurrentYear(year)
    setCurrentMonth(month)
  }

  return (
    <Popover>
      <div className="flex justify-between mb-8">
        <Button
          variant={'outline'}
          disabled={isLoading || isFetching}
          onClick={() => onClickHandler(previousYear, previousMonth)}
        >
          <span className="text-[17px]">{`${previousYear}.${previousMonth}`}</span>
        </Button>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            disabled={isLoading || isFetching}
          >
            <span className="text-[17px]">{`${currentYear}.${currentMonth}`}</span>
          </Button>
        </PopoverTrigger>
        <Button
          variant={'outline'}
          disabled={isLoading || isFetching}
          onClick={() => onClickHandler(nextYear, nextMonth)}
          className={(nextYear > thisYear) || (nextYear === thisYear && nextMonth > thisMonth) ? 'invisible' : 'visible'}
        >
          <span className="text-[17px]">{`${nextYear}.${nextMonth}`}</span>
        </Button>
      </div>
      <PopoverContent>
        <MonthPicker 
          currentYear={currentYear}
          currentMonth={currentMonth}
          setCurrentYear={setCurrentYear}
          setCurrentMonth={setCurrentMonth}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MonthlyHeader;
