import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer } from "./Footer";
import {
  NFT_CONTRACT_ADDRESS,
  SEASON_OPEN_TEXT,
  TARGET_NETWORK,
} from "../utils/constants";
import { usePrivy } from "@privy-io/react-auth";
import { useReadContract } from "wagmi";
import erc721Abi from "../abis/ERC721.json";

export const Layout = () => {
  const { user } = usePrivy();

  const { data: discountBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK] as `0x${string}`,
    abi: erc721Abi,
    functionName: "balanceOf",
    args: [user?.wallet?.address as `0x${string}`],
  }) as { data: bigint };
  const hasDiscount = discountBalance > 0;
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="center"
        w="100%"
        textAlign="center"
        backgroundColor="brand.green"
        position="fixed"
        zIndex={10}
        px={8}
      >
        {!hasDiscount && (
          <Text fontSize={{ base: "sm", sm: "md" }} py="1rem" fontWeight="700">
            {SEASON_OPEN_TEXT}
          </Text>
        )}
        {hasDiscount && (
          <Text fontSize={{ base: "sm", sm: "md" }} py="1rem" fontWeight="700">
            As a season 2 tree holder you get a discount on season 3 trees!
          </Text>
        )}
      </Flex>
      <NavBar />
      <Box pt="180px">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
