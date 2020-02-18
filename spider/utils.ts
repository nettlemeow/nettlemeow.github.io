import fs = require("fs");
import path = require("path");

export function ensureDirectoryExistence(filePath: string): boolean {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function timeConverter(
  UNIX_timestamp: number,
  onlyMonth: boolean
): string {
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
