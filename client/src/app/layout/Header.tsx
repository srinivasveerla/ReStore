import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import CustomSwitch from "./Switch";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useStoreContext } from "../context/StoreContext";
// interface Props {
//   theme: PaletteMode;
//   checked: boolean;
//   HandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

const leftLinks = [
  // { title: "home", path: "/" },
  { title: "catalog", path: "/catalog" },
  { title: "contact", path: "/contact" },
  { title: "about", path: "/about" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

interface Props {
  dark: boolean;
  HandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Header({ dark, HandleChange }: Props) {
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{ mr: 4, color: "inherit", textDecoration: "none" }}
            >
              RE-STORE
            </Typography>
            <CustomSwitch checked={dark} HandleChange={HandleChange} />
          </Box>
          <List sx={{ display: "flex" }}>
            {leftLinks.map(({ title, path }) => (
              <ListItem
                key={path}
                component={NavLink}
                to={path}
                sx={{
                  color: "inherit",
                  typography: "h6",
                  "&:hover": { color: "secondary.light" },
                  "&.active": {
                    color: "text.secondary",
                  },
                }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              component={Link}
              to="/basket"
              color="inherit"
              edge="start"
              sx={{ mr: 4 }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  key={path}
                  component={NavLink}
                  to={path}
                  sx={{ color: "inherit", typography: "h6" }}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
