const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

let totalVisitorCount = 0;
let monthlyVisitorCount = 0;
let lastMonthVisitorCount = 0;

app.use(cors());

app.get("/api/v1/visitor-count", (req, res) => {
  totalVisitorCount++;
  monthlyVisitorCount++;
  // Check if a new month has started
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  if (currentMonth !== app.currentMonth) {
    app.currentMonth = currentMonth;
    monthlyVisitorCount = 1; // Reset monthly count at the start of a new month
    lastMonthVisitorCount = app.lastMonthVisitorCount || 0; // Save last month's count
  }

  app.lastMonthVisitorCount = lastMonthVisitorCount;

  res.json({
    totalVisitorCount,
    monthlyVisitorCount,
    lastMonthVisitorCount,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
