import {Request, Response, NextFunction} from "express";
import boardService from "@/3_service/boardService";

async function getPages(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response> {
	try {
		const check = await boardService.selectPages();

		if (!check) {
			return res.status(401).json({message: "Page not found"});
		}

		console.log("!!!!!!check: ", check);
		return res.status(200).json(check);
	} catch (err) {
		return res.status(500).json({message: "Internal Server Error"});
	}
}

async function createContent(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response> {
	try {
		const {boardContent, userId} = req.body;
		const check = await boardService.createContent(boardContent, userId);

		if (!check) {
			return res.status(401).json({message: "BoardContent not created"});
		}

		return res.status(200).json(check);
	} catch (err) {
		return res.status(500).json({message: "Internal Server Error"});
	}
}

async function updateContent(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response> {
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
		return res.status(500).json({message: "Internal Server Error"});
	}
}

async function deleteContent(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response> {
	try {
		const {boardIdx} = req.body;
		const check = await boardService.deleteContent(boardIdx);

		if (!check) {
			return res.status(401).json({message: "Contents not deleted"});
		}

		return res.status(200).json(check);
	} catch (err) {
		return res.status(500).json({message: "Internal Server Error"});
	}
}

async function getContents(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response> {
	try {
		const check = await boardService.selectContents();

		if (!check) {
			return res.status(401).json({message: "Contents not found"});
		}

		return res.status(200).json(check);
	} catch (err) {
		return res.status(500).json({message: "Internal Server Error"});
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
