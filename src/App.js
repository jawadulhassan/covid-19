import React, { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

import Card from "./components/Card";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  async function getData() {
    const result = await axios.get(
      "http://coronavirus-19-api.herokuapp.com/countries/pakistan"
    );
    setData(result.data);
  }

  useEffect(() => {
    getData();
  }, []);

  if (isEmpty(data)) return null;

  const {
    cases,
    todayCases,
    deaths,
    todayDeaths,
    recovered,
    active,
    critical,
    casesPerOneMillion,
    deathsPerOneMillion
  } = data;

  return (
    <div className="app">
      <div className="header-wrapper">
        <img src="static/images/virus.png" alt="virus icon" />
        <h1>Covid - 19 (Pakistan)</h1>
      </div>
      <div className="big-card">
        <div className="flexed">
          <div className="text-aligned-center">
            <h1>Total Cases</h1>
            <div className="primary-stat">{cases}</div>
          </div>
          <div className="text-aligned-center">
            <h1>Active cases</h1>
            <div className="secondary-stat">{active}</div>
          </div>
        </div>
        <div className="text-aligned-center">
          <h1>Recovered</h1>
          <div className="recovered-stat">{recovered}</div>
        </div>
      </div>
      <div className="flexed" style={{ marginTop: 40 }}>
        <Card
          header1="Reported Today"
          stat1={todayCases}
          statColor1="#4d44fc"
          header2="Deaths Today"
          stat2={todayDeaths}
          statColor2="#de3a3d"
        />
        <Card
          header1="Total Deaths"
          stat1={deaths}
          statColor1="#de3a3d"
          header2="Critical Cases"
          stat2={critical}
          statColor2="#ff6164"
        />
        <Card
          header1="Cases/Million"
          stat1={casesPerOneMillion}
          statColor1="#39faf0"
          header2="Deaths/Million"
          stat2={deathsPerOneMillion}
          statColor2="#8b39f7"
        />
      </div>
    </div>
  );
}

export default App;
