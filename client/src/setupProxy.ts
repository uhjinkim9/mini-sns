import {createProxyMiddleware} from "http-proxy-middleware";
import {GATEWAY_URL} from "./util/context/config";

// /api로 시작하는 요청이 http://localhost:5001으로 프록시
export default function (app: any) {
	app.use(
		"/api", // 프록시할 경로
		createProxyMiddleware({
			target: GATEWAY_URL,
			changeOrigin: true,
			secure: false,
		})
	);
}
