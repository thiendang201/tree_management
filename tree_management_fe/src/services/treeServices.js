import { BASE_URL } from "../config";
import { getData, postData, putData } from "./services";

function treeCategoryList() {
  const url = BASE_URL + "admin/tree-category/list";
  return getData(url);
}

function treeList(page, all = false) {
  const url = BASE_URL + `admin/tree/list?page=${page}&all=${all}`;
  return getData(url);
}

function getTree(id) {
  const url = BASE_URL + "admin/tree/list/" + id;
  return getData(url);
}

function search(params, page) {
  const url = BASE_URL + `admin/tree/search?page=${page}`;
  return postData(url, params);
}

function create(tree) {
  const url = BASE_URL + `admin/tree/create`;
  return postData(url, tree);
}

function update(tree) {
  const url = BASE_URL + `admin/tree/update`;
  return putData(url, tree);
}

function remove(ids) {
  const url = BASE_URL + `admin/tree/delete`;
  return putData(url, ids);
}

function treeStatistic(params, page) {
  const url = BASE_URL + `admin/statistic/tree?page=${page}`;
  return postData(url, params);
}

export {
  treeCategoryList,
  treeList,
  search,
  treeStatistic,
  create,
  remove,
  getTree,
  update,
};
