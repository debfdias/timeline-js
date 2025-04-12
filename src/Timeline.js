import React, { useState, useRef, useEffect } from "react";
import timelineItems from "./timelineItems";
import { assignLanes } from "./assignLanes";
import "./Timeline.css";

const Tooltip = ({ content, visible, x, y }) => {
  return visible ? (
    <div
      className="timeline-tooltip"
      style={{
        left: x,
        top: y,
      }}
    >
      {content}
    </div>
  ) : null;
};

const Timeline = () => {
  const [zoom, setZoom] = useState(1);
  const [items, setItems] = useState(timelineItems);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const timelineRef = useRef(null);
  const lanes = assignLanes(items);

  // Calculate the date range for the timeline
  const dates = items.map((item) => ({
    start: new Date(item.start),
    end: new Date(item.end),
  }));

  const minDate = new Date(Math.min(...dates.map((d) => d.start)));
  const maxDate = new Date(Math.max(...dates.map((d) => d.end)));
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

  const handleZoom = (delta) => {
    setZoom((prevZoom) => Math.max(0.5, Math.min(2, prevZoom + delta)));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getTaskColor = (startDate, endDate) => {
    const durationInDays =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ) + 1;

    if (durationInDays === 1) {
      return "#4CAF50"; // green
    } else if (durationInDays >= 2 && durationInDays <= 5) {
      return "#FF80AB"; // pink
    } else if (durationInDays >= 6 && durationInDays <= 14) {
      return "#9C27B0"; // purple
    } else {
      return "#9C27B0"; // purple for > 14 days
    }
  };

  const handleMouseEnter = (e, item) => {
    const rect = e.target.getBoundingClientRect();
    const durationInDays =
      Math.ceil(
        (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24)
      ) + 1;
    setTooltip({
      visible: true,
      content: `${item.name}
${formatDate(item.start)} - ${formatDate(item.end)}
Duration: ${durationInDays} day${durationInDays > 1 ? "s" : ""}`,
      x: rect.left,
      y: rect.bottom + window.scrollY + 5,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="timeline-container">
      <div className="timeline-controls">
        <button onClick={() => handleZoom(-0.1)}>-</button>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
        <button onClick={() => handleZoom(0.1)}>+</button>
      </div>
      <div className="timeline" ref={timelineRef}>
        {lanes.map((lane, laneIndex) => (
          <div key={laneIndex} className="timeline-lane">
            {lane.map((item) => {
              const startDate = new Date(item.start);
              const endDate = new Date(item.end);
              const startOffset = Math.floor(
                (startDate - minDate) / (1000 * 60 * 60 * 24)
              );
              const width =
                Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

              return (
                <div
                  key={item.id}
                  className="timeline-item"
                  style={{
                    left: `${(startOffset / totalDays) * 100}%`,
                    width: `${(width / totalDays) * 100}%`,
                    transform: `scale(${zoom})`,
                    background: getTaskColor(item.start, item.end),
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="timeline-item-content">
                    <span className="timeline-item-name">{item.name}</span>
                    <div className="timeline-item-dates">
                      {formatDate(item.start)} - {formatDate(item.end)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <Tooltip {...tooltip} />
      </div>
    </div>
  );
};

export default Timeline;
