import {
  Button,
  Flex,
  Heading,
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
  useBalance,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { PiCheckFatFill } from "react-icons/pi";

import fertAbi from "../abis/Fert.json";

import {
  BLOCK_EXPLORER_URL,
  BOOST_POINTS,
  FERT_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../utils/constants";
import peachAvatar from "../assets/peach-avatar-trans.png";

import fertIcon from "../assets/icon_fert.png";
import { fromWei } from "../utils/formatting";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useTreePoints } from "../hooks/useTreePoints";
import { FertTreeERC20Button } from "./FertTreeERC20Button";
import { FERT_DESCRIPTION } from "./BoostContent";
import { usePrices } from "../hooks/usePrices";
import { formatUnits } from "viem";

export const FertTreeButton = ({
  tokenId,
  hasFert,
}: {
  tokenId: string;
  hasFert?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fertPrice, fertPriceErc20 } = usePrices();

  const { chain } = useAccount();
  const { user } = usePrivy();
  const { refetch } = useTreePoints({
    tokenId: tokenId,
  });

  const queryClient = useQueryClient();

  const result = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  const {
    data: hash,
    error,
    isPending,
    writeContract,
    reset: resetWriteState,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const reset = async () => {
      await queryClient.invalidateQueries({
        queryKey: [`treePoints-${tokenId}`],
      });
    };
    if (isConfirmed) {
      console.log("INVALIDATING/REFETCH");
      reset();
      refetch();
    }
  }, [isConfirmed, queryClient, tokenId, refetch]);

  useEffect(() => {
    if (!isOpen) {
      resetWriteState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleConfirm = () => {
    onOpen();
  };

  const handleFert = async () => {
    writeContract({
      address: FERT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: fertAbi,
      functionName: "fertilize",
      value: fertPrice,
      args: [tokenId],
    });
  };

  const handleFertERC20 = async () => {
    writeContract({
      address: FERT_CONTRACT_ADDRESS[TARGET_NETWORK],
      abi: fertAbi,
      functionName: "fertilizeERC20",
      args: [tokenId, fertPriceErc20],
    });
  };

  const hasBalance = fertPrice < BigInt(result?.data?.value || 0);
  const isDisabled = isPending || !chain || hasFert;

  return (
    <>
      <Button
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
        disabled={isDisabled}
        _hover={{
          bg: "transparent",
          color: "brand.orange",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        onClick={handleConfirm}
      >
        <Image src={fertIcon} w="44px" mr=".5rem" />
        FERTILIZE
        {hasFert && (
          <Text ml=".25rem">
            <PiCheckFatFill />
          </Text>
        )}
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
          <ModalHeader color="brand.orange">Fertilize</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="2rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Text fontSize="sm">{FERT_DESCRIPTION}</Text>

              <Flex
                direction="column"
                justify="center"
                align="center"
                mb=".5rem"
              >
                <Text fontSize="sm" fontWeight="700" color="brand.green">
                  You Get
                </Text>
                <Flex align="center" gap=".5rem">
                  <Heading size="md" color="brand.green">
                    1 X
                  </Heading>
                  <Image src={peachAvatar} w="32px" />

                  <Heading size="xs" color="brand.green">
                    &
                  </Heading>

                  <Heading size="md" color="brand.green">
                    {`${BOOST_POINTS.FERT} POINTS`}
                  </Heading>
                </Flex>
              </Flex>

              {!hash && (
                <>
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="sm" fontWeight="700" color="brand.blue">
                      Cost
                    </Text>

                    <Heading size="md" color="brand.blue">
                      {`${fromWei(fertPrice.toString())} BASE ETH`}
                    </Heading>
                  </Flex>

                  <Button
                    variant="outline"
                    fontFamily="heading"
                    fontSize="xl"
                    fontStyle="italic"
                    fontWeight="700"
                    border="1px"
                    borderColor="brand.green"
                    borderRadius="200px"
                    color="brand.orange"
                    size="lg"
                    height="60px"
                    width="260px"
                    isDisabled={isDisabled}
                    _hover={{
                      bg: "transparent",
                      color: "brand.orange",
                    }}
                    onClick={handleFert}
                  >
                    {hasBalance ? "PURCHASE WITH ETH" : "NOT ENOUGH ETH"}
                  </Button>

                  <Text fontSize="sm">OR</Text>

                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="sm" fontWeight="700" color="brand.blue">
                      Cost
                    </Text>

                    <Heading size="md" color="brand.blue">
                      {`${formatUnits(fertPriceErc20, 6)} USDC`}
                    </Heading>
                  </Flex>

                  <FertTreeERC20Button
                    address={user?.wallet?.address}
                    handleFertERC20={handleFertERC20}
                    isDisabled={isDisabled}
                    erc20BuyPrice={fertPriceErc20}
                  />
                </>
              )}

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
                <Heading size="md">
                  Fertlizing is Done! Your points will show up soon .
                </Heading>
              )}

              {error && (
                <Text fontSize="sm" color="brand.red">
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
