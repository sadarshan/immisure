export interface Job {
  id: string
  title: string
  category: string
  description: string
  requirements: string[]
  available: boolean
  googleFormUrl: string // Replace with your actual Google Form URLs
  icon: string
  contractDuration: string
  workHoursPerDay: number
  currency: string
  wagePerMonth: number
}

export const jobs: Job[] = [
  {
    id: 'factory-worker',
    title: 'Factory Worker',
    category: 'Manufacturing',
    description: 'Work in modern manufacturing facilities in Slovakia. Competitive wages and excellent working conditions.',
    requirements: [
      'Age 18-45 years',
      'Basic education required',
      'Good physical health',
      'Willingness to work in shifts'
    ],
    available: true,
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_1/viewform',
    icon: '🏭',
    contractDuration: '12 months (renewable)',
    workHoursPerDay: 8,
    currency: 'EUR',
    wagePerMonth: 1150
  },
  {
    id: 'warehouse-worker',
    title: 'Warehouse Worker',
    category: 'Logistics',
    description: 'Join our logistics team handling inventory, packaging, and distribution in Slovakia.',
    requirements: [
      'Age 18-50 years',
      'Physical fitness required',
      'Attention to detail',
      'Team player attitude'
    ],
    available: true,
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_2/viewform',
    icon: '📦',
    contractDuration: '12 months (renewable)',
    workHoursPerDay: 8,
    currency: 'EUR',
    wagePerMonth: 1100
  },
  {
    id: 'house-cleaner',
    title: 'House Cleaner',
    category: 'Domestic Services',
    description: 'Professional house cleaning positions available in Slovakia. Flexible schedules and competitive pay.',
    requirements: [
      'Age 20-55 years',
      'Previous experience preferred',
      'Reliable and trustworthy',
      'Good communication skills'
    ],
    available: true,
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_3/viewform',
    icon: '🏠',
    contractDuration: '24 months (renewable)',
    workHoursPerDay: 8,
    currency: 'EUR',
    wagePerMonth: 1050
  },
  {
    id: 'agriculture-worker',
    title: 'Agriculture Worker',
    category: 'Agriculture',
    description: 'Work in Slovakia\'s agricultural sector. Seasonal and permanent positions available.',
    requirements: [
      'Age 18-50 years',
      'Physical fitness required',
      'Experience in farming preferred',
      'Willingness to work outdoors'
    ],
    available: true,
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_4/viewform',
    icon: '🌾',
    contractDuration: '6 months (seasonal)',
    workHoursPerDay: 8,
    currency: 'EUR',
    wagePerMonth: 1000
  },
  {
    id: 'construction-worker',
    title: 'Construction Worker',
    category: 'Construction',
    description: 'Skilled and unskilled construction positions in Slovakia\'s growing infrastructure sector.',
    requirements: [
      'Age 18-50 years',
      'Physical fitness required',
      'Construction experience preferred',
      'Safety certification a plus'
    ],
    available: false,
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_5/viewform',
    icon: '🏗️',
    contractDuration: '12 months (renewable)',
    workHoursPerDay: 8,
    currency: 'EUR',
    wagePerMonth: 1300
  },
  {
    id: 'hospitality-worker',
    title: 'Hospitality Worker',
    category: 'Hospitality',
    description: 'Join Slovakia\'s hospitality industry. Hotels, restaurants, and tourism positions available.',
    requirements: [
      'Age 18-45 years',
      'Customer service skills',
      'Basic English required',
      'Flexible schedule'
    ],
    available: true,
    googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_6/viewform',
    icon: '🍽️',
    contractDuration: '12 months (renewable)',
    workHoursPerDay: 8,
    currency: 'EUR',
    wagePerMonth: 1080
  }
]

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id)
}
