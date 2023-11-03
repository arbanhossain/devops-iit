import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

require('dotenv').config();

Sentry.init({
  dsn: 'https://83967f8eed989ca7c94af48c695b059b@o4506163775143936.ingest.sentry.io/4506163802406912',
  integrations: [
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
