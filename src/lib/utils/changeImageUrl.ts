const changeImageUrl = (url?: string, size = { width: 600, height: 400 }) => {
	// ORIGINAL URL => https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg
	// CHANGED URL => https://media.rawg.io/media/crop/600/400/games/456/456dea5e1c7e3cd07060c14e96612001.jpg

	if (!url) return "";

	const splittedURL = url.split("/media/");
	// ['https://media.rawg.io', 'games/456/456dea5e1c7e3cd07060c14e96612001.jpg']


	const newURL =
		splittedURL[0] +
		`/media/crop/${size.width}/${size.height}/` +
		splittedURL[1];

	return newURL;
};

export default changeImageUrl;
