import { atom } from "recoil";

export const dashboardTabsState = atom({
  key: 'dashboardTabsState',
  default: 'weekly',
});