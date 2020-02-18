import fs = require("fs");
import { ensureDirectoryExistence } from "./utils";

export function addHistory(
  outputFile: string,
  defaultData: any,
  data: any,
  callback: any
): void {
  ensureDirectoryExistence(outputFile);

  fs.readFile(outputFile, (err, fileData) => {
    if (!err) {
      defaultData = JSON.parse(fileData.toString());
    }
    defaultData.data.push(data);

    fs.writeFile(outputFile, JSON.stringify(defaultData), function(err2) {
      if (err2) {
        return callback(err2);
      }
      return callback(null);
    });
  });
}
