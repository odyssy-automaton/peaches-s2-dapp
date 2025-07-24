import { Flex, Box, Heading, Link, Text } from "@chakra-ui/react";
import type { Item } from "@rarible/api-client";
import { ListingCard } from "./ListingCard";

export const ListingList = ({ listings }: { listings: Item[] }) => {
  return (
    <Box mb="5rem">
      <Flex
        gap="1rem"
        wrap="wrap"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      >
        {listings.length < 1 && (
          <Flex gap="1rem" direction="column" align="center" justify="center">
            <Heading color="brand.orange">Market Is Almost Open</Heading>
            <Heading color="brand.orange">Check back soon</Heading>
            <Link
              href="https://rarible.com/collection/base/0x212161a7ad0ac779ccc569a9c305cbc53ad3960d/items"
              isExternal
            >
              <Text color="brand.blue">
                You can view current listings in the Rarible marketplace
              </Text>
            </Link>
          </Flex>
        )}
        {listings.map((item: Item) => {
          return (
            <ListingCard
              tokenId={item.tokenId as string}
              peach={item}
              key={item.tokenId}
            />
          );
        })}
      </Flex>
    </Box>
  );
};
