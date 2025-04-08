import { useReadContract } from "wagmi";
import { Box, Heading } from "@chakra-ui/react";

import {
  TARGET_NETWORK,
  TREE_NFT_CONTRACT_ADDRESS_S3,
} from "../utils/constants";
import erc721Abi from "../abis/ERC721.json";
import { fromBigNumber } from "../utils/formatting";

const supply = 150;

export const RemainingTreeSupply = () => {
  const { data: totalSupply } = useReadContract({
    address: TREE_NFT_CONTRACT_ADDRESS_S3[TARGET_NETWORK],
    abi: erc721Abi,
    functionName: "totalSupply",
  });

  if (!totalSupply)
    return (
      <Box mb="2rem" textAlign="center">
        <Heading size="lg">{supply} Trees Available</Heading>
      </Box>
    );

  const total = totalSupply as bigint;
  const count = fromBigNumber(BigInt(supply) - total);

  return (
    <Box mb="2rem" textAlign="center">
      <Heading size="lg">Only {count} Trees Left!</Heading>
    </Box>
  );
};
