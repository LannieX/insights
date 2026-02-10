import {payloadLogin } from "@/types/authType";

export const login = async (credentials: payloadLogin) => {
  const BASE_URL = process.env.NEXT_PUBLIC_MODE === "prod" 
    ? "https://www.test-servies.com" 
    : "http://localhost:8000";

    console.log(`🚀 Connecting to Backend: ${BASE_URL}/login`);

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
      cache: 'no-store'
    });

    if (!res.ok) {
      return null;
    }

    const user = await res.json();
    return user;

  } catch (error) {
    console.error("Login Fetch Error:", error);
    return null;
  }
};