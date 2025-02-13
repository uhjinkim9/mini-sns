import React, {JSX} from "react";

export default function Main(): JSX.Element {
	const aboveTitle: string = "내 정보";
	const title: string = "EJ";
	const subTitle: string = "사원";
	const content: string = "오늘의 기분";

	return (
		<>
			<p>{aboveTitle}</p>
			<p>{title}</p>
			<p>{subTitle}</p>
			<p>{content}</p>
		</>
	);
}
