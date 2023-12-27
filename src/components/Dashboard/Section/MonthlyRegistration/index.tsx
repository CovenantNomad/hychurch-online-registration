'use client'

import { DataTable } from "@/components/DashboardDataTable/DataTable";
import { columns } from "@/components/DashboardDataTable/columns";
import EmptyState from "@/components/EmptyState/EmptyState";
import MonthlyHeader from "@/components/MonthlyHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { getMonthlyRegistrations } from "@/lib/firebase";
import { getMonthRange } from "@/lib/utils";
import { dateState } from "@/store/dateState";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";

type MonthlyRegistrationProps = {}

const MonthlyRegistration = ({}: MonthlyRegistrationProps) => {
  const { thisYear, thisMonth } = useRecoilValue(dateState)
  const [ currentYear, setCurrentYear ] = useState<string>(thisYear)
  const [ currentMonth, setCurrentMonth ] = useState<string>(thisMonth)
  const { previousYear, previousMonth, nextYear, nextMonth } = getMonthRange(currentYear, currentMonth)

  const {isLoading, isFetching, data} = useQuery({ 
    queryKey: ['getMonthlyRegistrations', {currentYear, currentMonth}], 
    queryFn: () => getMonthlyRegistrations(currentYear, currentMonth), 
    staleTime: 10 * 60 * 1000
  })

  return (
    <div>
      {isLoading || isFetching ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <div className="py-2 border rounded-md">
          <div className="border-b px-2 pb-2 ">
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="mt-4 space-y-4 px-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        </>
        
      ) : (
        <>
          <MonthlyHeader 
            isLoading={isLoading} 
            isFetching={isFetching} 
            thisYear={thisYear}
            thisMonth={thisMonth}
            previousYear={previousYear}
            previousMonth={previousMonth}
            currentYear={currentYear}
            currentMonth={currentMonth}
            nextYear={nextYear}
            nextMonth={nextMonth}
            setCurrentYear={setCurrentYear}
            setCurrentMonth={setCurrentMonth}
          />
          {data ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default MonthlyRegistration;
