import { APP_PORT } from './config';
import { createApp } from './app';
import http from 'http';

(async () => {
  const app = await createApp();
  const server = http.createServer(app);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log('A client has been connected!!', socket.id);

    socket.on('new-message', (message) => {
      io.emit('server-message', message);
    });
  });

  server.listen(APP_PORT, () => {
    console.log(`App is running on http://localhost:${APP_PORT}`);
  });
})();
