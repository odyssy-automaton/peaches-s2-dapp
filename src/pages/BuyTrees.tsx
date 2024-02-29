import { usePrivy } from "@privy-io/react-auth";
import { NftTreeMeta, TREE_NFT_DATA } from "../utils/constants";
import { TreeMintCard } from "../components/TreeMintCard";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function BuyTrees() {
  const { ready, user } = usePrivy();

  return (
    <>
      {!ready && null}
      <Box mb="2rem" textAlign="center">
        <Heading size="lg">Only 200 Trees Available</Heading>
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
            />
          );
        })}
      </Flex>

      <Box mb="15rem" textAlign="center">
        <Text fontSize="sm">
          3% of tree sales will be added to the ‘Farmer’s Pot’. The better you
          farm, the more points you earn and a larger percentage of the pot you
          can win!
        </Text>
      </Box>
    </>
  );
}

export default BuyTrees;
