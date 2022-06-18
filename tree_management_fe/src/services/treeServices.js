import { BASE_URL } from "../config";
import { getData } from "./services";

function treeCategoryList() {
  const url = BASE_URL + "admin/tree-category/list";
  return getData(url);
}

function treeList(page, all = false) {
  const url = BASE_URL + `admin/tree/list?page=${page}&all=${all}`;
  return getData(url);
}

export { treeCategoryList, treeList };
