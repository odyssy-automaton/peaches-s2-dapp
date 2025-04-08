import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { TreeCardSimple } from "./TreeCardSimple";
import { TokenBalance } from "@0xsequence/indexer";

export const TreeListSeasonTwo = ({ account }: { account: string }) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: account,
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
          {accountNfts.balances.map((token: TokenBalance) => {
            return (
              <TreeCardSimple tree={token} key={token.tokenID} season={2} />
            );
          })}
        </Flex>
      )}
    </Box>
  );
};
