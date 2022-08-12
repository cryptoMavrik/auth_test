import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from "next/image";

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

      <main className="mx-auto flex flex-col items-center justify-center min-h-screen p-4 bg-teal-900">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-200">
          Auth <span className="text-teal-400">Test</span>
        </h1>
        <div className="pt-3 mt-3 text-center">
          {
            !session &&
            <button className="px-[2rem] py-[.5rem] bg-teal-400 rounded-xl text-gray-600 font-bold"
              onClick={() => signIn()}>
              Login
            </button>
          }
          {session &&
            <>
              <div className="flex flex-col justify-center items-center border border-gray-500 rounded-lg">
                {session.user ?
                  <div className="flex flex-col rounded-xl bg-white p-10">
                    <div className="flex justify-center items-center m-auto rounded-full overflow-hidden bg-blue-200 border-2 border-beige-700">
                      <Image src={session.user.image!} width="100px" height="100%" />
                    </div>
                    <p className="font-bold text-gray-700">
                      {session.user.name}
                    </p>
                    <p className="text-gray-600">
                      {session.user.email}
                    </p>
                  </div>
                  : "Loading..."}
              </div>
              <div className="p-5" />
              <button className="px-[2rem] py-[.5rem] bg-teal-100 rounded-xl text-gray-700 font-bold"
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
