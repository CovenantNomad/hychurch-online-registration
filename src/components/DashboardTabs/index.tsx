'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TotalRoster from "../Dashboard/Section/TotalRoster";
import { useRecoilState } from "recoil";
import { dashboardTabsState } from "@/store/dashboardTabsState";
import WeeklyRegistration from "../Dashboard/Section/WeeklyRegistration";
import MonthlyRegistration from "../Dashboard/Section/MonthlyRegistration";
import Overview from "../Dashboard/Section/Overview";


type DashboardTabsProps = {}

const DashboardTabs = ({}: DashboardTabsProps) => {
  const [tab, setTab] = useRecoilState(dashboardTabsState)

  const onTabChange = (value: string) => {
    setTab(value);
  }

  return (
    <Tabs value={tab} onValueChange={onTabChange} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="weekly">
          이번주 등록명단
        </TabsTrigger>
        <TabsTrigger value="monthly">
          월별 등록명단
        </TabsTrigger>
        <TabsTrigger value="totally">
          전체 등록명단
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="py-4">
        <Overview />
      </TabsContent>
      <TabsContent value="weekly" className="py-4">
        <WeeklyRegistration />
      </TabsContent>
      <TabsContent value="monthly" className="py-4">
        <MonthlyRegistration />
      </TabsContent>
      <TabsContent value="totally" className="py-4">
        <TotalRoster />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
