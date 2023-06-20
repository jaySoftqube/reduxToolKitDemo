import React, { useEffect, useRef, useState } from "react";
import { population, chartColor } from "./utils/constant";
import * as d3 from "d3";
import "./clustredChart.css";
import { Prev } from "react-bootstrap/esm/PageItem";

const ClustredChart = () => {
  const [populationData, setPopulationData] = useState(population);
  let ageData = Array.from(new Set(populationData.map((item) => item.age)));

  let ageDataObj = {};
  ageData.forEach(
    (element) => (ageDataObj = { ...ageDataObj, [element]: false })
  );

  const [age, setAge] = useState(ageDataObj);

  const groupedBarChart = useRef();

  const drawGroupedBarChart = () => {
    console.log("inside useEffect function");
    const svg = d3.select(groupedBarChart.current);
    const width = 928;
    const height = 400;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 40;

    const fx = d3
      .scaleBand()
      .domain(new Set(populationData.map((d) => d.state)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

    const ages = new Set(populationData.map((d) => d.age));
    const x = d3
      .scaleBand()
      .domain(ages)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);
    // const color = d3.scaleOrdinal(ages, chartColor);

    const color = d3
      .scaleOrdinal()
      .domain(ages)
      .range(d3.schemeSpectral[ages.size])
      .unknown("#ccc");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(populationData, (d) => d.population)])
      .nice()
      .rangeRound([height - marginBottom, marginTop]);

    const formatValue = (x) => (isNaN(x) ? "N/A" : x.toLocaleString("en"));

    svg.attr("viewBox", [0, 0, width, height]);

    svg
      .append("g")
      .selectAll("g")
      .data(d3.group(populationData, (d) => d.state))
      .join("g")
      .attr("transform", ([state]) => `translate(${fx(state)},0)`)
      .selectAll("rect")
      .data(([, d]) => d)
      .join("rect")
      .attr("x", (d) => x(d.age))
      .attr("y", (d) => y(d.population))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.population))
      .attr("fill", (d) => color(`${d.age}`));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(fx).tickSizeOuter(0))
      .call((g) => g.selectAll(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call((g) => g.selectAll(".domain").remove());
  };

  useEffect(() => {
    drawGroupedBarChart();
  }, [populationData]);

  return (
    <div className="container">
      <svg className="chartData" ref={groupedBarChart} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          columnGap: "20px",
        }}
      >
        {Object.entries(age).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              columnGap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={value}
              onChange={() => {
                setAge({ ...age, [key]: !value });
                console.log("age:::", age);
              }}
            />
            <label>{key}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClustredChart;
