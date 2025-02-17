import {JWT_PRIVATE_KEY, JWT_PUBLIC_KEY} from "../0_util/context/config";
import jwt from "jsonwebtoken";

try {
	const token =
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsImNvbXBhbnlJZCI6IjEwMDAiLCJpYXQiOjE3Mzk3ODQ0NjEsImV4cCI6MTczOTc4NDQ4MX0.cqgtpYH-qzQNGPcSi469ERo73R5S3b1fB8dgWzqeg4L66ZvKIxyYyDWVqrrz9Ev_rfdXRscrAVUWYTs0A3bRbrX99wE0nO9VGDyMyLzq8KhO9WcUZ8iq9vgIYdGKQxFCAowRrllSxgFR93afRRV4i9vtwNv_yL24l5Vi1_8JMvHsKg77O4ERRM2sFqTF4Qve5iARvUpCZw6JZVNrUJR9p5ZeP_SQJSAiJw54R8Zu0NrcSMb7GULsQDknuMZCsB9mDysha7Ux2dk_m-0VWdTFxHgNy5J6YDY5SPQYr9in_7Q7ZI4dNH89lcwFCrW37bwhA3OSy9hBshWOmqf51RAcXA";

	const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
	if (decoded) {
		console.log(true);
	} else {
		console.log(false);
	}
} catch (err) {
	console.error(err);
}
