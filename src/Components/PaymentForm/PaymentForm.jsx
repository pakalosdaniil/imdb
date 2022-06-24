import { Box, Button, Link } from "@mui/material";
import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../PaymentForm/cardUtils";
import "./payment.css";
import { yellow } from "@mui/material/colors";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form id="form">
          <input
            id="form-input"
            type="tel"
            name="number"
            pattern="[\d| ]{16,22}"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            format={formatCreditCardNumber}
          />
          <input
            id="form-input"
            type="text"
            name="name"
            placeholder="Cardholder"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            id="form-input"
            type="tel"
            name="expiry"
            pattern="\d\d/\d\d"
            placeholder="Expires"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            format={formatExpirationDate}
          />
          <input
            id="form-input"
            type="number"
            name="cvc"
            pattern="\d{3,4}"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            format={formatCVC}
          />
        </form>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            sx={{
              bgcolor: yellow[600],
              color: "black",
              "&:hover": { bgcolor: yellow[500] },
            }}>
            PAY
          </Button>
        </Box>
      </div>
    );
  }
}
