// Keep a single, clean demo project (client-ready scaffolding).
export const projects = [
  {
    slug: 'om-building',
    name: 'OM Building',
    location: 'CTS 214, Near Ideal Colony Metro, Erandwane, Pune 411004',
    area: 'Kothrud',
    reraNumber: 'P52100099881',
    type: 'Residential',
    unitTypes: ['2BHK', '3BHK', '4BHK'],
    unitSize: '2BHK / 3BHK / 4BHK',
    status: 'Ongoing',
    priceLabel: 'Starting from ₹1.25 Cr*',
    availability: 'Limited inventory',
    tagline: 'Signature living with timeless detailing.',
    brochureUrl: '#',
    qrCode: '/images/qr_code.png',
    mapEmbedUrl: 'https://www.google.com/maps?q=Kothrud%20Pune&output=embed',
    directionsUrl: 'https://maps.google.com/?q=Kothrud,Pune',
    description:
      'OM Building is crafted for buyers who want premium design, strategic connectivity, and everyday convenience in one address. The project blends thoughtful layouts, elegant common spaces, and trusted construction quality. With metro access, healthcare, schools, and lifestyle hubs nearby, it offers a calm yet connected urban lifestyle.',
    amenities: [
      'CCTV Surveillance',
      '24x7 Security System',
      'Fire Safety Compliance',
      'Rainwater Harvesting',
      'Solar Backup for Common Areas',
      'High-Speed Lifts',
      'Designer Entrance Lobby',
      'Power Backup',
    ],
    locationDetails: {
      transportation: [
        { name: 'Kothrud Bus Station', distance: '82 m' },
        { name: 'Ideal Colony Metro Station', distance: '600 m' },
      ],
      healthcare: [
        { name: 'Deenanath Mangeshkar Hospital', distance: '1.2 km' },
        { name: 'Sahyadri Hospital', distance: '2.4 km' },
      ],
      schools: [
        { name: 'Abhinava Vidyalaya', distance: '1.1 km' },
        { name: 'Cummins College', distance: '2.0 km' },
      ],
      shopping: [
        { name: 'City Pride Kothrud', distance: '1.4 km' },
        { name: 'Reliance Smart Point', distance: '650 m' },
      ],
      restaurants: [
        { name: 'The Coriander Leaf', distance: '900 m' },
        { name: 'Cafe Goodluck', distance: '2.6 km' },
      ],
    },
    floorPlans: [
      {
        label: '2BHK',
        area: '1180 sq.ft',
        code: 'FP-2BHK',
        image: '/floorplans/2BHK.jpeg',
      },

      {
        label: '3BHK',
        area: '1450 sq.ft',
        code: 'FP-3BHK',
        image: '/floorplans/3BHK.jpeg',
      },
    ],
    gallery: [
      "/images/project_hero.png",
      "/images/gallery_1.png",
      "/images/gallery_2.png",
      "/images/gallery_3.png",
    ]
  },
]

export const ongoingProjects = projects
export const completedProjects = []

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null
}

