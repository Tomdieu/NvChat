export default function loggerMiddleware() {
    return async (ctx, next) => {
      const { method, url } = ctx.req;
      console.log(`[${method}] ${url}`);
      await next();
    };
  }
  