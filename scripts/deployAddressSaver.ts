import {Address, toNano} from '@ton/core';
import {AddressSaver} from '../wrappers/AddressSaver';
import {compile, NetworkProvider} from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const addressSaver = provider.open(AddressSaver.createFromConfig({
        manager: provider.sender().address as Address,
    }, await compile('AddressSaver')));

    await addressSaver.sendDeploy(provider.sender(), toNano('0.001'));

    await provider.waitForDeploy(addressSaver.address);

    // run methods on `addressSaver`
}
