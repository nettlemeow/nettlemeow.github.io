hexo.extend.tag.register("bilibili_video", function(args) {
  var aid = args[0];
  return `<div class="aspect-ratio"><iframe src="//player.bilibili.com/player.html?aid=${aid}&page=1&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe></div>`;
});
