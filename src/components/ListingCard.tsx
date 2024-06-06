import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import type { Item } from "@rarible/api-client";

import { truncateAddress } from "../utils/formatting";

import { usePeachStatus } from "../hooks/usePeachStatus";
import { PeachActions } from "./PeachActions";

import peachAvatar from "../assets/peach-avatar-trans.png";

export const ListingCard = ({
  peach,
  tokenId,
}: {
  peach: Item;
  tokenId: string;
}) => {
  const { peachStatus, tokenState, img, orders } = usePeachStatus({
    tokenId,
  });

  const isListed = orders && orders.length > 0;

  return (
    <Flex direction="column" align="center" gap="1rem">
      <Box
        w={{ base: "320px" }}
        bg="brand.gray"
        borderRadius="20px"
        p="26px 29px 26px 29px"
      >
        <Flex direction="column" align="center">
          <Flex w="100%" justify="flex-start" mb="1rem">
            {peach.contract && (
              <RouterLink to={`/market/${tokenId}`} color="brand.orange">
                <Text fontSize="xs" color="brand.orange">
                  {`${truncateAddress(
                    peach.contract?.split(":")[1]
                  )}/${tokenId}`}
                </Text>
              </RouterLink>
            )}
          </Flex>
          <Image mb=".5rem" src={img} />
          <Text fontSize="xs">{peach.meta?.name}</Text>
          <Text fontSize="sm" my="1rem" fontWeight="700">
            {peachStatus}
          </Text>

          {isListed && (
            <>
              <Text fontSize="xs">Price</Text>
              <Heading
                size="lg"
                textAlign="center"
                color="brand.green"
                mb="1rem"
              >
                {`${orders[0].take.value} ${orders[0].take.type["@type"]}`}
              </Heading>

              {peachStatus !== "redeemed" && (
                <Flex align="end" gap=".5rem">
                  <Heading size="sm" color="brand.orange">
                    Redeemable for 1 X
                  </Heading>
                  <Image src={peachAvatar} w="32px" />
                </Flex>
              )}
            </>
          )}

          {/* {tokenState !== undefined && (
            <PeachActions
              tokenId={peach.tokenID}
              tokenImage={img}
              account={account}
              tokenState={tokenState}
            />
          )} */}
        </Flex>
      </Box>
    </Flex>
  );
};
