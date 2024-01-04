// @ts-nocheck
import { useState, useEffect } from "react";
import "./index.css";
interface Injury {
  injuryType: string;
  injuryEffect: {
    type: string;
    treatment: string;
    effect: string;
    rest_time: string;
  };
}

const App = () => {
  const [data, setData] = useState(undefined);
  const [injury, setInjury] = useState<Injury>({
    injuryType: "",
    injuryEffect: {
      type: "",
      treatment: "",
      effect: "",
      rest_time: "",
    },
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/static/injuries.json"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Handle offline scenario
        if (!navigator.onLine) {
          // Try to get data from the cache
          const cachedResponse = await caches.match(
            process.env.PUBLIC_URL + "/static/injuries.json"
          );
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setData(cachedData);
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-background");
      document.body.classList.add("dark-background");
    } else {
      document.body.classList.remove("dark-background");
      document.body.classList.add("light-background");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleRandomInjury = () => {
    const randomInjuryType =
      data.injuries[Math.floor(Math.random() * data.injuries.length)];
    const randomInjuryEffects =
      data.injury_type[Math.floor(Math.random() * data.injury_type.length)];

    if (randomInjuryType === "Grenade concussion") {
      setInjury({
        injuryType: randomInjuryType,
        injuryEffect: {
          rest_time: "30 seconds",
          effect: "HANDS ON EARS!!",
          treatment: "",
          type: "",
        },
      });
    } else {
      setInjury({
        injuryType: randomInjuryType,
        injuryEffect: randomInjuryEffects,
      });
    }
  };

  const textColor = isDarkMode ? "light-text" : "dark-text";

  return (
    <div className="app-wrapper">
      <button
        onClick={toggleDarkMode}
        role="button"
        className={`toggle-dark-mode-button button`}
      >
        {isDarkMode ? "Light mode" : "Dark mode"}
      </button>
      <h1 className={`app-title ${textColor}`}>AMS</h1>
      {injury && (
        <ul className={`injury-list ${textColor}`}>
          {injury.injuryType && (
            <li className="injury-list-item injury-type">
              <h2>{injury.injuryType}</h2>
            </li>
          )}
          {injury.injuryEffect.type && (
            <li className="injury-list-item">
              Injury: <span>{injury.injuryEffect.type}</span>
            </li>
          )}
          {injury.injuryEffect.rest_time && (
            <li className="injury-list-item">
              Rest time: <span>{injury.injuryEffect.rest_time}</span>
            </li>
          )}
          {injury.injuryEffect.effect && (
            <li className="injury-list-item">
              Effect: <span>{injury.injuryEffect.effect}</span>
            </li>
          )}
          {injury.injuryEffect.treatment && (
            <li className="injury-list-item">
              Treatment: <span>{injury.injuryEffect.treatment}</span>
            </li>
          )}
        </ul>
      )}
      <button
        className="injury-button button"
        role="button"
        onClick={handleRandomInjury}
      >
        RANDOM
      </button>
    </div>
  );
};

export default App;
