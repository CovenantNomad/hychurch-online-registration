'use client'

import { getWeeklyRegistrations } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../DashboardDataTable/DataTable";
import { columns } from "../../../DashboardDataTable/columns";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useRecoilValue } from "recoil";
import { dateState } from "@/store/dateState";

type ThisWeekRegistrationProps = {}

const WeeklyRegistration = ({}: ThisWeekRegistrationProps) => {
  const { weekStartDate, weekEndDate } = useRecoilValue(dateState)

  const {isLoading, isFetching, data} = useQuery({ 
    queryKey: ['getWeeklyRegistrations'], 
    queryFn: () => getWeeklyRegistrations(weekStartDate, weekEndDate), 
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
              <span className="text-sm text-gray-900">{weekStartDate.toLocaleDateString('KR-kr')} - {weekEndDate.toLocaleDateString('KR-kr')}</span>
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
