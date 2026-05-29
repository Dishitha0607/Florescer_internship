import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { colorModeContext, useMode } from "./theme";

import Login from "./pages/Login";
import Employee from "./pages/Employee";

import Dashboard from "./scenes/Dashboard";
import Team from "./scenes/Team";
import Invoices from "./scenes/Invoices";
import Profile from "./scenes/Profile";
import Calendar from "./scenes/Calendar";
import FAQ from "./scenes/Faq";

import Topbar from "./scenes/global/Topbar";
import AppSidebar from "./scenes/global/AppSidebar";

import { useState } from "react";
import { mockDataTeam } from "./data/mockData";
import Bar from "./scenes/charts/Bar";
import Pie from "./scenes/charts/Pie";
import Line from "./scenes/charts/Line";

function App() {
  const [theme, colorMode] = useMode();
  const [teamMembers, setTeamMembers] = useState(mockDataTeam);

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {/* LOGIN PAGE */}
          <Route path="/" element={<Login />} />

          {/* EMPLOYEE PAGE */}
          <Route path="/employee" element={<Employee />} />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin/*"
            element={
              <div className="flex h-screen overflow-hidden">
                <AppSidebar />

                <main
                  className="flex-1 overflow-y-auto w-full"
                  style={{ minWidth: 0 }}
                >
                  <Topbar />

                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/team"
                      element={
                        <Team
                          teamMembers={teamMembers}
                          setTeamMembers={setTeamMembers}
                        />
                      }
                    />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route
                      path="/form"
                      element={
                        <Profile
                          teamMembers={teamMembers}
                          setTeamMembers={setTeamMembers}
                        />
                      }
                    />
                    <Route path="/cal" element={<Calendar />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line/>} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
