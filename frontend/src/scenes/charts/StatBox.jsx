import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" p="10px">
      <Box display="flex" alignItems="center" gap="15px">
        {icon}

        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            sx={{ color: colors.greenAccent[500] }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;