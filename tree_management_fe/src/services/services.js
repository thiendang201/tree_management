import axios from "axios";

async function getData(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function postData(url, data) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export { getData, postData };
