import { StoryMilestone, RegistryItem, GuestBlessing, CeremonyEvent, FAQItem } from './types';

// Relative path to generated romantic Cameroonian couple portrait
export const coupleHeroImage = '/src/assets/images/christian_ornella_wedding_1783429710497.jpg';

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'm1',
    year: '2021',
    title: 'Eyes Met in Douala',
    subtitle: 'Where it all began',
    location: 'Douala, Cameroon',
    description: 'Amidst the bustling streets of Akwa, Douala, our paths crossed at a local tech and business conference. A shared discussion on modern African design soon turned into a three-hour coffee chat. We realized we shared not just professional dreams, but the same values, laughter, and vision for the future.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm2',
    year: '2022',
    title: 'First Escape to Limbé',
    subtitle: 'Falling in love by the black sands',
    location: 'Limbé Beach, Cameroon',
    description: 'Our first real trip together to Limbé, walking along the volcanic black sands with the fresh Atlantic breeze. Watching the sunset with Mount Cameroon behind us, we realized this was more than just a passing spark—we had found our absolute home in one another.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm3',
    year: '2024',
    title: 'The Kribi Proposal',
    subtitle: 'Yes to Forever by the Chutes de la Lobé',
    location: 'Kribi, Cameroon',
    description: 'During a weekend getaway to the seaside paradise of Kribi, Christian planned a surprise sunset canoe ride near the Lobé Waterfalls. Standing where the river meets the ocean, he got down on one knee. With the sound of cascading waters and Ornella’s tearful "Oui!", our road to marriage was sealed.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    year: 'Feb 2026',
    title: 'La Dotation (Traditional Rites)',
    subtitle: 'An elegant union of our families',
    location: 'Yaoundé, Cameroon',
    description: 'Surrounded by the warmth of our elders, our families gathered in Yaoundé for our Traditional Customary Wedding. Embracing our rich heritage, we wore exquisite golden Toghu attire. The blessings, exchange of symbolic gifts, and traditional negotiation bound our lineages together in beautiful harmony.',
    imageUrl: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80'
  }
];

export const registryItems: RegistryItem[] = [
  {
    id: 'r1',
    title: 'Dream Honeymoon in Kribi Resort',
    category: 'Honeymoon',
    description: 'Help us enjoy a luxurious 5-night stay at a beachfront bungalow in Kribi, complete with fresh seafood dining, relaxing sea views, and ocean excursions.',
    price: 1500,
    targetAmount: 1500,
    raisedAmount: 650,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: true
  },
  {
    id: 'r2',
    title: 'Traditional Toghu Handcrafted Living Room Suite',
    category: 'Traditional & Culture',
    description: 'A bespoke living room accent set incorporating traditional North-West Cameroonian hand-carved mahogany wood and vibrant Toghu embroidered textiles.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: false
  },
  {
    id: 'r3',
    title: 'Gourmet Kitchen Suite & Cookware',
    category: 'Home Essentials',
    description: 'A high-end multi-cooker, premium stand mixer, and professional culinary knife set to help us cook delicious Cameroonian meals (Ndolé, Achu, Poulet DG!) in our new home.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    reserved: true,
    reservedBy: 'Maman Jacqueline & Papa Robert',
    allowCustomContribution: false
  },
  {
    id: 'r4',
    title: 'Honeymoon Flight Fund',
    category: 'Honeymoon',
    description: 'Contributing towards our flight tickets for our dream honeymoon escape and travel adventures together.',
    price: 1200,
    targetAmount: 1200,
    raisedAmount: 400,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: true
  },
  {
    id: 'r5',
    title: 'Smart Home Living Room Audio & Projector',
    category: 'Home Essentials',
    description: 'A cinematic home projector and wireless sound system for our cozy Friday movie nights and hosting family gatherings.',
    price: 600,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: false
  },
  {
    id: 'r6',
    title: 'Authentic Cameroonian Fine Art Canvas',
    category: 'Traditional & Culture',
    description: 'A customized masterpiece painting by an elite local Cameroonian painter celebrating love, ancestry, and modern Cameroonian scenery to hang in our entryway.',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: true
  },
  {
    id: 'r7',
    title: 'Premium Linen & Cozy Bedroom Essentials',
    category: 'Home Essentials',
    description: 'Luxury organic cotton sheet sets, plush pillows, and a hand-knitted coverlet to make our new master bedroom a peaceful sanctuary.',
    price: 250,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: false
  },
  {
    id: 'r8',
    title: 'Romantic Sunset Cruise & Dinner in Limbé',
    category: 'Experiences',
    description: 'An elegant private seaside candlelit dinner and boat cruise at Limbé beach where we spent our first romantic trip together.',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    reserved: false,
    allowCustomContribution: false
  }
];

export const initialBlessings: GuestBlessing[] = [
  {
    id: 'b1',
    senderName: 'Tante Marie-Claire',
    email: 'mclaire@yahoo.fr',
    relationship: 'Family',
    message: 'Mon fils Christian et ma fille Ornella, que Dieu déverse sa grâce infinie sur votre foyer. Que votre amour soit fort comme le Mont Cameroun et doux comme l’eau de Kribi. Nous sommes tellement fiers de votre union magnifique ! Félicitations !',
    date: '2026-07-06T14:30:00Z',
    cardDesign: 'Gold-Filigree',
    pledgedItemTitle: 'Traditional Toghu Handcrafted Living Room Suite'
  },
  {
    id: 'b2',
    senderName: 'Marc-Aurèle Ndi',
    email: 'm.ndi@gmail.com',
    relationship: 'Friend',
    message: 'Bro! Christian, to see you marry your queen Ornella is an absolute dream. You guys are the perfect match. Looking forward to celebrating with all the guys in Douala in December. Traditional custom and white wedding will be fire! Blessings on your household.',
    date: '2026-07-06T19:45:00Z',
    cardDesign: 'Cameroon-Emerald'
  },
  {
    id: 'b3',
    senderName: 'Grace & Jean-Paul Kamdem',
    email: 'kamdems@outlook.com',
    relationship: 'Colleague',
    message: 'Ornella and Christian, congratulations on this beautiful step! It has been wonderful watching your journey grow from that conference in Douala. Wishing you a lifetime of laughter, prosperity, and endless blessings. You are a gorgeous couple.',
    date: '2026-07-07T02:15:00Z',
    cardDesign: 'Rose-Petals',
    pledgedItemTitle: 'Dream Honeymoon in Kribi Resort'
  },
  {
    id: 'b4',
    senderName: 'Maman Thérèse',
    email: 'therese.yde@hotmail.fr',
    relationship: 'Family',
    message: 'Toutes mes bénédictions les plus chaleureuses à mes enfants. Que la patience, la joie et la paix soient le ciment de votre foyer. Yaoundé et Douala célèbrent ce mariage béni. Amen !',
    date: '2026-07-07T05:00:00Z',
    cardDesign: 'Ivory-Classic'
  }
];

export const ceremonyEvents: CeremonyEvent[] = [
  {
    id: 'c1',
    title: 'Traditional Marriage Rites (La Dotation)',
    date: 'Friday, December 11, 2026',
    time: '2:00 PM - 8:00 PM',
    venueName: 'The Mbanga Family Estate',
    address: 'Quartier Bastos, Yaoundé, Cameroon',
    description: 'The formal traditional customary wedding ceremony where our two families unite according to traditional Cameroon customs. It will feature customary rites, negotiation presentations, tribal blessings, traditional music, and an exquisite Cameroonian buffet feast.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    dressCode: 'Royal Cameroonian Traditional Elegance',
    dressCodeDescription: 'Guests are warmly encouraged to wear traditional Cameroonian attire. Bold, gorgeous Toghu (North-West), Ndop (West), Kaba Ngondo (Sawa/Littoral), or custom African wax prints with touch of gold are highly recommended.'
  },
  {
    id: 'c2',
    title: 'The White Wedding Ceremony & Grand Reception',
    date: 'Saturday, December 12, 2026',
    time: '1:00 PM - 11:00 PM',
    venueName: 'Cathédrale Saint-Pierre-et-Saint-Paul & Crystal Palace Gardens',
    address: 'Boulevard de la Liberté, Douala, Cameroon',
    description: 'The religious wedding blessing, exchange of vows, and official civil signing, followed by an opulent, elegant evening banquet reception with non-stop dancing, wedding toasts, and majestic celebrations at the Crystal Palace Gardens in Bonapriso.',
    imageUrl: coupleHeroImage, // Beautifully showing our newly generated custom hero!
    dressCode: 'Strict Black-Tie & Regal Glamour',
    dressCodeDescription: 'Gentlemen in classic black tuxedos or elegant dark traditional attire. Ladies in floor-length evening gowns. The color theme is Ivory, Warm Gold, and soft Champagne.'
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'f1',
    question: 'How do I use the Wedding Store / Gift Registry?',
    answer: 'Our Wedding Store allows you to browse and pick gift concepts we have curated for our new home and honeymoon. You can either: 1) Reserve/Pledge a physical item and purchase it from your retailer of choice to bring to the ceremony, or 2) Contribute any amount to our Honeymoon/Home funds directly on the site. When you place an order or contribution, you will also be able to write an elegant Digital Gift Card and Blessing that will appear on our online blessings wall!',
    category: 'Gifts & Registry'
  },
  {
    id: 'f2',
    question: 'Are there travel recommendations for international guests?',
    answer: 'Yes! International guests should fly into Douala International Airport (DLA) or Yaoundé Nsimalen International Airport (NSI). We have blocked hotel rooms with special rates at the Hilton Yaoundé and the Pullman Douala Rabingha. Shuttle services will be provided for guests between venues. Please secure your Cameroonian tourist visa and yellow fever vaccination card at least 1 month prior to departure.',
    category: 'Travel & Location'
  },
  {
    id: 'f3',
    question: 'What is the dress code for each ceremony?',
    answer: 'The Traditional Customary Wedding in Yaoundé is Traditional Elegance & Royal African prints (Toghu, Ndop, Kaba, or Dashiki). The White Wedding in Douala is high-fashion Black-Tie & Evening Glamour (Tuxedos for men, long elegant gowns for ladies) themed in Ivory, Champagne, and Gold.',
    category: 'Culture & Attire'
  },
  {
    id: 'f4',
    question: 'How and when should I RSVP?',
    answer: 'Please complete the RSVP form on this website by November 1st, 2026. This allows our catering team in Yaoundé and Douala to accurately finalize the traditional Cameroonian menu courses and seating charts.',
    category: 'RSVP & Access'
  }
];
