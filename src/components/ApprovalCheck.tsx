import { ReactNode, useMemo } from "react";
import { useReadContract } from "wagmi";
import erc20Abi from "../abis/ERC20.json";

import { ApproveERC20 } from "./ApproveERC20Button";

export const ApprovalCheck = ({
  address,
  amount,
  tokenAddress,
  spender,
  children,
}: {
  address?: string;
  children: ReactNode;
  tokenAddress?: string;
  spender: string;
  amount: bigint;
}) => {
  const {
    data: allowance,
    refetch,
    isLoading,
  } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, spender],
  });

  const needsApproval = useMemo(() => {
    if (!tokenAddress) return false;
    return (allowance as bigint) < amount;
  }, [amount, allowance, tokenAddress]);

  console.log("needsApproval", needsApproval, allowance, amount);

  if (tokenAddress && needsApproval) {
    return (
      <>
        <ApproveERC20
          refetch={refetch}
          spender={spender}
          amount={amount}
          tokenAddress={tokenAddress}
        />
      </>
    );
  }
  if (isLoading) return null;

  return children;
};
