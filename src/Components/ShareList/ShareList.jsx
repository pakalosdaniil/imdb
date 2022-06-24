import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <SaveIcon />, name: "Save" },
  { icon: <TwitterIcon />, name: "Twitter", link: "https://twitter.com" },
  { icon: <InstagramIcon />, name: "Instagram", link: "https://instagram.com" },
  { icon: <FacebookIcon />, name: "Facebook" },
];

function PlaygroundSpeedDial() {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: "none", transform: "translateZ(0px)", flexGrow: 1 }}>
      <Box sx={{ position: "absolute", marginBottom: "40px" }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<ShareIcon />}
          direction={"down"}>
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
export default PlaygroundSpeedDial;
