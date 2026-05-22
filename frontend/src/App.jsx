import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Employee from "./pages/Employee";
import "./App.css";
import Navbar from "./components/Navbar";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/Dashboard";
import AppSidebar from "./scenes/global/AppSidebar";
import Team from "./scenes/Team";
import Contact from "./scenes/Contact";
import Invoices from "./scenes/Invoices";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/team" element={<Team />}></Route>
                <Route path="/contacts" element={<Contact />}></Route>
                <Route path="/invoices" element={<Invoices />}></Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  );
}

export default App;
