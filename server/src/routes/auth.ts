import { z } from "zod";
import { FastifyInstance } from "fastify";

import { prisma } from "../lib/prisma";
import { googleApi } from "../lib/google";
import { authenticate } from "../plugins/authenticate";

export const authRouter = async (fastify: FastifyInstance) => {
  fastify.post('/users', async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    })

    const { access_token } = createUserBody.parse(request.body)

    const userResponse = googleApi.get('userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const userData = (await userResponse).data;

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    })

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture
        }
      })
    }

    const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '7 days'
    })

    return { token }
  })

  fastify.get('/me', { onRequest: [authenticate] }, async (request) => {
    return { user: request.user }
  })
}
