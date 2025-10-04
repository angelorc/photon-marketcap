import { os } from '@orpc/server'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ORPCContext { }

export const pub = os
  .$context<ORPCContext>()

export const authed = pub.use(({ next }) => {
  return next({
    context: { },
  })
})