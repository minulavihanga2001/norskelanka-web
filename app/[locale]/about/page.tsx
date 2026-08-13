import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { founder } from "@/lib/data/seed";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/locale";

const aboutIntro = {
  en: "Norske Lanka Travels was founded to bridge Norway and Sri Lanka — safe, authentic, thoughtfully paced journeys on one of the world’s most beautiful islands. From first message to airport farewell, we keep communication clear, plans honest, and the experience warm.",
  no: "Norske Lanka Travels ble startet for å bygge bro mellom Norge og Sri Lanka — trygge, autentiske og gjennomtenkte reiser på en av verdens vakreste øyer. Fra første melding til avskjed på flyplassen holder vi kommunikasjonen tydelig, planene ærlige og opplevelsen varm.",
};

const aboutIntroExtra = {
  en: "Whether you want tea country mornings, wildlife safaris, southern beaches, or a quiet cultural circuit, we tailor the trip around your dates, pace, and interests — with local drivers and partners we trust.",
  no: "Enten du ønsker morgener i teområdene, dyresafari, strender i sør eller en rolig kulturreise, tilpasser vi turen etter datoene, tempoet og interessene dine — med lokale sjåfører og partnere vi stoler på.",
};

const mission = {
  title: { en: "Our mission", no: "Vårt oppdrag" },
  text: {
    en: "To make Sri Lanka feel easy and personal for Norwegian and Nordic travellers — with honest advice, carefully chosen stays, reliable transport, and a local host who answers when you need them.",
    no: "Å gjøre Sri Lanka enkelt og personlig for norske og nordiske reisende — med ærlige råd, nøye valgte overnattinger, pålitelig transport og en lokal vert som svarer når du trenger det.",
  },
};

const vision = {
  title: { en: "Our vision", no: "Vår visjon" },
  text: {
    en: "To be the trusted Norway–Sri Lanka travel bridge: small enough to care personally, skilled enough to craft journeys that feel unhurried, authentic, and memorable.",
    no: "Å være den pålitelige broen mellom Norge og Sri Lanka: liten nok til å bry oss personlig, dyktig nok til å skape reiser som føles rolige, autentiske og minneverdige.",
  },
};

const values = [
  {
    title: { en: "Norway-minded planning", no: "Planlagt for norske reisende" },
    text: {
      en: "Clear communication, comfortable pacing, and itineraries that match how Nordic travellers like to explore.",
      no: "Tydelig kommunikasjon, behagelig tempo og reiseruter som passer hvordan nordiske reisende liker å utforske.",
    },
  },
  {
    title: { en: "Local Sri Lanka expertise", no: "Lokal Sri Lanka-kunnskap" },
    text: {
      en: "We live here — temples, tea country, wildlife, and beaches planned with honesty and care.",
      no: "Vi bor her — templer, teområder, dyreliv og strender planlagt med ærlighet og omtanke.",
    },
  },
  {
    title: { en: "Personal, not corporate", no: "Personlig, ikke korporativt" },
    text: {
      en: "A sole proprietorship — when you write to us, a real local team answers and stays with your trip.",
      no: "Et enkeltmannsforetak — når du skriver til oss, svarer et ekte lokalt team og følger reisen din.",
    },
  },
];

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      {/* Intro */}
      <Section
        title={dict.nav.about}
        subtitle={
          raw === "no"
            ? "Vår historie, vårt oppdrag og menneskene bak reisen."
            : "Our story, our mission, and the people behind your journey."
        }
      >
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <img
            src="/images/logo-full.png"
            alt={dict.brand}
            className="mx-auto h-40 w-auto object-contain sm:h-48 lg:mx-0 lg:h-52"
          />
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Norway → Sri Lanka
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
              {raw === "no"
                ? "Et personlig reisebyrå for nordiske gjester"
                : "A personal travel agency for Nordic guests"}
            </h2>
            <p className="text-base leading-[1.85] text-ink-muted md:text-lg">
              {t(aboutIntro, raw)}
            </p>
            <p className="text-base leading-[1.85] text-ink-muted md:text-lg">
              {t(aboutIntroExtra, raw)}
            </p>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section
        title={raw === "no" ? "Oppdrag & visjon" : "Mission & vision"}
        subtitle={
          raw === "no"
            ? "Det som styrer hvordan vi planlegger hver reise."
            : "What guides how we plan every journey."
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-[#E8F5E9] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t(mission.title, raw)}
            </p>
            <p className="mt-4 text-base leading-[1.85] text-ink md:text-lg">
              {t(mission.text, raw)}
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t(vision.title, raw)}
            </p>
            <p className="mt-4 text-base leading-[1.85] text-ink md:text-lg">
              {t(vision.text, raw)}
            </p>
          </div>
        </div>
      </Section>

      {/* Story */}
      <Section
        title={raw === "no" ? "Vår historie" : "Our story"}
        subtitle={
          raw === "no"
            ? "Hvorfor vi finnes — og hvordan vi jobber."
            : "Why we exist — and how we work."
        }
      >
        <div className="max-w-3xl space-y-4 text-base leading-[1.85] text-ink-muted md:text-lg">
          <p>{t(founder.story, raw)}</p>
          <p>
            {raw === "no"
              ? "Vi fokuserer på gjester fra Norge som vil ha en varm øyeferie uten stress: tydelige priser, realistiske kjøretider, og tips som bare en lokal vert kan gi — fra beste sesong til små steder som ikke står i guidebøkene."
              : "We focus on guests from Norway who want a warm island holiday without stress: clear pricing, realistic drive times, and tips only a local host can give — from the best season to small places that never make the guidebooks."}
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section
        title={raw === "no" ? "Det vi står for" : "What we stand for"}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title.en}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-xl text-ink">{t(value.title, raw)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {t(value.text, raw)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Founder */}
      <Section title={raw === "no" ? "Møt grunnleggeren" : "Meet the founder"}>
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <img
              src={founder.photo}
              alt={founder.name}
              className="aspect-[3/4] h-auto w-full object-cover object-top md:min-h-[440px]"
            />
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t(founder.role, raw)}
              </p>
              <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                {founder.name}
              </h3>
              <p className="mt-4 text-base leading-[1.85] text-ink-muted md:text-lg">
                {raw === "no"
                  ? "Bak byrået står en lokal vert som planlegger, svarer og følger reisen din personlig — sammen med pålitelige sjåfører på stedet. Fra første melding hjelper Malsha med tempo, overnatting og realistiske kjøretider, slik at norskegjester kan oppleve Sri Lanka rolig, trygt og med ekte lokal omsorg — ikke gjennom et call-senter, men gjennom noen som bor her og kjenner øya."
                  : "Behind the agency is a local host who plans, answers, and stays with your trip personally — together with trusted drivers on the ground. From the first message, Malsha helps shape pace, stays, and realistic drive times so guests from Norway can experience Sri Lanka calmly, safely, and with genuine local care — not through a call centre, but through someone who lives here and knows the island."}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-primary/10 bg-[#E8F5E9] p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {dict.sections.founderMessage}
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-ink md:text-2xl">
                &ldquo;{t(founder.message, raw)}&rdquo;
              </p>
            </div>
            {/* <Button href={`/${raw}/contact`}>{dict.nav.getQuote}</Button> */}
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section>
        <div className="rounded-[1.5rem] border border-black/5 bg-white px-6 py-10 text-center shadow-sm md:px-10">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            {raw === "no" ? "Klar for Sri Lanka?" : "Ready for Sri Lanka?"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            {raw === "no"
              ? "Fortell oss om datoer, reisestil og ønsker — så lager vi en personlig plan sammen."
              : "Tell us your dates, travel style, and wishes — and we’ll shape a personal plan together."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={`/${raw}/contact`}>{dict.nav.getQuote}</Button>
            <Button href={`/${raw}/packages`} variant="secondary">
              {dict.nav.packages}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
