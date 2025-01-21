module.exports = {
	name: "proxy-with-body",
	schema: {
		$id: "http://express-gateway.io/schemas/proxy-with-body.json",
		type: "object",
		properties: {
			baseUrl: {
				type: "string",
				format: "uri",
				default: "http://localhost:5002",
			},
		},
	},
	policy: (actionParams) => {
		return (req, res, next) => {
			if (req.body) {
				console.log("Request Body:", req.body);
			}

			const proxyOptions = {
				target: actionParams.baseUrl || "http://localhost:5002",
				changeOrigin: true,
			};

			// 프록시 요청 처리
			const {createProxyMiddleware} = require("http-proxy-middleware");
			const proxy = createProxyMiddleware(proxyOptions);

			return proxy(req, res, next);
		};
	},
};
