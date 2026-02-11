import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/services/auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
       try {
      const res = await login({
        username: credentials.username,
        password: credentials.password,
      });

      if (res && res.data && res.data.accessToken) {
        const userProfile = res.data.items;
        const token = res.data.accessToken;

        return {
          id: userProfile?.id || "no-id",
          username: userProfile?.username,
          fullName: userProfile?.fullName,
          email: userProfile?.email,
          image: userProfile?.image,
          phone: userProfile?.phone,
          role: userProfile?.role,
          accessToken: token,
        } as any;
      }

          return null;

        } catch (error) {
          console.error("Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };