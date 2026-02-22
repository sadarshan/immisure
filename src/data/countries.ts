export interface Job {
  id: string
  title: string
  category: string
  description: string
  requirements: string[]
  available: boolean
  googleFormUrl: string
  icon: string
  contractDuration: string
  workHoursPerDay: number
  currency: string
  wagePerMonth: number
  /** Shown after wage, e.g. "Accommodation by company and food by self." */
  note?: string
}

export interface Country {
  id: string
  name: string
  slug: string
  image: string
  description: string
  jobs: Job[]
}

const wages: Record<string, { factory: number; warehouse: number; house: number; agriculture: number; construction: number; hospitality: number }> = {
  EUR: { factory: 1150, warehouse: 1100, house: 1050, agriculture: 1000, construction: 1300, hospitality: 1080 },
  ILS: { factory: 5500, warehouse: 5200, house: 5000, agriculture: 4800, construction: 6200, hospitality: 5100 },
  PLN: { factory: 5200, warehouse: 5000, house: 4800, agriculture: 4500, construction: 5800, hospitality: 4900 },
  RUB: { factory: 45000, warehouse: 42000, house: 40000, agriculture: 38000, construction: 50000, hospitality: 41000 },
  KGS: { factory: 105000, warehouse: 98000, house: 95000, agriculture: 90000, construction: 115000, hospitality: 100000 },
  BYN: { factory: 1200, warehouse: 1150, house: 1100, agriculture: 1000, construction: 1400, hospitality: 1120 },
  ALL: { factory: 120000, warehouse: 115000, house: 110000, agriculture: 100000, construction: 135000, hospitality: 108000 }
}
const defaultWages = wages.EUR

function wage(currency: string, key: keyof typeof defaultWages): number {
  return wages[currency]?.[key] ?? defaultWages[key]
}

const DEFAULT_CONTRACT = {
  factory: '12 months (renewable)',
  warehouse: '12 months (renewable)',
  house: '24 months (renewable)',
  agriculture: '6 months (seasonal)',
  construction: '12 months (renewable)',
  hospitality: '12 months (renewable)'
} as const

const CONTRACT_12M_2Y_TRC = '12 months + 2 years TRC'
const WAGE_NOTE = 'Accommodation by company and food by self.'

function createJobsForCountry(
  countryName: string,
  currency: string,
  formIdBase: string,
  options?: { contractDuration: string; note: string }
): Job[] {
  const contract = options?.contractDuration ?? undefined
  const note = options?.note
  return [
    {
      id: 'factory-worker',
      title: 'Factory Worker',
      category: 'Manufacturing',
      description: `Work in modern manufacturing facilities in ${countryName}. Competitive wages and excellent working conditions.`,
      requirements: ['Age 18-45 years', 'Basic education required', 'Good physical health', 'Willingness to work in shifts'],
      available: true,
      googleFormUrl: `https://docs.google.com/forms/d/e/${formIdBase}_1/viewform`,
      icon: '🏭',
      contractDuration: contract ?? DEFAULT_CONTRACT.factory,
      workHoursPerDay: 8,
      currency,
      wagePerMonth: wage(currency, 'factory'),
      ...(note && { note })
    },
    {
      id: 'warehouse-worker',
      title: 'Warehouse Worker',
      category: 'Logistics',
      description: `Join our logistics team handling inventory, packaging, and distribution in ${countryName}.`,
      requirements: ['Age 18-50 years', 'Physical fitness required', 'Attention to detail', 'Team player attitude'],
      available: true,
      googleFormUrl: `https://docs.google.com/forms/d/e/${formIdBase}_2/viewform`,
      icon: '📦',
      contractDuration: contract ?? DEFAULT_CONTRACT.warehouse,
      workHoursPerDay: 8,
      currency,
      wagePerMonth: wage(currency, 'warehouse'),
      ...(note && { note })
    },
    {
      id: 'house-cleaner',
      title: 'House Cleaner',
      category: 'Domestic Services',
      description: `Professional house cleaning positions in ${countryName}. Flexible schedules and competitive pay.`,
      requirements: ['Age 20-55 years', 'Previous experience preferred', 'Reliable and trustworthy', 'Good communication skills'],
      available: true,
      googleFormUrl: `https://docs.google.com/forms/d/e/${formIdBase}_3/viewform`,
      icon: '🏠',
      contractDuration: contract ?? DEFAULT_CONTRACT.house,
      workHoursPerDay: 8,
      currency,
      wagePerMonth: wage(currency, 'house'),
      ...(note && { note })
    },
    {
      id: 'agriculture-worker',
      title: 'Agriculture Worker',
      category: 'Agriculture',
      description: `Work in ${countryName}'s agricultural sector. Seasonal and permanent positions available.`,
      requirements: ['Age 18-50 years', 'Physical fitness required', 'Experience in farming preferred', 'Willingness to work outdoors'],
      available: true,
      googleFormUrl: `https://docs.google.com/forms/d/e/${formIdBase}_4/viewform`,
      icon: '🌾',
      contractDuration: contract ?? DEFAULT_CONTRACT.agriculture,
      workHoursPerDay: 8,
      currency,
      wagePerMonth: wage(currency, 'agriculture'),
      ...(note && { note })
    },
    {
      id: 'construction-worker',
      title: 'Construction Worker',
      category: 'Construction',
      description: `Skilled and unskilled construction positions in ${countryName}'s growing infrastructure sector.`,
      requirements: ['Age 18-50 years', 'Physical fitness required', 'Construction experience preferred', 'Safety certification a plus'],
      available: false,
      googleFormUrl: `https://docs.google.com/forms/d/e/${formIdBase}_5/viewform`,
      icon: '🏗️',
      contractDuration: contract ?? DEFAULT_CONTRACT.construction,
      workHoursPerDay: 8,
      currency,
      wagePerMonth: wage(currency, 'construction'),
      ...(note && { note })
    },
    {
      id: 'hospitality-worker',
      title: 'Hospitality Worker',
      category: 'Hospitality',
      description: `Join ${countryName}'s hospitality industry. Hotels, restaurants, and tourism positions available.`,
      requirements: ['Age 18-45 years', 'Customer service skills', 'Basic English required', 'Flexible schedule'],
      available: true,
      googleFormUrl: `https://docs.google.com/forms/d/e/${formIdBase}_6/viewform`,
      icon: '🍽️',
      contractDuration: contract ?? DEFAULT_CONTRACT.hospitality,
      workHoursPerDay: 8,
      currency,
      wagePerMonth: wage(currency, 'hospitality'),
      ...(note && { note })
    }
  ]
}

// Lightweight tourism images: 480w, q=65 for fast load. Using Unsplash where verified; Picsum as fallback.
// Format: w=480&q=65 (Imgix) or Picsum /seed/{country}/480/300
const IMAGES = {
  slovakia: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=480&q=65&fit=crop',
  israel: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=480&q=65&fit=crop',
  germany: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=480&q=65&fit=crop',
  poland: 'https://picsum.photos/seed/poland-krakow/480/300',
  greece: 'https://picsum.photos/seed/greece-santorini/480/300',
  albania: 'https://picsum.photos/seed/albania/480/300',
  kyrgyzstan: 'https://picsum.photos/seed/kyrgyzstan-landscape/480/300',
  russia: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=480&q=65&fit=crop',
  belarus: 'https://picsum.photos/seed/belarus/480/300',
  slovenia: 'https://picsum.photos/seed/slovenia-bled/480/300'
}

export const countries: Country[] = [
  {
    id: 'slovakia',
    name: 'Slovakia',
    slug: 'slovakia',
    image: IMAGES.slovakia,
    description: 'Work permits for manufacturing, logistics, agriculture, and hospitality.',
    jobs: createJobsForCountry('Slovakia', 'EUR', 'YOUR_FORM_ID', { contractDuration: CONTRACT_12M_2Y_TRC, note: WAGE_NOTE })
  },
  {
    id: 'israel',
    name: 'Israel',
    slug: 'israel',
    image: IMAGES.israel,
    description: 'Work opportunities in tech, agriculture, construction, and care sectors.',
    jobs: createJobsForCountry('Israel', 'ILS', 'YOUR_FORM_ID_IL')
  },
  {
    id: 'germany',
    name: 'Germany',
    slug: 'germany',
    image: IMAGES.germany,
    description: 'Skilled and seasonal work in manufacturing, logistics, and hospitality.',
    jobs: createJobsForCountry('Germany', 'EUR', 'YOUR_FORM_ID_DE', { contractDuration: CONTRACT_12M_2Y_TRC, note: WAGE_NOTE })
  },
  {
    id: 'poland',
    name: 'Poland',
    slug: 'poland',
    image: IMAGES.poland,
    description: 'Factory, warehouse, agriculture, and construction positions.',
    jobs: createJobsForCountry('Poland', 'PLN', 'YOUR_FORM_ID_PL', { contractDuration: CONTRACT_12M_2Y_TRC, note: WAGE_NOTE })
  },
  {
    id: 'greece',
    name: 'Greece',
    slug: 'greece',
    image: IMAGES.greece,
    description: 'Tourism, agriculture, and seasonal work opportunities.',
    jobs: createJobsForCountry('Greece', 'EUR', 'YOUR_FORM_ID_GR', { contractDuration: CONTRACT_12M_2Y_TRC, note: WAGE_NOTE })
  },
  {
    id: 'albania',
    name: 'Albania',
    slug: 'albania',
    image: IMAGES.albania,
    description: 'Agriculture, tourism, and construction roles.',
    jobs: createJobsForCountry('Albania', 'ALL', 'YOUR_FORM_ID_AL')
  },
  {
    id: 'kyrgyzstan',
    name: 'Kyrgyzstan',
    slug: 'kyrgyzstan',
    image: IMAGES.kyrgyzstan,
    description: 'Mining, agriculture, and hospitality positions.',
    jobs: createJobsForCountry('Kyrgyzstan', 'KGS', 'YOUR_FORM_ID_KG')
  },
  {
    id: 'russia',
    name: 'Russia',
    slug: 'russia',
    image: IMAGES.russia,
    description: 'Construction, manufacturing, and logistics opportunities.',
    jobs: createJobsForCountry('Russia', 'RUB', 'YOUR_FORM_ID_RU', { contractDuration: CONTRACT_12M_2Y_TRC, note: WAGE_NOTE })
  },
  {
    id: 'belarus',
    name: 'Belarus',
    slug: 'belarus',
    image: IMAGES.belarus,
    description: 'Industrial and agricultural work permits.',
    jobs: createJobsForCountry('Belarus', 'BYN', 'YOUR_FORM_ID_BY')
  },
  {
    id: 'slovenia',
    name: 'Slovenia',
    slug: 'slovenia',
    image: IMAGES.slovenia,
    description: 'Manufacturing, tourism, and agriculture in the EU.',
    jobs: createJobsForCountry('Slovenia', 'EUR', 'YOUR_FORM_ID_SI', { contractDuration: CONTRACT_12M_2Y_TRC, note: WAGE_NOTE })
  }
]

export const getCountryBySlug = (slug: string): Country | undefined =>
  countries.find(c => c.slug === slug)

export const getJobByCountryAndId = (countrySlug: string, jobId: string): Job | undefined => {
  const country = getCountryBySlug(countrySlug)
  return country?.jobs.find(j => j.id === jobId)
}
