import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { createProxyMiddleware } from 'http-proxy-middleware';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3001',
          changeOrigin: true,
          pathRewrite: { '^/users': '' },
        }),
      )
      .forRoutes('/users');

    consumer
      .apply(
        createProxyMiddleware({
          target: 'http://localhost:3002',
          changeOrigin: true,
          pathRewrite: { '^/wallets': '' },
        }),
      )
      .forRoutes('/wallets');
  }
}
