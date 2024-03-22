import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { useWaitForTransactionReceipt } from "wagmi";
import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";

const SuccessContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const MintTx = ({
  txHash,
  setTxComplete,
}: {
  txHash: `0x${string}`;
  setTxComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isError, isLoading, data } = useWaitForTransactionReceipt({
    hash: txHash,
    confirmations: 5,
  });

  useEffect(() => {
    if (data) {
      console.log("success", data);
      setTxComplete(true);
    }
  }, [data, setTxComplete]);

  if (isLoading) return null;
  if (isError) return <div>Transaction error</div>;

  return (
    <SuccessContainer>
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
    </SuccessContainer>
  );
};
