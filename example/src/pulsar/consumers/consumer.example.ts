import { Injectable } from '@nestjs/common';
import { Consumer } from 'nestjs-pulsar';

@Injectable()
export class ConsumerExample implements Consumer {
  async listener(msg: any, msgConsumer: any) {
    console.log('receive msg', msg.getData().toString());
    msgConsumer.acknowledge(msg);
  }
}
