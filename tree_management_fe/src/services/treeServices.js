import { BASE_URL } from "../config";
import { getData } from "./services";

function treeCategories() {
  const url = BASE_URL + "admin/tree/list";
  return getData(url);
}

function treeList() {
  const url = BASE_URL + "admin/tree/list";
  return getData(url);
}

export { treeCategories, treeList };
