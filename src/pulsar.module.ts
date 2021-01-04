import { Module, DynamicModule, Provider } from '@nestjs/common';

import { PulsarService } from './pulsar.service';
import { ConsumerOpts, ProducerOpts, Consumer } from './types';

@Module({
  providers: [PulsarService],
  exports: [PulsarService],
})
export class PulsarModule {
  static register(options: any): DynamicModule {
    return {
      module: PulsarModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'PULSAR_CLIENT_URL',
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
    };
  }

  static subscribe(consumers: ConsumerOpts[]): Provider<any>[] {
    return consumers.map(({ provide, opts, consumer }) => ({
      provide,
      useFactory: async (service, consumer) =>
        await service.buildConsumer({
          ...opts,
          listener: consumer.listener.bind(consumer),
        }),
      inject: [PulsarService, consumer],
    }));
  }

  static createProducers(producers: ProducerOpts[]): Provider<any>[] {
    return producers.map(({ provide, opts }) => ({
      provide,
      useFactory: async (service) => await service.buildProducer(opts),
      inject: [PulsarService],
    }));
  }
}

export { ConsumerOpts, ProducerOpts, Consumer };
