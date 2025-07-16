// CSV data fetching and processing utilities
export interface VehicleRecord {
  vehicleNumber: string
  enteringTime: string
  exitTime: string
  spentTime?: string
  entryDate?: Date
  exitDate?: Date | null
  status: "on-motorway" | "exited"
}

const CSV_URL = "/vehicle_log.csv"

export async function fetchVehicleData(): Promise<VehicleRecord[]> {
  try {
    const response = await fetch(CSV_URL)
    const csvText = await response.text()

    // Parse CSV
    const lines = csvText.trim().split("\n")
    const data: VehicleRecord[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
      if (values.length >= 3) {
        const vehicleNumber = values[0]
        const enteringTime = values[1]
        const exitTime = values[2]

        const entryDateRaw = parseDateTime(enteringTime)
        const entryDate = entryDateRaw === null ? undefined : entryDateRaw
        const exitDate = exitTime && exitTime !== "" ? parseDateTime(exitTime) : null
        const status: "on-motorway" | "exited" = exitDate ? "exited" : "on-motorway"

        let spentTime = ""
        if (entryDate) {
          const endTime = exitDate || new Date()
          const spentTimeMs = endTime.getTime() - entryDate.getTime()
          const hours = Math.floor(spentTimeMs / (1000 * 60 * 60))
          const minutes = Math.floor((spentTimeMs % (1000 * 60 * 60)) / (1000 * 60))
          spentTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
        }

        data.push({
          vehicleNumber,
          enteringTime,
          exitTime,
          spentTime,
          entryDate,
          exitDate,
          status,
        })
      }
    }

    return data
  } catch (error) {
    console.error("Error fetching vehicle data:", error)
    return []
  }
}

function parseDateTime(dateTimeStr: string): Date | null {
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

export function calculateSpentTime(entryDate: Date, exitDate?: Date | null): string {
  const endTime = exitDate || new Date()
  const spentTimeMs = endTime.getTime() - entryDate.getTime()
  const hours = Math.floor(spentTimeMs / (1000 * 60 * 60))
  const minutes = Math.floor((spentTimeMs % (1000 * 60 * 60)) / (1000 * 60))
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

export function getVehicleStats(data: VehicleRecord[]) {
  const currentVehicles = data.filter((v) => v.status === "on-motorway")
  const exitedVehicles = data.filter((v) => v.status === "exited")

  // Calculate average spent time for exited vehicles
  const avgSpentTimeMs =
    exitedVehicles.length > 0
      ? exitedVehicles.reduce((acc, v) => {
          if (v.entryDate && v.exitDate) {
            return acc + (v.exitDate.getTime() - v.entryDate.getTime())
          }
          return acc
        }, 0) / exitedVehicles.length
      : 0

  const avgHours = Math.floor(avgSpentTimeMs / (1000 * 60 * 60))
  const avgMinutes = Math.floor((avgSpentTimeMs % (1000 * 60 * 60)) / (1000 * 60))
  const avgSpentTime = avgHours > 0 ? `${avgHours}h ${avgMinutes}m` : `${avgMinutes}m`

  // Calculate peak hour entries
  const hourlyEntries: { [key: number]: number } = {}
  data.forEach((v) => {
    if (v.entryDate) {
      const hour = v.entryDate.getHours()
      hourlyEntries[hour] = (hourlyEntries[hour] || 0) + 1
    }
  })

  const peakHourEntries = Math.max(...Object.values(hourlyEntries), 0)

  return {
    currentVehicles: currentVehicles.length,
    avgSpentTime,
    totalEntries: data.length,
    totalExits: exitedVehicles.length,
    peakHourEntries,
    activeAlerts: 0, // This would come from another system
  }
}
