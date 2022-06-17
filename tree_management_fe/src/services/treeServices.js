import { BASE_URL } from "../config";
import { getData } from "./services";

function treeCategories() {
  const url = BASE_URL + `category`;
  return getData(url);
}

export { treeCategories };
