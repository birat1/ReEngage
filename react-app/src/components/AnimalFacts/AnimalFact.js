import React, { useState, useEffect, useRef } from "react";
import { Col, Card } from "react-bootstrap";
import "./AnimalFact.css";

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
                    socketRef.current.send(JSON.stringify({
                      type: "request_update"
                    }));
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
    <Col>
      <Card className="funFactCard">
        {connectionStatus !== "connected" ? (
          <div className="loading-state">
            <h3>Loading Animal Facts...</h3>
            <div className="spinner"></div>
            <p
              className={`text-${
                connectionStatus === "connecting" ? "info" : "warning"
              }`}
            >
              {connectionStatus === "connecting"
                ? "Establishing connection..."
                : "Reconnecting..."}
            </p>
          </div>
        ) : (
          <>
            <h3>{animal.name}</h3>
            <p>
              <strong>Fact:</strong>{" "}
              {animal.characteristics?.slogan || "No fact available"}
            </p>

            {animal.characteristics?.habitat && (
              <p>
                <strong>Habitat:</strong> {animal.characteristics.habitat}
              </p>
            )}

            {animal.characteristics?.group && (
              <p>
                <strong>Group:</strong> {animal.characteristics?.group}
              </p>
            )}

            {animal.characteristics?.diet && (
              <p>
                <strong>Diet:</strong> {animal.characteristics.diet}
              </p>
            )}

            <div className="countdown-timer">
              {countdown > 0 ? (
                <p>
                  Next animal in: <span>{formatTime(countdown)}</span>
                </p>
              ) : (
                <p>Loading new animal...</p>
              )}
            </div>

            <p className="text-success connection-status">
              ✓ Live Updates Active
            </p>
          </>
        )}
      </Card>
    </Col>
  );
};

export default AnimalFact;
