import Page from "@/4. model/page";
import BoardContent from "@/4. model/boardContent";

interface BoardContentData {
	boardContent: string;
	creator: string;
}

async function createContent(
	boardContent: string,
	userId: string
): Promise<boolean> {
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

async function updateContent(
	boardIdx: number,
	boardContent: string,
	userId: string
): Promise<boolean> {
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

async function deleteContent(boardIdx: number): Promise<boolean> {
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

async function selectPages(): Promise<Page[]> {
	return await Page.findAll();
}

async function selectContents(): Promise<BoardContent[]> {
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
