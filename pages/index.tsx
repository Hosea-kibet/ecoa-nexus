import type { NextPage } from 'next'
import Layout from '../components/layout'
import {signIn, signOut, useSession} from "next-auth/react";
import {NextResponse} from "next/server";
import {redirect} from "next/dist/server/api-utils";

const Home: NextPage = () => {
    const {data: session, status} = useSession()
    const loading = status === "loading"

  return (
      <div>
          <Layout>
              <h1> Business summary</h1>
    <div className="flex justify-center font-bold mt-80 text-xl text-[rgb(245,132,38,0.93)]">
      <h1>Development ongoing.Coming soon @2022</h1>
      </div>
          </Layout>
      </div>
  )
}

export default Home;

