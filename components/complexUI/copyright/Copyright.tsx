import { Typography } from "@mui/material";
import Link from "next/link";

export function Copyright() {
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        {'Copyright © '}
        <Link color="text.secondary" href="https://mui.com/">
          Sitemark
        </Link>
        &nbsp;
        {new Date().getFullYear()}
      </Typography>
    );
  }