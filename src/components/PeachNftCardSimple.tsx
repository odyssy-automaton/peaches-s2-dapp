import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import {
  blockExplorerPeachNftLink,
  truncateAddress,
} from "../utils/formatting";

import { usePeachStatus } from "../hooks/usePeachStatus";
import { TokenBalance } from "@0xsequence/indexer";

export const PeachNftCardSimple = ({
  peach,
  season,
}: {
  peach: TokenBalance;
  season: number;
}) => {
  const { peachStatus, img } = usePeachStatus({
    tokenId: peach.tokenID,
    season,
  });

  console.log(img);

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
            <Link
              href={blockExplorerPeachNftLink(peach.tokenID)}
              isExternal
              fontSize="xs"
              color="brand.orange"
            >
              {`${truncateAddress(peach.contractAddress)}/${peach.tokenID}`}
            </Link>
          </Flex>
          <Image mb=".5rem" src={img} />
          <Text fontSize="sm" color="brand.green" fontWeight="700">
            Season {season}
          </Text>
          <Text fontSize="xs">{peach.tokenMetadata?.name}</Text>

          <Text fontSize="sm" my="1rem" fontWeight="700">
            {peachStatus}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
