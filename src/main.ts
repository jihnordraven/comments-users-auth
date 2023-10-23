import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common'
import { blue, red } from 'colorette'
import cookieParser from 'cookie-parser'
import { swaggerSetup } from './utils/swagger'
import * as Sentry from '@sentry/node'
import { SentryFilter } from './utils/errors-handlers'
import { ProfilingIntegration } from '@sentry/profiling-node'

const logger: Logger = new Logger('bootstrap')

const bootstrap = async (): Promise<void> => {
	const app: NestExpressApplication =
		await NestFactory.create<NestExpressApplication>(AppModule)

	app.setGlobalPrefix('api/v1', {
		exclude: [{ path: '/', method: RequestMethod.GET }]
	})
	app.enableCors({
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
		origin: [
			'http://localhost:3000',
			'https://comments.vercel.app',
			'https://www.comments.com'
		]
	})
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())

	const config: ConfigService = app.get<ConfigService>(ConfigService)

	const PORT: number = config.getOrThrow<number>('PORT')
	const HOST: string = config.getOrThrow<string>('HOST')
	const MODE: string = config.getOrThrow<string>('MODE')

	if (MODE !== 'prod') swaggerSetup(app)

	Sentry.init({
		dsn: config.getOrThrow('SENTRY_DSN'),
		integrations: [new ProfilingIntegration()],
		tracesSampleRate: 1.0,
		profilesSampleRate: 1.0
	})

	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new SentryFilter(httpAdapter))

	await app
		.listen(PORT)
		.then(() =>
			logger.log(
				blue(
					`Server is listening PORT:${PORT} on HOST:${HOST} with MODE:${MODE}. Graphql playground: ${HOST}/graphql`
				)
			)
		)
		.catch((err: string) =>
			logger.error(red(`Something went wrong... Learn more at: ${err}`))
		)
}

bootstrap()
