import { ConfigService } from '@nestjs/config';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PbEnv } from 'src/config/environments/pb-env.service';
import { PostModel } from './interfaces/post.model';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private configService: ConfigService, private pbEnv: PbEnv) {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }
  @Query(() => String)
  helloEnv(): string {
    return this.pbEnv.DatabaseUrl; // かなり直感的になりました。ミスも減りそう
  }
}
