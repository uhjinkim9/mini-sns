import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

/**
 * 최상위 루트 가리키는 함수
 */

// ES Module에서 __dirname 대체 (Node.js 14+)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 루트 디렉토리 경로로 변환
const rootDir = resolve(__dirname, "../");

export default rootDir;
