import boardService from "../service/boardService.js";

async function getPages(req, res, next) {
	try {
		const check = await boardService.selectPages();

		if (!check) {
			return res.status(401).json({message: "Page not found"});
		}

		return res.status(200).json(check);
	} catch (err) {
		res.status(500).json({message: "Internal Server Error"});
	}
}

async function createContent(req, res, next) {
	try {
		const {boardContent, userId} = req.body;
		const check = await boardService.createContent(boardContent, userId);

		if (!check) {
			return res.status(401).json({message: "BoardContent not created"});
		}

		return res.status(200).json(check);
	} catch (err) {
		res.status(500).json({message: "Internal Server Error"});
	}
}

async function updateContent(req, res, next) {
	try {
		const {boardIdx, boardContent, userId} = req.body;
		const check = await boardService.updateContent(
			boardIdx,
			boardContent,
			userId
		);

		if (!check) {
			return res.status(401).json({message: "BoardContent not updated"});
		}

		return res.status(200).json(check);
	} catch (err) {
		res.status(500).json({message: "Internal Server Error"});
	}
}

async function deleteContent(req, res, next) {
	try {
		const {boardIdx} = req.body;
		const check = await boardService.deleteContent(boardIdx);

		if (!check) {
			return res.status(401).json({message: "Contents not deleted"});
		}

		return res.status(200).json(check);
	} catch (err) {
		res.status(500).json({message: "Internal Server Error"});
	}
}

async function getContents(req, res, next) {
	try {
		const check = await boardService.selectContents();

		if (!check) {
			return res.status(401).json({message: "Contents not found"});
		}

		return res.status(200).json(check);
	} catch (err) {
		res.status(500).json({message: "Internal Server Error"});
	}
}

const boardController = {
	getPages,
	createContent,
	updateContent,
	deleteContent,
	getContents,
};
export default boardController;
