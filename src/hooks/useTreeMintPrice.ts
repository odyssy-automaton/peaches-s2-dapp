import { useReadContract } from "wagmi";
import { TARGET_NETWORK, NFT_CONTRACT_ADDRESS } from "../utils/constants";
import TreeERC721ABI from "../abis/TreeERC721.json";

type TreeMintPrice = {
  erc20MintPrice: bigint | undefined;
  nativeMintPrice: bigint | undefined;
};

export const useTreeMintPrice = (): TreeMintPrice => {
  const contractAddress = NFT_CONTRACT_ADDRESS[TARGET_NETWORK];

  const { data: erc20MintPrice } = useReadContract({
    address: contractAddress,
    abi: TreeERC721ABI,
    functionName: "erc20MintPrice",
  }) as { data: bigint | undefined };

  const { data: nativeMintPrice } = useReadContract({
    address: contractAddress,
    abi: TreeERC721ABI,
    functionName: "mintPrice",
  }) as { data: bigint | undefined };

  return {
    erc20MintPrice,
    nativeMintPrice,
  };
};
