"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PulsarModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsarModule = void 0;
const common_1 = require("@nestjs/common");
const pulsar_service_1 = require("./pulsar.service");
let PulsarModule = PulsarModule_1 = class PulsarModule {
    static register(options) {
        return {
            module: PulsarModule_1,
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
    static subscribe(consumers) {
        return consumers.map(({ provide, opts, consumer }) => ({
            provide,
            useFactory: async (service, consumer) => await service.buildConsumer(Object.assign(Object.assign({}, opts), { listener: consumer.listener.bind(consumer) })),
            inject: [pulsar_service_1.PulsarService, consumer],
        }));
    }
    static createProducers(producers) {
        return producers.map(({ provide, opts }) => ({
            provide,
            useFactory: async (service) => await service.buildProducer(opts),
            inject: [pulsar_service_1.PulsarService],
        }));
    }
};
PulsarModule = PulsarModule_1 = __decorate([
    common_1.Module({
        providers: [pulsar_service_1.PulsarService],
        exports: [pulsar_service_1.PulsarService],
    })
], PulsarModule);
exports.PulsarModule = PulsarModule;
//# sourceMappingURL=pulsar.module.js.map