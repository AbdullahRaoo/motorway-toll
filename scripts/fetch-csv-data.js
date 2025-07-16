// Fetch and parse the CSV data
const csvUrl = "/vehicle_log.csv"

async function fetchCSVData() {
  try {
    console.log("Fetching CSV data from:", csvUrl)
    const response = await fetch(csvUrl)
    const csvText = await response.text()

    console.log("Raw CSV data:")
    console.log(csvText)

    // Parse CSV manually
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("Headers:", headers)

    const data = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
      if (values.length >= 3) {
        const record = {
          vehicleNumber: values[0],
          enteringTime: values[1],
          exitTime: values[2],
        }
        data.push(record)
      }
    }

    console.log("Parsed data:", data)
    console.log("Total records:", data.length)

    // Analyze the data
    const currentVehicles = data.filter((record) => !record.exitTime || record.exitTime === "")
    const exitedVehicles = data.filter((record) => record.exitTime && record.exitTime !== "")

    console.log("Current vehicles (no exit time):", currentVehicles.length)
    console.log("Exited vehicles:", exitedVehicles.length)

    // Calculate spent times
    data.forEach((record) => {
      if (record.enteringTime) {
        const entryDate = parseDateTime(record.enteringTime)
        const exitDate = record.exitTime && record.exitTime !== "" ? parseDateTime(record.exitTime) : new Date()

        if (entryDate) {
          const spentTimeMs = exitDate.getTime() - entryDate.getTime()
          const hours = Math.floor(spentTimeMs / (1000 * 60 * 60))
          const minutes = Math.floor((spentTimeMs % (1000 * 60 * 60)) / (1000 * 60))
          record.spentTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
          record.entryDate = entryDate
          record.exitDate = record.exitTime && record.exitTime !== "" ? parseDateTime(record.exitTime) : null
        }
      }
    })

    return data
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    return []
  }
}

function parseDateTime(dateTimeStr) {
  try {
    // Parse format: "16/07/2025 10:53"
    const [datePart, timePart] = dateTimeStr.split(" ")
    const [day, month, year] = datePart.split("/")
    const [hours, minutes] = timePart.split(":")

    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hours),
      Number.parseInt(minutes),
    )
  } catch (error) {
    console.error("Error parsing date:", dateTimeStr, error)
    return null
  }
}

// Execute the function
fetchCSVData().then((data) => {
  console.log("Final processed data:", data)
})
