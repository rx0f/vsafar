import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("creds",credentials)
        const { data:user } = await axios.post("http://localhost:3000/api/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({user,token})
      return { ...token, ...user };
    },

    async session({ session, token }) {
      console.log({session,token})
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    
  },
});

export { handler as GET, handler as POST };
