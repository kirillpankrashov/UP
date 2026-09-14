export interface GeoResponse {
  area_code: string
  asn: number
  ip: string
  latitude: string
  longitude: string
  organization: string
  organization_name: string
  country_code?: string
  country_code3?: string
  continent_code?: string
  region?: string
  city?: string
  accuracy?: number
  country?: string
  timezone?: string
}
