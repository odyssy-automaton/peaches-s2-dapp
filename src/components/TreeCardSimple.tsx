import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import {
  blockExplorerNftLink,
  dhImagePath,
  truncateAddress,
} from "../utils/formatting";
import { TokenBalance } from "@0xsequence/indexer";

export const TreeCardSimple = ({
  tree,
  season,
}: {
  tree: TokenBalance;
  season: number;
}) => {
  return (
    <Flex direction="column" align="center" gap="1rem">
      <Box
        w={{ base: "320px" }}
        bg="brand.gray"
        borderRadius="20px"
        p="26px 14px 26px 29px"
      >
        <Flex direction="row" gap="1rem">
          <Flex direction="column" align="center">
            <Flex w="100%" justify="flex-start" mb="1rem">
              <Link
                href={blockExplorerNftLink(tree.tokenID)}
                isExternal
                fontSize="xs"
                color="brand.orange"
              >
                {`${truncateAddress(tree.contractAddress)}/${tree.tokenID}`}
              </Link>
            </Flex>
            <Image mb=".5rem" src={dhImagePath(tree.tokenMetadata?.image)} />
            <Text fontSize="sm" color="brand.green" fontWeight="700">
              Season {season}
            </Text>
            <Text fontSize="xs">{tree.tokenMetadata?.name}</Text>
            <Text fontSize="sm" mb="1rem" fontWeight="700">
              {tree.tokenMetadata?.description}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
