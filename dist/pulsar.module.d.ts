import { DynamicModule, Provider } from '@nestjs/common';
import { ConsumerOpts, ProducerOpts, Consumer } from './types';
export declare class PulsarModule {
    static register(options: any): DynamicModule;
    static subscribe(consumers: ConsumerOpts[]): Provider<any>[];
    static createProducers(producers: ProducerOpts[]): Provider<any>[];
}
export { ConsumerOpts, ProducerOpts, Consumer };
