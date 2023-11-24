import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import prisma from "@/app/lib/prisma";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }){
      const { name, email } = user;

      if(!email){
        return false
      }
      
      try {
        await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        .then(async (res) => {
          if(res === null) {
            await prisma.user.create({
              data: {
                name,
                email,
              },
            })
          } else {
            console.log('user already exsits! ')
            return true;
          }
        })

        // even if user already exists, sign them in
        return true;

      } catch (err) {
        console.log('errrrr ', err);
        return false;
      }
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }