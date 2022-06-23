import { BASE_URL } from "../config";
import { deleteData, getData, postData, putData } from "./services";

function planList() {
  const url = BASE_URL + "admin/plan/list";
  return getData(url);
}

function getPlan(id) {
  const url = BASE_URL + "admin/plan/list/" + id;
  return getData(url);
}

function addPlan(data) {
  const url = BASE_URL + "admin/plan/create";
  return postData(url, data);
}

function update(plan) {
  const url = BASE_URL + `admin/plan/update`;
  return putData(url, plan);
}

function deletePlan(id) {
  const url = BASE_URL + "admin/plan/delete/" + id;
  return deleteData(url);
}

function planStatistic(status, year, month, page) {
  const url =
    BASE_URL +
    `admin/statistic/plan?page=${page}&status=${status}&year=${year}&month=${month}`;
  return getData(url);
}

export { planList, addPlan, planStatistic, deletePlan, getPlan, update };
