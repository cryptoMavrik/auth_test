import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data: session, status } = useSession();
  console.log(session, status);


  return (
    <>
      <Head>
        <title>Auth Test</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Auth <span className="text-teal-400">Test</span>
        </h1>
        <div className="pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
          {
            !session &&
            <button className="px-[2rem] py-[.5rem] bg-teal-400 rounded-xl text-gray-600 font-bold"
              onClick={() => signIn()}>
              Login
            </button>
          }
          {session &&
            <>
              <p>
                <span className="font-bold">{session.user ? session.user.name : "Loading..."}</span>
              </p>
              <button className="px-[2rem] py-[.5rem] bg-teal-400 rounded-xl text-gray-600 font-bold"
                onClick={() => signOut()}>
                Logout
              </button>
            </>
          }
        </div>
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
      </main>
    </>
  );
};

export default Home;
