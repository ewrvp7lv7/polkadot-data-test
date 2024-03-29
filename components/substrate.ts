import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option } from '@polkadot/types/codec';
import { Nominations, ActiveEraInfo } from '@polkadot/types/interfaces';
import { DeriveEraExposure, DeriveEraValidatorExposure, DeriveStakerReward } from '@polkadot/api-derive/staking/types'
import { PalletStakingIndividualExposure } from "./chain-types.js";
import BN from 'bn.js';

export interface IResult {
  address: string;
}

function toDOT(balance: BN, decimals: number): string {
  const base = new BN(10).pow(new BN(decimals));
  const dm = new BN(balance).divmod(base);
  return dm.div.toString() + "." + dm.mod.toString().substring(0, 2) + ' DOT'
}

export async function activeEra(): Promise<number> {

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const activeEra = await api.query.staking.activeEra<Option<ActiveEraInfo>>();

  return activeEra.unwrapOrDefault().index.toNumber()

}

export async function listValidators(nominatorAddr: string, eraNum?: number): Promise<IResult[]> {

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const nominatedValidators = await api.query.staking.nominators<Option<Nominations>>(nominatorAddr);


  let list: IResult[] = [];

  nominatedValidators.unwrapOrDefault().targets.forEach((val) => {
    list.push({ address: val.toJSON() });
  });

  if (!list.length)
    list.push({ address: "No data" });

  return list;
}

export async function listValidatorsInEra(nominatorAddr: string, eraNum: number): Promise<IResult[]> {

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const eraExposures: DeriveEraExposure = await api.derive.staking.eraExposure(api.createType('EraIndex', eraNum));

  let list: IResult[] = [];

  eraExposures.nominators[nominatorAddr].forEach((val) => {
    list.push({ address: val.validatorId });
  });

  if (!list.length)
    list.push({ address: "No data" });

  return list;
}

export async function listBonded(nominatorAddr: string, eraNum: number): Promise<IResult[]> {

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const eraExposures: DeriveEraExposure = await api.derive.staking.eraExposure(api.createType('EraIndex', eraNum));

  let list: IResult[] = [];

  Object.keys(eraExposures.validators).forEach(key => {
    const value: DeriveEraValidatorExposure = eraExposures.validators[key];

    const filtered = value.others.filter((item: PalletStakingIndividualExposure) => item.who.eq(nominatorAddr));

    filtered.forEach((item: PalletStakingIndividualExposure) => {
      const dot = toDOT(item.value.toBn(), api.registry.chainDecimals[0]);
      list.push({ address: `${key} : ${dot}` });
    });
  });

  if (!list.length)
    list.push({ address: "No data" });

  return list;
}

export async function bondedChanges(nominatorAddr: string, eraNum?: number): Promise<IResult[]> {

  const ae = await activeEra();

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });


  let list: IResult[] = [];


  let deep: number = 10;
  let bondedOldEra = new BN(0);

  for (let i = 0 as number; i <= deep; i++) {

    let bonded = new BN(0);
    let currentEra = ae - deep + i;

    const eraExposures: DeriveEraExposure = await api.derive.staking.eraExposure(api.createType('EraIndex', currentEra));

    Object.keys(eraExposures.validators).forEach(key => {
      const value: DeriveEraValidatorExposure = eraExposures.validators[key];

      const filtered = value.others.filter((item: PalletStakingIndividualExposure) => item.who.eq(nominatorAddr));

      filtered.forEach((item: PalletStakingIndividualExposure) => {
        bonded = bonded.add(item.value.toBn());
        console.debug(`DOT added:`, item.value.toJSON());
      });
    });

    if (!bonded.eq(bondedOldEra)) {
      if (!bondedOldEra.isZero()) {
        const dot = toDOT(bonded, api.registry.chainDecimals[0]);
        list.push({ address: `${currentEra} : ${dot}` });
      }
      bondedOldEra = bonded
    }
  }

  if (!list.length)
    list.push({ address: "No data" });

  return list;
}

export async function listRewards(nominatorAddr: string, eraNum: number): Promise<IResult[]> {

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const rewards = await api.derive.staking._stakerRewards([nominatorAddr], [api.createType('EraIndex', eraNum)], true);

  var list: IResult[] = [];


  rewards[0]
    .forEach((x) => {
      Object.keys(x.validators).forEach(key => {
        const val = x.validators[key];
        // console.log(`validator:`, key);
        // console.log(`validator total:`, val.total.toJSON());
        // console.log(`validator value:`, val.value.toJSON());


        const value = toDOT(val.value.toBn(), api.registry.chainDecimals[0]);
        const total = toDOT(val.total.toBn(), api.registry.chainDecimals[0]);
        list.push({ address: `${key} : ${value} (${total})` });
      });
    });

  if (!list.length)
    list.push({ address: "No data" });

  return list;
}


