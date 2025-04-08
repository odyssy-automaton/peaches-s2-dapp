import { formatEther, formatUnits } from "viem";
import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
  PEACH_NFT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "./constants";
import { format } from "date-fns";

export type Noun = {
  singular: string;
  plural: string;
};

export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
export const charLimit = (str: string | undefined, limit: number) =>
  str && str.length > limit ? `${str.slice(0, limit)}...` : str;
export const handlePluralNoun = (noun: Noun, count: number) =>
  count === 1 ? noun.singular : noun.plural;
export const fromWei = (amt: string): string => {
  return formatEther(BigInt(amt)).toString();
};
export const fromUSDC = (amt: string): string => {
  return formatUnits(BigInt(amt), 6).toString();
};
export const toBigInt = (
  amt?: string | number | boolean | bigint
): bigint | undefined => {
  if (amt) {
    return BigInt(amt as string | number | boolean | bigint);
  }
};
export const isJSON = (obj: unknown) => {
  try {
    JSON.parse(obj as string);
    return true;
  } catch (e) {
    return false;
  }
};
export const getDisplayPrice = () => {
  return `${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())} ETH`;
};

export const blockExplorerNftLink = (tokenID: string) => {
  // https://basescan.org/token/0xA9d3c833df8415233e1626F29E33ccBA37d2A187?a=

  if (TARGET_NETWORK === "0x2105") {
    return `${BLOCK_EXPLORER_URL[TARGET_NETWORK]}token/${NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}?a=${tokenID}`;
  }

  return `${BLOCK_EXPLORER_URL[TARGET_NETWORK]}nft/${NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}/${tokenID}`;
};

export const blockExplorerPeachNftLink = (tokenID: string) => {
  // https://basescan.org/token/0xA9d3c833df8415233e1626F29E33ccBA37d2A187?a=

  if (TARGET_NETWORK === "0x2105") {
    return `${BLOCK_EXPLORER_URL[TARGET_NETWORK]}token/${PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}?a=${tokenID}`;
  }

  return `${BLOCK_EXPLORER_URL[TARGET_NETWORK]}nft/${PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}/${tokenID}`;
};

export const fromBigNumber = (bigNumber: bigint): string => {
  return bigNumber.toString();
};

export const getPeachStatus = (status: number): string => {
  const stats: { [key: number]: string } = {
    0: "Unopened",
    1: "Unredeemed",
    2: "Redeemed",
  };
  return stats[status];
};

export const dhImagePath = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("/ipfs/")[1]}`;
};

export const dhImagePathFromIpfs = (ipfsHash: string) => {
  return `https://daohaus.mypinata.cloud/ipfs/${ipfsHash}`;
};

export const frameUrl = (tokenId: string) => {
  return `https://frame.peachtycoon.com/api/market/${tokenId}`;
};

export const getPriceText = (tokenType: string): string => {
  if (tokenType === "ERC20") return "$DEGEN";

  return tokenType;
};

export const formatDateFromShopify = (
  dataString: string | undefined
): string | undefined => {
  if (!dataString) {
    return;
  }

  return format(new Date(dataString), "M/dd/yy");
};
