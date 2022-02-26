import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';
import * as path from 'path';
import { PbEnvModule } from './config/environments/pb-env.module';
import { PbEnv } from '@pb-config/environments/pb-env.service';

@Module({
  imports: [
    PbEnvModule,
    // pbEnvModuleが読み込んでから初期化する
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    PostsModule,
  ],
})
export class AppModule {}
