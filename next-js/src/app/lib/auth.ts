import NextAuth from "next-auth"
import type { NextAuthOptions, Session } from "next-auth";
import type { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface UserType {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}


export const authOptions: NextAuthOptions  = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch('https://server.aptech.io/auth/login', {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            return null;
          }

          const tokens = await res.json();
          
          if (tokens && tokens.loggedInUser && tokens.access_token) {
            const user = {
              id: String(tokens.loggedInUser.id),
              name: tokens.loggedInUser.name,
              email: tokens.loggedInUser.email,
              accessToken: tokens.access_token,
            };
            return user;
          } else {
            return null;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
   callbacks: {
    
    async jwt({ token, user} : { token: JWT; user: User }) {
      //console.log('callbacks jwt', token, user);
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Create a user object with token properties
      const userObject: UserType = {
        id: (token.sub as string) ?? (token.id as string) ?? "",
        name: (token.name as string) ?? "",
        accessToken: (token.accessToken as string) ?? "",       
        email: (token.email as string) ?? "",
      };

      // Add the user object to the session
      session.user = userObject;
      return session;
    },
  },
};

declare module "next-auth" {
  interface User extends UserType {}
}

declare module "next-auth" {
  interface Session {
    user: UserType & {
      accessToken?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {}
}

export default NextAuth(authOptions);