'use client'

import { getWeeklyRegistrations } from "@/lib/firebase";
import { getStartAndEndDateOfThisWeek } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../DashboardDataTable/DataTable";
import { columns } from "../../../DashboardDataTable/columns";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/EmptyState/EmptyState";

type ThisWeekRegistrationProps = {}

const WeeklyRegistration = ({}: ThisWeekRegistrationProps) => {
  const { startDate, endDate } = getStartAndEndDateOfThisWeek();

  const {isLoading, isFetching, data} = useQuery({ 
    queryKey: ['getWeeklyRegistrations'], 
    queryFn: () => getWeeklyRegistrations(startDate, endDate), 
    staleTime: 10 * 60 * 1000
  })

  return (
    <div>
      {isLoading || isFetching ? (
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
      ) : (
        <>
          <div className="flex justify-end mb-3">
            <div className="px-4 py-2 border rounded-lg">
              <span className="text-sm text-gray-900">{startDate.toLocaleDateString('KR-kr')} - {endDate.toLocaleDateString('KR-kr')}</span>
            </div>
          </div>
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

export default WeeklyRegistration;
