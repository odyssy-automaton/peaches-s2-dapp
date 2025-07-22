import { usePrivy } from "@privy-io/react-auth";
import {
  NFT_CONTRACT_ADDRESS,
  NftTreeMeta,
  TARGET_NETWORK,
  TREE_NFT_DATA,
} from "../utils/constants";
import { TreeMintCard } from "../components/TreeMintCard";
import { Link } from "react-router-dom";
import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
// import { RemainingTreeSupply } from "../components/RemainingTreeSupply";
// import { BoostContent } from "../components/BoostContent";
// import { RemainingTreeSupply } from "../components/RemainingTreeSupply";
import { useReadContract } from "wagmi";

import erc721Abi from "../abis/ERC721.json";

function BuyTrees() {
  const { user } = usePrivy();

  const { data: discountBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK] as `0x${string}`,
    abi: erc721Abi,
    functionName: "balanceOf",
    args: [user?.wallet?.address as `0x${string}`],
  }) as { data: bigint };
  const hasDiscount = discountBalance > 0;

  return (
    <>
      <Box mt="4" textAlign="center">
        {/* <RemainingTreeSupply /> */}
        <Heading size="lg">Tree Sales Have Closed for the 2025 Season</Heading>

        <Button
          as={Link}
          to="/market"
          variant="outline"
          fontFamily="Helsinki"
          fontSize="2xl"
          border="2px"
          borderColor="brand.orange"
          borderRadius="200px;"
          color="brand.red"
          size="lg"
          height="72px"
          mt="4"
          w="200px"
          _hover={{
            color: "brand.white",
          }}
          _focus={{
            bg: "brand.black",
          }}
          bg="brand.black"
        >
          GET PEACHES
        </Button>
      </Box>

      <Box mb="2rem" textAlign="center">
        {/* <Heading size="xl">Tree Sales Have Ended</Heading> */}
      </Box>

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
