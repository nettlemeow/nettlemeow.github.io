import axios from "axios";
import { writeFile } from "fs";

export function get_video_list(callback) {
  const mid = "116683";
  const url = `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp`;

  axios
    .get(url)
    .then(function (response) {
      return callback(null, response.data.data.list.vlist);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return callback(error);
    });
}

export function get_follow_info(callback) {
  const mid = "116683";
  const url = `https://api.bilibili.com/x/relation/stat?vmid=${mid}`;

  axios
    .get(url)
    .then(function (response) {
      return callback(null, response.data.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return callback(error);
    });
}

export function downloadImage(url, target, callback) {
  axios
    .get(url, { responseType: "arraybuffer" })
    .then(function (response) {
      return writeFile(target, response.data, callback);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return callback(error);
    });
}
