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
async function uploadImg(data) {
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/tdimgclound01/image/upload",
      data
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

export { getData, postData, uploadImg };
