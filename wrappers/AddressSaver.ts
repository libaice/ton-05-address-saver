import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type AddressSaverConfig = {};

export function addressSaverConfigToCell(config: AddressSaverConfig): Cell {
    return beginCell().endCell();
}

export class AddressSaver implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new AddressSaver(address);
    }

    static createFromConfig(config: AddressSaverConfig, code: Cell, workchain = 0) {
        const data = addressSaverConfigToCell(config);
        const init = { code, data };
        return new AddressSaver(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
