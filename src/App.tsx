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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/static/injuries.json");
        const jsonData = await response.json();
        setData(jsonData);
        console.log({ jsonData });
      } catch (error) {
        console.error("Error fetching data:", error);

        // Handle offline scenario
        if (!navigator.onLine) {
          console.log("offline!!");
          // Try to get data from the cache
          const cachedResponse = await caches.match("/static/data.json");
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            console.log({ cachedData });
            setData(cachedData);
          }
        }
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="app-wrapper">
      <h1 className="app-title">AMS</h1>
      {injury && (
        <ul className="injury-list">
          {injury.injuryType && (
            <li className="injury-list-item">{injury.injuryType}</li>
          )}
          {injury.injuryEffect.type && (
            <li className="injury-list-item">{injury.injuryEffect.type}</li>
          )}
          {injury.injuryEffect.rest_time && (
            <li className="injury-list-item">
              {injury.injuryEffect.rest_time}
            </li>
          )}
          {injury.injuryEffect.effect && (
            <li className="injury-list-item">{injury.injuryEffect.effect}</li>
          )}
          {injury.injuryEffect.treatment && (
            <li className="injury-list-item">
              {injury.injuryEffect.treatment}
            </li>
          )}
        </ul>
      )}
      <button className="injury-button" onClick={handleRandomInjury}>
        RANDOM
      </button>
    </div>
  );
};

export default App;
