import axios from "axios";
import { writeFile } from "fs";
import async = require("async");

const COMMON_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
};

export function get_video_list(mid, pn, ps, callback) {
  const url = `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=${ps}&tid=0&pn=${pn}&keyword=&order=pubdate&jsonp=jsonp`;

  axios
    .get(url, { headers: COMMON_HEADERS })
    .then(function (response) {
      return callback(null, response.data.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return callback(error);
    });
}

export function get_all_video_list(mid, callback) {
  const pn = 1;
  const ps = 30;
  const plimit = 5;
  get_video_list(mid, pn, ps, function (err, response) {
    const { count } = response.page;
    const total = Math.ceil(count / ps);
    const tasks: any[] = [];
    for (let i = 1; i <= total; i++) {
      tasks.push((cb) => {
        get_video_list(mid, i, ps, cb);
      });
    }
    async.parallelLimit(tasks, plimit, function (err, resultArray) {
      let result: any[] = [];
      resultArray.forEach((r) => {
        result = result.concat(r.list.vlist);
      });

      callback(err, result);
    });
  });
}

export function get_follow_info(mid, callback) {
  const url = `https://api.bilibili.com/x/relation/stat?vmid=${mid}`;

  axios
    .get(url, { headers: COMMON_HEADERS })
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
