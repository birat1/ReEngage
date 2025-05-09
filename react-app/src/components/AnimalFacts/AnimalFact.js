import React, { useState, useEffect, useRef } from "react";
import { Col, Card } from "react-bootstrap";
import "./AnimalFact.css";
import { Star } from "lucide-react";

// frontend logic for displaying animal facts
const AnimalFact = () => {
  const [animal, setAnimal] = useState({
    name: "Loading...",
    characteristics: {
      slogan: "Connecting to animal facts...",
    },
  });
  const [countdown, setCountdown] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const socketRef = useRef(null);
  const countdownRef = useRef(null);

  // formats time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  // websocket connection management
  useEffect(() => {
    const connect = () => {
      const wsUrl =
        process.env.REACT_APP_WS_URL ||
        `ws://${window.location.hostname}:8000/ws/animalfact/`;

      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        setConnectionStatus("connected");
      };

      socketRef.current.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);

          if (data.type === "current_fact" || data.type === "new_fact") {
            setAnimal(data.animal);

            // reseting countdown
            clearInterval(countdownRef.current);
            setCountdown(data.time_left);

            countdownRef.current = setInterval(() => {
              setCountdown((prev) => {
                const newTime = prev - 1;
                if (newTime <= 0) {
                  // requesting a new update if the automatic broadcast is not received
                  if (socketRef.current?.readyState === WebSocket.OPEN) {
                    socketRef.current.send(
                      JSON.stringify({
                        type: "request_update",
                      })
                    );
                  }
                  return 0;
                }
                return newTime;
              });
            }, 1000);
          }
        } catch (err) {
          console.error("Message error:", err);
        }
      };

      socketRef.current.onclose = () => {
        setConnectionStatus("disconnected");
        setTimeout(connect, 2000);
      };

      socketRef.current.onerror = () => {
        setConnectionStatus("error");
      };
    };

    connect();

    return () => {
      clearInterval(countdownRef.current);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <Col md={6} className="mb-3">
      <div className="bg-white shadow-sm p-4 rounded h-100">
        <div className="d-flex align-items-center mb-2">
          <Star size={24} color="#3498db" className="text-primary me-2"/>
          <h6 className="mb-0">Animal Fact - {animal.name}</h6>
        </div>
        {connectionStatus !== "connected" ? (
          <p className="mb-0">Loading animal fact...</p>
        ) : (
          <div>
            <p className="mb-0">
              <span style={{ color: "#3498db" }}>Fact: </span>{" "}
              {animal.characteristics?.slogan ||
                "Connecting to animal facts..."}
            </p>
            <p className="mb-0">
              {animal.characteristics?.habitat && (
                <>
                  <span style={{ color: "#3498db" }}>Habitat: </span>{" "}
                  {animal.characteristics.habitat}
                </>
              )}
            </p>
            <p className="mb-0">
              {animal.characteristics?.diet && (
                <>
                  <span style={{ color: "#3498db" }}>Diet: </span>{" "}
                  {animal.characteristics.diet}
                </>
              )}
            </p>
          </div>
        )}
        <div className="countdown-timer mt-2">
          {countdown > 0 && connectionStatus === "connected" ? (
            <p className="small text-muted">
              Next animal in: <span>{formatTime(countdown)}</span>
            </p>
          ) : null}
          {connectionStatus === "connected" && (
            <p className="text-success small mt-2">✓ Live Updates Active</p>
          )}
        </div>
      </div>
    </Col>
  );
};

export default AnimalFact;
