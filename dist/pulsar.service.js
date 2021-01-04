"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsarService = void 0;
const common_1 = require("@nestjs/common");
const pulsar_client_1 = require("pulsar-client");
let PulsarService = class PulsarService {
    constructor(url) {
        this.url = url;
        this.pulsar = new pulsar_client_1.Client({ serviceUrl: url });
    }
    async buildConsumer(options) {
        return this.pulsar.subscribe(options);
    }
    async buildProducer(options) {
        return this.pulsar.createProducer(options);
    }
    async closeArr(arr) {
        if (!arr || !arr.length)
            return;
        for (const ele of arr)
            ele.close();
    }
    async close(consumers, producers) {
        this.closeArr(consumers);
        this.closeArr(producers);
        if (this.pulsar) {
            this.pulsar.close();
        }
    }
};
PulsarService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PULSAR_CLIENT_URL')),
    __metadata("design:paramtypes", [Object])
], PulsarService);
exports.PulsarService = PulsarService;
//# sourceMappingURL=pulsar.service.js.map