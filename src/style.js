import { styled } from "@mui/styles";
import Box from "@mui/material/Box";

const MyBox = styled(Box)({
  backgroundColor: "#010912",
  border: 0,
  borderRadius: 10,
  color: "white",
  width: 300,
  height: "100%",
  paddingLeft: "10px",
  paddingRight: "10px",
});
const MyTextField = styled(Box)({
  backgroundColor: "white",
  color: "white",
  width: "100%",
  height: 60,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: "rgb(236, 236, 236)",
  },
  "& .MuiInputBase-root": {
    height: 50,
    borderRadius: "0.25rem",
    border: "none",
  },
});


export {MyBox,MyTextField};
