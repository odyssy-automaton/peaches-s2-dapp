import { usePrivy } from "@privy-io/react-auth";
import {
  NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
  NftTreeMeta,
  TARGET_NETWORK,
  TREE_NFT_DATA,
} from "../utils/constants";
import { TreeMintCard } from "../components/TreeMintCard";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
// import { RemainingTreeSupply } from "../components/RemainingTreeSupply";
// import { BoostContent } from "../components/BoostContent";
import { RemainingTreeSupply } from "../components/RemainingTreeSupply";
import { useBalance, useReadContract } from "wagmi";

import erc721Abi from "../abis/ERC721.json";
import { fromWei } from "../utils/formatting";
import { FundWallet } from "../components/FundWallet";

function BuyTrees() {
  const { ready, authenticated, user } = usePrivy();

  const { data } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const { data: discountBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK] as `0x${string}`,
    abi: erc721Abi,
    functionName: "balanceOf",
    args: [user?.wallet?.address as `0x${string}`],
  }) as { data: bigint };
  const hasDiscount = discountBalance > 0;

  const hasBalance = data && data.value > NFT_MINT_PRICE[TARGET_NETWORK];

  return (
    <>
      <RemainingTreeSupply />

      <Box mb="2rem" textAlign="center">
        {/* <Heading size="xl">Tree Sales Have Ended</Heading> */}
      </Box>

      {ready && authenticated && !hasBalance && (
        <Flex
          w="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          mb="2rem"
        >
          <Text fontSize="md" textAlign="center">
            You need{" "}
            {`${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())} BASE ETH`}{" "}
            to purchase a tree.
          </Text>
          <FundWallet />
        </Flex>
      )}

      <Flex
        gap="1rem"
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        mb="3rem"
      >
        {TREE_NFT_DATA.map((tree: NftTreeMeta) => {
          return (
            <TreeMintCard
              tree={tree}
              key={tree.name}
              account={user?.wallet?.address}
              hasDiscount={hasDiscount}
            />
          );
        })}
      </Flex>

      <Box mb={20} textAlign="center" px="5rem">
        <Text fontSize="md">
          3% of tree sales will be added to the ‘Farmer’s Pot’. The better you
          farm, the more points you earn and a larger percentage of the pot you
          can win!
        </Text>
      </Box>

      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        my={10}
      >
        <Divider
          mt={4}
          mr={4}
          width="100vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      {/* <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        mb="15rem"
        w="full"
      >
        <BoostContent />
      </Flex> */}
    </>
  );
}

export default BuyTrees;
