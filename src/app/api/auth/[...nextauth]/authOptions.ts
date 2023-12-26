import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfigs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: 'email',
          type: 'text'
        },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials?.email) || "", (credentials?.password || "") )
          .then(userCredentail => {
            if (userCredentail.user) {
              return userCredentail.user
            }
            return null
          })
          .catch(error => (console.log(error)))
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
}