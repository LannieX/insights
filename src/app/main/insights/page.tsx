"use client";

import { useEffect, useState } from "react";
import LineProgress from "@/components/line-progress";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { getInsights } from "@/services/insightsServices";
import { InsightsType } from "@/types/overviewType";

const Insights = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataMain, setDataMain] = useState<InsightsType | null>(null);

  const fetchDataInsights = async () => {
    try {
      setLoading(true);
      const res = await getInsights();
      setDataMain(res?.data);
      console.log("RES", res);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataInsights();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 w-full h-52">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row w-full  justify-between">
                <p className="text-sm font-medium">Top-Selling Product</p>
                <div
                  className={`flex flex-row gap-1 items-center p-1 rounded-2xl text-[12px] ${
                    (dataMain?.topProductGrowth?.totalGrowth ?? 0) < 0
                      ? "bg-amber-50 text-amber-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {(dataMain?.topProductGrowth?.totalGrowth ?? 0) < 0 ? (
                    <ArrowBigDown className="size-4" />
                  ) : (
                    <ArrowBigUp className="size-4" />
                  )}
                  {Math.abs(dataMain?.topProductGrowth?.totalGrowth ?? 0)}%
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Product A outperformed by 23% this month.
              </p>
              <div className="flex flex-col gap-3">
                <LineProgress
                  value={dataMain?.topProductGrowth?.items[0]?.growth ?? 0}
                  targetValue={20}
                  unit="$"
                  isCircle={false}
                  title={dataMain?.topProductGrowth?.items[0]?.name ?? "-"}
                />
                <LineProgress
                  value={dataMain?.topProductGrowth?.items[1]?.growth ?? 0}
                  targetValue={20}
                  unit="$"
                  isCircle={false}
                  title={dataMain?.topProductGrowth?.items[0]?.name ?? "-"}
                />
              </div>
            </div>
          )}
        </Card>
        <Card className="p-4 w-full h-52">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row w-full  justify-between">
                <p className="text-sm font-medium">Customer Drop-off</p>
                <div
                  className={`flex flex-row gap-1 items-center p-1 rounded-2xl text-[12px] ${
                    (dataMain?.churnRate?.weekly[0]?.value ?? 0) < 0
                      ? "bg-amber-50 text-amber-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {(dataMain?.churnRate?.weekly[0]?.value ?? 0) < 0 ? (
                    <ArrowBigDown className="size-4" />
                  ) : (
                    <ArrowBigUp className="size-4" />
                  )}
                  {Math.abs(dataMain?.churnRate?.weekly[0]?.value ?? 0)}%
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {dataMain?.churnRate?.summary ?? "-"}
              </p>
              <div className="flex flex-col gap-2 text-slate-600">
                <div className="flex flex-row gap-2 items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-sky-600 rounded-full" />
                  <p>
                    {dataMain?.churnRate?.weekly[0]?.name}:{" "}
                    <span>
                      {dataMain?.churnRate?.weekly[0]?.value}% churn rate
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-sky-600 rounded-full" />
                  <p>
                    {dataMain?.churnRate?.weekly[1]?.name}:{" "}
                    <span>
                      {dataMain?.churnRate?.weekly[1]?.value}% churn rate
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <p>
                    {dataMain?.churnRate?.weekly[2]?.name}:{" "}
                    <span>
                      {dataMain?.churnRate?.weekly[2]?.value}% churn rate
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-sky-600 rounded-full" />
                  <p>
                    {dataMain?.churnRate?.weekly[3]?.name}:{" "}
                    <span>
                      {dataMain?.churnRate?.weekly[3]?.value}% churn rate
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 w-full h-74">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row w-full  justify-between">
                <p className="text-sm font-medium">Regional Performance</p>
                <div
                  className={`flex flex-row gap-1 items-center p-1 rounded-2xl text-[12px] ${
                    (dataMain?.regional?.totalGrowth ?? 0) < 0
                      ? "bg-amber-50 text-amber-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {(dataMain?.regional?.totalGrowth ?? 0) < 0 ? (
                    <ArrowBigDown className="size-4" />
                  ) : (
                    <ArrowBigUp className="size-4" />
                  )}
                  {Math.abs(dataMain?.regional?.totalGrowth ?? 0)}%
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {dataMain?.regional?.summary ?? "-"}
              </p>
              <div className="flex flex-col gap-3">
                <LineProgress
                  value={dataMain?.regional?.data[0]?.value ?? 0}
                  targetValue={10000}
                  unit="$"
                  isCircle={false}
                  title={dataMain?.regional?.data[0]?.name ?? "-"}
                />
                <LineProgress
                  value={dataMain?.regional?.data[1]?.value ?? 0}
                  targetValue={10000}
                  unit="$"
                  isCircle={false}
                  title={dataMain?.regional?.data[1]?.name ?? "-"}
                />
                <LineProgress
                  value={dataMain?.regional?.data[2]?.value ?? 0}
                  targetValue={10000}
                  unit="$"
                  isCircle={false}
                  title={dataMain?.regional?.data[2]?.name ?? "-"}
                />
              </div>
            </div>
          )}
        </Card>
        <Card className="p-4 w-full  h-74">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row w-full  justify-between">
                <p className="text-sm font-medium">Conversion Funnel</p>
                <div
                  className={`flex flex-row gap-1 items-center p-1 rounded-2xl text-[12px] ${
                    (dataMain?.funnel?.totalGrowth ?? 0) < 0
                      ? "bg-amber-50 text-amber-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {(dataMain?.funnel?.totalGrowth ?? 0) < 0 ? (
                    <ArrowBigDown className="size-4" />
                  ) : (
                    <ArrowBigUp className="size-4" />
                  )}
                  {Math.abs(dataMain?.funnel?.totalGrowth ?? 0)}%
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {dataMain?.funnel?.summary ?? "-"}
              </p>
              <div className="flex flex-col gap-3">
                <LineProgress
                  value={dataMain?.funnel?.data[0]?.value ?? 0}
                  targetValue={10000}
                  isCircle={true}
                  title={dataMain?.funnel?.data[0].step ?? "-"}
                />
                <LineProgress
                  value={dataMain?.funnel?.data[1]?.value ?? 0}
                  targetValue={10000}
                  isCircle={true}
                  title={dataMain?.funnel?.data[1].step ?? "-"}
                />
                <LineProgress
                  value={dataMain?.funnel?.data[2]?.value ?? 0}
                  targetValue={10000}
                  isCircle={true}
                  title={dataMain?.funnel?.data[2].step ?? "-"}
                />
                <LineProgress
                  value={dataMain?.funnel?.data[3]?.value ?? 0}
                  targetValue={10000}
                  isCircle={true}
                  title={dataMain?.funnel?.data[3].step ?? "-"}
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Insights;
