const MAX_DEX_ID = 493;

export const getRandomPokemon = (value?: number): number => {
	const randomNumber = Math.floor(Math.random() * MAX_DEX_ID + 1);

	return value === randomNumber ? getRandomPokemon(value) : randomNumber;
};

export const voteOptions = () => {
	const firstID = getRandomPokemon();
	const secondID = getRandomPokemon(firstID);

	return [firstID, secondID];
};
