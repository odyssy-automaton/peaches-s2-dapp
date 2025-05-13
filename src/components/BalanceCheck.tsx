import { ReactNode, useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useBalance, useChainId, useChains, useReadContract } from "wagmi";
import erc20Abi from "../abis/ERC20.json";
import { useFundWallet, usePrivy } from "@privy-io/react-auth";
import { fromUSDC, fromWei } from "../utils/formatting";
import { useTreeMintPrice } from "../hooks/useTreeMintPrice";

export const BalanceCheck = ({
  address,
  targetBalance,
  tokenAddress,
  children,
}: {
  address?: string;
  targetBalance: bigint;
  children: ReactNode;
  tokenAddress?: string;
}) => {
  const { user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);
  const { erc20MintPrice, nativeMintPrice } = useTreeMintPrice();

  const result = useBalance({
    address: address as `0x${string}`,
  });

  const { data: tokenBalance, isLoading } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }) as { data: bigint; isLoading: boolean };

  const hasNativeBalance = useMemo(() => {
    if (!result || !result.data) return false;

    return result.data.value > targetBalance;
  }, [targetBalance, result]);

  const hasTokenBalance = useMemo(() => {
    if (!tokenBalance) return false;

    return tokenBalance >= targetBalance;
  }, [tokenBalance, targetBalance]);

  const handleFunding = async () => {
    if (user?.wallet?.address) {
      const amount = tokenAddress
        ? fromUSDC(erc20MintPrice?.toString() || "0")
        : fromWei(nativeMintPrice?.toString() || "0");

      console.log("amount", amount);
      await fundWallet(user.wallet.address, {
        chain: activeChain,
        asset: tokenAddress ? "USDC" : "native-currency",
        amount: amount,
      });
    } else {
      console.log("funding error no wallet", user);
    }
  };

  const needsFunding =
    (!tokenAddress && !hasNativeBalance) || (tokenAddress && !hasTokenBalance);

  if (needsFunding) {
    return (
      <>
        <Text fontSize="xs">Insufficient Balance</Text>
        <Button
          onClick={handleFunding}
          variant="outline"
          fontFamily="heading"
          fontSize="xl"
          fontStyle="italic"
          fontWeight="700"
          border="2px"
          borderColor="brand.green"
          borderRadius="200px;"
          color="brand.orange"
          size="lg"
          height="60px"
          width="full"
          _hover={{ color: "brand.white" }}
          bg="#1f1f1f"
        >
          Fund Your Wallet
        </Button>
      </>
    );
  }

  if (isLoading || result.isLoading) return;

  return children;
};
