import Page from "../model/page.js";
import BoardContent from "../model/boardContent.js";

async function createContent(boardContent, userId) {
	try {
		await BoardContent.create({
			boardContent: boardContent,
			creator: userId,
		});
		return true;
	} catch (error) {
		console.error("Error creating board-content in DB:", error);
		throw new Error("Failed to create board-content in DB");
	}
}

async function updateContent(boardIdx, boardContent, userId) {
	try {
		if (!boardContent) {
			throw new Error("boardContent cannot be null or undefined");
		}
		await BoardContent.update(
			{
				boardContent: boardContent,
				creator: userId,
			},
			{
				where: {
					idx: boardIdx,
				},
			}
		);
		return true;
	} catch (error) {
		console.error("Error updating board-content in DB:", error);
		throw new Error("Failed to update board-content in DB");
	}
}

async function deleteContent(boardIdx) {
	try {
		if (!boardIdx) {
			throw new Error("No boardIdx");
		}
		await BoardContent.destroy({
			where: {
				idx: boardIdx,
			},
		});
		return true;
	} catch (error) {
		console.error("Error deleting board-content in DB:", error);
		throw new Error("Failed to delete board-content in DB");
	}
}

async function selectPages() {
	return await Page.findAll();
}

async function selectContents() {
	return await BoardContent.findAll();
}

const boardService = {
	createContent,
	selectPages,
	updateContent,
	deleteContent,
	selectContents,
};
export default boardService;
