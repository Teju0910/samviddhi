import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export const ConvertedValues = ({ maxValue, minValue }) => {
  console.log(maxValue, minValue, "maxValue, minValue ");
  return (
    <>
      <Box border="2px solid teal"  borderRadius={3} m={3} p={3} alignItems="center">
        <Typography variant="h6" m={2}>
          Max Exchange Rate - {maxValue?.toFixed(2)}
        </Typography>
        <br />
        <br />
        <br />
        <Typography variant="h6" m={2}>
          Min Exchange Rate - {minValue?.toFixed(2)}
        </Typography>
      </Box>
    </>
  );
};
