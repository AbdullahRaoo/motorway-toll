interface VehicleNumberPlateProps {
  number: string
  size?: "sm" | "md" | "lg"
  variant?: "metro" | "bus" | "tram"
}

export function VehicleNumberPlate({ number, size = "md", variant = "metro" }: VehicleNumberPlateProps) {
  const sizeClasses = {
    sm: "w-16 h-8 text-xs",
    md: "w-20 h-10 text-sm",
    lg: "w-24 h-12 text-base",
  }

  const variantClasses = {
    metro: "bg-gradient-to-b from-white to-gray-100 border-2 border-gray-800 text-gray-900",
    bus: "bg-gradient-to-b from-yellow-400 to-yellow-500 border-2 border-gray-800 text-gray-900",
    tram: "bg-gradient-to-b from-blue-400 to-blue-500 border-2 border-gray-800 text-white",
  }

  return (
    <div
      className={`
      ${sizeClasses[size]} 
      ${variantClasses[variant]}
      rounded-md flex items-center justify-center font-bold font-mono
      shadow-lg relative overflow-hidden
    `}
    >
      {/* Reflective effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      {/* Number text */}
      <span className="relative z-10 tracking-wider">{number}</span>

      {/* Border rivets effect */}
      <div className="absolute top-1 left-1 w-1 h-1 bg-gray-600 rounded-full" />
      <div className="absolute top-1 right-1 w-1 h-1 bg-gray-600 rounded-full" />
      <div className="absolute bottom-1 left-1 w-1 h-1 bg-gray-600 rounded-full" />
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-gray-600 rounded-full" />
    </div>
  )
}
