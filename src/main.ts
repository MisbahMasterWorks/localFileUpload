import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Enable CORS with specific origin and credentials
   app.enableCors({
    origin: true, // Frontend origin
    methods: 'GET, PUT, POST, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,  
  });

  const config = new DocumentBuilder()
  .setTitle('LEEJAM Swagger')
  .setDescription('The LEEJAM API description')
  .setVersion('1.0')
  .addTag('leejam')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(process.env.BACKEND_SERVER_PORT);
  console.log(`Application is running on port: ${process.env.BACKEND_SERVER_PORT}`);
}
bootstrap();
