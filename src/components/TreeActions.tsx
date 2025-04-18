import { Image, Text, Flex, Button } from "@chakra-ui/react";

import pruneIcon from "../assets/icon_prune.png";
import fertIcon from "../assets/icon_fert.png";
import sprayIcon from "../assets/icon_spray.png";

// import { useTreePoints } from "../hooks/useTreePoints";
// import { PiCheckFatFill } from "react-icons/pi";
// import { PruneTreeButton } from "./PruneTreeButton";
import { DisabledWaterTreeButton } from "./DisabledWateringButton";
// import { FertTreeButton } from "./FertTreeButton";
// import { SprayTreeButton } from "./SprayTreeButton";
// import { WaterTreeButton } from "./WaterTreeButton";

export const TreeActions = ({
  tokenId,
}: {
  tokenId: string;
  account: string;
}) => {
  // const { prune, fert, canSpray, isFetched } = useTreePoints({
  //   tokenId: tokenId,
  // });

  // if (!isFetched) return <Spinner color="brand.green" />;

  console.log("tokenId", tokenId);

  return (
    <Flex direction="column" align="center">
      <Text
        fontSize="xs"
        color="brand.green"
        opacity="100%"
        mt="-0.5rem"
        textAlign="center"
      >
        Boost season is coming soon!
      </Text>

      {/* <WaterTreeButton
        tokenId={tokenId}
        watererdToday={watererdToday || false}
        // watererdToday={true}
      /> */}

      <DisabledWaterTreeButton />

      {/* {!fert && <FertTreeButton tokenId={tokenId} />} */}
      <>
        <Button
          opacity="30%"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.orange"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="60px"
          width="220px"
          my=".5rem"
          disabled={true}
          _hover={{
            bg: "transparent",
            color: "brand.orange",
            cursor: "not-allowed",
          }}
        >
          <Image src={fertIcon} w="44px" mr=".5rem" />
          FERTILIZE
          {/* {fert && (
            <Text ml=".25rem">
              <PiCheckFatFill />
            </Text>
          )} */}
        </Button>
      </>

      {/* <SprayTreeButton tokenId={tokenId} canSpray={canSpray} /> */}

      <>
        <Button
          opacity="30%"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.green"
          size="lg"
          height="60px"
          width="220px"
          my=".5rem"
          disabled={true}
          _hover={{
            bg: "transparent",
            color: "brand.green",
            cursor: "not-allowed",
          }}
        >
          <Image src={sprayIcon} w="44px" mr=".5rem" />
          SPRAY
          {/* {!canSpray && (
            <Text ml=".25rem">
              <PiCheckFatFill />
            </Text>
          )} */}
        </Button>
      </>

      {/* {!prune && <PruneTreeButton tokenId={tokenId} />} */}
      {/* {prune && ( */}
      <>
        <Button
          opacity="30%"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.green"
          size="lg"
          height="60px"
          width="220px"
          my=".5rem"
          disabled={true}
          _hover={{
            bg: "transparent",
            color: "brand.green",
            cursor: "not-allowed",
          }}
        >
          <Image src={pruneIcon} w="44px" mr=".5rem" />
          PRUNE
          {/* {prune && (
              <Text ml=".25rem">
                <PiCheckFatFill />
              </Text>
            )} */}
        </Button>
      </>
      {/* )} */}
    </Flex>
  );
};
