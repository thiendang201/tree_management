import { BASE_URL } from "../config";
import { getData } from "./services";

function planList() {
  const url = BASE_URL + "admin/plan/list";
  return getData(url);
}

export { planList };
