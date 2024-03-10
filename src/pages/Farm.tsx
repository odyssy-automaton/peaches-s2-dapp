import { usePrivy } from "@privy-io/react-auth";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";

import { LogIn } from "../components/LogIn";
import { TreeList } from "../components/TreeList";
import { Link } from "react-router-dom";

function Farm() {
  const { ready, authenticated, user } = usePrivy();

  return (
    <>
      <Flex
        w="full"
        border="none"
        direction="row"
        alignItems="center"
        justifyContent="start"
        mt={10}
        mb={20}
      >
        <Divider
          mt={4}
          mr={4}
          width="10vw"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
        <Text
          fontFamily="auster"
          color="brand.white"
          fontSize="20px"
          fontWeight="bold"
        >
          My trees
        </Text>
        <Divider
          mt={4}
          ml={4}
          flex="1"
          borderTop="dotted 1px"
          borderColor={"brand.white"}
          borderBottom="none"
          background="none"
        />
      </Flex>
      {/* <Box borderBottom="1px dotted white" width="100%" /> */}
      <Flex w="100%" gap="1rem" direction="column" align="center" mb="3rem">
        {!ready && null}

        {ready && !authenticated && <LogIn />}

        {ready && authenticated && user?.wallet?.address && (
          <TreeList address={user.wallet.address} />
        )}
      </Flex>
      <Divider
        ml={4}
        flex="1"
        borderTop="dotted 1px"
        borderColor={"brand.white"}
        borderBottom="none"
        background="none"
      />
      <Flex w="100%" pt={8} pb={20} px={20} justify="flex-end">
        <Button
          as={Link}
          to="/buy-trees"
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="1px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="60px"
          width="220px"
          my="1rem"
          _hover={{ bg: "transparent", color: "brand.white" }}
        >
          BUY TREES
        </Button>
        {/* <Box
          w="220px"
          height="60px"
          position="absolute"
          border="2px"
          borderColor="brand.green"
          borderRadius="200px;"
        ></Box> */}
      </Flex>
    </>
  );
}

export default Farm;
