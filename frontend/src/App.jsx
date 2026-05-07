import { useEffect, useState } from "react";
import SmartAgroLanding from "./landing/SmartAgroLanding";
import SmartAgroApp from "./dashboard/SmartAgroApp";

function parseRoute(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] !== "dashboard") {
    return { page: "landing" };
  }

  if (parts[1] === "parcels" && parts[2]) {
    return { page: "dashboard", screen: "details", parcelId: parts[2] };
  }

  if (parts[1] === "parcels") {
    return { page: "dashboard", screen: "parcels" };
  }

  if (parts[1] === "water") {
    return { page: "dashboard", screen: "water" };
  }

  return { page: "dashboard", screen: "home" };
}

function routePath(route) {
  if (route.page !== "dashboard") return "/";

  if (route.screen === "details" && route.parcelId) {
    return `/dashboard/parcels/${route.parcelId}`;
  }

  if (route.screen === "parcels") return "/dashboard/parcels";
  if (route.screen === "water") return "/dashboard/water";

  return "/dashboard";
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (nextRoute) => {
    const resolvedRoute = {
      page: nextRoute.page ?? route.page,
      screen: nextRoute.screen,
      parcelId: nextRoute.parcelId,
    };
    const nextPath = routePath(resolvedRoute);

    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }

    setRoute(resolvedRoute);
  };

  return (
    <>
      {route.page === "landing" && (
        <SmartAgroLanding
          onEnterApp={() => navigate({ page: "dashboard", screen: "home" })}
        />
      )}
      {route.page === "dashboard" && (
        <SmartAgroApp
          initialScreen={route.screen}
          initialSelected={route.parcelId}
          navigateTo={(nextRoute) =>
            navigate({ page: "dashboard", ...nextRoute })
          }
          onBackLanding={() => navigate({ page: "landing" })}
        />
      )}
    </>
  );
}
