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
import Invoices from "./scenes/Invoices";
import Profile from "./scenes/Profile";
import { useState } from "react";
import { mockDataTeam } from "./data/mockData";

function App() {
  const [theme, colorMode] = useMode();
  const [teamMembers, setTeamMembers] = useState(mockDataTeam);
  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <main
              className="flex-1 overflow-y-auto w-full"
              style={{ minWidth: 0 }}
            >
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route
                  path="/team"
                  element={
                    <Team
                      teamMembers={teamMembers}
                      setTeamMembers={setTeamMembers}
                    />
                  }
                ></Route>
                <Route path="/invoices" element={<Invoices />}></Route>
                <Route
                  path="/form"
                  element={
                    <Profile
                      teamMembers={teamMembers}
                      setTeamMembers={setTeamMembers}
                    />
                  }
                ></Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  );
}

export default App;
