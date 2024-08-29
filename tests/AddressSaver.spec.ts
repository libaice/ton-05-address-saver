import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { AddressSaver } from '../wrappers/AddressSaver';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

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

        addressSaver = blockchain.openContract(AddressSaver.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await addressSaver.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: addressSaver.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and addressSaver are ready to use
    });
});
