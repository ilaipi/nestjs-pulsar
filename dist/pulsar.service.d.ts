import { Client, Consumer, Producer, ProducerOpts, SubscribeOpts } from 'pulsar-client';
export declare class PulsarService {
    private url;
    pulsar: Client;
    constructor(url: any);
    buildConsumer(options: SubscribeOpts): Promise<Consumer>;
    buildProducer(options: ProducerOpts): Promise<Producer>;
    closeArr(arr: Consumer[] | Producer[]): Promise<void>;
    close(consumers?: Consumer[], producers?: Producer[]): Promise<void>;
}
