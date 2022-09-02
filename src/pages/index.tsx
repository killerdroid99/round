import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { voteOptions } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const btn =
		"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
	const [options, setOptions] = useState<number[]>([]);
	useEffect(() => setOptions(voteOptions()), []);

	const firstPokemon = trpc.useQuery([
		"pokemon.get-pokemon-by-id",
		{ id: options[0] as number },
	]);

	const secondPokemon = trpc.useQuery([
		"pokemon.get-pokemon-by-id",
		{ id: options[1] as number },
	]);

	const voteForRoundest = (id: number) => {
		console.log(id);
	};

	const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>Which Pokémon is rounder? (clone)</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<header className="bg-slate-800 lg:px-10 py-2 inline-flex w-full justify-end fixed top-0">
					{status === "unauthenticated" && (
						<div>
							<button
								className={btn + "bg-emerald-500"}
								onClick={() => signIn()}
							>
								Login
							</button>
						</div>
					)}
					{status === "authenticated" && (
						<div className="space-x-4 text-sm font-bold text-white">
							<span>{session.user?.name}</span>
							<button
								className={btn + "bg-emerald-500"}
								onClick={() => signOut()}
							>
								Logout
							</button>
						</div>
					)}
					{status === "loading" && (
						<div className="space-x-4 text-sm font-bold text-white">
							<button
								className={btn + "bg-emerald-500 animate-pulse"}
								onClick={() => signOut()}
							>
								Loading...
							</button>
						</div>
					)}
				</header>
				<div className="h-screen w-screen bg-slate-900 flex flex-col items-center space-y-5 pt-[10rem] text-white">
					<h1 className="text-2xl">Which Pokémon is rounder again</h1>
					<div className="border rounded p-8 pb-4 flex justify-between items-center max-w-2xl">
						<div className="w-[50rem] aspect-square place-items-center text-center">
							{firstPokemon.isLoading ? (
								<div>Loading Pokémon...</div>
							) : (
								<>
									<span className="text-xl text-center capitalize w-full -mb-8">
										{firstPokemon.data?.name}
									</span>
									<Image
										src={firstPokemon.data?.sprites.front_default as string}
										alt={options[0]?.toString() as string}
										width={250}
										height={250}
									/>
									<button
										onClick={() => voteForRoundest(options[0] as number)}
										className={btn}
									>
										Rounder
									</button>
								</>
							)}
						</div>
						<div className="p-8 text-lg">Vs</div>
						<div className="w-[50rem] aspect-square place-items-center text-center">
							{secondPokemon.isLoading ? (
								<div>Loading Pokémon...</div>
							) : (
								<>
									<span className="text-xl text-center capitalize w-full -mb-8">
										{secondPokemon.data?.name}
									</span>
									<Image
										src={secondPokemon.data?.sprites.front_default as string}
										alt={options[1]?.toString() as string}
										width={250}
										height={250}
									/>
									<button
										onClick={() => voteForRoundest(options[1] as number)}
										className={btn}
									>
										Rounder
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
