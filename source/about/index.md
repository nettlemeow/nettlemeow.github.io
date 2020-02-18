---
title: 关于
date: 2020-02-17 20:55:25
---

## 关于咬人猫

=咬人猫=

面瘫女仆酱~ 小粗腿~ 事业线什么的！！吐槽你就输了！喵~

咬人猫，B 站舞姬，B 站 up 主（B 站 ID：=咬人猫=）呆萌舞者。在作品《白金ディスコ~》，曾一度达到 NICO 周刊第一，在 nico 最受期待的舞姬中有排名。 代表作《干物妹！小埋 OP》《Lamb》 《极乐净土》

本月粉丝数走势

{% meow_chart meow_chart_following following %}

## 关于本站点

本站点是对 github 作为爬取数据展示站点的一个尝试。包括 B 站视频列表和播放数的历史数据。

简单介绍一下本站工作原理：

- 使用`git pages`托管静态站点代码。所有站点页面代码在`nettlemeow.github.io`代码库的 master 分支下
- 使用 travis 自动爬取 B 站 API 数据(spider 目录下),并将结果`git push`到`nettlemeow-data`代码库下。
- 使用 travis 将最新数据推送到 git pages 所属分支。

本站代码修改 up 主 id 后可用于 B 站任一 up 主的历史视频播放数的记录。
