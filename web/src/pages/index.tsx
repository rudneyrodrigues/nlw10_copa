import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";

import { api } from "../services/api";

interface HomeProps {
  pools: {
    count: number;
  }
}

const Home: NextPage = ({ pools }: HomeProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bolão da copa</title>

        <meta name="keywords" content="Bolão, Copa do Mundo, Futebol, Football, Soccer, Apostas, React, Next.js" />
        <meta name="description" content="Crie seu próprio bolão da copa e compartilhe com os amigos! Dê seu palpite a cada jogo e veja quantos pontos você consegue no final." />
      </Head>

      <div className="flex flex-col min-h-screen bg-bg-effects bg-no-repeat bg-cover">
        <div className="flex flex-1 items-center justify-center px-4">
          <h1 className="text-2xl font-bold">
            Bolões criados: {pools.count}
          </h1>
        </div>
      </div>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const pools = await (await api.get("/pools/count")).data;

  return {
    props: {
      pools
    },
    revalidate: 3600, // 1 hours
  }
}
