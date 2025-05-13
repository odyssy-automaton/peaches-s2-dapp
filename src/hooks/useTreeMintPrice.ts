import { useReadContract } from "wagmi";
import {
  TARGET_NETWORK,
  TREE_NFT_CONTRACT_ADDRESS_S3,
} from "../utils/constants";
import TreeERC721ABI from "../abis/TreeERC721.json";

export const useTreeMintPrice = () => {
  const contractAddress = TREE_NFT_CONTRACT_ADDRESS_S3[TARGET_NETWORK];

  console.log("contractAddress", contractAddress);

  const { data: nativeMintPrice } = useReadContract({
    address: contractAddress,
    abi: TreeERC721ABI,
    functionName: "mintPrice",
  });

  const { data: erc20MintPrice } = useReadContract({
    address: contractAddress,
    abi: TreeERC721ABI,
    functionName: "erc20MintPrice",
  });

  console.log("erc20MintPrice", erc20MintPrice);
  console.log("nativeMintPrice", nativeMintPrice);
  return {
    erc20MintPrice,
    nativeMintPrice,
  };
};
