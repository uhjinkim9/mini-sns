import Page from "../model/page.js";

async function getPages(req, res, next) {
	try {
		const pages = await Page.findAll();

		if (!pages) {
			console.log("페이지가 존재하지 않습니다.");
			return res.status(401).json({message: "Page not found"});
		}

		return res.status(200).json(pages);
	} catch (err) {
		res.status(500).json({message: "Internal Server Error"});
	}
}

const pageController = {getPages};
export default pageController;
