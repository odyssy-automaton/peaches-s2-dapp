import { Flex, Spinner, Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAccountPeaches } from "../hooks/useAccountPeaches";
import { PeachNftCardSimple } from "./PeachNftCardSimple";
import { TokenBalance } from "@0xsequence/indexer";

export const PeachListSeasonTwo = ({ account }: { account: string }) => {
  const { accountNfts, isLoading } = useAccountPeaches({
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
              <PeachNftCardSimple
                peach={token}
                key={token.tokenID}
                season={2}
              />
            );
          })}
        </Flex>
      )}

      {!accountNfts?.balances ||
        (!accountNfts?.balances.length && (
          <Flex gap="1rem" direction="column" align="center" justify="center">
            <Heading color="brand.orange" mb="2rem">
              You don’t own any peaches yet!
            </Heading>
            <Button
              as={Link}
              to="/market"
              variant="outline"
              fontFamily="heading"
              fontSize="xl"
              fontStyle="italic"
              fontWeight="700"
              border="1px"
              borderColor="brand.green"
              borderRadius="200px;"
              color="brand.orange"
              size="lg"
              height="60px"
              width="220px"
              my="1rem"
              _hover={{ bg: "transparent", color: "brand.white" }}
            >
              BUY PEACHES
            </Button>
          </Flex>
        ))}
    </Box>
  );
};
