import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";

import { LabelBadge, PeachCard } from "./SharedLayout";

export const HomeSectionOne = () => {
  return (
    <Flex
      mt={{ base: "0", md: "160px" }}
      direction={{ base: "column", md: "row" }}
      justifyContent="start"
      alignItems="start"
      px="10vw"
    >
      <Box flex="1" mb="2rem" minW={{ base: "none", md: "250px" }}>
        <Flex gap="1rem" align="center">
          <Heading color="brand.orange">1.</Heading>
          <LabelBadge
            bg="brand.green"
            color="brand.black"
            size="md"
            style={{
              lineHeight: "1.75",
            }}
          >
            • Tree Sales Open •
          </LabelBadge>
        </Flex>
        <Text
          fontFamily="auster"
          maxWidth="597px"
          fontWeight="bold"
          fontSize={{ base: "56px", xl: "80px" }}
          lineHeight={{ base: "60px", xl: "96px" }}
          mb={4}
        >
          Get Trees!
        </Text>
        <Text maxW="460px" mb="2rem">
          Welcome to PΞACH Tycoon Season Tree! For this season, we are once
          again inviting all humble farmers to try their hand at growing
          peaches.
        </Text>
        <Text maxW="460px" mb="2rem" fontWeight="700">
          Every tree NFT purchased is guaranteed to produce two (2) peach boxes
          that each include a farmer’s dozen (13) delicious, Palisade peaches.
        </Text>
        <Text maxW="460px">
          Palisade peaches are amongst the best in the world due to the unique
          climate that produces high sugars and tender fruit. Check out the
          <Link as={RouterLink} to="/about" color="brand.orange" mx=".5rem">
            about page
          </Link>
          to learn more.
        </Text>
      </Box>
      <Flex direction="column" alignItems={{ base: "center", md: "flex-end" }}>
        <PeachCard
          w={{ base: "293px", md: "426px" }}
          h="504px"
          mb="1rem"
          ml={{ base: "0px", md: "50px" }}
        >
          <Flex direction="column" align="center">
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              w="268px"
              height="268px"
              style={{
                borderRadius: "50%",
                border: "10px solid rgba(14,20,24,0.25)",
                textAlign: "center",
              }}
            >
              <Text
                fontSize="30px"
                lineHeight="30px"
                color="brand.orange"
                fontWeight="bold"
                fontFamily="auster"
              >
                1 tree =<br /> 2 boxes of peaches*
              </Text>
            </Flex>
            <Box w="full" position="relative" my="3rem">
              <Button
                as={RouterLink}
                to="/buy-trees"
                variant="outline"
                fontFamily="heading"
                fontSize="2xl"
                fontStyle="italic"
                fontWeight="700"
                border="2px"
                borderColor="brand.green"
                borderRadius="200px;"
                color="brand.orange"
                size="lg"
                height="72px"
                w={{ base: "223px", md: "320px" }}
                _hover={{
                  transform: "translate(0px, -10px)",
                  color: "brand.white",
                }}
                _focus={{ transform: "translate(0px, 0px)", bg: "brand.black" }}
                position="absolute"
                bg="#1f1f1f"
                zIndex="2"
                transform="translate(0px, -12px)"
              >
                BUY TREE
              </Button>
              <Box
                w="full"
                height="72px"
                position="absolute"
                border="2px"
                borderColor="brand.green"
                borderRadius="200px;"
              ></Box>
            </Box>
          </Flex>
        </PeachCard>
        <Box textAlign="center" w={{ base: "293px", md: "426px" }}>
          <Text fontSize="xs" color="brand.orange">
            * One tree guarantees two boxes of peaches. Water, prune, fertilize
            and protect your trees from pests in order to earn additional peach
            boxes.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
