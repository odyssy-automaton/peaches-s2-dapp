import { Flex, Spinner, Text } from "@chakra-ui/react";

import { useTreePoints } from "../hooks/useTreePoints";
import { PruneTreeButton } from "./PruneTreeButton";
import { FertTreeButton } from "./FertTreeButton";
import { SprayTreeButton } from "./SprayTreeButton";

export const TreeActions = ({
  tokenId,
}: {
  tokenId: string;
  account: string;
}) => {
  const { prune, fert, canSpray, isFetched } = useTreePoints({
    tokenId: tokenId,
  });

  if (!isFetched) return <Spinner color="brand.green" />;

  return (
    <Flex direction="column" align="center">
      {/* <Text
        fontSize="xs"
        color="brand.green"
        opacity="100%"
        mt="-0.5rem"
        textAlign="center"
      >
        Boost season is over
      </Text> */}

      <FertTreeButton tokenId={tokenId} hasFert={fert} />

      <PruneTreeButton tokenId={tokenId} hasPrune={prune} />

      <SprayTreeButton tokenId={tokenId} canSpray={canSpray} />

      <Text fontSize="xs" w="full" align="center" color="brand.blue">
        Maxing out boosts will result in 1 (one) additional Peach Box!
      </Text>
    </Flex>
  );
};
