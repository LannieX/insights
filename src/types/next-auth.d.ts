import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
    fullName?: string;
    phone?: string;
    accessToken?: string;
    image?: string;
    role?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    fullName?: string;
    phone?: string;
    role?: string;
    accessToken?: string;
  }
}