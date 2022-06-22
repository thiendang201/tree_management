import { BASE_URL } from "../config";
import { deleteData, getData, postData } from "./services";

function planList() {
  const url = BASE_URL + "admin/plan/list";
  return getData(url);
}

function addPlan(data) {
  const url = BASE_URL + "admin/plan/create";
  return postData(url, data);
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

export { planList, addPlan, planStatistic, deletePlan };
