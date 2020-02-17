!(function() {
  function ppretty(n) {
    if (n > 10000) {
      return { v: (n / 10000).toFixed(2).replace(/\.0+$/, ""), u: "万" };
    }
    return { v: n.toFixed(2).replace(/\.0+$/, ""), u: "" };
  }
  function httpGet(url, callback) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = e => {
      if (Http.readyState == 4 && Http.status == 200) {
        callback(null, Http.responseText);
      }
     
    };
  }
  function getYearmonth(dt) {
    return "202002";
  }

  function render(elemId, ydata) {
    var myChart = echarts.init(document.getElementById(elemId));

    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#f7af3a"
          }
        }
      },
      xAxis: [
        {
          type: "time",
          splitLine: {
            lineStyle: {
              color: ["rgba(255,255,255,0)"],
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#b2c3e7",
              width: "1"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          lineStyle: {
            color: "#fff"
          },
          splitLine: {
            lineStyle: {
              color: ["#f1f1f1"]
            }
          },
          axisLine: {
            lineStyle: {
              color: "#b2c3e7",
              width: "0"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            },
            formatter: function(value) {
              var d = ppretty(value);
              return d.v + d.u;
            }
          }
        }
      ],
      series: [
        {
          data: ydata,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: { type: "default" },
              borderColor: "#7da1eb",
              lineStyle: {
                color: "#7da1eb"
              }
            }
          }
        }
      ],
      color: ["#b2c3e7"]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  function loadData(elemId, aid) {
    const yearmonth = getYearmonth(new Date());
    const url = `/data/video/av${aid}/${yearmonth}.json`;
    httpGet(url, function(err, result) {
      const r = JSON.parse(result);
      var ydata = [];
      for (var i = 0; i < r.data.length; i++) {
        var d = r.data[i];
        ydata.push([d[0] * 1000, d[1]]);
      }
      render(elemId, ydata);
    });
  }
  window.loadData = loadData;
})();
