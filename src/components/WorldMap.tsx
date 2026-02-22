import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Line, Marker, createCoordinates } from '@vnedyalk0v/react19-simple-maps'
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

const ROTATE_INTERVAL_MS = 3000
const BUBBLE_OFFSET_LAT = 16 // degrees north – bubble and L corner height
const BUBBLE_OFFSET_LON = 12 // degrees east – bubble offset for L horizontal segment

// Map our display names to geography property names when they differ in the TopoJSON
const COUNTRY_NAME_IN_DATA: Record<string, string> = {
  Russia: 'Russian Federation',
}

function isActiveCountry(geo: { properties?: { name?: string } }, displayCountry: string): boolean {
  const name = geo.properties?.name
  if (!name) return false
  const expected = COUNTRY_NAME_IN_DATA[displayCountry] ?? displayCountry
  return name === expected
}

const WorldMap = () => {
  const [geographyData, setGeographyData] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [displayCountry, setDisplayCountry] = useState<string>(PINS[0].name)
  const [cycleIndex, setCycleIndex] = useState(0)
  const [isUserHovering, setIsUserHovering] = useState(false)

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

  // When not hovering, cycle country name and highlight every 3 seconds
  useEffect(() => {
    if (!geographyData) return
    const id = setInterval(() => {
      if (!isUserHovering) {
        setCycleIndex((i) => {
          const next = (i + 1) % PINS.length
          setDisplayCountry(PINS[next].name)
          return next
        })
      }
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [geographyData, isUserHovering])

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

  const activePin = PINS.find((p) => p.name === displayCountry)
  const lon = activePin && Number(activePin.coordinates[0])
  const lat = activePin && Number(activePin.coordinates[1])
  const cornerCoords =
    activePin && lon != null && lat != null
      ? createCoordinates(lon, lat + BUBBLE_OFFSET_LAT)
      : null
  const bubbleCoords =
    activePin && lon != null && lat != null
      ? createCoordinates(lon + BUBBLE_OFFSET_LON, lat + BUBBLE_OFFSET_LAT)
      : null

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
            geographies.map((geo) => {
              const active = isActiveCountry(geo, displayCountry)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={active ? 'rgba(197, 160, 89, 0.45)' : 'rgba(243, 243, 242, 0.25)'}
                  stroke={active ? 'rgba(0, 35, 102, 0.6)' : 'rgba(0, 35, 102, 0.35)'}
                  strokeWidth={active ? 0.7 : 0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      outline: 'none',
                      fill: active ? 'rgba(197, 160, 89, 0.55)' : 'rgba(243, 243, 242, 0.4)',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
        {PINS.map(({ name, coordinates }) => (
          <Marker
            key={name}
            coordinates={coordinates}
            onMouseEnter={() => {
              setIsUserHovering(true)
              setDisplayCountry(name)
            }}
            onMouseLeave={() => {
              setIsUserHovering(false)
              setDisplayCountry(PINS[cycleIndex].name)
            }}
          >
            <g className="map-pin">
              <circle r={4} fill="#C5A059" stroke="#002366" strokeWidth={1.2} />
              <title>{name}</title>
            </g>
          </Marker>
        ))}
        {/* L-shaped connector and bubble rendered on top of dots and map */}
        {activePin && cornerCoords && bubbleCoords && (
          <g className="map-connector-and-bubble">
            <Line
              from={activePin.coordinates}
              to={cornerCoords}
              stroke="#fff"
              strokeWidth={1.2}
              className="map-connector-line map-connector-vertical"
            />
            <Line
              from={cornerCoords}
              to={bubbleCoords}
              stroke="#fff"
              strokeWidth={1.2}
              className="map-connector-line map-connector-horizontal"
            />
            <Marker coordinates={bubbleCoords}>
              <g key={displayCountry} className="map-bubble" aria-label={displayCountry}>
                <circle r={28} className="map-bubble-circle" />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`map-bubble-text ${displayCountry.length >= 9 ? 'map-bubble-text-long' : ''}`}
                >
                  {displayCountry}
                </text>
              </g>
            </Marker>
          </g>
        )}
      </ComposableMap>
    </div>
  )
}

export default WorldMap
