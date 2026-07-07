export type Language = 'en' | 'fr';

export interface TranslationDict {
  navHome: string;
  navStory: string;
  navEvents: string;
  navStore: string;
  navBlessings: string;
  navFaq: string;
  navRsvp: string;
  navAdmin: string;
  
  heroAnnounce: string;
  heroWelcome: string;
  heroAnd: string;
  heroLocation: string;
  heroDays: string;
  heroHours: string;
  heroMins: string;
  heroSecs: string;
  heroBtnStore: string;
  heroBtnStory: string;
  heroFloatLabel: string;
  heroExplore: string;

  storySubtitle: string;
  storyTitle: string;
  storyHeadingDesc: string;

  ceremonySubtitle: string;
  ceremonyTitle: string;
  ceremonyHeadingDesc: string;
  ceremonyCustomary: string;
  ceremonyReligious: string;
  ceremonyDressCode: string;
  ceremonyMapBtn: string;
  ceremonyTime: string;
  ceremonyVenue: string;

  storeSubtitle: string;
  storeTitle: string;
  storeHeadingDesc: string;
  storeSecureBadge: string;
  storeGiftedBy: string;
  storeContributeBtn: string;
  storeGiftBtn: string;
  storeContributionFund: string;
  storeGifted: string;
  storeRaised: string;
  storeGoal: string;
  storeGiftPrice: string;
  storePromoHeading: string;
  storePromoDesc: string;
  storePromoNote: string;
  storePreviewTitle: string;
  storePreviewDesc: string;
  storePreviewSignature: string;

  formTitle: string;
  formLabelName: string;
  formLabelEmail: string;
  formLabelRelationship: string;
  formLabelCardDesign: string;
  formLabelBlessing: string;
  formPlaceholderBlessing: string;
  formBtnSubmit: string;
  formBtnSubmitActive: string;
  formBtnCancel: string;
  formSuccessTitle: string;
  formSuccessDesc: string;
  formReceiptTitle: string;
  formReceiptItem: string;
  formReceiptPledgedBy: string;
  formReceiptAmount: string;
  formReceiptNote: string;
  formReturnBtn: string;
  formSecureNote: string;

  guestbookSubtitle: string;
  guestbookTitle: string;
  guestbookHeadingDesc: string;
  guestbookBtnWrite: string;
  guestbookLabelRelationship: string;
  guestbookLabelCardStyle: string;
  guestbookPlaceholderMessage: string;
  guestbookBtnPublish: string;
  guestbookBtnPublishActive: string;
  guestbookCardTitle: string;
  guestbookCardTimestamp: string;
  guestbookCardGiftPledged: string;
  guestbookCardFooterPrefix: string;

  faqSubtitle: string;
  faqTitle: string;
  faqHeadingDesc: string;
  faqFlightTitle: string;
  faqFlightDesc: string;
  faqFlightAirportCode: string;
  faqHotelTitle: string;
  faqHotelDesc: string;
  faqHotelQuoteCode: string;
  faqCultureTitle: string;
  faqCultureDesc: string;
  faqCultureQuoteCode: string;

  rsvpSubtitle: string;
  rsvpTitle: string;
  rsvpHeadingDesc: string;
  rsvpVenueDotation: string;
  rsvpVenueWhite: string;
  rsvpCoordinator: string;
  rsvpRouteTitle: string;
  rsvpRouteDesc: string;
  rsvpRouteBadge: string;
  rsvpFormHeader: string;
  rsvpFormSubheader: string;
  rsvpFormPasses: string;
  rsvpFormFood: string;
  rsvpFormNote: string;
  rsvpConfirmBtn: string;
  rsvpConfirmBtnActive: string;
  rsvpTicketHeader: string;
  rsvpTicketTitle: string;
  rsvpTicketName: string;
  rsvpTicketPasses: string;
  rsvpTicketFood: string;
  rsvpTicketRegistered: string;
  rsvpTicketFooter: string;
  rsvpTicketTable: string;
  rsvpTicketTableNotAssigned: string;
  rsvpEditBtn: string;

  footerDesc: string;
  footerUpdates: string;
  footerUpdatesDesc: string;
  footerSubscribePlaceholder: string;
  footerErrorEmpty: string;
  footerErrorInvalid: string;
  footerSuccessSub: string;
  footerCredits: string;

  adminTitle: string;
  adminSubtitle: string;
  adminBtnClose: string;
  adminTabPledges: string;
  adminTabRsvps: string;
  adminTabAddGift: string;
  adminNoPledges: string;
  adminNoRsvps: string;
  adminColGuest: string;
  adminColAttendance: string;
  adminColPasses: string;
  adminColFood: string;
  adminColTable: string;
  adminTableAction: string;
  adminTablePlaceholder: string;
  adminAddTitle: string;
  adminAddItemTitle: string;
  adminAddItemCategory: string;
  adminAddItemPrice: string;
  adminAddItemDesc: string;
  adminAddItemImage: string;
  adminAddItemAllowCustom: string;
  adminAddItemBtn: string;
  adminAddItemSuccess: string;
  adminPledgeFund: string;
  adminPledgeReserved: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    navHome: 'Home',
    navStory: 'Our Story',
    navEvents: 'Celebrations',
    navStore: 'Gift Store',
    navBlessings: 'Blessings Wall',
    navFaq: 'FAQ & Travel',
    navRsvp: 'RSVP',
    navAdmin: 'Admin Panel',

    heroAnnounce: 'CELEBRATING THE UNION OF',
    heroWelcome: 'Welcome to our forever...',
    heroAnd: '&',
    heroLocation: 'Yaoundé & Douala, Cameroon',
    heroDays: 'Days',
    heroHours: 'Hours',
    heroMins: 'Mins',
    heroSecs: 'Secs',
    heroBtnStore: 'Visit Wedding Registry Store',
    heroBtnStory: 'Read Our Story',
    heroFloatLabel: 'C & O • YAOUNDÉ - DOUALA',
    heroExplore: 'Explore',

    storySubtitle: 'Christian & Ornella',
    storyTitle: 'Our Love Story',
    storyHeadingDesc: 'The beautiful journey that led us from an accidental meeting in Douala to our lifetime commitment.',

    ceremonySubtitle: 'Join us in Celebration',
    ceremonyTitle: 'Wedding Ceremonies',
    ceremonyHeadingDesc: 'We are honored to celebrate our union across two beautiful Cameroonian cities: our cultural customary rites in Yaoundé and our solemn white wedding vows in Douala.',
    ceremonyCustomary: 'Customary Rites',
    ceremonyReligious: 'Ecclesiastical Blessings',
    ceremonyDressCode: 'Dress Code Protocol',
    ceremonyMapBtn: 'Navigate with Google Maps',
    ceremonyTime: 'Time',
    ceremonyVenue: 'Venue',

    storeSubtitle: 'Gift Registry',
    storeTitle: 'Our Wedding Store',
    storeHeadingDesc: 'Your love, presence, and blessings are the greatest gifts we could ever receive. If you wish to honor us with a wedding gift, we have curated a collection of meaningful experiences and essentials to help us begin our household.',
    storeSecureBadge: 'Secure Digital Pledge & Customized Blessings Delivery',
    storeGiftedBy: 'Gifted by',
    storeContributeBtn: 'Contribute Funds',
    storeGiftBtn: 'Gift This Item',
    storeContributionFund: 'Contribution Fund',
    storeGifted: 'Gifted',
    storeRaised: 'Raised',
    storeGoal: 'Goal',
    storeGiftPrice: 'Gift Price',
    storePromoHeading: 'Gift Cards with Digital Blessings',
    storePromoDesc: 'Every item selected in our Wedding Store comes with a bespoke Digital Blessing Gift Card. You can custom design the background of your gift card (including royal Cameroon emerald gold patterns), write a prayer or marriage blessing, and see it instantly published on our Blessings Wall.',
    storePromoNote: '*All financial contributions directly support our Honeymoon trip to Kribi Beach and setting up our first home suite together.',
    storePreviewTitle: 'Interactive Live Gift Card Preview',
    storePreviewDesc: '"Your heartfelt wedding prayer and congratulations will appear here as you type in the form..."',
    storePreviewSignature: 'Your Signature',

    formTitle: 'Pledge & Blessing Card Creator',
    formLabelName: 'Your Full Name *',
    formLabelEmail: 'Email Address *',
    formLabelRelationship: 'Relationship to Christian & Ornella',
    formLabelCardDesign: 'Select Card Design Background Theme',
    formLabelBlessing: 'Your Heartfelt Wedding Blessing / Prayer *',
    formPlaceholderBlessing: 'Write your prayers, advice, or warm congratulations for Christian and Ornella as they step into this sacred union...',
    formBtnSubmit: 'Seal Blessing & Pledge Gift',
    formBtnSubmitActive: 'Sealing Blessing Card...',
    formBtnCancel: 'Cancel',
    formSuccessTitle: 'Blessing Sealed & Sent!',
    formSuccessDesc: 'Thank you so much! Your beautiful wedding gift pledge and digital blessing card have been registered for Christian & Ornella.',
    formReceiptTitle: 'PLEDGE SUMMARY RECEIPT',
    formReceiptItem: 'Gift Item:',
    formReceiptPledgedBy: 'Pledged By:',
    formReceiptAmount: 'Amount Pledged:',
    formReceiptNote: '*An elegant copy of your greeting card is being printed for the physical treasure registry box at the wedding reception in Cameroon.',
    formReturnBtn: 'Return to Store',
    formSecureNote: 'This is an honor-based wedding gift pledge. No active credit card needed.',

    guestbookSubtitle: 'Guestbook',
    guestbookTitle: 'Prayers & Blessings',
    guestbookHeadingDesc: 'Read the heartfelt messages, wishes, and prayers left by our beloved family and friends from Cameroon and across the globe.',
    guestbookBtnWrite: 'Write a Blessing Card',
    guestbookLabelRelationship: 'Your Relationship',
    guestbookLabelCardStyle: 'Select Card Style Theme',
    guestbookPlaceholderMessage: 'Write your prayers, blessings or advice...',
    guestbookBtnPublish: 'Publish Blessing Card',
    guestbookBtnPublishActive: 'Sealing card...',
    guestbookCardTitle: 'Wedding blessing',
    guestbookCardTimestamp: 'Date',
    guestbookCardGiftPledged: 'Gift Pledged',
    guestbookCardFooterPrefix: 'With love & prayers,',

    faqSubtitle: 'Guest Guide',
    faqTitle: 'Travel & Questions',
    faqHeadingDesc: 'Planning your trip to Yaoundé and Douala? We have gathered all the essential guidelines for travel, attire, registry contributions, and ceremony expectations.',
    faqFlightTitle: 'Flights & Transit',
    faqFlightDesc: 'For the Traditional Customary Wedding (Yaoundé), fly into Yaoundé Nsimalen International (NSI). For the White Wedding (Douala), fly into Douala International (DLA).',
    faqFlightAirportCode: 'Airport Codes: NSI, DLA',
    faqHotelTitle: 'Hotel Partner Blocks',
    faqHotelDesc: 'We have arranged special blocked group pricing at select premium partner hotels in both Yaoundé (Bastos vicinity) and Douala.',
    faqHotelQuoteCode: 'Quote code: "C&O Wedding"',
    faqCultureTitle: 'Cameroonian Royalty',
    faqCultureDesc: 'Our customary celebration embraces the rich heritage of the Grassfields. We highly encourage our friends to wear Toghu or Ndop fabrics with pride!',
    faqCultureQuoteCode: 'Wear with Pride & Joy!',

    rsvpSubtitle: 'Be Our Guest',
    rsvpTitle: 'Kindly RSVP',
    rsvpHeadingDesc: 'Please let us know if you will celebrate with us by November 1st, 2026. Your timely response helps us arrange fine dining accommodations and seating coordinates in Yaoundé and Douala.',
    rsvpVenueDotation: 'The Mbanga Family Estate • Quartier Bastos, Yaoundé, Cameroon',
    rsvpVenueWhite: 'Cathédrale Saint-Pierre-et-Saint-Paul & Crystal Palace, Douala, Cameroon',
    rsvpCoordinator: 'rsvp@christian-ornella.com • +237 6XX XX XX XX (WhatsApp)',
    rsvpRouteTitle: 'Yaoundé to Douala Route',
    rsvpRouteDesc: 'Shuttle transport service will be fully arranged for family delegations leaving Yaoundé Bastos after the Traditional custom to Douala for the Church ceremonies.',
    rsvpRouteBadge: 'Cameroon Union Transit Route',
    rsvpFormHeader: 'Secure Your Attendance',
    rsvpFormSubheader: 'No digital pass code required',
    rsvpFormPasses: 'Number of Guest Passes *',
    rsvpFormFood: 'Catering Course Choice',
    rsvpFormNote: 'Note of Warm Wishes (Optional)',
    rsvpConfirmBtn: 'Confirm Attendance RSVP',
    rsvpConfirmBtnActive: 'Sending RSVP Records...',
    rsvpTicketHeader: 'Digital Event Pass',
    rsvpTicketTitle: 'C & O UNION 2026',
    rsvpTicketName: 'Guest Name:',
    rsvpTicketPasses: 'Passes Issued:',
    rsvpTicketFood: 'Dinner Course:',
    rsvpTicketRegistered: 'Ceremonies Registered:',
    rsvpTicketFooter: 'Please show this digital summary or print coupon at the venue entrance.',
    rsvpTicketTable: 'Assigned Table Number:',
    rsvpTicketTableNotAssigned: 'Pending Table Assignment (Check at Entry)',
    rsvpEditBtn: 'Edit RSVP Submission',

    footerDesc: 'We are incredibly blessed to walk this beautiful journey of customary rites in Yaoundé and ecclesiastical vows in Douala. Thank you for your endless prayers, support, and blessings on our household.',
    footerUpdates: 'Celebration Updates',
    footerUpdatesDesc: 'Subscribe to receive transport timetables, hotel discount codes, and live streams link for our wedding ceremony.',
    footerSubscribePlaceholder: 'Enter your email address',
    footerErrorEmpty: 'Please enter your email.',
    footerErrorInvalid: 'Please enter a valid email address.',
    footerSuccessSub: 'Thank you! You are subscribed for wedding news updates.',
    footerCredits: 'Made with love for our union in Cameroon',

    adminTitle: 'Admin Wedding Dashboard',
    adminSubtitle: 'Secured coordinator panel for managing RSVPs, gift store inventory, and custom table assignments.',
    adminBtnClose: 'Close Panel',
    adminTabPledges: 'Pledge Orders',
    adminTabRsvps: 'RSVPs & Tables',
    adminTabAddGift: 'Add Gift Store Item',
    adminNoPledges: 'No gift pledges received yet.',
    adminNoRsvps: 'No RSVPs received yet.',
    adminColGuest: 'Guest',
    adminColAttendance: 'Attendance',
    adminColPasses: 'Passes',
    adminColFood: 'Menu Course',
    adminColTable: 'Assigned Table',
    adminTableAction: 'Assign Table',
    adminTablePlaceholder: 'e.g. Table Sanaga, Table 5',
    adminAddTitle: 'Introduce New Item to Wedding Store',
    adminAddItemTitle: 'Gift Item Title *',
    adminAddItemCategory: 'Gift Category *',
    adminAddItemPrice: 'Estimated Cost (USD) *',
    adminAddItemDesc: 'Detailed Description *',
    adminAddItemImage: 'Image Illustration URL *',
    adminAddItemAllowCustom: 'Allow Custom Fractional Contribution (Enable Fund Progress Bar)',
    adminAddItemBtn: 'Publish Item to Storefront',
    adminAddItemSuccess: 'Successfully added to the Wedding Store!',
    adminPledgeFund: 'Fund Contribution',
    adminPledgeReserved: 'Reserved Full Gift'
  },
  fr: {
    navHome: 'Accueil',
    navStory: 'Notre Histoire',
    navEvents: 'Célébrations',
    navStore: 'Boutique de Cadeaux',
    navBlessings: 'Livre d\'or',
    navFaq: 'FAQ & Voyage',
    navRsvp: 'Confirmer Présence',
    navAdmin: 'Espace Admin',

    heroAnnounce: 'CÉLÉBRATION DE L\'UNION DE',
    heroWelcome: 'Bienvenue dans notre éternité...',
    heroAnd: '&',
    heroLocation: 'Yaoundé & Douala, Cameroun',
    heroDays: 'Jours',
    heroHours: 'Heures',
    heroMins: 'Min',
    heroSecs: 'Sec',
    heroBtnStore: 'Visiter la Boutique de Mariage',
    heroBtnStory: 'Lire Notre Histoire',
    heroFloatLabel: 'C & O • YAOUNDÉ - DOUALA',
    heroExplore: 'Découvrir',

    storySubtitle: 'Christian & Ornella',
    storyTitle: 'Notre Histoire d\'Amour',
    storyHeadingDesc: 'Le magnifique voyage qui nous a menés d\'une rencontre fortuite à Douala jusqu\'à notre engagement pour la vie.',

    ceremonySubtitle: 'Rejoignez-nous pour Célébrer',
    ceremonyTitle: 'Cérémonies de Mariage',
    ceremonyHeadingDesc: 'Nous sommes honorés de célébrer notre union à travers deux belles villes camerounaises : nos rites coutumiers traditionnels à Yaoundé et nos vœux de mariage à Douala.',
    ceremonyCustomary: 'Rites Coutumiers (La Dot)',
    ceremonyReligious: 'Bénédiction Ecclésiastique',
    ceremonyDressCode: 'Protocole Code Vestimentaire',
    ceremonyMapBtn: 'Naviguer avec Google Maps',
    ceremonyTime: 'Heure',
    ceremonyVenue: 'Lieu',

    storeSubtitle: 'Liste de Mariage',
    storeTitle: 'Notre Boutique',
    storeHeadingDesc: 'Votre amour, votre présence et vos bénédictions sont les plus beaux cadeaux que nous puissions recevoir. Si vous souhaitez nous honorer avec un cadeau, nous avons sélectionné une collection d\'expériences et de nécessités pour notre nouveau foyer.',
    storeSecureBadge: 'Promesse de Cadeau Sécurisée & Envoi de Bénédictions Personnalisées',
    storeGiftedBy: 'Offert par',
    storeContributeBtn: 'Contribuer au Fonds',
    storeGiftBtn: 'Offrir cet Article',
    storeContributionFund: 'Cagnotte de Contribution',
    storeGifted: 'Offert',
    storeRaised: 'Collecté',
    storeGoal: 'Objectif',
    storeGiftPrice: 'Prix du Cadeau',
    storePromoHeading: 'Cartes de Bénédictions Numériques',
    storePromoDesc: 'Chaque article sélectionné dans notre boutique s\'accompagne d\'une carte de bénédiction personnalisée. Vous pouvez choisir le design de la carte (y compris le vert émeraude royal et or du Cameroun), écrire une prière et la voir publiée instantanément sur notre Livre d\'or.',
    storePromoNote: '*Toutes les contributions financières soutiennent directement notre voyage de noces à Kribi et l\'aménagement de notre premier foyer.',
    storePreviewTitle: 'Aperçu en Direct de Votre Carte',
    storePreviewDesc: '"Votre prière de mariage et vos félicitations chaleureuses s\'afficheront ici au fur et à mesure que vous tapez dans le formulaire..."',
    storePreviewSignature: 'Votre Signature',

    formTitle: 'Créateur de Carte & Cadeau',
    formLabelName: 'Votre Nom Complet *',
    formLabelEmail: 'Adresse Email *',
    formLabelRelationship: 'Lien avec Christian & Ornella',
    formLabelCardDesign: 'Choisir le Thème Design de la Carte',
    formLabelBlessing: 'Votre Bénédiction ou Prière de Mariage *',
    formPlaceholderBlessing: 'Écrivez vos prières, conseils ou félicitations chaleureuses pour Christian et Ornella à l\'occasion de cette union sacrée...',
    formBtnSubmit: 'Sceller la Carte & Offrir',
    formBtnSubmitActive: 'Validation de la carte...',
    formBtnCancel: 'Annuler',
    formSuccessTitle: 'Carte Scellée et Envoyée !',
    formSuccessDesc: 'Merci infiniment ! Votre promesse de cadeau et votre carte de bénédiction ont été enregistrées avec succès pour Christian & Ornella.',
    formReceiptTitle: 'RÉCAPITULATIF DE LA PROMESSE',
    formReceiptItem: 'Cadeau Choisi :',
    formReceiptPledgedBy: 'Offert Par :',
    formReceiptAmount: 'Montant Promis :',
    formReceiptNote: '*Un exemplaire élégant de votre carte sera imprimé pour être déposé dans l\'urne physique lors de la réception au Cameroun.',
    formReturnBtn: 'Retourner à la Boutique',
    formSecureNote: 'Ceci est une promesse de don basée sur l\'honneur. Aucune carte de crédit requise.',

    guestbookSubtitle: 'Livre d\'or',
    guestbookTitle: 'Prières & Bénédictions',
    guestbookHeadingDesc: 'Découvrez les messages chaleureux, les vœux de bonheur et les prières de nos familles et amis du Cameroun et du monde entier.',
    guestbookBtnWrite: 'Écrire un Message de Bénédiction',
    guestbookLabelRelationship: 'Votre Relation',
    guestbookLabelCardStyle: 'Choisir le Style de Carte',
    guestbookPlaceholderMessage: 'Écrivez vos prières, bénédictions ou conseils...',
    guestbookBtnPublish: 'Publier la Carte de Bénédiction',
    guestbookBtnPublishActive: 'Publication en cours...',
    guestbookCardTitle: 'Bénédiction de mariage',
    guestbookCardTimestamp: 'Date',
    guestbookCardGiftPledged: 'Cadeau Offert',
    guestbookCardFooterPrefix: 'Avec tout notre amour & nos prières,',

    faqSubtitle: 'Guide des Invités',
    faqTitle: 'Voyage & Questions',
    faqHeadingDesc: 'Vous préparez votre voyage à Yaoundé et Douala ? Nous avons rassemblé les conseils essentiels concernant le transport, le code vestimentaire, la liste de cadeaux et les cérémonies.',
    faqFlightTitle: 'Vols & Transports',
    faqFlightDesc: 'Pour le mariage coutumier traditionnel (Yaoundé), atterrissez à l\'aéroport international de Yaoundé Nsimalen (NSI). Pour le mariage blanc (Douala), atterrissez à Douala (DLA).',
    faqFlightAirportCode: 'Codes Aéroports : NSI, DLA',
    faqHotelTitle: 'Hôtels Partenaires',
    faqHotelDesc: 'Des tarifs de groupe préférentiels ont été négociés pour vous dans des hôtels premium de Yaoundé (proche Bastos) et de Douala.',
    faqHotelQuoteCode: 'Code de réservation : "C&O Wedding"',
    faqCultureTitle: 'Royauté Camerounaise',
    faqCultureDesc: 'Notre célébration coutumière met à l\'honneur la richesse culturelle de l\'Ouest et du Nord-Ouest. Portez fièrement le Toghu ou le Ndop traditionnel !',
    faqCultureQuoteCode: 'Portez-le avec fierté et joie !',

    rsvpSubtitle: 'Soyez Notre Invité',
    rsvpTitle: 'Confirmer Votre Présence',
    rsvpHeadingDesc: 'Merci de nous faire part de votre présence avant le 1er novembre 2026. Votre réponse nous permet d\'organiser les banquets gastronomiques et les plans de table à Yaoundé et Douala.',
    rsvpVenueDotation: 'La Villa de la Famille Mbanga • Quartier Bastos, Yaoundé, Cameroun',
    rsvpVenueWhite: 'Cathédrale Saint-Pierre-et-Saint-Paul & Crystal Palace, Douala, Cameroun',
    rsvpCoordinator: 'rsvp@christian-ornella.com • +237 6XX XX XX XX (WhatsApp)',
    rsvpRouteTitle: 'Liaison Yaoundé - Douala',
    rsvpRouteDesc: 'Un service de navettes privées sera mis en place pour les délégations familiales et les invités au départ de Yaoundé Bastos vers Douala après la dot coutumière.',
    rsvpRouteBadge: 'Ligne de Transit Union Cameroun',
    rsvpFormHeader: 'Enregistrer Votre Présence',
    rsvpFormSubheader: 'Aucun code d\'accès requis',
    rsvpFormPasses: 'Nombre de Places Souhaitées *',
    rsvpFormFood: 'Choix du Menu Gastronomique',
    rsvpFormNote: 'Petit mot ou vœu chaleureux (Optionnel)',
    rsvpConfirmBtn: 'Confirmer Ma Présence (RSVP)',
    rsvpConfirmBtnActive: 'Envoi en cours...',
    rsvpTicketHeader: 'Carte d\'Invitation Numérique',
    rsvpTicketTitle: 'UNION C & O 2026',
    rsvpTicketName: 'Nom de l\'Invité :',
    rsvpTicketPasses: 'Nombre de Places :',
    rsvpTicketFood: 'Menu Sélectionné :',
    rsvpTicketRegistered: 'Cérémonies Choisies :',
    rsvpTicketFooter: 'Veuillez présenter cette carte numérique ou votre coupon imprimé à l\'entrée des salles.',
    rsvpTicketTable: 'Votre Numéro de Table :',
    rsvpTicketTableNotAssigned: 'Table en cours d\'attribution (À valider à l\'accueil)',
    rsvpEditBtn: 'Modifier Ma Confirmation (RSVP)',

    footerDesc: 'Nous sommes infiniment bénis de vivre cette merveilleuse aventure réunissant nos familles à Yaoundé Bastos et Douala. Merci pour vos prières constantes, votre soutien précieux et vos bénédictions.',
    footerUpdates: 'Actualités du Mariage',
    footerUpdatesDesc: 'Abonnez-vous pour recevoir les horaires de transport, les codes promos hôtels et les liens de diffusion en direct pour notre famille à distance.',
    footerSubscribePlaceholder: 'Votre adresse email',
    footerErrorEmpty: 'Veuillez saisir votre adresse email.',
    footerErrorInvalid: 'Veuillez saisir une adresse email valide.',
    footerSuccessSub: 'Merci ! Vous êtes inscrit aux actualités du mariage.',
    footerCredits: 'Fait avec amour pour notre union au Cameroun',

    adminTitle: 'Tableau de Bord Coordinateur',
    adminSubtitle: 'Espace sécurisé pour gérer les confirmations RSVP, assigner les tables d\'invités et ajouter de nouveaux cadeaux.',
    adminBtnClose: 'Fermer le Panel',
    adminTabPledges: 'Commandes & Cadeaux',
    adminTabRsvps: 'RSVPs & Tables d\'Honneur',
    adminTabAddGift: 'Ajouter un Cadeau',
    adminNoPledges: 'Aucune commande ou don enregistré pour le moment.',
    adminNoRsvps: 'Aucune confirmation RSVP reçue pour le moment.',
    adminColGuest: 'Invité',
    adminColAttendance: 'Présence',
    adminColPasses: 'Places',
    adminColFood: 'Menu Sélectionné',
    adminColTable: 'Table Attribuée',
    adminTableAction: 'Attribuer la Table',
    adminTablePlaceholder: 'Ex: Table Sanaga, Table 3',
    adminAddTitle: 'Ajouter un Article à la Boutique',
    adminAddItemTitle: 'Nom de l\'Article *',
    adminAddItemCategory: 'Catégorie *',
    adminAddItemPrice: 'Coût Estimé (USD) *',
    adminAddItemDesc: 'Description Détaillée *',
    adminAddItemImage: 'Lien de l\'Image Illustration *',
    adminAddItemAllowCustom: 'Activer la contribution libre fractionnée (affiche une barre de progression)',
    adminAddItemBtn: 'Publier dans la Boutique',
    adminAddItemSuccess: 'Article ajouté avec succès à la boutique de cadeaux !',
    adminPledgeFund: 'Participation Cagnotte',
    adminPledgeReserved: 'Cadeau Réservé'
  }
};
