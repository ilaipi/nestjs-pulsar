import { Module } from '@nestjs/common';
// can switch to your own config module
import { ConfigModule } from '@nestjs/config';
import { PulsarModule as Pulsar } from 'nestjs-pulsar';

import { ConsumerExample } from './consumers/consumer.example';

const producers = Pulsar.createProducers([
  {
    provide: 'my-producer',
    opts: { topic: `producer1-${process.env.NODE_APP_INSTANCE}` },
  },
]);

const consumers = Pulsar.subscribe([
  {
    provide: 'my-producer1-consumer',
    opts: {
      topic: `producer1-${process.env.NODE_APP_INSTANCE}`,
      subscription: 'my-subscription',
      subscriptionType: 'Shared',
    },
    consumer: ConsumerExample.name,
  },
]);

@Module({
  imports: [
    Pulsar.register({
      imports: [ConfigModule],
      useFactory(config) {
        return config.get('env.pulsar');
      },
      inject: ['ConfigService'],
    }),
  ],
  providers: [ConsumerExample, ...producers, ...consumers],
  exports: producers,
})
export class PulsarModule {}
