import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/authContext";
import { grey, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import GoogleAuthForm from "../Authorization/Google/GoogleAuthForm";

const SignUpForm = () => {
  const { signUp, error, setError } = useContext(authContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleValues() {
    {
      if (!email || !password) {
        alert("Please fill all the fields");
        return;
      }
    }
    signUp(email, password, navigate);
  }

  const CssTextField = styled(TextField, {
    shouldForwardProp: props => props !== "focusColor",
  })(p => ({
    // input label when focused
    "& label.Mui-focused": {
      color: p.focusColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: p.focusColor,
      },
    },
  }));

  return (
    <Container maxWidth="sm" style={{ height: "700px" }}>
      <Box
        sx={{ bgcolor: grey[200] }}
        flexWrap={"wrap"}
        justifyContent={"center"}
        padding={"10px"}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}
        height={"100%"}>
        <Typography variant="h4" component="h2" marginBottom={"30px"}>
          Sign Up
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ margin: "10px" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          focusColor="#fbc02d"
        />

        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ margin: "10px" }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          focusColor="#fbc02d"
        />

        <Button
          onClick={handleValues}
          style={{ margin: "10px" }}
          variant="contained"
          sx={{
            bgcolor: yellow[600],
            color: "black",
            "&:hover": { bgcolor: yellow[500] },
          }}>
          Sign Up
        </Button>

        <Typography variant="p" component="h5" marginTop={"50px"}>
          Have you already registered?{" "}
        </Typography>
        <Typography
          onClick={() => {
            navigate("/login");
            setError("");
          }}
          variant="p"
          component="h4"
          style={{ textDecoration: "none", cursor: "pointer" }}
          sx={{
            color: yellow[700],
            "&:hover": { color: yellow[600] },
          }}>
          Log in here
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpForm;
