import React, { useState, useEffect } from "react";
import axios from "axios";

const VisitorCounter = () => {
  const [visitorCounts, setVisitorCounts] = useState({
    total: 0,
    monthly: 0,
    lastMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/visitor-count"
        );
        setVisitorCounts({
          total: response.data.totalVisitorCount,
          monthly: response.data.monthlyVisitorCount,
          lastMonth: response.data.lastMonthVisitorCount,
        });
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setTimeout(fetchVisitorCounts, 0);

    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h2>Total Visitor Count: {visitorCounts.total}</h2>
          <h2>Monthly Visitor Count: {visitorCounts.monthly}</h2>
          <h2>Last Month's Visitor Count: {visitorCounts.lastMonth}</h2>
        </>
      )}
    </div>
  );
};

export default VisitorCounter;
