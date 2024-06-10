import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { WorkoutsModule } from './workouts/workouts.module';
import * as schema from './db/migrations/schema';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import 'dotenv/config';

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error('Missing TURSO_CONNECTION_URL');
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Missing TURSO_AUTH_TOKEN');
}

@Module({
  imports: [
    DrizzleTursoModule.register({
      tag: 'DB',
      turso: {
        config: {
          url: process.env.TURSO_CONNECTION_URL,
          authToken: process.env.TURSO_AUTH_TOKEN,
        },
      },
      config: { schema: { ...schema } },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      include: [AppModule],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    WorkoutsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
