import { useState } from "react";

import agroBackground from "../assets/agro-background.png";
import DashboardNavbar from "./components/DashboardNavbar";
import HomeScreen from "./screens/HomeScreen";
import ParcelsScreen from "./screens/ParcelsScreen";
import DetailsScreen from "./screens/DetailsScreen";
import WaterScreen from "./screens/WaterScreen";

export default function SmartAgroApp({ onBackLanding }) {
  const [screen, setScreen] = useState("home");
  const [selected, setSelected] = useState("B3");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(248, 253, 245, 0.30), rgba(248, 253, 245, 0.40)), url(${agroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <DashboardNavbar
        screen={screen}
        setScreen={setScreen}
        onBackLanding={onBackLanding}
      />

      {screen === "home" && (
        <HomeScreen setScreen={setScreen} setSelected={setSelected} />
      )}

      {screen === "parcels" && (
        <ParcelsScreen setScreen={setScreen} setSelected={setSelected} />
      )}

      {screen === "details" && (
        <DetailsScreen parcelId={selected} setScreen={setScreen} />
      )}

      {screen === "water" && (
        <WaterScreen setScreen={setScreen} setSelected={setSelected} />
      )}
    </div>
  );
}
