import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc'
import { brands } from '~/server/db/schema'
import { createId } from '~/lib/cuid'
import { eq } from 'drizzle-orm'

export const brandRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(brands).values({
        id: createId(),
        name: input.name,
      })
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.query.brands.findFirst({
        where: eq(brands.id, id),
      })
    }),
})
