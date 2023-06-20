import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { data } from "./utils/constant";

const Chart = () => {
  const barChartRef = useRef();
  function drawBarChart() {
    const svg = d3.select(barChartRef.current);
    const width = 960;
    const height = 500;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    const xAxis = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          data,
          (D) => -d3.median(D, (d) => d.frequency),
          (d) => d.letter
        )

        // data.map((d) => d.letter)
      )
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const yAxis = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)])
      .range([height - marginBottom, marginTop]);

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", (d) => xAxis(d.letter))
      .attr("y", (d) => yAxis(d.frequency))
      .attr("height", (d) => yAxis(0) - yAxis(d.frequency))
      .attr("width", xAxis.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(xAxis).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yAxis).tickFormat((y) => (y * 100).toFixed()))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (%)")
      );
  }

  useEffect(() => {
    drawBarChart();
  }, []);

  return <svg ref={barChartRef} />;
};

export default Chart;
