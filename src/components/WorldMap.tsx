import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker, createCoordinates } from '@vnedyalk0v/react19-simple-maps'
import './WorldMap.css'

// Free third-party geography data (TopoJSON). We fetch it ourselves to avoid CORS/Content-Type issues.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// [longitude, latitude] for map pins – immigration countries + India
const PINS = [
  { name: 'Slovakia', coordinates: createCoordinates(19.7, 48.67) },
  { name: 'Israel', coordinates: createCoordinates(34.78, 31.05) },
  { name: 'Germany', coordinates: createCoordinates(10.45, 51.17) },
  { name: 'Poland', coordinates: createCoordinates(19.39, 52.07) },
  { name: 'Greece', coordinates: createCoordinates(21.82, 39.07) },
  { name: 'Albania', coordinates: createCoordinates(19.82, 41.15) },
  { name: 'Kyrgyzstan', coordinates: createCoordinates(74.77, 41.2) },
  { name: 'Russia', coordinates: createCoordinates(37.62, 55.75) },
  { name: 'Belarus', coordinates: createCoordinates(27.56, 53.9) },
  { name: 'Slovenia', coordinates: createCoordinates(14.51, 46.06) },
  { name: 'India', coordinates: createCoordinates(78.96, 20.59) },
]

const WorldMap = () => {
  const [geographyData, setGeographyData] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(GEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: object) => {
        if (!cancelled) setGeographyData(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load map')
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="world-map-wrap world-map-error">
        <p>Map unavailable. Please try again later.</p>
      </div>
    )
  }

  if (!geographyData) {
    return (
      <div className="world-map-wrap world-map-loading">
        <span>Loading map…</span>
      </div>
    )
  }

  return (
    <div className="world-map-wrap">
      <ComposableMap
        width={420}
        height={280}
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          center: createCoordinates(20, 30),
        }}
        className="world-map-svg"
      >
        <Geographies geography={geographyData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(243, 243, 242, 0.25)"
                stroke="rgba(0, 35, 102, 0.35)"
                strokeWidth={0.4}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: 'rgba(243, 243, 242, 0.4)' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {PINS.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <g className="map-pin">
              <circle r={4} fill="#C5A059" stroke="#002366" strokeWidth={1.2} />
              <title>{name}</title>
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}

export default WorldMap
