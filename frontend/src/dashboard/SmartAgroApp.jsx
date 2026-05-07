import { useEffect, useRef, useState } from "react";

import agroBackground from "../assets/agro-background.png";
import DashboardNavbar from "./components/DashboardNavbar";
import HomeScreen from "./screens/HomeScreen";
import ParcelsScreen from "./screens/ParcelsScreen";
import DetailsScreen from "./screens/DetailsScreen";
import WaterScreen from "./screens/WaterScreen";

export default function SmartAgroApp({
  initialScreen = "home",
  initialSelected = null,
  navigateTo,
  onBackLanding,
}) {
  const [screen, setScreenState] = useState(initialScreen);
  const [selected, setSelectedState] = useState(initialSelected);
  const selectedRef = useRef(initialSelected);

  useEffect(() => {
    setScreenState(initialScreen);
    setSelectedState(initialSelected);
    selectedRef.current = initialSelected;
  }, [initialScreen, initialSelected]);

  const setSelected = (parcelId) => {
    selectedRef.current = parcelId;
    setSelectedState(parcelId);
  };

  const setScreen = (nextScreen) => {
    setScreenState(nextScreen);

    if (nextScreen === "details") {
      navigateTo({ screen: "details", parcelId: selectedRef.current });
      return;
    }

    navigateTo({ screen: nextScreen });
  };

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
