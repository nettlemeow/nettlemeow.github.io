hexo.extend.tag.register("meow_chart", function(args) {
  var elemId = args[0];
  var aid = args[1];
  return `<div id='${elemId}' style='height:400px;'></div><script>loadData("${elemId}", "${aid}")</script>`;
});
