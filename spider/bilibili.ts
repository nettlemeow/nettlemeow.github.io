import axios from "axios";
export function get_video_list(callback) {
  const url = `https://api.bilibili.com/x/space/arc/search?mid=116683&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp`;

  axios
    .get(url)
    .then(function(response) {
      return callback(null, response.data.data.list.vlist);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}
export function get_video_detail() {}
