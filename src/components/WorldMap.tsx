import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import './WorldMap.css'

const GEO_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'

// [longitude, latitude] for map pins – immigration countries + India
const PINS = [
  { name: 'Slovakia', coordinates: [19.7, 48.67] as [number, number] },
  { name: 'Israel', coordinates: [34.78, 31.05] as [number, number] },
  { name: 'Germany', coordinates: [10.45, 51.17] as [number, number] },
  { name: 'Poland', coordinates: [19.39, 52.07] as [number, number] },
  { name: 'Greece', coordinates: [21.82, 39.07] as [number, number] },
  { name: 'Albania', coordinates: [19.82, 41.15] as [number, number] },
  { name: 'Kyrgyzstan', coordinates: [74.77, 41.2] as [number, number] },
  { name: 'Russia', coordinates: [37.62, 55.75] as [number, number] },
  { name: 'Belarus', coordinates: [27.56, 53.9] as [number, number] },
  { name: 'Slovenia', coordinates: [14.51, 46.06] as [number, number] },
  { name: 'India', coordinates: [78.96, 20.59] as [number, number] },
]

const WorldMap = () => {
  return (
    <div className="world-map-wrap">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          center: [20, 30],
        }}
        className="world-map-svg"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo, i) => (
              <Geography
                key={`geo-${i}`}
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
