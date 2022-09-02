import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { voteOptions } from "../utils/getRandomPokemon";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const [options, setOptions] = useState<number[]>([]);
	useEffect(() => setOptions(voteOptions()), []);

	return (
		<>
			<Head>
				<title>Which Pokémon is rounder? (clone)</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="h-screen w-screen bg-slate-900 flex flex-col items-center space-y-5 justify-center text-white">
					<h1 className="text-2xl">Which Pokémon is rounder again</h1>
					<div className="border rounded p-8 flex justify-between items-center max-w-2xl">
						<div className="w-16 aspect-square bg-red-200 text-black">
							{options[0]}
						</div>
						<div className="p-8">Vs</div>
						<div className="w-16 aspect-square bg-red-200 text-black">
							{options[1]}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
