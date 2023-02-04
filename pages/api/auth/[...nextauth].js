import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: `621563810007-v91bcvs3ha2dq0f82mrbplkg6bii1hvn.apps.googleusercontent.com`,
      clientSecret: `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`,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)