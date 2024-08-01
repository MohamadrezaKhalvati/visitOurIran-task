import { Module } from '@nestjs/common'
import { PrismaModule } from './module/prisma/prisma.module'
import { UserModule } from './module/user/user.module'

@Module({
    imports: [UserModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
