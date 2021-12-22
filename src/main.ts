import Fastify from 'fastify';
import middie from 'middie';
import { state, storage } from './storage';

async function build() {
  const fastify = Fastify({ logger: true });
  await fastify.register(middie);
  fastify.use((req: any, res: any, next: any) => {
    const id = state.counter++;
    console.log('In Middleware with id ' + id);
    storage.run({ id }, next);
  });

  fastify.get('/', function (request, reply) {
    const id = storage.getStore()?.id;
    console.log('get', id);
    reply.send({ id });
  });

  fastify.post('/', function (request, reply) {
    const id = storage.getStore()?.id;
    console.log('post', id);
    reply.send({ id });
  });

  return fastify;
}

build()
  .then((fastify) => fastify.listen(3000))
  .catch(console.log);
