import { BASE_URL } from "../config";
import { getData } from "./services";

function treeCategoryList() {
  const url = BASE_URL + "admin/tree-category/list";
  return getData(url);
}

function treeList(page) {
  const url = BASE_URL + "admin/tree/list?page=" + page;
  return getData(url);
}

export { treeCategoryList, treeList };
