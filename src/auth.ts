import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          if (!prisma) {
             console.error("Prisma client is not initialized");
             return null;
          }
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          // Simplified for hackathon: No hashing logic yet, assuming plain password for demo
          // In real production, use bcrypt/argon2
          if (user && user.password === credentials.password) {
            return { id: user.id, name: user.name, email: user.email, role: user.role };
          }
        } catch (error) {
          console.error("Auth database error:", error);
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
