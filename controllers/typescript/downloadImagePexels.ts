import { createClient } from "pexels";
import kleur from "kleur";
import https from "node:https";
import fs from "node:fs";

const client = createClient(Bun.env.PEXELS_API_KEY as string);
const query = "Nature";

client.photos.search({ query, per_page: 1 }).then((result) => {
	if ("photos" in result) {
		const imageUrl = result.photos[0].src.medium;
		const imageName = `${query}.jpg`;
		const file = fs.createWriteStream(`../../Video-generator/public/${imageName}`);
		https.get(imageUrl, (response) => {
			response.pipe(file);

			file.on("finish", () => {
				file.close();
				console.log(kleur.blue(`Image downloaded as ${imageName}`));
			});
		});
	} else {
		console.error("Error:", result.error);
	}
});
