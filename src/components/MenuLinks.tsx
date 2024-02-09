import { Box, Stack } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

import { MenuItem } from "./MenuItem";
import { Connect } from "./Connect";
import { AccountIcon } from "./AccountButton";

export const MenuLinks = ({ isOpen }: { isOpen: boolean }) => {
  const { ready, authenticated, user } = usePrivy();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <Connect />
        {ready && authenticated && user?.wallet && (
          <MenuItem to="/account">
            <AccountIcon address={user.wallet.address} />
          </MenuItem>
        )}
      </Stack>
    </Box>
  );
};
