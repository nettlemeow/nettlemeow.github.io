import Writer from "./writer";
import fs = require("fs");
import path = require("path");

function ensureDirectoryExistence(filePath: string): boolean {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
import { get_video_list } from "./bilibili";
function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
function timeConverter(UNIX_timestamp: number, onlyMonth: boolean): string {
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if (onlyMonth) {
    return year.toString() + pad(month.toString(), 2);
  }
  var time =
    year +
    "/" +
    pad(month, 2) +
    "/" +
    pad(date, 2) +
    " " +
    pad(hour, 2) +
    ":" +
    pad(min, 2) +
    ":" +
    pad(sec, 2);
  return time;
}

get_video_list((err, data) => {
  if (err) throw err;
  const now = Math.round(+new Date() / 1000);
  data.forEach(({ title, created, aid, pic, play, video_review }) => {
    const thumbnail = "https:" + pic + "@560w_350h_100Q_1c.webp";
    const w = new Writer(title, timeConverter(created, false), thumbnail);
    const output = `../source/_posts/dynamic/${aid}.md`;
    ensureDirectoryExistence(path.join(__dirname, output));
    w.writeText(title);
    w.writeAV(aid);
    fs.writeFile(path.join(__dirname, output), w.getContent(), function(err) {
      if (err) {
        return console.error(err);
      }
      console.log(`${title} created!`);
    });

    const yearmonth = timeConverter(now, true);
    const target = `../source/data/video/av${aid}/${yearmonth}.json`;
    ensureDirectoryExistence(path.join(__dirname, target));

    let data = { yearmonth: yearmonth, data: [] };
    fs.readFile(path.join(__dirname, target), (err, fileData) => {
      if (!err) {
        data = JSON.parse(fileData.toString());
      }
      data.data.push([now, play, video_review]);

      fs.writeFile(path.join(__dirname, target), JSON.stringify(data), function(
        err2
      ) {
        if (err2) {
          return console.error(err2);
        }
        console.log(`${title} data updated!`);
      });
    });
  });
});
