'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TotalRoster from "../Dashboard/Section/TotalRoster";
import { RecoilState, useRecoilState } from "recoil";
import { dashboardTabsState } from "@/store/dashboardTabsState";

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
        <TabsTrigger value="download" disabled>
          데이터 다운로드 (개발 중)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="totally" className="py-4">
        <TotalRoster />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
