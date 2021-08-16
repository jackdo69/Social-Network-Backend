import { APP_PORT } from './config';
import { createApp } from './app';
import http from 'http';

(async () => {
  const app = await createApp();
  const server = http.createServer(app);
  let totalConnections = 0;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log('A client has been connected!!', socket.id);
    totalConnections++;
    socket.on('new-message', (message) => {
      console.log('receiving new messages, emiting now');
      io.emit('server-message', message);
    });

    socket.on('disconnect', (reason) => {
      totalConnections--;
      console.log('Disconnected', reason);
    });
  });

  setInterval(() => {
    console.log(`Currenly there are total ${totalConnections} socket connections`);
  }, 10000);

  server.listen(APP_PORT, () => {
    console.log(`App is running on http://localhost:${APP_PORT}`);
  });
})();
