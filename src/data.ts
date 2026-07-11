import { StoryMilestone, RegistryItem, GuestBlessing, CeremonyEvent, FAQItem } from './types';

// Real couple photos — imported (not string paths) so Vite bundles and
// hashes them correctly into the production build. A plain string path
// like '/src/assets/...' only works in dev and breaks after `vite build`.
import coupleHeroImageAsset from './assets/images/christian_ornella_wedding_1783429710497.jpg';
import heroSlideAsset1 from './assets/images/hero-slide-1.jpg';
import heroSlideAsset2 from './assets/images/hero-slide-2.jpg';
import heroSlideAsset3 from './assets/images/hero-slide-3.jpg';

// Story timeline photos (real client photos, positions 1, 2 and 4)
import storyPhoto1 from './assets/images/story-photo-1.jpg';
import storyPhoto2 from './assets/images/story-photo-2.jpg';
import storyPhoto4 from './assets/images/story-photo-4.jpg';

export const coupleHeroImage = coupleHeroImageAsset;

// Hero background slideshow — cycles through these on the front page
export const heroSlides: string[] = [heroSlideAsset1, heroSlideAsset2, heroSlideAsset3];

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'm1',
    year: '2018',
    title: 'Two Students, One Campus',
    subtitle: 'Where it all began',
    location: 'University of Buea, Cameroon',
    description: 'We were both students at the University of Buea, our paths crossing between lecture halls and campus footpaths long before either of us had the courage to say much more than hello. What started as familiar faces in a crowd slowly became a friendship neither of us saw coming — and neither of us wanted to end.',
    imageUrl: storyPhoto1
  },
  {
    id: 'm2',
    year: '2019',
    title: 'The Same Pew',
    subtitle: 'Discovering we belonged to the same family of faith',
    location: 'EEC Paroisse de Buea, Cameroon',
    description: 'It was at EEC Paroisse de Buea that we realized we had been worshipping under the same roof all along. Sunday after Sunday, our friendship deepened in the pews and beyond them, grounded in a shared faith that would soon become the foundation of everything we\'d build together.',
    imageUrl: storyPhoto2
  },
  {
    id: 'm3',
    year: '2022',
    title: 'Bound in Fellowship',
    subtitle: 'Where friendship became forever',
    location: 'UCJG, Buea, Cameroon',
    description: 'Through UCJG, our church\'s Christian youth fellowship, we found ourselves serving side by side — in worship, in prayer, in the quiet work of building a community of young believers. It was here, surrounded by the people who had watched us grow, that our story turned from friendship into a promise for life.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    year: '2026',
    title: 'Looking Toward Baham',
    subtitle: 'An elegant union of our families',
    location: 'Baham, Cameroon',
    description: 'Now, our families prepare to gather in Baham, in the heart of Bamileke country, for our Traditional Customary Wedding. Embracing our rich heritage, we will wear exquisite golden Toghu attire as blessings, symbolic gifts, and traditional negotiation bind our lineages together in beautiful harmony.',
    imageUrl: storyPhoto4
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
    message: 'Mon fils Joverlin et ma fille De l’Ange, que Dieu déverse sa grâce infinie sur votre foyer. Que votre amour soit fort comme le Mont Cameroun et doux comme l’eau de Kribi. Nous sommes tellement fiers de votre union magnifique ! Félicitations !',
    date: '2026-07-06T14:30:00Z',
    cardDesign: 'Gold-Filigree',
    pledgedItemTitle: 'Traditional Toghu Handcrafted Living Room Suite'
  },
  {
    id: 'b2',
    senderName: 'Marc-Aurèle Ndi',
    email: 'm.ndi@gmail.com',
    relationship: 'Friend',
    message: 'Bro! Joverlin, to see you marry your queen De l\'Ange is an absolute dream. You guys are the perfect match. Looking forward to celebrating with all the guys in Nkongsamba this August. Traditional custom and civil/religious wedding will be fire! Blessings on your household.',
    date: '2026-07-06T19:45:00Z',
    cardDesign: 'Cameroon-Emerald'
  },
  {
    id: 'b3',
    senderName: 'Grace & Jean-Paul Kamdem',
    email: 'kamdems@outlook.com',
    relationship: 'Colleague',
    message: 'De l\'Ange and Joverlin, congratulations on this beautiful step! It has been wonderful watching your journey grow since your days together at the University of Buea. Wishing you a lifetime of laughter, prosperity, and endless blessings. You are a gorgeous couple.',
    date: '2026-07-07T02:15:00Z',
    cardDesign: 'Rose-Petals',
    pledgedItemTitle: 'Dream Honeymoon in Kribi Resort'
  },
  {
    id: 'b4',
    senderName: 'Maman Thérèse',
    email: 'therese.yde@hotmail.fr',
    relationship: 'Family',
    message: 'Toutes mes bénédictions les plus chaleureuses à mes enfants. Que la patience, la joie et la paix soient le ciment de votre foyer. Baham et Nkongsamba célèbrent ce mariage béni. Amen !',
    date: '2026-07-07T05:00:00Z',
    cardDesign: 'Ivory-Classic'
  }
];

export const ceremonyEvents: CeremonyEvent[] = [
  {
    id: 'c1',
    title: 'Traditional Marriage Rites (La Dotation)',
    date: 'Saturday, August 8, 2026',
    time: '2:00 PM - 8:00 PM',
    venueName: '{{Venue Name — to be confirmed}}',
    address: 'Baham, West Region, Cameroon',
    description: 'The formal traditional customary wedding ceremony where our two families unite according to traditional Cameroon customs, held in the heart of the Bamileke chiefdom of Baham. It will feature customary rites, negotiation presentations, tribal blessings, traditional music, and an exquisite Cameroonian buffet feast.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    dressCode: 'Royal Cameroonian Traditional Elegance',
    dressCodeDescription: 'Guests are warmly encouraged to wear traditional Cameroonian attire. Bold, gorgeous Toghu (North-West), Ndop (West), Kaba Ngondo (Sawa/Littoral), or custom African wax prints with touch of gold are highly recommended.'
  },
  {
    id: 'c2',
    title: 'The Civil & Religious Wedding & Grand Reception',
    date: 'Saturday, August 15, 2026',
    time: '1:00 PM - 11:00 PM',
    venueName: '{{Church / Reception Venue — to be confirmed}}',
    address: 'Nkongsamba, Littoral Region, Cameroon',
    description: 'The religious wedding blessing, exchange of vows, and official civil signing of our union in Nkongsamba, followed by an opulent, elegant evening banquet reception with non-stop dancing, wedding toasts, and majestic celebrations.',
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
    answer: 'Yes! International guests should fly into Douala International Airport (DLA) — the closest gateway to both Baham (West Region) and Nkongsamba (Littoral Region). Shuttle services will be provided for guests between venues. Please secure your Cameroonian tourist visa and yellow fever vaccination card at least 1 month prior to departure.',
    category: 'Travel & Location'
  },
  {
    id: 'f3',
    question: 'What is the dress code for each ceremony?',
    answer: 'The Traditional Customary Wedding in Baham is Traditional Elegance & Royal African prints (Toghu, Ndop, Kaba, or Dashiki). The Civil & Religious Wedding in Nkongsamba is high-fashion Black-Tie & Evening Glamour (Tuxedos for men, long elegant gowns for ladies) themed in Ivory, Champagne, and Gold.',
    category: 'Culture & Attire'
  },
  {
    id: 'f4',
    question: 'How and when should I RSVP?',
    answer: 'Please complete the RSVP form on this website by July 1st, 2026. This allows our catering team to accurately finalize the traditional Cameroonian menu courses and seating charts for both Baham and Nkongsamba.',
    category: 'RSVP & Access'
  }
];
