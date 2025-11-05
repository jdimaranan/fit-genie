import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email ?? "" },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name ?? "",
            email: user.email ?? "",
            image: user.image ?? "",
            onboardingCompleted: false,
          },
        });
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true, onboardingCompleted: true },
        });
        (session.user as any).id = dbUser?.id;
        (session.user as any).onboardingCompleted = dbUser?.onboardingCompleted;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // we’ll handle redirect manually in the frontend
    },
  },
};

// ✅ Create the NextAuth handler using the same config
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
