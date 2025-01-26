import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ step }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <div className="mt-5">
      <Fragment>
        <Stepper alternativeLabel step={step} style={stepStyles}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={step === index ? true : false}
              completed={step >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: step >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Fragment>
    </div>
  );
};

export default CheckoutSteps;
