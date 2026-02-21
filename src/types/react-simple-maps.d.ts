declare module 'react-simple-maps' {
  import { FC, ReactNode } from 'react'

  export interface GeographyProps {
    geography: object
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: object
  }

  export const ComposableMap: FC<{
    projection?: string
    projectionConfig?: object
    className?: string
    children?: ReactNode
  }>
  export const Geographies: FC<{
    geography: string | object
    children: (props: { geographies: object[] }) => ReactNode
  }>
  export const Geography: FC<GeographyProps>
  export const Marker: FC<{
    coordinates: [number, number]
    children?: ReactNode
  }>
}
