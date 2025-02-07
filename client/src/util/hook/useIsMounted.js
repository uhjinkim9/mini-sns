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

/**
 * const isMounted = useIsMounted();
 * 비동기 요청이 취소된 후 setState 호출 방지 등에 사용
 *
 * useEffect(() => {
 * if (isMounted) {
 * 		getBoardContents();
 * 	}
 * }, [isMounted]);
 */
