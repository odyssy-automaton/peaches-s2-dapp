import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useAccount,
} from "wagmi";

import erc721Abi from "../abis/ERC721.json";
import {
  BLOCK_EXPLORER_URL,
  NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
  CRITTER_COUNT_PLUS_ONE,
  TARGET_NETWORK,
} from "../utils/constants";

const getCritterId = () => {
  return Math.floor(Math.random() * CRITTER_COUNT_PLUS_ONE);
};

export const MintTreeButton = ({
  trunkId,
  name,
  img,
}: {
  trunkId: number;
  name: string;
  img: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useAccount();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = async () => {
    onOpen();
    writeContract({
      address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: erc721Abi,
      functionName: "mint",
      value: NFT_MINT_PRICE[TARGET_NETWORK],
      args: [trunkId, getCritterId()],
    });
  };

  const isDisabled = isPending || !chain;

  return (
    <>
      <Button
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
        isDisabled={isDisabled}
        _hover={{
          bg: "transparent",
          color: "brand.orange",
        }}
        onClick={handleMint}
      >
        MINT
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="gunmetal"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bg="#0f1418">
          <ModalHeader color="brand.green">Minting</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="lg">{name}</Text>
              <Image src={img} h="320px" />

              {hash && (
                <Link
                  isExternal
                  href={`${BLOCK_EXPLORER_URL[TARGET_NETWORK]}/tx/${hash}`}
                >
                  View tx
                </Link>
              )}

              {isConfirming && (
                <Spinner size="xl" color="brand.green" thickness="8px" />
              )}

              {isConfirmed && (
                <RouterLink to="/farm">
                  <Button
                    variant="outline"
                    fontFamily="Helsinki"
                    fontSize="2xl"
                    border="1px"
                    borderColor="brand.green"
                    borderRadius="200px;"
                    color="brand.orange"
                    size="lg"
                    height="72px"
                  >
                    Checkout Your New Tree
                  </Button>
                </RouterLink>
              )}

              {error && (
                <Text fontSize="sm">
                  Error: {(error as BaseError).shortMessage || error.message}
                </Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
