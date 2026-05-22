import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <div className="mb-[30px] ">
        <Typography
          variant="h2"
          style={{ color: colors.grey[100] }}
          className="font-bold mb-[5px]"
        >
          {title}
        </Typography>
        <Typography variant="h5" style={{ color: colors.greenAccent[400] }}>
          {subtitle}
        </Typography>
      </div>
    </>
  );
};

export default Header;
