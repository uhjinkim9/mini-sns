import {dirname} from "path";
import {fileURLToPath} from "url";

// ES Module에서 __dirname 대체 (Node.js 14+)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
