'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MODE = process.env.NEXT_PUBLIC_MODE || "dev";

const BASE_URL =
  MODE === "prod" ? "https://insights-services.onrender.com" : "http://localhost:8000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const ApiServices = async (
  method: HttpMethod,
  endpoint: string,
  data?: Record<string, any>,
) => {
const session = await getServerSession(authOptions);
  
  const accessToken = session?.user?.accessToken || null; 

  if (!accessToken) {
    redirect("/login");
  }

  try {
    const url = new URL(`${BASE_URL}${endpoint}`);

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (method === "GET") {
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
    } else {
      if (data) {
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("ApiServices Error:", error);
    throw error;
  }
};
