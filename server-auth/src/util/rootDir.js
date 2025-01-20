import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

/**
 * 현재 앱 루트 경로 가리키는 함수
 */

// ES Module에서 __dirname 대체 (Node.js 14+)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 루트 디렉토리 경로로 변환
const rootDir = resolve(__dirname, "../.."); // 현재 디렉토리에서 두 단계 위로 이동

export default rootDir;
