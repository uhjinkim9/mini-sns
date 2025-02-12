/*******************************************************************************
 * useEffect 사용 시 의존성 배열을 []로 두었을 때 두 번 이상 렌더링되는 경우,
 * 이 훅을 통해 중복 렌더링을 방지할 수 있다.
 *
 * <예시>
 * const isMounted = useIsMounted();
 *
 * useEffect(() => {
 * if (isMounted) {
 * 		getBoardContents();
 * 	}
 * }, [isMounted]);
 *******************************************************************************/

import {useEffect, useState} from "react";

const useIsMounted = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	return isMounted;
};

export default useIsMounted;
