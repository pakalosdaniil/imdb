import { useState } from "react";
// import IMDbPro from "../../images/IMDb-Pro-Logo.svg";
import StripeContainer from "./StripeContainer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { Button } from "react-bootstrap";
import "./payment.css";
import { yellow } from "@mui/material/colors";

function PaymentPage() {
  const [showItem, setShowItem] = useState(false);
  let [counter, setCounter] = useState(1);
  let [price, setPrice] = useState(5);

  return (
    <div className="App">
      {/* <img src={IMDbPro} alt="" style={{ width: "100px", height: "100px" }} /> */}
      <h1 id="title">IMDb Pro</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <h3> Price: $5 </h3>
          <h3>
            Amount of vouchers:
            {counter > 1 ? (
              <IconButton
                id="1"
                onClick={() => {
                  setCounter(counter - 1);
                  setPrice(price - 5);
                }}>
                <RemoveIcon />
              </IconButton>
            ) : (
              <IconButton>
                <RemoveIcon />
              </IconButton>
            )}
            {counter}
            <IconButton
              onClick={() => {
                setCounter(counter + 1);
                setPrice(price + 5);
              }}>
              <AddIcon />
            </IconButton>
          </h3>

          <h3 id="total-price">Total Price: {price}</h3>
          <Button
            onClick={() => setShowItem(true)}
            sx={{
              bgcolor: yellow[600],
              color: "black",
              "&:hover": { bgcolor: yellow[500] },
            }}>
            Purchase
          </Button>
        </>
      )}
    </div>
  );
}

export default PaymentPage;
