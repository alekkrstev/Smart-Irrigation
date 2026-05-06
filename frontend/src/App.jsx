import { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";
import SmartAgroLanding from "./landing/SmartAgroLanding";
import SmartAgroApp from "./dashboard/SmartAgroApp";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <AuthProvider>
      {page === "landing" && (
        <SmartAgroLanding onEnterApp={() => setPage("dashboard")} />
      )}
      {page === "dashboard" && (
        <SmartAgroApp onBackLanding={() => setPage("landing")} />
      )}
    </AuthProvider>
  );
}
