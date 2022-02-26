import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';
import * as path from 'path';
import { PbEnvModule } from './config/environments/pb-env.module';
import { PbEnv } from '@pb-config/environments/pb-env.service';
import { WinstonModule } from 'nest-winston';
import { PrismaModule } from '@pb-components/prisma/prisma.module';

@Module({
  imports: [
    PbEnvModule,
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [PbEnv],
      isGlobal: true,
      useFactory: (env: PbEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    PostsModule,
  ],
})
export class AppModule {}
