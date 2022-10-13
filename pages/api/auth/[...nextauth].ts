import NextAuth, { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        AzureADProvider({
            //@ts-ignore
            clientId: process.env.AZURE_AD_CLIENT_ID,
            //@ts-ignore
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
    },
}

export default NextAuth(authOptions)