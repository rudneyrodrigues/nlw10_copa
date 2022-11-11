import Fastify from 'fastify';
import cors from '@fastify/cors';

import { poolRouter } from './routes/pool';
import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';
import { gameRouter } from './routes/game';
import { guessRouter } from './routes/guess';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(poolRouter)
  await fastify.register(userRouter)
  await fastify.register(authRouter)
  await fastify.register(gameRouter)
  await fastify.register(guessRouter)

  await fastify.listen({
    port: 3333,
    // host: '0.0.0.0',
  })
}

bootstrap()
