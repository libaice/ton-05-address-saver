import {Blockchain, SandboxContract, TreasuryContract} from '@ton/sandbox';
import {Cell, toNano} from '@ton/core';
import {AddressSaver} from '../wrappers/AddressSaver';
import '@ton/test-utils';
import {compile} from '@ton/blueprint';
import {randomAddress} from "@ton/test-utils";

describe('AddressSaver', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('AddressSaver');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let addressSaver: SandboxContract<AddressSaver>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        addressSaver = blockchain.openContract(AddressSaver.createFromConfig({
            manager: deployer.address,
        }, code));

        const deployResult = await addressSaver.sendDeploy(deployer.getSender(), toNano('0.01'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: addressSaver.address,
            deploy: true,
            // success: true,
        });
    });

    it('should deploy successfully', async () => {
    });

    it('should change saved address by manager', async () => {
        const address = randomAddress();
        const result = await addressSaver.sendChangeAddress(deployer.getSender(), toNano('0.01'), 12345n, address);
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: addressSaver.address,
            success: true,
        });
    });

    it('should return required data on `requestAddress` call', async () => {

    });

    it('should throw on any other opcode ', async () => {

    });


});
