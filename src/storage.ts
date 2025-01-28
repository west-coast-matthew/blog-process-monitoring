import { AsyncLocalStorage } from "async_hooks";
const storage = new AsyncLocalStorage<{[key: string]: any}>(); 
export default storage;