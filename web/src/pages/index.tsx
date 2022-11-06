import Head from "next/head";
import Image from "next/image";
import { toast } from 'react-hot-toast';
import { FormEvent, useState } from "react";
import { GetStaticProps, type NextPage } from "next";

import { api } from "../services/api";

interface HomeProps {
  pools: {
    count: number;
  },
  guesses: {
    count: number;
  },
  users: {
    count: number;
  },
}

const Home: NextPage = ({ pools, guesses, users }: HomeProps): JSX.Element => {
  const [inputPool, setInputPool] = useState('');

  const createNewPool = async (e: FormEvent) => {
    e.preventDefault();
    if (inputPool.trim() === '') {
      return (
        toast.error("Preencha o campo com o nome do bolão a ser criado!")
      )
    }

    try {
      const response = await api.post('/pools', {
        title: inputPool.trim(),
      })

      const { code } = response.data;
      await navigator.clipboard.writeText(code);

      toast.success(`Bolão criado com sucesso.\n\nO código ${code} foi copiado para a área de transferência!`, {
        duration: 10000,
        style: {
          background: "#121214",
          color: "#ffffff",
        }
      })

      setInputPool('');
    } catch (error) {
      console.log(error);
      toast.error('Falha ao criar bolão')
    }
  }

  return (
    <>
      <Head>
        <title>Bolão da copa</title>

        <meta name="keywords" content="Bolão, Copa do Mundo, Futebol, Football, Soccer, Apostas, React, Next.js" />
        <meta name="description" content="Crie seu próprio bolão da copa e compartilhe com os amigos! Dê seu palpite a cada jogo e veja quantos pontos você consegue no final." />
      </Head>

      <div className="flex flex-col min-h-screen bg-bg-effects bg-no-repeat bg-cover px-2 py-20">
        <div className="max-w-[489px] lg:max-w-[1124px] mx-auto flex-1 lg:grid grid-cols-2 gap-28 items-center justify-center">
          <main>
            <Image
              src="/images/logo.svg"
              alt="NLW Copa"
              width={212.06}
              height={40}
              quality={100}
            />

            <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
              Crie seu próprio bolão da copa e compartilhe entre amigos!
            </h1>

            <div className="mt-10 flex items-center gap-2">
              <Image
                src="/images/users-avatar-example.png"
                alt="Avatares dos usuários"
                width={150}
                height={48.28}
                quality={100}
              />

              <strong className="text-xl">
                <span className="text-green-300">+{users.count}</span> {users.count <= 1 ? "pessoa já está usando" : "pessoas já estão usando"}
              </strong>
            </div>

            <form onSubmit={createNewPool} className="mt-10 flex items-center gap-2">
              <input
                type="text"
                name="pool"
                id="poll"
                value={inputPool}
                onChange={e => setInputPool(e.target.value)}
                placeholder="Qual o nome do seu bolão?"
                className="flex-1 h-14 rounded bg-zinc-800 px-6 text-sm ring-1 ring-zinc-600 transition-colors focus:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="h-14 rounded px-6 bg-yellow-500 text-zinc-950 text-sm font-bold uppercase transition-all hover:brightness-75 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Criar meu bolão
              </button>
            </form>

            <p className="mt-4 max-w-[400px] text-sm text-zinc-300 leading-relaxed">
              Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
            </p>

            <div className="mt-10 pt-10 flex items-center justify-between border-t border-t-zinc-600">
              <div className="flex items-center gap-6">
                <Image
                  src="/images/icon-check.svg"
                  alt="Check"
                  width={40}
                  height={40}
                  quality={100}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-2xl">
                    +{pools.count}
                  </span>
                  <span>
                    {pools.count <= 1 ? "Bolão criado" : "Bolões criados"}
                  </span>
                </div>
              </div>

              <div className="w-px h-14 bg-zinc-600" />

              <div className="flex items-center gap-6">
                <Image
                  src="/images/icon-check.svg"
                  alt="Check"
                  width={40}
                  height={40}
                  quality={100}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-2xl">
                    +{guesses.count}
                  </span>
                  <span>
                    {guesses.count <= 1 ? "Palpite enviado" : "Palpites enviados"}
                  </span>
                </div>
              </div>
            </div>
          </main>

          <Image
            src="/images/app-nlw-copa-preview.png"
            alt="Preview da aplicação NLW"
            width={518}
            height={605}
            quality={100}
            className="hidden lg:block"
          />
        </div>
      </div>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const [pools, guesses, users] = await Promise.all([
    api.get("/pools/count"),
    api.get("/guesses/count"),
    api.get("/users/count"),
  ])

  return {
    props: {
      pools: pools.data,
      guesses: guesses.data,
      users: users.data,
    },
    revalidate: 600, // 10 minutes
  }
}
