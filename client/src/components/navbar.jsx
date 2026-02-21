import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./styles/navbar.css";
export default function Navbar() {
  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="left">
            <Stack direction="row" spacing={2}>
              <div
                className="logo"
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: "rgb(0, 102, 255)",
                  borderRadius: " 30%",
                  marginTop: "3px",
                }}
              >
                <CheckCircleOutlineIcon
                  style={{
                    color: "white",
                    marginLeft: "3px",
                    marginTop: " 2px",
                  }}
                />
              </div>
              <h2
                style={{
                  marginTop: "3px",
                }}
              >
                {" "}
                TodoApp{" "}
              </h2>
            </Stack>
          </div>
          <div className="right">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="button_connextion"
            >
              connecter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
