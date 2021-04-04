import Sidebar from "../components/Sidebar";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Panda Chat - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </main>
  );
}
