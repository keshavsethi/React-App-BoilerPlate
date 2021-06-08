import axios from "axios";

export default axios.create({
  baseURL: "https://60beeffd320dac0017be42bd.mockapi.io/api/v1/image",
  headers: {
    "Content-type": "application/json"
  }
});