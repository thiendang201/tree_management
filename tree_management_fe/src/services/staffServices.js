import { BASE_URL } from "../config";
import { getData } from "./services";

function staffList() {
  const url = BASE_URL + "admin/staff/list";
  return getData(url);
}

export { staffList };
