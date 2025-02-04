import React, {useEffect, useRef, useState} from "react";

import Container from "@mui/material/Container";
import {CssBaseline} from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";

import MultilineTextFields from "../../components/inputs/MultilineTextFields";
import ButtonGroup from "../../components/inputs/ButtonGroup";
import {useAlert} from "../../components/feedback/AlertProvider.jsx";

import connect from "../../../util/fetch/connect.js";
import useIsMounted from "../../../util/hook/useIsMounted.js";
import checkStatus from "../../../util/tools/checkStatus.js";

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
	const contentRef = useRef();
	const contentEditRef = useRef();
	const isMounted = useIsMounted();
	const {showAlert} = useAlert();

	const userId = localStorage.getItem("userId");
	const [conts, setConts] = useState([]);
	const [activeButton, setActiveButton] = useState({});

	async function onClickSave(index, boardIdx = null) {
		let content;
		let url;
		let param = {userId: userId, boardContent: content};

		if (boardIdx) {
			content = contentEditRef.current.value;
			url = "/api/board/updateContent";
			param = {...param, boardContent: content, boardIdx: boardIdx};
		} else {
			content = contentRef.current.value;
			url = "/api/board/createContent";
			param = {...param, boardContent: content};
		}

		if (checkStatus.isEmpty(content)) {
			showAlert("warning", "Please enter the text.");
			return;
		}

		try {
			const res = await connect.requestFetch(url, param);
			const statCd = res.status;
			if (res && statCd === 200) {
				getBoardContents();
				onClickReset();
			} else if (statCd === 401) {
				console.log("Failed response: ", res.data);
			} else {
				console.log("Unexpected response status: ", statCd);
			}
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	function onClickReset() {
		if (contentRef.current) {
			contentRef.current.value = "";
		}
		if (contentEditRef.current) {
			contentEditRef.current.value = "";
		}
	}

	function onClickEdit(index, boardIdx) {
		if (activeButton[index] === 1) {
			// 수정 완료 후 한 번 더 눌러 저장할 때
			setActiveButton((prev) => ({
				...prev,
				[index]: 0,
			}));
			onClickSave(index, boardIdx);
		} else {
			//
			setActiveButton((prev) => ({
				// 수정 시작할 때
				...prev,
				[index]: 1,
			}));
		}
	}

	async function onClickDelete(index, boardIdx) {
		setActiveButton((prev) => ({
			...prev,
			[index]: 2,
		}));
		setTimeout(() => {
			setActiveButton((prev) => ({
				...prev,
				[index]: 0,
			}));
		}, 100);

		const url = "/api/board/deleteContent";
		const param = {boardIdx: boardIdx};
		try {
			const res = await connect.requestFetch(url, param); // 응답
			const statCd = res.status;
			if (res && statCd === 200) {
				getBoardContents();
			} else if (statCd === 401) {
				console.log("Failed response: ", res.data);
			} else {
				console.log("Unexpected response status: ", statCd);
			}
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	async function getBoardContents() {
		const url = "/api/board/getContents";
		const param = {};
		try {
			const res = await connect.requestFetch(url, param);
			const statCd = res.status;
			if (res && statCd === 200) {
				setConts(res.data);
			} else if (statCd === 401) {
				console.log("Failed response: ", res.data);
			} else {
				console.log("Unexpected response status: ", statCd);
			}
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	useEffect(() => {
		// if (isMounted) {
		getBoardContents();
		// }
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
				<MultilineTextFields
					label="Jot down your thoughts..."
					ref={contentRef}
					rows={4}
				></MultilineTextFields>
				<ButtonGroup
					onClickButtonOne={onClickSave}
					onClickButtonTwo={onClickReset}
					textButtonOne={"저장"}
					textButtonTwo={"초기화"}
				></ButtonGroup>
				<Stack spacing={4}>
					{conts
						.slice() // 복사본
						.reverse() // reverse만 사용하면 원본 배열이 변형되기에, slice()와 함께 사용
						.map((content, index) => {
							const date = new Date(content.createdAt);
							const formattedDate = date.toLocaleString();
							return (
								<React.Fragment key={String(content.idx)}>
									<Item>
										[{index + 1}] {content.creator}:
										<br />
										{activeButton[index] === 1 ? (
											<MultilineTextFields
												defaultValue={
													content.boardContent
												}
												ref={contentEditRef}
												rows={2}
											></MultilineTextFields>
										) : (
											<span>{content.boardContent}</span>
										)}
										<br />({formattedDate})
										<ButtonGroup
											onClickButtonOne={() =>
												onClickEdit(index, content.idx)
											}
											onClickButtonTwo={() =>
												onClickDelete(
													index,
													content.idx
												)
											}
											textButtonOne={"수정"}
											textButtonTwo={"삭제"}
											size={"small"}
											activeButton={activeButton[index]}
										></ButtonGroup>
									</Item>
								</React.Fragment>
							);
						})}
				</Stack>
			</Container>
		</>
	);
}
