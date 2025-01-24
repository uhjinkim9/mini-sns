import Card from "../../components/surfaces/Card";
import MultilineTextFields from "../../components/inputs/MultilineTextFields";
import ButtonGroup from "../../components/inputs/ButtonGroup";

export default function Main() {
	const aboveTitle = "내 정보";
	const title = "EJ";
	const subTitle = "사원";
	const content = "오늘의 기분";

	return (
		<>
			<Card
				aboveTitle={aboveTitle}
				title={title}
				subTitle={subTitle}
				content={content}
			/>
			<MultilineTextFields></MultilineTextFields>
			<ButtonGroup></ButtonGroup>
		</>
	);
}
