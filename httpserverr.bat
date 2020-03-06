@Echo Off
title 头条-新前端页面
echo ......
echo -新前端页面 The Server is Running...
echo ......
CD\
rem 先cd切换至D盘
E:
rem 然后再切换到指定的文件目录
CD E:\vue\vue\toutiaopc
rem 这里进入指定文件夹之后可以写一些需要运行的cmd命令
rem  写一个./的原因是在http-server中如果启动服务器的根目录有./public就默认为./public为根路径，如果没有则是 ./ 在这里设置为不管有没有都是./
npm run serve