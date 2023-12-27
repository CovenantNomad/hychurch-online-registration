'use client'

import { getRegistrantsStatistics } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../EmptyState/EmptyState";
import { useRecoilValue } from "recoil";
import { dateState } from "@/store/dateState";
import { getLastWeekStartAndEndDate, getStartAndEndDateOfThisWeek } from "@/lib/utils";

type DashboardCardSectionProps = {}

const DashboardCardSection = ({}: DashboardCardSectionProps) => {
  const { thisYear, thisMonth } = useRecoilValue(dateState)
  const { startDate, endDate } = getStartAndEndDateOfThisWeek()
  const { lastWeekStartDate, lastWeekEndDate } = getLastWeekStartAndEndDate()

  const {isLoading, isFetching, data} = useQuery({ 
    queryKey: ['getRegistrantsStatistics'], 
    queryFn: () => getRegistrantsStatistics(thisYear, thisMonth), 
    staleTime: 10 * 60 * 1000
  })

  return (
    <div>
      {isLoading || isFetching ? (
        <div></div>
      ) : (
        <>
          {data ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    이번주 등록인원
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.thisWeekRegistrationSize}</div>
                  <p className="text-xs text-muted-foreground">
                    {startDate.toLocaleDateString('KR-kr')} ~ {endDate.toLocaleDateString('KR-kr')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    지난주 등록인원
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.lastWeekRegistrationSize}</div>
                  <p className="text-xs text-muted-foreground">
                    {lastWeekStartDate.toLocaleDateString('KR-kr')} ~ {lastWeekEndDate.toLocaleDateString('KR-kr')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    이번달 등록인원
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.monthylRegistrationSize}</div>
                  <p className="text-xs text-muted-foreground">
                    평균 {data.weeklyAverage}명 온라인 등록 (per week)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    올해 등록인원
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.yearlyRegistrationSize}</div>
                  <p className="text-xs text-muted-foreground">
                    평균 {data.monthlyAverage}명 온라인 등록 (per month)
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default DashboardCardSection;
