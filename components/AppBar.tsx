"use client";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { dataMock } from "@/lib/data";
import { SessionContext } from "next-auth/react";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
/* import Sitemark from './SitemarkIcon';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown'; */

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme).palette.divider,
  backgroundColor:alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  // @ts-ignore
  const { status } = useContext(SessionContext);

  const router = useRouter();

  const isLogged = status === "authenticated";

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigationLogin = () => {
    router.push("/login");
  };

  const navigationRegister = () => {
    router.push("/register");
  };

  const createPost = () => {
    router.push("blog/create");
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {dataMock.optionsNavBar.map((options) => {
                return (
                  <Button
                    variant="text"
                    color="info"
                    size={options.size as "small" | "medium" | "large"}
                    key={options.label}
                  >
                    {options.label}
                  </Button>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {isLogged ? (
              <>
                <Button
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={createPost}
                >
                  Novo post
                  <AddCircleOutlineRoundedIcon />
                </Button>
                <Button
                  color="secondary"
                  variant="text"
                  size="small"
                  onClick={navigationLogin}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={navigationLogin}
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={navigationRegister}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            {/*   <ColorModeIconDropdown size="medium" /> */}
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {dataMock.optionsNavBar.map((options) => {
                  return (
                    <MenuItem key={options.label}>{options.label}</MenuItem>
                  );
                })}
                <Divider sx={{ my: 3 }} />

                {isLogged ? (
                  <>
                    <MenuItem>
                      <Button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                        color="primary"
                        variant="outlined"
                        size="small"
                        onClick={createPost}
                      >
                        Novo post
                        <AddCircleOutlineRoundedIcon />
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="secondary"
                        variant="text"
                        size="small"
                        onClick={navigationLogin}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        onClick={navigationLogin}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={navigationRegister}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
