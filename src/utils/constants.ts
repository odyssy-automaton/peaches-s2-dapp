import { base, sepolia } from "viem/chains";
import treeOne from "../assets/Tree-1.png";
import treeTwo from "../assets/Tree-2.png";
import treeThree from "../assets/Tree-3.png";

export const TARGET_NETWORK = import.meta.env.VITE_TARGET_NETWORK as string;

export const CHAIN_OBJ = TARGET_NETWORK === "0x2105" ? base : sepolia;
export const RARIBLE_PREFIX = TARGET_NETWORK === "0x2105" ? "BASE" : "ETHEREUM";
export const RARIBLE_STAGE = TARGET_NETWORK === "0x2105" ? "prod" : "testnet";

export const ALCHEMY_RPC =
  TARGET_NETWORK === "0x2105"
    ? `https://base-mainnet.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_KEY
      }`
    : `https://eth-sepolia.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_KEY
      }`;

// season 2
export const NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xB49a877D82c1f0133B0293dfd20eB54BEd07a290",
  "0x2105": "0xA9d3c833df8415233e1626F29E33ccBA37d2A187",
};

// season 3
export const TREE_NFT_CONTRACT_ADDRESS_S3: Record<string, `0x${string}`> = {
  "0xaa36a7": "0x77Bb60A289cA50b5A90729ED727c2dAf0db97Ca0",
  "0x2105": "0x9693C1f083ECF8D5d39af19d38E0e2377919564A",
};

export const NFT_MINT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(6900000000000000),
  "0x2105": BigInt(200000000000000000),
};

export const TREE_NFT_MINT_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(300000000),
  "0x2105": BigInt(300000000),
};

export const TREE_NFT_MINT_DISCOUNT_PERC: Record<string, number> = {
  "0xaa36a7": 10,
  "0x2105": 10,
};

export const TREE_ERC20_PAYMENT_TOKEN: Record<string, string> = {
  "0xaa36a7": "0x53c8156592A64E949A4736c6D3309002fa0b2Aba",
  "0x2105": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

// boosts;

export const ERC20_PAYMENT_TOKEN: Record<string, string> = {
  "0xaa36a7": "0x53c8156592A64E949A4736c6D3309002fa0b2Aba",
  "0x2105": "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
};

export const PRUNE_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xE26f5ef42636155b8299A67063450792537d71EB",
  "0x2105": "0xEEcAAe1d9061f0ae1813e41A47179e06844ac0Ec",
};

export const PRUNE_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(22000000000000000),
};

export const PRUNE_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(10000000000000000),
  "0x2105": BigInt(5200000000000000000000),
};

export const FERT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xAd8cA82737779b12858b303563B4Ab61099e14b8",
  "0x2105": "0x70B0A88cB071B8258aeD255370e1e2F8F1725A93",
};

export const FERT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(35000000000000000),
};

export const FERT_DISCOUNT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0x8FAE2f5B1eD1a73ee7c96703AeaCc735Fbe82Ed0",
  "0x2105": "0xe68E3B3Ee0ce43d55fedCB625D48af4601693a04",
};

export const FERT_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(5000000000000000000000),
};

export const FERT_DISCOUNT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(900000000000000),
  "0x2105": BigInt(26250000000000000),
};

export const FERT_DISCOUNT_ERC20_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(900000000000000),
  "0x2105": BigInt(3750000000000000000000),
};

export const SPRAY_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xe709a9C0412393C3C3a6906b052A57cf86b1Cc81",
  "0x2105": "0x0E8bB0BA9413b39701Bf6F84A068511FdAd3d84D",
};

export const SPRAY_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(11000000000000000),
};

export const SPRAY_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(1000000000000000),
  "0x2105": BigInt(2040000000000000000000),
};

export const SPRAYS_PER_TOKEN = 2;

// peaches;

export const PEACH_NFT_CONTRACT_ADDRESS_S3: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xC0552Fd7131D8cC74b77dDaF8E43C006A31adCdA",
  "0x2105": "0x5eAE1344f40f25b827782AfF0B3651b2DCD2259E",
};

export const PEACH_NFT_CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  "0xaa36a7": "0xC0552Fd7131D8cC74b77dDaF8E43C006A31adCdA",
  "0x2105": "0x5eAE1344f40f25b827782AfF0B3651b2DCD2259E",
};

export const PEACH_IMG_IPFS_HASH: Record<number, string> = {
  0: "QmWgYLkMeMhFdqMzZ6xZBHdP81dC6z36QpnYqYMbYGWVss",
  1: "QmRxmnT5USZ32tvRMqwYfQAkfQVX6k751WdBkehzc1sKQN",
  2: "QmZSNfqJ65Q4zxt7293u3JpFrdh984b2prYWBa4wZtwgp4",
};

export const BLOCK_EXPLORER_URL: Record<string, string> = {
  "0xaa36a7": "https://sepolia.etherscan.io/",
  "0x2105": "https://basescan.org/",
};

export const SEQUENCE_ENDPOINT: Record<string, string> = {
  "0xaa36a7": "https://sepolia-indexer.sequence.app",
  "0x2105": "https://base-indexer.sequence.app",
};

export const WATERING_ENDPOINT: Record<string, string> = {
  "0xaa36a7":
    "https://esxop67lpg.execute-api.us-east-1.amazonaws.com/dev/waterings",
  "0x2105":
    "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/waterings",
};

export const LEADER_ENDPOINT =
  "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/leaders";

export const CHECKOUT_URL =
  "https://bhe263f8bh.execute-api.us-east-1.amazonaws.com/prod/peach-checkout";

// export const REFRESH_URL_BASE =
//   "https://esxop67lpg.execute-api.us-east-1.amazonaws.com/dev/refresh";

export type NftTreeMeta = { name: string; img: string; value: number };

export const CRITTER_COUNT_PLUS_ONE = 9;

export const TREE_NFT_DATA: NftTreeMeta[] = [
  {
    name: "MF Bloom",
    img: treeOne,
    value: 0,
  },
  {
    name: "Warren Tree",
    img: treeTwo,
    value: 1,
  },
  {
    name: "Notorious P.E.A.C.H.",
    img: treeThree,
    value: 2,
  },
];

export const BOOST_POINTS = {
  PRUNE: 75,
  WATERING: 1,
  FERT: 100,
  SPRAY: 33,
};

export const BOOST_BONUS = {
  PRUNE: 1,
  FERT: 1,
  SPRAY: 1,
};

export const WATERING_MESSAGE =
  "PEACH TYCOON: YOU BUY TREE. TREE GROWS PEACH. YOU EAT PEACH. YOU ALSO SIGN THIS MESSAGE TO WATER YOUR TREE.";

export const PRUNE_ENDED = true;

export const SEASON_OVER_TEXT =
  " The 2024 Peach Season has come to an end. See you next Spring!";

export const SEASON_OPEN_TEXT =
  " The 2025 Peach Season is kicking off! Tree sales are live now!";
