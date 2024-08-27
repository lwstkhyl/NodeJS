const fs = require('fs');
const ws = fs.createWriteStream('./test.txt'); //创建写入流对象
ws.write('追加内容1\n');
ws.write('追加内容2\n');
ws.write('追加内容3\n'); //追加写入
ws.close(); //关闭通道（可省略）