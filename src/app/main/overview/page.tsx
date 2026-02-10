"use client";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getOverview } from "@/services/insightsServices";
import { OverviewType } from "@/types/overviewType";
import { getActivityStyle, getInventoryDisplay } from "@/utils/inventoryHelper";
import {
  AlertTriangle,
  ArrowBigDown,
  ArrowBigUp,
  ChartNoAxesColumnIncreasing,
  Clock,
  Gift,
  UsersRound,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const OverviewPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataMain, setDataMain] = useState<OverviewType | null>(null);

  const fetchDataOverview = async () => {
    try {
      setLoading(true);
      const res = await getOverview();
      setDataMain(res?.data);
      console.log("overview", res);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const { value, label, color, statusType } = getInventoryDisplay(
    dataMain?.inventoryStatus,
  );

  const chartConfig = {
    value: {
      label: "Sales",
      color: "#cf7e0c",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 w-full h-30">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-[50%]  gap-3">
                <p className="text-slate-500 text-[16px]">Total Sales</p>
                <div className="flex flex-row gap-5 items-center">
                  <p className="text-[22px] font-bold">
                    {dataMain?.totalSale?.value?.toLocaleString() ?? 0}
                  </p>
                  <div
                    className={`flex flex-row gap-1 items-center p-1 rounded-2xl text-[12px] ${
                      (dataMain?.totalSale?.change ?? 0) < 0
                        ? "bg-amber-50 text-amber-500"
                        : "bg-green-50 text-green-500"
                    }`}
                  >
                    {(dataMain?.totalSale?.change ?? 0) < 0 ? (
                      <ArrowBigDown className="size-4" />
                    ) : (
                      <ArrowBigUp className="size-4" />
                    )}
                    {Math.abs(dataMain?.totalSale?.change ?? 0)}%
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center w-[50%]">
                <div className="bg-sky-100 w-fit h-fit p-1.5 rounded-[5px]">
                  <ChartNoAxesColumnIncreasing className="size-6 text-sky-500" />
                </div>
              </div>
            </div>
          )}
        </Card>
        <Card className="p-4 w-full  h-30">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-[50%]  gap-3">
                <p className="text-slate-500 text-[16px]">Active Customers</p>
                <div className="flex flex-row gap-5 items-center">
                  <p className="text-[22px] font-bold">
                    {dataMain?.activeCustomers?.value?.toLocaleString() ?? 0}
                  </p>
                  <div
                    className={`flex flex-row gap-1 items-center p-1 rounded-2xl text-[12px] ${
                      (dataMain?.activeCustomers?.change ?? 0) < 0
                        ? "bg-amber-50 text-amber-500"
                        : "bg-green-50 text-green-500"
                    }`}
                  >
                    {(dataMain?.activeCustomers?.change ?? 0) < 0 ? (
                      <ArrowBigDown className="size-4" />
                    ) : (
                      <ArrowBigUp className="size-4" />
                    )}
                    {Math.abs(dataMain?.activeCustomers?.change ?? 0)}%
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center w-[50%]">
                <div className="bg-purple-100 w-fit h-fit p-1.5 rounded-[5px]">
                  <UsersRound className="size-6 text-purple-500" />
                </div>
              </div>
            </div>
          )}
        </Card>
        <Card className="p-4 w-full  h-30">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-[50%] gap-3">
                <p className="text-slate-500 text-[16px]">Inventory Status</p>
                <div className="flex flex-row gap-5 items-center">
                  <p className="text-[22px] font-bold">
                    {value.toLocaleString()}
                  </p>
                  <div
                    className={`flex flex-row gap-1 items-center px-2 py-1 rounded-2xl text-[12px] font-medium ${color}`}
                  >
                    {statusType === "CRITICAL" && (
                      <XCircle className="size-4" />
                    )}
                    {statusType === "WARNING" && (
                      <AlertTriangle className="size-4" />
                    )}
                    {statusType === "GOOD" && <ArrowBigUp className="size-4" />}

                    {label}
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center w-[50%]">
                <div className="bg-green-100 w-fit h-fit p-1.5 rounded-[5px]">
                  <Gift className="size-6 text-green-500" />
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card className="p-4 h-95">
          <p className="text-[18px] font-bold text-slate-700">
            Recent Activity
          </p>
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-[90%] w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {dataMain?.recentActivity?.map((activity, index) => {
                const {
                  icon: Icon,
                  bg,
                  text,
                } = getActivityStyle(activity.action);

                return (
                  <div key={index} className="flex flex-row gap-3 items-start">
                    <div
                      className={`${bg} ${text} w-fit h-fit p-2 rounded-full flex items-center justify-center`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-slate-700 text-[13px] font-medium leading-tight">
                        {activity.description}
                      </p>

                      <p className="text-slate-400 text-[11px] mt-1 flex items-center gap-1">
                        <Clock className="size-3" />
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                );
              })}
              {(!dataMain?.recentActivity ||
                dataMain.recentActivity.length === 0) && (
                <p className="text-slate-400 text-sm text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          )}
        </Card>
        <Card className="p-4 h-95 flex flex-col">
          <p className="text-[18px] font-bold text-slate-700">
            Monthly Performance
          </p>
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-[90%] w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1 min-h-0 w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart
                  accessibilityLayer
                  data={dataMain?.monthlyPerformance}
                  margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={8} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
