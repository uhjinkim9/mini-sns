import React, {useEffect, useState, MouseEvent} from "react";
import useIsMounted from "../../../util/hook/useIsMounted.js";

import Container from "@mui/material/Container";
import {CssBaseline} from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";

import Input from "../../components/input/Input";
import Button from "../../components/input/Button";

import {isEmpty} from "../../../util/validator/emptyCheck";
import {requestPost} from "../../../util/axios/apiService";
import {useAlert} from "../../../util/hook/useAlert";

interface BoardContent {
	idx: number;
	creator: string;
	boardContent: string;
	createdAt: string;
}

const Item = styled(Paper)(({theme}) => ({
	backgroundColor: "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	...theme.applyStyles("dark", {
		backgroundColor: "#1A2027",
	}),
}));

export default function Board() {
	const {showAlert} = useAlert();

	const userId: string | null = localStorage.getItem("userId");
	const [conts, setConts] = useState<BoardContent[]>([]);
	const [boardCont, setBoardCont] = useState<string>("");
	const isMounted = useIsMounted();

	// event: React.MouseEvent<HTMLButtonElement>
	async function onClickSave(e: React.MouseEvent<HTMLButtonElement>) {
		let url: string = "/board/createContent";
		let param: {userId: string | null; boardContent: string} = {
			userId: userId,
			boardContent: boardCont,
		};

		// if (boardIdx) {
		// 	if (contentEditRef.current) {
		// 		content = contentEditRef.current.value;
		// 	}
		// 	url = "/board/updateContent";
		// 	param = {userId, boardContent: content, boardIdx};
		// } else {
		// 	if (contentRef.current) {
		// 		content = contentRef.current.value;
		// 	}
		// 	url = "/board/createContent";
		// 	param = {userId, boardContent: content};
		// }

		if (isEmpty(boardCont)) {
			showAlert("warning", "Please enter the text.");
			return;
		}

		try {
			await requestPost(url, param);
			getBoardContents();
			onClickReset();
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	function onChangeInput(
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		setBoardCont(() => e.target.value);
	}

	function onClickReset() {
		setBoardCont(() => "");
	}

	// function onClickEdit(index: number, boardIdx: number) {
	// 	if (activeButton[index] === 1) {
	// 		// 수정 완료 후 저장
	// 		setActiveButton((prev) => ({
	// 			...prev,
	// 			[index]: 0,
	// 		}));
	// 		onClickSave(index, boardIdx);
	// 	} else {
	// 		// 수정 모드 활성화
	// 		setActiveButton((prev) => ({
	// 			...prev,
	// 			[index]: 1,
	// 		}));
	// 	}
	// }

	async function onClickDelete(boardIdx: number) {
		const url = "/board/deleteContent";
		const param = {boardIdx};
		try {
			await requestPost(url, param);
			getBoardContents();
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	async function getBoardContents() {
		const url = "/board/getContents";

		try {
			const res = await requestPost(url);
			if (Array.isArray(res)) {
				setConts(res);
			} else {
				console.error("Unexpected response format:", res);
			}
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	useEffect(() => {
		if (isMounted) {
			getBoardContents();
		}
	}, [isMounted]);

	return (
		<>
			<CssBaseline />
			<Container
				maxWidth="md"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Input
					label="Jot down your thoughts..."
					onChange={onChangeInput}
					slotProps={{inputLabel: {shrink: true}}}
					value={boardCont}
				/>
				<Button onClick={onClickReset}>초기화</Button>
				<Button onClick={onClickSave}>저장</Button>
				<Stack spacing={4}>
					{conts
						.slice() // 복사본
						.reverse() // reverse만 사용하면 원본 배열이 변형되기에, slice()와 함께 사용
						.map((content, index) => {
							const date = new Date(content.createdAt);
							const formattedDate = date.toLocaleString();

							return (
								<React.Fragment key={content.idx}>
									<Item>
										[{index + 1}] {content.creator}:
										<br />
										<span>{content.boardContent}</span>
										<br />({formattedDate})
										<Button>수정</Button>
										<Button
											onClick={() => {
												onClickDelete(content.idx);
											}}
										>
											삭제
										</Button>
									</Item>
								</React.Fragment>
							);
						})}
				</Stack>
			</Container>
		</>
	);
}
