import { SubscribeOpts, ProducerOpts as ClientProducerOpts } from 'pulsar-client';
export interface Consumer {
    listener(msg: any, msgConsumer: any): void;
}
export interface ConsumerOpts {
    provide: string;
    opts: SubscribeOpts;
    consumer?: string;
}
export interface ProducerOpts {
    provide: string;
    opts: ClientProducerOpts;
}
