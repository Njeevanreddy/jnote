import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/noteState";
import Login from "./components/Login";
import Singup from "./components/Singup";
import AuthState from "./context/authState";
import { useTheme } from "./theme/useTheme";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GloabalStyles";

import SelectTheme from "./components/SelectTheme";
const Container = styled.div`
  margin: 5px auto 5px auto;
`;
function App() {
  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [newTheme, setNewTheme] = useState();
  const createTheme = newTheme => {
    console.log(newTheme);

    setNewTheme(newTheme);
  }
  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  });
  
  return (
    themeLoaded && (
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <Container style={{ fontFamily: selectedTheme.font }}>
          <div className="App">
            <NoteState>
              <AuthState>
                <Navbar />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Singup />} />
                  <Route path="/theme" element={<SelectTheme newTheme={newTheme} createTheme={createTheme} setTheme={setSelectedTheme}/>}/>
                </Routes>
              </AuthState>
            </NoteState>
          </div>
        </Container>
      </ThemeProvider>
    )
  );
}

export default App;
