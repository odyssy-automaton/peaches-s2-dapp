import { SequenceIndexer } from "@0xsequence/indexer";
import { useQuery } from "@tanstack/react-query";
import {
  NFT_CONTRACT_ADDRESS,
  SEQUENCE_ENDPOINT,
  TARGET_NETWORK,
  TREE_NFT_CONTRACT_ADDRESS_S3,
} from "../utils/constants";

const fetchNftsForAccount = async ({
  accountAddress,
  contractAddress,
}: {
  accountAddress: string;
  contractAddress?: string;
}) => {
  if (!accountAddress || !contractAddress) {
    throw new Error("Missing Args");
  }

  const sequenceEndPoint = SEQUENCE_ENDPOINT[TARGET_NETWORK];

  if (!sequenceEndPoint) {
    throw new Error("Invalid ChainId");
  }

  const indexer = new SequenceIndexer(
    sequenceEndPoint,
    import.meta.env.VITE_SEQUENCE_API_KEY
  );

  const nftBalances = await indexer.getTokenBalances({
    contractAddress: contractAddress,
    accountAddress: accountAddress,
    includeMetadata: true,
  });

  return { balances: nftBalances, page: nftBalances.page };
};

export const useAccountNfts = ({
  accountAddress,
  season,
}: {
  accountAddress: string;
  season?: string;
}) => {
  const seasonContractAddress =
    season === "two"
      ? TREE_NFT_CONTRACT_ADDRESS_S3[TARGET_NETWORK]
      : NFT_CONTRACT_ADDRESS[TARGET_NETWORK];
  const { data, error, ...rest } = useQuery({
    queryKey: [`accountNfts-${accountAddress}-${seasonContractAddress}`],
    queryFn: () =>
      fetchNftsForAccount({
        accountAddress,
        contractAddress: seasonContractAddress,
      }),
    enabled: !!seasonContractAddress,
  });

  return { accountNfts: data?.balances, page: data?.page, error, ...rest };
};
