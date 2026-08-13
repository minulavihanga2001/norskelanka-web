import type { SiteData } from "@/lib/data/types";
import { destinationsSeed } from "@/lib/data/destinations";

const img = {
  sigiriya:
    "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1400&q=80",
  kandy:
    "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1400&q=80",
  ella: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80",
  galle:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80",
  yala: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=80",
  mirissa:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
  colombo:
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1400&q=80",
  anuradhapura:
    "https://images.unsplash.com/photo-1596402184320-417e7178b2ff?w=1400&q=80",
  nuwaraEliya:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
  trincomalee:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
  jaffna:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80",
  negombo:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1400&q=80",
  bentota:
    "https://images.unsplash.com/photo-1519046904884-4515b07c2bb4?w=1400&q=80",
  udawalawe:
    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1400&q=80",
  polonnaruwa:
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1400&q=80",
  arugamBay:
    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1400&q=80",
  dambulla:
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1400&q=80",
  haputale:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80",
  hotel1:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80",
  hotel2:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80",
  hotel3:
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80",
  hotel4:
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80",
  car: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1400&q=80",
  van: "https://images.unsplash.com/photo-1527786356703-4b100091cd2d?w=1400&q=80",
  driver:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  founder: "/images/founder-original.png",
  review1:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
  review2:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  review3:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  review4:
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  package1:
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1400&q=80",
  package2:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=80",
  package3:
    "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1400&q=80",
  blog1:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80",
  blog2:
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1400&q=80",
  blog3:
    "https://images.unsplash.com/photo-1488646953014-aaec0427e1f2?w=1400&q=80",
};

export const seedData: SiteData = {
  destinations: destinationsSeed,
  packages: [
    {
      id: "p1",
      slug: "cultural-triangle",
      title: {
        en: "Cultural Triangle Classic",
        no: "Klassisk kulturell trekant",
      },
      summary: {
        en: "8 days through Sigiriya, Anuradhapura, and Kandy with a private driver.",
        no: "8 dager gjennom Sigiriya, Anuradhapura og Kandy med privat sjåfør.",
      },
      description: {
        en: "A gentle introduction designed for Norwegian travellers: cooler highland evenings, unhurried temple visits, and boutique stays. Begin in Colombo, move north into the ancient cities of Anuradhapura and Sigiriya, then continue to Kandy for culture and lakeside calm — fully customisable with your private driver.",
        no: "En myk introduksjon for norske reisende: kjøligere kvelder i høylandet, rolige tempelbesøk og boutique-hoteller. Start i Colombo, dra nordover til de gamle byene Anuradhapura og Sigiriya, og fortsett til Kandy for kultur og ro ved innsjøen — fullt tilpassbart med din private sjåfør.",
      },
      image: img.package1,
      durationDays: 8,
      priceNok: 18900,
      inclusions: [
        {
          en: "Private air-conditioned vehicle & driver-guide",
          no: "Privat klimatisert bil og sjåførguide",
        },
        {
          en: "Handpicked hotels with breakfast",
          no: "Utvalgte hoteller med frokost",
        },
        {
          en: "Entrance fees for listed sites",
          no: "Inngangspenger til listede steder",
        },
        {
          en: "Airport pickup & drop-off",
          no: "Henting og levering på flyplassen",
        },
      ],
      itinerary: [
        {
          day: 1,
          title: { en: "Arrive Colombo", no: "Ankomst Colombo" },
          description: {
            en: "Meet your driver and transfer to a calm city or Negombo stay.",
            no: "Møt sjåføren og kjør til rolig by- eller Negombo-hotell.",
          },
        },
        {
          day: 2,
          title: { en: "Anuradhapura", no: "Anuradhapura" },
          description: {
            en: "Explore ancient stupas at a comfortable pace.",
            no: "Utforsk gamle stupaer i et behagelig tempo.",
          },
        },
        {
          day: 3,
          title: { en: "Sigiriya & village life", no: "Sigiriya og landsbyliv" },
          description: {
            en: "Lion Rock climb and optional village bike ride.",
            no: "Løverocken og valgfri landsbysykling.",
          },
        },
        {
          day: 4,
          title: { en: "Dambulla to Kandy", no: "Dambulla til Kandy" },
          description: {
            en: "Cave temple, spice garden stop, evening lake walk.",
            no: "Huletempel, krydderhage og kveldsvandring ved innsjøen.",
          },
        },
        {
          day: 5,
          title: { en: "Kandy culture", no: "Kultur i Kandy" },
          description: {
            en: "Temple of the Tooth and botanical gardens.",
            no: "Tannens tempel og botanisk hage.",
          },
        },
        {
          day: 6,
          title: { en: "Free day or Peradeniya", no: "Fri dag eller Peradeniya" },
          description: {
            en: "Rest or optional activities at your pace.",
            no: "Hvile eller valgfrie aktiviteter i ditt tempo.",
          },
        },
        {
          day: 7,
          title: { en: "Return west", no: "Retur vestover" },
          description: {
            en: "Scenic drive toward the west coast or Colombo.",
            no: "Scenic kjøretur mot vestkysten eller Colombo.",
          },
        },
        {
          day: 8,
          title: { en: "Departure", no: "Avreise" },
          description: {
            en: "Airport transfer with time buffer for European flights.",
            no: "Flyplasstransport med buffer for europeiske fly.",
          },
        },
      ],
      hotelIds: ["h1", "h2"],
      destinationIds: ["d7", "d8", "d1", "d2"],
      featured: true,
    },
    {
      id: "p2",
      slug: "beach-wildlife",
      title: {
        en: "Beach & Wildlife Escape",
        no: "Strand og dyreliv",
      },
      summary: {
        en: "10 days of Yala safari, Mirissa beaches, and Galle Fort.",
        no: "10 dager med Yala-safari, Mirissa-strender og Galle Fort.",
      },
      description: {
        en: "South-coast sunshine after wildlife mornings — ideal when you want both adventure and hammock time.",
        no: "Sol på sørkysten etter safarimorgener — ideelt når du vil ha både eventyr og hengekøye.",
      },
      image: img.package2,
      durationDays: 10,
      priceNok: 24500,
      inclusions: [
        {
          en: "Private new vehicle & driver",
          no: "Privat ny bil og sjåfør",
        },
        {
          en: "Shared jeep safari (Yala)",
          no: "Delt jeepsafari (Yala)",
        },
        {
          en: "Beach hotel nights with breakfast",
          no: "Strandhotell med frokost",
        },
        {
          en: "Galle Fort walking suggestions",
          no: "Forslag til spasertur i Galle Fort",
        },
      ],
      itinerary: [
        {
          day: 1,
          title: { en: "Arrival & southbound", no: "Ankomst og sørover" },
          description: {
            en: "Meet & drive toward the south coast.",
            no: "Møte og kjøring mot sørkysten.",
          },
        },
        {
          day: 2,
          title: { en: "Yala safari", no: "Yala-safari" },
          description: {
            en: "Early game drive; afternoon rest.",
            no: "Tidlig safarikjøring; hvile på ettermiddagen.",
          },
        },
        {
          day: 3,
          title: { en: "Yala to Mirissa", no: "Yala til Mirissa" },
          description: {
            en: "Coastal transfer and beach evening.",
            no: "Kystoverføring og strandkveld.",
          },
        },
        {
          day: 4,
          title: { en: "Mirissa free day", no: "Fri dag i Mirissa" },
          description: {
            en: "Optional whale watching in season.",
            no: "Valgfri hvalsafari i sesong.",
          },
        },
        {
          day: 5,
          title: { en: "Beach days", no: "Stranddager" },
          description: {
            en: "Swim, rest, local seafood.",
            no: "Bading, hvile, lokal sjømat.",
          },
        },
        {
          day: 6,
          title: { en: "Galle Fort", no: "Galle Fort" },
          description: {
            en: "Ramparts, cafés, boutique browsing.",
            no: "Voller, kafeer og boutique-shopping.",
          },
        },
        {
          day: 7,
          title: { en: "South coast leisure", no: "Sørkyst-fritid" },
          description: {
            en: "Flexible day — Unawatuna or fort stay.",
            no: "Fleksibel dag — Unawatuna eller fort-hotell.",
          },
        },
        {
          day: 8,
          title: { en: "Leisure / optional tours", no: "Fritid / valgfrie turer" },
          description: {
            en: "Cooking class or kayak option.",
            no: "Matlagingskurs eller kajakk.",
          },
        },
        {
          day: 9,
          title: { en: "Return to Colombo area", no: "Retur mot Colombo" },
          description: {
            en: "Easy drive with stopovers.",
            no: "Rolig kjøretur med stopp.",
          },
        },
        {
          day: 10,
          title: { en: "Departure", no: "Avreise" },
          description: {
            en: "Airport drop-off.",
            no: "Avlevering på flyplassen.",
          },
        },
      ],
      hotelIds: ["h3", "h4"],
      destinationIds: ["d4", "d5", "d6", "d7"],
      featured: true,
    },
    {
      id: "p3",
      slug: "ella-highlands",
      title: {
        en: "Ella Highlands & Tea Trails",
        no: "Ella høyland og testier",
      },
      summary: {
        en: "7 days of trains, tea country, and cool air for Nordic travellers.",
        no: "7 dager med tog, teområder og kjølig luft for nordiske reisende.",
      },
      description: {
        en: "Built for guests who love walking and scenery — Kandy to Ella by train, tea factory visits, and misty viewpoints.",
        no: "For gjester som liker gange og utsikt — Kandy til Ella med tog, tefabrikk og tåkete utsiktspunkter.",
      },
      image: img.package3,
      durationDays: 7,
      priceNok: 16500,
      inclusions: [
        {
          en: "Private vehicle where needed + train tickets assistance",
          no: "Privat bil der det trengs + hjelp med togbilletter",
        },
        {
          en: "Tea country hotel nights",
          no: "Hotellnetter i teområdet",
        },
        {
          en: "Breakfast daily",
          no: "Frokost hver dag",
        },
        {
          en: "Guided walking suggestions",
          no: "Forslag til guidede turer",
        },
      ],
      itinerary: [
        {
          day: 1,
          title: { en: "To Kandy", no: "Til Kandy" },
          description: {
            en: "Scenic drive into the hills.",
            no: "Scenic kjøretur opp i åsene.",
          },
        },
        {
          day: 2,
          title: { en: "Kandy highlights", no: "Høydepunkter i Kandy" },
          description: {
            en: "Temple visit and lakeside evening.",
            no: "Tempelbesøk og kveld ved innsjøen.",
          },
        },
        {
          day: 3,
          title: { en: "Train to Ella", no: "Tog til Ella" },
          description: {
            en: "One of the world’s most beautiful rail journeys.",
            no: "En av verdens vakreste togturer.",
          },
        },
        {
          day: 4,
          title: { en: "Ella peaks", no: "Topper i Ella" },
          description: {
            en: "Little Adam’s Peak and Nine Arch Bridge.",
            no: "Little Adam’s Peak og Nine Arch Bridge.",
          },
        },
        {
          day: 5,
          title: { en: "Tea trails", no: "Testier" },
          description: {
            en: "Factory tour and plantation walk.",
            no: "Fabrikktur og plantasjetur.",
          },
        },
        {
          day: 6,
          title: { en: "Flexible highland day", no: "Fleksibel høylandsdag" },
          description: {
            en: "Rest or optional waterfall visit.",
            no: "Hvile eller valgfritt fossefall.",
          },
        },
        {
          day: 7,
          title: { en: "Descent & departure setup", no: "Ned og avreiseklar" },
          description: {
            en: "Drive toward Colombo / airport timing.",
            no: "Kjøring mot Colombo / flyplasstid.",
          },
        },
      ],
      hotelIds: ["h2", "h1"],
      destinationIds: ["d2", "d3", "d7"],
      featured: true,
    },
  ],
  hotels: [
    {
      id: "h1",
      slug: "sigiriya-garden-lodge",
      name: {
        en: "Sigiriya Garden Lodge",
        no: "Sigiriya Garden Lodge",
      },
      location: { en: "Sigiriya", no: "Sigiriya" },
      summary: {
        en: "Quiet rooms with rock views and pool evenings.",
        no: "Rolige rom med fjellutsikt og bassengkvelder.",
      },
      image: img.hotel1,
      discountPercent: 12,
      packageIds: ["p1", "p3"],
      stars: 4,
    },
    {
      id: "h2",
      slug: "kandy-lake-house",
      name: { en: "Kandy Lake House", no: "Kandy Lake House" },
      location: { en: "Kandy", no: "Kandy" },
      summary: {
        en: "Boutique stay steps from the lake promenade.",
        no: "Boutique-hotell nær innsjøpromenaden.",
      },
      image: img.hotel2,
      discountPercent: 10,
      packageIds: ["p1", "p3"],
      stars: 4,
    },
    {
      id: "h3",
      slug: "mirissa-palm-retreat",
      name: {
        en: "Mirissa Palm Retreat",
        no: "Mirissa Palm Retreat",
      },
      location: { en: "Mirissa", no: "Mirissa" },
      summary: {
        en: "Beachfront calm with Norwegian-friendly breakfast hours.",
        no: "Strandnær ro med frokosttider som passer nordmenn.",
      },
      image: img.hotel3,
      discountPercent: 15,
      packageIds: ["p2"],
      stars: 4,
    },
    {
      id: "h4",
      slug: "galle-fort-chambers",
      name: {
        en: "Galle Fort Chambers",
        no: "Galle Fort Chambers",
      },
      location: { en: "Galle Fort", no: "Galle Fort" },
      summary: {
        en: "Heritage rooms inside the fort walls.",
        no: "Historiske rom innenfor festningsmurene.",
      },
      image: img.hotel4,
      discountPercent: 8,
      packageIds: ["p2"],
      stars: 5,
    },
  ],
  blogs: [
    {
      id: "b1",
      slug: "eta-visa-update-norwegians",
      title: {
        en: "ETA / visa update for Norwegian travellers",
        no: "ETA / visum-oppdatering for norske reisende",
      },
      excerpt: {
        en: "Important notice on electronic travel authorisation before you fly.",
        no: "Viktig melding om elektronisk reisetillatelse før du flyr.",
      },
      content: {
        en: `## Please read before booking flights

Norwegian passport holders typically need an **Electronic Travel Authorisation (ETA)** before arrival in Sri Lanka.

### Checklist
- Apply online ahead of travel
- Keep a digital and printed copy
- Check passport validity (usually 6 months)

> This is a general guide — always verify on official government sources before you travel.

We are happy to walk you through the steps during your planning call.`,
        no: `## Les før du bestiller fly

Norske passinnehavere trenger vanligvis en **elektronisk reisetillatelse (ETA)** før ankomst til Sri Lanka.

### Sjekkliste
- Søk online i god tid
- Ta vare på digital og utskrevet kopi
- Sjekk passets gyldighet (ofte 6 måneder)

> Dette er en generell veiledning — verifiser alltid på offisielle kilder før reisen.

Vi hjelper deg gjerne gjennom stegene i planleggingssamtalen.`,
      },
      image: img.blog1,
      kind: "notice",
      publishedAt: "2026-07-15",
      author: "Norske Lanka Travels",
    },
    {
      id: "b2",
      slug: "best-time-from-norway",
      title: {
        en: "Best time to visit Sri Lanka from Norway",
        no: "Beste tid å besøke Sri Lanka fra Norge",
      },
      excerpt: {
        en: "How seasons work on the island — and when Oslo winters make the trip especially sweet.",
        no: "Hvordan sesongene fungerer på øya — og når Oslo-vinteren gjør turen ekstra fin.",
      },
      content: {
        en: `## Two monsoons, many good windows

Sri Lanka has regional seasons. For many Norwegian guests:

- **December–March**: excellent for the west & south coasts
- **May–September**: often better for the east coast
- **Hill country**: pleasant most of the year

### Tip for Nordic travellers
If you crave daylight and warmth mid-winter, January–February is a classic window — book trains and popular lodges early.`,
        no: `## To monsuner, mange gode perioder

Sri Lanka har regionale sesonger. For mange norske gjester:

- **Desember–mars**: flott for vest- og sørkysten
- **Mai–september**: ofte bedre for østkysten
- **Høylandet**: behagelig det meste av året

### Tips for nordiske reisende
Vil du ha dagslys og varme midtvinters, er januar–februar et klassisk vindu — book tog og populære hoteller tidlig.`,
      },
      image: img.blog2,
      kind: "blog",
      publishedAt: "2026-06-02",
      author: "Norske Lanka Travels",
    },
    {
      id: "b3",
      slug: "packing-list-norwegian-guests",
      title: {
        en: "Packing list for Norwegian guests",
        no: "Pakkeliste for norske gjester",
      },
      excerpt: {
        en: "Light layers, temple-ready clothing, and what to leave at home.",
        no: "Lette lag, tempelklare klær og hva du kan la ligge hjemme.",
      },
      content: {
        en: `## Pack light, pack smart

- Breathable shirts and one light jacket for the hills
- Modest clothing for temples (shoulders & knees)
- Reef-safe sunscreen and a reusable water bottle
- Power adapter (Type D/G commonly used)

Skip bulky winter gear after you leave Norway — your driver will have AC for long days on the road.`,
        no: `## Pakk lett og smart

- Luftige skjorter og en lett jakke til høylandet
- Beskjedne klær til templer (skuldre og knær)
- Reef-safe solkrem og gjenbrukbar vannflaske
- Strømadapter (type D/G vanlig)

La tungt vintertøy bli i Norge — sjåføren har AC på lange kjøredager.`,
      },
      image: img.blog3,
      kind: "blog",
      publishedAt: "2026-05-20",
      author: "Norske Lanka Travels",
    },
    {
      id: "b4",
      slug: "festival-period-traffic",
      title: {
        en: "Announcement: festival period traffic",
        no: "Kunngjøring: trafikk i festivalperioden",
      },
      excerpt: {
        en: "We may adjust driving times around major poya and festival days.",
        no: "Vi kan justere kjøretider rundt store poya- og festivaldager.",
      },
      content: {
        en: `## Heads up for peak festival weeks

During major holidays, some roads and sites are busier. We plan buffer time so your experience stays calm.

Contact us if your dates overlap a festival — we will redesign the day plan.`,
        no: `## Tips for travle festivaluker

Under store helligdager er noen veier og steder mer travle. Vi planlegger buffertid slik at opplevelsen forblir rolig.

Kontakt oss hvis datoene dine overlapper en festival — vi tilpasser dagsplanen.`,
      },
      image: img.blog1,
      kind: "announcement",
      publishedAt: "2026-07-28",
      author: "Norske Lanka Travels",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: {
        en: "Do I pay online on this website?",
        no: "Betaler jeg online på denne nettsiden?",
      },
      answer: {
        en: "Not in this phase. Browse packages and request customisation — we confirm details and payment personally.",
        no: "Ikke i denne fasen. Se pakker og be om tilpasning — vi bekrefter detaljer og betaling personlig.",
      },
      order: 1,
    },
    {
      id: "f2",
      question: {
        en: "Is the trip private for my family?",
        no: "Er turen privat for familien min?",
      },
      answer: {
        en: "Yes. Our standard style is private vehicle and driver, tailored to your pace — popular with Norwegian families and couples.",
        no: "Ja. Standard er privat bil og sjåfør, tilpasset ditt tempo — populært blant norske familier og par.",
      },
      order: 2,
    },
    {
      id: "f3",
      question: {
        en: "Can you help with ETA / visa questions?",
        no: "Kan dere hjelpe med ETA / visum?",
      },
      answer: {
        en: "We guide you through the usual steps and point to official sources. We do not replace government portals.",
        no: "Vi guider deg gjennom vanlige steg og peker til offisielle kilder. Vi erstatter ikke offentlige portaler.",
      },
      order: 3,
    },
    {
      id: "f4",
      question: {
        en: "What language do you speak?",
        no: "Hvilke språk snakker dere?",
      },
      answer: {
        en: "English comfortably, with Norwegian website content. Drivers speak English; we keep communication clear for Nordic guests.",
        no: "Engelsk flytende, med norsk nettsideinnhold. Sjåfører snakker engelsk; vi holder kommunikasjonen tydelig for nordiske gjester.",
      },
      order: 4,
    },
    {
      id: "f5",
      question: {
        en: "Are vehicles new?",
        no: "Er bilene nye?",
      },
      answer: {
        en: "We emphasise newer, well-maintained vehicles with professional, friendly drivers — comfort matters on long scenic days.",
        no: "Vi vektlegger nyere, velholdte biler med profesjonelle, vennlige sjåfører — komfort betyr mye på lange scenic dager.",
      },
      order: 5,
    },
  ],
  reviews: [
    {
      id: "r1",
      name: "Ingrid & Lars",
      country: { en: "Norway", no: "Norge" },
      date: "2026-03-12",
      rating: 5,
      text: {
        en: "From Bergen winters to Yala sunrise — seamless planning and a wonderful driver. Felt safe the entire time.",
        no: "Fra Bergensvinter til soloppgang i Yala — sømløs planlegging og en fantastisk sjåfør. Føltes trygt hele veien.",
      },
      image: img.review1,
    },
    {
      id: "r2",
      name: "Marte H.",
      country: { en: "Oslo, Norway", no: "Oslo, Norge" },
      date: "2026-01-20",
      rating: 5,
      text: {
        en: "The Ella train day was the highlight. Hotels matched what we care about — clean, calm, not overcrowded.",
        no: "Togdagen til Ella var høydepunktet. Hotellene traff det vi bryr oss om — rene, rolige, ikke overfylte.",
      },
      image: img.review2,
    },
    {
      id: "r3",
      name: "Erik N.",
      country: { en: "Trondheim, Norway", no: "Trondheim, Norge" },
      date: "2025-12-05",
      rating: 5,
      text: {
        en: "Clear communication before we left Norway. Customised the cultural triangle so our kids could keep up.",
        no: "Tydelig kommunikasjon før vi dro fra Norge. Tilpasset den kulturelle trekanten slik at barna hang med.",
      },
      image: img.review3,
    },
    {
      id: "r4",
      name: "Sofie & Anders",
      country: { en: "Norway", no: "Norge" },
      date: "2025-11-18",
      rating: 5,
      text: {
        en: "Galle Fort evenings and Mirissa swims — exactly the reset we needed. Will return for the east coast.",
        no: "Kvelder i Galle Fort og bad i Mirissa — akkurat pausen vi trengte. Kommer tilbake for østkysten.",
      },
      image: img.review4,
    },
  ],
  vehicles: [
    {
      id: "v1",
      name: { en: "Toyota Premio", no: "Toyota Premio" },
      summary: {
        en: "Comfortable sedan for couples and small families — AC, spacious boot.",
        no: "Komfortabel sedan for par og små familier — AC, romslig bagasjerom.",
      },
      image: img.car,
      seats: 3,
      year: 2023,
    },
    {
      id: "v2",
      name: { en: "Toyota KDH Van", no: "Toyota KDH-van" },
      summary: {
        en: "Ideal for families and groups who want space for luggage and stretch room.",
        no: "Ideell for familier og grupper som vil ha plass til bagasje og strekkbein.",
      },
      image: img.van,
      seats: 6,
      year: 2024,
    },
  ],
  drivers: [
    {
      id: "dr1",
      name: "Chaminda",
      bio: {
        en: "Soft-spoken, punctual, and great with Norwegian families — 12 years on the road across the island.",
        no: "Rolig, punktlig og flink med norske familier — 12 år på veien rundt øya.",
      },
      image: img.driver,
      languages: ["English", "Sinhala"],
      yearsExperience: 12,
      reviews: [
        {
          id: "dr1r1",
          author: "Ingrid",
          text: {
            en: "Patient with our questions and always had cold water ready.",
            no: "Tålmodig med spørsmålene våre og hadde alltid kaldt vann klart.",
          },
          rating: 5,
        },
        {
          id: "dr1r2",
          author: "Erik",
          text: {
            en: "Safe driving on mountain roads — we felt looked after.",
            no: "Trygg kjøring i fjellveiene — vi følte oss ivaretatt.",
          },
          rating: 5,
        },
      ],
    },
    {
      id: "dr2",
      name: "Nimal",
      bio: {
        en: "Wildlife-savvy driver who knows the best safari timing and quiet beach cafés.",
        no: "Dyrelivskyndig sjåfør som kjenner beste safaritid og rolige strandkafeer.",
      },
      image: img.driver,
      languages: ["English", "Sinhala", "Basic German"],
      yearsExperience: 9,
      reviews: [
        {
          id: "dr2r1",
          author: "Marte",
          text: {
            en: "Suggested a sunset spot in Galle we would have missed.",
            no: "Foreslo et solnedgangssted i Galle vi ellers hadde misset.",
          },
          rating: 5,
        },
      ],
    },
  ],
  contacts: [],
};

export const founder = {
  name: "Mala Bhai",
  photo: img.founder,
  role: {
    en: "Founder, Norske Lanka Travels",
    no: "Grunnlegger, Norske Lanka Travels",
  },
  message: {
    en: "I built this small agency so guests from Norway can experience Sri Lanka the way I love it — unhurried, honest, and personally guided. When you write to us, it is me (and my trusted drivers) who answer.",
    no: "Jeg bygde dette lille byrået slik at gjester fra Norge kan oppleve Sri Lanka slik jeg elsker det — uten hast, ærlig og personlig. Når du skriver til oss, er det jeg (og mine pålitelige sjåfører) som svarer.",
  },
  story: {
    en: "Norske Lanka Travels is a sole proprietorship based in Sri Lanka, focused on travellers from Norway who want a warm island escape with clear communication and local care. We are not a global call centre — we are a personal bridge between Nordic travellers and the island we call home.",
    no: "Norske Lanka Travels er et enkeltmannsforetak i Sri Lanka, rettet mot reisende fra Norge som vil ha en varm øyeferie med tydelig kommunikasjon og lokal omsorg. Vi er ikke et globalt call-senter — vi er en personlig bro mellom nordiske reisende og øya vi kaller hjem.",
  },
};

export const socialLinks = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  email: "hello@norskelankatravels.no",
  phone: "+94 77 000 0000",
  whatsapp: "https://wa.me/94770000000",
};

export const entryRequirements = {
  title: {
    en: "Entry rules for Sri Lanka",
    no: "Innreiseregler for Sri Lanka",
  },
  sections: [
    {
      title: { en: "Visa / ETA", no: "Visum / ETA" },
      body: {
        en: "Most Norwegian travellers need an Electronic Travel Authorisation before arrival. Apply via the official portal and carry confirmation.",
        no: "De fleste norske reisende trenger elektronisk reisetillatelse før ankomst. Søk via den offisielle portalen og ta med bekreftelse.",
      },
    },
    {
      title: { en: "Passport", no: "Pass" },
      body: {
        en: "Passport should typically be valid for at least six months from your date of entry. Check current rules before you fly.",
        no: "Passet bør vanligvis være gyldig i minst seks måneder fra innreisedato. Sjekk gjeldende regler før du flyr.",
      },
    },
    {
      title: { en: "Customs", no: "Toll" },
      body: {
        en: "Declare restricted items as required. Keep receipts for valuables. Respect limits on alcohol and tobacco.",
        no: "Deklarer begrensede varer etter krav. Ta vare på kvitteringer for verdisaker. Respekter grenser for alkohol og tobakk.",
      },
    },
    {
      title: { en: "Health", no: "Helse" },
      body: {
        en: "No special vaccines are universally required for all travellers, but check recommendations with your Norwegian GP for your itinerary (e.g. rural or wildlife areas).",
        no: "Ingen spesielle vaksiner er universelt påkrevd for alle, men sjekk anbefalinger med fastlegen for din reiserute (f.eks. landlige eller dyrelivsområder).",
      },
    },
    {
      title: { en: "Travel insurance", no: "Reiseforsikring" },
      body: {
        en: "We strongly recommend comprehensive travel insurance from Norway covering medical care and trip changes.",
        no: "Vi anbefaler sterkt omfattende reiseforsikring fra Norge som dekker medisinsk hjelp og endringer.",
      },
    },
  ],
};
