import fs = require("fs");
import path = require("path");

import Post from "./post";
import { addHistory } from "./history";
import { get_video_list, get_follow_info, downloadImage } from "./bilibili";
import { ensureDirectoryExistence, timeConverter } from "./utils";

const now = Math.round(+new Date() / 1000);
const yearmonth = timeConverter(now, true);

get_video_list((err, data) => {
  if (err) throw err;

  data.forEach(
    ({ title, created, aid, pic, play, video_review, description }) => {
      const imageUrl = pic + "@560w_350h_100Q_1c.webp";
      const thumbnail = "/images/" + aid + ".webp";
      const outputImageFile = path.join(
        __dirname,
        `../source${thumbnail}`
      );
      downloadImage(imageUrl, outputImageFile, function (err) {
        const newPost = new Post(
          title,
          timeConverter(created, false),
          thumbnail
        );
        const output = `../source/_posts/dynamic/${aid}.md`;
        ensureDirectoryExistence(path.join(__dirname, output));
        newPost.writeAVVideo(aid);
        newPost.writeText(description);
        newPost.writeAVStat(aid);
        fs.writeFile(
          path.join(__dirname, output),
          newPost.getContent(),
          function (err) {
            if (err) {
              return console.error(err);
            }
            console.log(`${title} created!`);
          }
        );

        const outputFile = path.join(
          __dirname,
          `../source/data/video/av${aid}/${yearmonth}.json`
        );

        addHistory(
          outputFile,
          { yearmonth: yearmonth, data: [] },
          [now, play, video_review],
          () => {
            console.log(`${title} data updated!`);
          }
        );
      });
    }
  );
});

get_follow_info((err, { follower }) => {
  if (err) {
    return console.error(err);
  }
  const outputFile = path.join(
    __dirname,
    `../source/data/following/${yearmonth}.json`
  );

  addHistory(
    outputFile,
    { yearmonth: yearmonth, data: [] },
    [now, follower],
    () => {
      console.log(`following data updated!`);
    }
  );
});
