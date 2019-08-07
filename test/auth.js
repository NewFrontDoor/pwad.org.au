import test from 'ava';
import {MongoDBServer} from 'mongomem';
import got from 'got';
import server from '../server';

let testServer;
const app = {
  getRequestHandler() {
    return (req, res) => res.sendStatus(200);
  }
};

test.before('start server', async () => {
  await MongoDBServer.start();
  process.env.MONGO_URI = await MongoDBServer.getConnectionString();
  testServer = await server.start({app});
});

test.after.always('cleanup database', async () => {
  await server.stop(testServer);
  MongoDBServer.tearDown();
});

test('redirect unauthenticated users', async t => {
  const {port} = testServer.address();
  const response = await got(`http://localhost:${port}/keystone/`);

  t.is(response.status, 200);
});
