import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          hd: "msu.ac.th",
          prompt: "select_account",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email;
      return (
        typeof email === "string" &&
        email.toLowerCase().endsWith("@msu.ac.th") &&
        profile?.email_verified === true &&
        profile?.hd === "msu.ac.th"
      );
    },
  },
};
