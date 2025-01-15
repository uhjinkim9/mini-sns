function getTestMethod(req, res) {
	console.log("응답");
	res.send("<h1>hello api</h1>");
}

const testController = {getTestMethod};

export default testController;
