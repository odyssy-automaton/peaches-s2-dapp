import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { BsTwitterX } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { SiFarcaster } from "react-icons/si";

import FooterLogo from "../assets/Footer-Logo.png";
import {
  BLOCK_EXPLORER_URL,
  TARGET_NETWORK,
  TREE_NFT_CONTRACT_ADDRESS_S3,
} from "../utils/constants";

export const Footer = () => {
  return (
    <Box minH="200px" bg="brand.orange" color="brand.black" p="60px">
      <Flex
        direction="row"
        wrap="wrap"
        justify="space-between"
        align="center"
        gap="2rem"
      >
        <Flex align="center" gap="3rem" wrap="wrap">
          <Image src={FooterLogo} />
          <Flex direction="column" gap="0.5rem">
            <Flex gap="0.5rem" fontSize="24px">
              <Link href="https://twitter.com/PeachDropNFT" isExternal>
                <BsTwitterX />
              </Link>
              <Link href="https://warpcast.com/peachtycoon" isExternal>
                <SiFarcaster />
              </Link>
              <Link href="https://t.me/PeachDropNFT" isExternal>
                <BsTelegram />
              </Link>
            </Flex>
            {/* <Link
              href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}address/${PEACH_NFT_CONTRACT_ADDRESS[TARGET_NETWORK]}`}
              isExternal
            >
              <Heading color="brand.black" size="md">
                {" "}
                BaseScan Peaches
              </Heading>
            </Link> */}
            <Link
              href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}address/${TREE_NFT_CONTRACT_ADDRESS_S3[TARGET_NETWORK]}`}
              isExternal
            >
              <Heading color="brand.black" size="md">
                {" "}
                Trees Contract
              </Heading>
            </Link>
            <Link
              href={`https://rarible.com/collection/base/${TREE_NFT_CONTRACT_ADDRESS_S3[TARGET_NETWORK]}/items`}
              isExternal
            >
              <Heading color="brand.black" size="md">
                Trees on Rarible
              </Heading>
            </Link>
            {/* <Text fontSize="xs">Copyright 2024 PΞACH TYCOON</Text> */}
            <Text fontSize="sm">
              Made with ❤️ by{" "}
              <Link isExternal href="https://www.metacartel.org/">
                🌶️
              </Link>
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap=".5rem">
          <RouterLink to="/">
            <Heading color="brand.black" size="md">
              Home
            </Heading>
          </RouterLink>
          <RouterLink to="/market">
            <Heading color="brand.black" size="md">
              Buy Peaches
            </Heading>
          </RouterLink>
          <RouterLink to="/farm">
            <Heading color="brand.black" size="md">
              My Farm
            </Heading>
          </RouterLink>
          <RouterLink to="/account">
            <Heading color="brand.black" size="md">
              My Account
            </Heading>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};
