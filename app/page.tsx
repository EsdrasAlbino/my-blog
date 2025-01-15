import AppAppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import MainContent from "@/components/template/BlogComponent";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
    <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        {/* <Latest /> */}
      </Container>
      {/* <Footer /> */}
    </>
  );
}
