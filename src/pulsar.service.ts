import { Injectable, Inject } from '@nestjs/common';

import {
  Client,
  Consumer,
  Producer,
  ProducerOpts,
  SubscribeOpts,
} from 'pulsar-client';

@Injectable()
export class PulsarService {
  pulsar: Client;
  constructor(@Inject('PULSAR_CLIENT_URL') private url) {
    this.pulsar = new Client({ serviceUrl: url });
  }

  async buildConsumer(options: SubscribeOpts): Promise<Consumer> {
    return this.pulsar.subscribe(options);
  }

  async buildProducer(options: ProducerOpts): Promise<Producer> {
    return this.pulsar.createProducer(options);
  }

  async closeArr(arr: Consumer[] | Producer[]) {
    if (!arr || !arr.length) return;
    for (const ele of arr) ele.close();
  }

  async close(consumers?: Consumer[], producers?: Producer[]) {
    this.closeArr(consumers);
    this.closeArr(producers);
    if (this.pulsar) {
      this.pulsar.close();
    }
  }
}
