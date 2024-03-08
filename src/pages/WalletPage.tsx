import Stack from "@mui/material/Stack";

import Wallet from "src/components/WalletScreen";

export function Component() {

  return (
    <Stack spacing={2}>
      <Wallet />
    </Stack>
  );
}


Component.displayName = "WalletPage";
