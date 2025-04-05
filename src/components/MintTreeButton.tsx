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
  TREE_NFT_MINT_PRICE_ERC20,
  TREE_NFT_MINT_DISCOUNT_PERC,
  TREE_ERC20_PAYMENT_TOKEN,
  TREE_NFT_CONTRACT_ADDRESS_S3,
} from "../utils/constants";
import { discountPrice } from "../utils/price";
import { BalanceCheck } from "./BalanceCheck";
import { useMemo } from "react";
import { ApprovalCheck } from "./ApprovalCheck";

const getCritterId = () => {
  return Math.floor(Math.random() * CRITTER_COUNT_PLUS_ONE);
};

export const MintTreeButton = ({
  trunkId,
  name,
  img,
  currency,
  hasDiscount,
}: {
  trunkId: number;
  name: string;
  img: string;
  currency: string;
  hasDiscount?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain, address } = useAccount();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = async () => {
    onOpen();

    const value = hasDiscount
      ? discountPrice(
          NFT_MINT_PRICE[TARGET_NETWORK],
          TREE_NFT_MINT_DISCOUNT_PERC[TARGET_NETWORK]
        )
      : NFT_MINT_PRICE[TARGET_NETWORK];
    writeContract({
      address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: erc721Abi,
      functionName: "mint",
      value,
      args: [trunkId, getCritterId()],
    });
  };

  const handleMintErc20 = async () => {
    onOpen();

    const amount = hasDiscount
      ? discountPrice(
          TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK],
          TREE_NFT_MINT_DISCOUNT_PERC[TARGET_NETWORK]
        )
      : TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK];
    writeContract({
      address: NFT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: erc721Abi,
      functionName: "mintERC20",
      args: [trunkId, getCritterId(), amount],
    });
  };

  const price = useMemo(() => {
    if (currency === "usdc") {
      return hasDiscount
        ? discountPrice(
            TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK],
            TREE_NFT_MINT_DISCOUNT_PERC[TARGET_NETWORK]
          )
        : TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK];
    } else {
      return hasDiscount
        ? discountPrice(
            NFT_MINT_PRICE[TARGET_NETWORK],
            TREE_NFT_MINT_DISCOUNT_PERC[TARGET_NETWORK]
          )
        : NFT_MINT_PRICE[TARGET_NETWORK];
    }
  }, [currency, hasDiscount]);

  const isDisabled = isPending || !chain;

  return (
    <>
      <BalanceCheck
        address={address}
        targetBalance={price}
        // targetBalance={99999480020000000000000000n}
        tokenAddress={
          currency === "usdc"
            ? TREE_ERC20_PAYMENT_TOKEN[TARGET_NETWORK]
            : undefined
        }
      >
        <ApprovalCheck
          address={address}
          amount={price}
          tokenAddress={
            currency === "usdc"
              ? TREE_ERC20_PAYMENT_TOKEN[TARGET_NETWORK]
              : undefined
          }
          spender={TREE_NFT_CONTRACT_ADDRESS_S3[TARGET_NETWORK]}
        >
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
            onClick={currency === "eth" ? handleMint : handleMintErc20}
          >
            MINT
          </Button>
        </ApprovalCheck>
      </BalanceCheck>

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
