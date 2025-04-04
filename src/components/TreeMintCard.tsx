import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import {
  NFT_MINT_PRICE,
  NftTreeMeta,
  TARGET_NETWORK,
  TREE_NFT_MINT_DISCOUNT_PERC,
  TREE_NFT_MINT_PRICE_ERC20,
} from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { fromUSDC, fromWei } from "../utils/formatting";
import { LogIn } from "./LogIn";
import { discountPrice } from "../utils/price";
import { useState } from "react";
import { MintTreeButton } from "./MintTreeButton";
// import { MintTreeButton } from "./MintTreeButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const holdingCount = (name: string, nfts?: any[]) => {
  if (!nfts) return 0;
  return nfts.filter((nft) => nft.tokenMetadata?.description === name).length;
};

const AccountNftCount = ({
  account,
  name,
}: {
  account: string;
  name: string;
}) => {
  const { accountNfts } = useAccountNfts({ accountAddress: account });

  return (
    <Text color="brand.white" fontSize="xs">
      You own {`${holdingCount(name, accountNfts?.balances)} ${name}`}
    </Text>
  );
};

export const TreeMintCard = ({
  tree,
  account,
  hasDiscount,
}: {
  tree: NftTreeMeta;
  account?: string;
  hasDiscount?: boolean;
}) => {
  const [currency, setCurrency] = useState<string>("eth");
  return (
    <Flex direction="column" align="center" gap="1rem">
      <Flex
        direction="column"
        align="center"
        w={{ base: "320px" }}
        bg="brand.gray"
        borderRadius="20px"
        p="29px 36px"
      >
        <Image src={tree.img} />
        <Box
          w="100%"
          textAlign="center"
          borderBottom="1px dotted black"
          paddingBottom="2rem"
        >
          <p>{tree.name}</p>
          {hasDiscount && (
            <Text fontSize="sm" color="brand.red" fontWeight="700" mb="0rem">
              You Got the Season 2 Farmer Discount!
            </Text>
          )}

          <RadioGroup onChange={setCurrency} value={currency}>
            <Flex
              direction="row"
              gap="1rem"
              w="full"
              align="center"
              justify="center"
            >
              <Radio value="eth" colorScheme="green">
                <Text fontSize="xs" color="brand.green">
                  ETH
                </Text>
              </Radio>
              <Radio value="usdc" colorScheme="green">
                <Text fontSize="xs" color="brand.green">
                  USDC
                </Text>
              </Radio>
            </Flex>
          </RadioGroup>

          {!hasDiscount && (
            <Heading size="md" color="brand.blue">
              {currency === "eth" &&
                `${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())} ETH`}
              {currency === "usdc" &&
                `${fromUSDC(
                  TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK].toString()
                )} USDC`}
            </Heading>
          )}

          {hasDiscount && (
            <>
              <Heading size="md" color="brand.blue">
                {currency === "eth" &&
                  `${fromWei(
                    discountPrice(
                      NFT_MINT_PRICE[TARGET_NETWORK],
                      TREE_NFT_MINT_DISCOUNT_PERC[TARGET_NETWORK]
                    ).toString()
                  )} ETH`}

                {currency === "usdc" &&
                  `${fromUSDC(
                    discountPrice(
                      TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK],
                      TREE_NFT_MINT_DISCOUNT_PERC[TARGET_NETWORK]
                    ).toString()
                  )} USDC`}
              </Heading>
              <Heading size="md" color="brand.blue">
                <s>
                  {currency === "eth" &&
                    `${fromWei(NFT_MINT_PRICE[TARGET_NETWORK].toString())} ETH`}

                  {currency === "usdc" &&
                    `${fromUSDC(
                      TREE_NFT_MINT_PRICE_ERC20[TARGET_NETWORK].toString()
                    )} USDC`}
                </s>
              </Heading>
            </>
          )}
        </Box>
        {account && (
          <MintTreeButton
            trunkId={tree.value}
            name={tree.name}
            img={tree.img}
            currency={currency}
            hasDiscount={hasDiscount}
          />

          // <Button
          //   variant="outline"
          //   fontFamily="heading"
          //   fontSize="xl"
          //   fontStyle="italic"
          //   fontWeight="700"
          //   border="1px"
          //   borderColor="brand.green"
          //   borderRadius="200px;"
          //   color="brand.orange"
          //   size="lg"
          //   height="60px"
          //   width="220px"
          //   my="1rem"
          //   isDisabled={true}
          //   _hover={{
          //     bg: "transparent",
          //     color: "brand.orange",
          //   }}
          // >
          //   MINT
          // </Button>
        )}
        {!account && (
          <>
            <Text>Login to Mint</Text>
            <LogIn />
          </>
        )}
      </Flex>
      {account && <AccountNftCount account={account} name={tree.name} />}
    </Flex>
  );
};
