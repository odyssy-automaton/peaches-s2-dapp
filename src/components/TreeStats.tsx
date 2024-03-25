import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";
import { PiCheckFatFill } from "react-icons/pi";

import { useTreePoints } from "../hooks/useTreePoints";
import { TreeNft } from "../utils/types";

import waterIcon from "../assets/icon_water.png";
import pruneIcon from "../assets/icon_prune.png";
import sprayIcon from "../assets/icon_spray.png";
import fertIcon from "../assets/icon_fert.png";

export const TreeStats = ({ tree }: { tree: TreeNft }) => {
  const { totalPoints, prune, spray, waterings, fertilizings } = useTreePoints({
    tokenId: tree.tokenID,
  });

  return (
    <Flex direction="column" align="center" gap=".75rem">
      <Heading size="lg" mb=".5rem">
        {totalPoints}
      </Heading>
      <Box textAlign="center">
        <Image src={waterIcon} />
        <Text fontSize="xs">{waterings}</Text>
      </Box>
      <Box textAlign="center">
        <Image src={fertIcon} />
        <Text fontSize="xs">{fertilizings}</Text>
      </Box>
      <Flex
        direction="column"
        alignItems="center"
        textAlign="center"
        gap=".15rem"
        mb=".25rem"
      >
        <Image src={pruneIcon} />
        <Text color={prune ? "brand.green" : "black"}>
          <PiCheckFatFill />
        </Text>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        textAlign="center"
        gap=".15rem"
      >
        <Image src={sprayIcon} />
        <Text color={spray ? "brand.green" : "black"}>
          <PiCheckFatFill />
        </Text>
      </Flex>
    </Flex>
  );
};
