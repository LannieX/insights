import { ApiServices } from "./api.service";

export const getOverview = async () => {
  const res = await ApiServices("GET", "/overview");
  return res;
};

export const getInsights = async () => {
  const res = await ApiServices("GET", "/overview/insights");
  return res;
}
