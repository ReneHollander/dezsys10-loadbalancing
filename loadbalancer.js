var SocketIO = require('socket.io');
var Koa = require('koa');

var io = new SocketIO(5001);

io.on('connection', function (socket) {
    socket.on('my other event', function(data) {
        console.log(data);
    })
});

var koa = new Koa();

koa.use(function *() {
    io.emit('news', {title: "Hello World"});
    this.body = "Hello World!";
});

koa.listen(5000);
