'use client'

import { useQuery } from "@tanstack/react-query";
import { getRegistrations } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "../../../DashboardDataTable/DataTable";
import { columns } from "@/components/DashboardDataTable/columns";
import EmptyState from "@/components/EmptyState/EmptyState";

type TotalRosterProps = {}

const TotalRoster = ({}: TotalRosterProps) => {
  const {isLoading, isFetching, data} = useQuery({ queryKey: ['getRegistrations'], queryFn: getRegistrations, staleTime: 10 * 60 * 1000})

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

export default TotalRoster;
