'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { getPreviousFiveYears } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";

type MonthPickerProps = {
  currentYear: string;
  currentMonth: string;
  setCurrentYear: Dispatch<SetStateAction<string>>;
  setCurrentMonth: Dispatch<SetStateAction<string>>;
}

const MonthPicker = ({ currentYear, currentMonth, setCurrentYear, setCurrentMonth }: MonthPickerProps) => {
  const [ open, setOpen ] = useState(false)
  const [ tempYear, setTempYear ] = useState<string>(currentYear)
  const [ tempMonth, setTempMonth ] = useState<string>(currentMonth)

  const monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  const previousFiveYears = getPreviousFiveYears()

  const onSaveHandler = () => {
    setCurrentYear(tempYear)
    setCurrentMonth(tempMonth)
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => setOpen(!open)}
          className="row-start-1 col-start-2"
        >
          <span>{tempYear}</span>
        </Button>
      </div>
      {open && (
        <>
          <div className="grid grid-rows-2 grid-cols-3 gap-3">
            {previousFiveYears.map((year, index) => (
              <Button 
                key={index}
                size={'sm'}
                variant={'outline'}
                onClick={() => setTempYear(year)}
                className={`${year === tempYear && 'bg-gray-100'}`}
              >
                <span>{year}</span>
              </Button>
            ))}
          </div>
          <div className="w-full h-[1px] bg-gray-100 my-4"/>
        </>
      )}
      
      <div className="grid grid-rows-4 grid-cols-3 gap-3">
        {monthList.map((month, index) => (
          <Button 
            key={index}
            size={'sm'}
            variant={'outline'}
            onClick={() => setTempMonth(month)}
            className={`${month === tempMonth && 'bg-gray-100'}`}
          >
            <span>{month}</span>
          </Button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <PopoverClose asChild>
          <Button
            className="w-full"
            onClick={onSaveHandler}
          >
            설정
          </Button>
        </PopoverClose>
      </div>
    </div>
  );
};

export default MonthPicker;
