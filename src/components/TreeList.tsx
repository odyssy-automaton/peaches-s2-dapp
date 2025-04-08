import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { TreeCard } from "./TreeCard";
import { TreeNft } from "../utils/types";
// import { TokenBalance } from "@0xsequence/indexer";

export const TreeList = ({ account }: { account: string }) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: account,
    season: "two",
  });

  return (
    <Box mb="5rem">
      {isLoading && <Spinner />}

      {accountNfts?.balances && accountNfts?.balances.length > 0 && (
        <Flex
          gap="1rem"
          wrap="wrap"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
        >
          {accountNfts.balances.map((token: TreeNft) => {
            return (
              <TreeCard tree={token} key={token.tokenID} account={account} />
            );
          })}
        </Flex>
      )}
    </Box>
  );
};
