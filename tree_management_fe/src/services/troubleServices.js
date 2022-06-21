import { BASE_URL } from "../config";
import { getData, postData } from "./services";

function troubleStatistic(year, page) {
  const url = BASE_URL + `admin/statistic/trouble?page=${page}&year=${year}`;
  return getData(url);
}

export { troubleStatistic };
