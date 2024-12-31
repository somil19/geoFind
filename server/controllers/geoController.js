import "dotenv/config";
export const reverseGeocode = async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      res.json({ address });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    console.error("Error fetching reverse geocode:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
