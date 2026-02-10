"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GalleryVerticalEnd, Home, LogOut, PieChart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const data = {
  teams: [
    {
      name: "ALBALY INSIGHTS",
      logo: GalleryVerticalEnd,
    },
  ],
  projects: [
    {
      name: "Overview",
      url: "/main/overview",
      icon: Home,
    },
    {
      name: "Insights",
      url: "/main/insights",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const activeTeam = data.teams[0];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Sidebar collapsible="icon" className="dark border-zinc-800" {...props}>
      <SidebarHeader className="border-b border-zinc-800 bg-zinc-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-zinc-900 transition-colors text-zinc-50 data-[state=collapsed]:justify-center"
              onClick={toggleSidebar}
            >
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 text-zinc-950 font-bold">
                <activeTeam.logo className="size-4 shrink-0" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-semibold text-zinc-50">
                  {activeTeam.name}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-4 bg-zinc-950">
        <SidebarMenu>
          {data.projects.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  className={cn(
                    "transition-colors hover:bg-zinc-900",
                    "data-[state=collapsed]:justify-center",
                    isActive
                      ? "bg-zinc-800 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-100",
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon className={cn("size-4 shrink-0")} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-zinc-800 p-2 bg-zinc-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log Out"
              onClick={handleLogout}
              className={cn(
                "bg-red-600 hover:bg-red-700 text-white transition-all",
                "data-[state=collapsed]:justify-center",
                "h-9 w-full flex items-center gap-2",
              )}
            >
              <LogOut className="size-4 shrink-0" />
              <span className="truncate">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
