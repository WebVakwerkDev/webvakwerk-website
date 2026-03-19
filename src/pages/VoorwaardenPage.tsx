import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "1. Definities",
    paragraphs: [
      "In deze algemene voorwaarden betekent opdrachtnemer: Webvakwerk, gevestigd in Nederland.",
      "Opdrachtgever: iedere natuurlijke persoon of rechtspersoon die een opdracht verstrekt voor digitale diensten.",
      "Diensten: alle werkzaamheden van opdrachtnemer, waaronder webdevelopment, ontwerp, optimalisatie, onderhoud, support en hosting (indien afgesproken).",
      "Overeenkomst: elke afspraak tussen opdrachtnemer en opdrachtgever, inclusief offerte, bevestiging per e-mail of ondertekende opdracht.",
    ],
  },
  {
    title: "2. Toepasselijkheid",
    paragraphs: [
      "Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van opdrachtnemer.",
      "Afwijkingen gelden alleen als deze schriftelijk zijn bevestigd door opdrachtnemer.",
      "Algemene voorwaarden van opdrachtgever zijn niet van toepassing, tenzij opdrachtnemer deze uitdrukkelijk schriftelijk accepteert.",
    ],
  },
  {
    title: "3. Diensten",
    paragraphs: [
      "Opdrachtnemer levert diensten op het gebied van websites bouwen, aanpassen en onderhouden, en eventueel hosting of technisch beheer.",
      "Alle werkzaamheden worden uitgevoerd op basis van de overeengekomen scope, planning en prioriteiten.",
      "Opdrachtnemer geeft geen garantie op specifieke commerciële resultaten, zoals omzetgroei, vindbaarheid of conversies, tenzij schriftelijk anders is afgesproken.",
    ],
  },
  {
    title: "4. Offertes en overeenkomsten",
    paragraphs: [
      "Offertes zijn vrijblijvend en geldig gedurende 14 dagen, tenzij in de offerte een andere termijn staat.",
      "Een overeenkomst komt tot stand zodra opdrachtgever schriftelijk akkoord geeft op een offerte of opdrachtbevestiging, of zodra opdrachtnemer start met de uitvoering op verzoek van opdrachtgever.",
      "Kennelijke fouten of verschrijvingen in offertes of communicatie binden opdrachtnemer niet.",
    ],
  },
  {
    title: "5. Uitvoering van de opdracht",
    paragraphs: [
      "Opdrachtnemer voert de opdracht uit naar beste inzicht, deskundigheid en vermogen.",
      "Er geldt een inspanningsverplichting en geen resultaatsverplichting, tenzij uitdrukkelijk en schriftelijk anders overeengekomen.",
      "Opdrachtnemer mag werkzaamheden (deels) laten uitvoeren door derden wanneer dit nodig is voor een goede uitvoering van de opdracht.",
    ],
  },
  {
    title: "6. Verplichtingen van de opdrachtgever",
    paragraphs: [
      "Opdrachtgever levert tijdig alle informatie, teksten, beelden, inloggegevens en andere input die nodig is om de opdracht uit te voeren.",
      "Opdrachtgever staat in voor de juistheid, volledigheid en rechtmatigheid van aangeleverde materialen.",
      "Opdrachtgever geeft feedback en goedkeuringen binnen een redelijke termijn, tenzij anders afgesproken.",
    ],
    bullets: [
      "Als input, feedback of goedkeuring uitblijft, mag opdrachtnemer de planning opschuiven.",
      "Ontstane wachttijd of extra werk door vertraging aan klantzijde kan als meerwerk worden doorbelast.",
    ],
  },
  {
    title: "7. Oplevering en revisies",
    paragraphs: [
      "Een website of onderdeel geldt als opgeleverd zodra opdrachtnemer dit als gereed heeft gemeld en opdrachtgever de gelegenheid heeft gehad om te controleren.",
      "Bij websitepakketten zijn maximaal 3 feedbackrondes inbegrepen, tenzij schriftelijk een ander aantal is afgesproken.",
      "Na deze inbegrepen feedbackrondes worden extra aanpassingen uitgevoerd als meerwerk tegen een vast tarief van EUR 100 per extra feedbackronde.",
      "Wijzigingen buiten de afgesproken scope gelden altijd als meerwerk.",
    ],
    bullets: [
      "Wanneer opdrachtgever binnen 7 dagen na oplevering geen inhoudelijke feedback geeft, mag opdrachtnemer de oplevering als geaccepteerd beschouwen.",
      "Opdrachtnemer is niet verplicht om onbeperkt te blijven aanpassen binnen een vaste pakketprijs.",
      "Technische of inhoudelijke wijzigingen na acceptatie worden uitgevoerd als nieuwe opdracht of onderhoudswerk.",
    ],
  },
  {
    title: "8. Betaling",
    paragraphs: [
      "Facturen hebben een betalingstermijn van 14 dagen na factuurdatum, tenzij schriftelijk anders overeengekomen.",
      "Opdrachtnemer mag een aanbetaling vragen, bijvoorbeeld 50% bij start en 50% bij oplevering.",
      "Bij overschrijding van de betalingstermijn is opdrachtgever van rechtswege in verzuim.",
    ],
    bullets: [
      "Vanaf de vervaldatum is wettelijke handelsrente verschuldigd (of wettelijke rente bij consumenten).",
      "Redelijke incassokosten en buitengerechtelijke kosten komen voor rekening van opdrachtgever.",
      "Opdrachtnemer mag werkzaamheden opschorten totdat openstaande bedragen zijn voldaan.",
    ],
  },
  {
    title: "9. Aansprakelijkheid",
    paragraphs: [
      "De totale aansprakelijkheid van opdrachtnemer is beperkt tot het bedrag dat opdrachtgever voor de betreffende opdracht heeft betaald in de 3 maanden voorafgaand aan de schadeveroorzakende gebeurtenis, met een maximum van het factuurbedrag van de betreffende opdracht.",
      "Opdrachtnemer is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste besparingen, reputatieschade, verlies van data of bedrijfsstagnatie.",
      "Opdrachtnemer is niet aansprakelijk voor schade die ontstaat door onjuiste of onvolledige informatie van opdrachtgever, handelen van derden of storingen buiten de invloedssfeer van opdrachtnemer.",
    ],
  },
  {
    title: "10. Hosting en onderhoud (indien van toepassing)",
    paragraphs: [
      "Alleen wanneer expliciet afgesproken, levert opdrachtnemer hosting, updates, monitoring of onderhoud.",
      "Tenzij anders overeengekomen vallen inhoudelijke wijzigingen, nieuwe functionaliteiten en externe licentiekosten niet onder standaard onderhoud.",
      "Opdrachtnemer streeft naar stabiele beschikbaarheid maar geeft geen garantie op 100% uptime of ononderbroken bereikbaarheid.",
    ],
    bullets: [
      "Onderhoud en updates worden uitgevoerd binnen redelijke termijnen en prioriteiten.",
      "Opdrachtgever blijft verantwoordelijk voor tijdige betaling van domein-, hosting- en licentiekosten, tenzij schriftelijk anders afgesproken.",
    ],
  },
  {
    title: "11. Intellectueel eigendom",
    paragraphs: [
      "Alle rechten op door opdrachtnemer gemaakte concepten, ontwerpen, code en documentatie blijven bij opdrachtnemer totdat opdrachtgever alle openstaande facturen volledig heeft betaald.",
      "Na volledige betaling krijgt opdrachtgever een gebruiksrecht op het opgeleverde werk voor het afgesproken doel.",
      "Opdrachtnemer mag gebruikmaken van bestaande frameworks, templates, libraries en tools van derden. De rechten daarop blijven bij de betreffende rechthebbenden.",
      "Opdrachtgever garandeert dat aangeleverde teksten, afbeeldingen en andere materialen geen inbreuk maken op rechten van derden.",
    ],
  },
  {
    title: "12. Beëindiging",
    paragraphs: [
      "Beide partijen kunnen de overeenkomst schriftelijk beëindigen wanneer de andere partij wezenlijk tekortschiet en, na een redelijke hersteltermijn, niet alsnog nakomt.",
      "Bij voortijdige beëindiging door opdrachtgever heeft opdrachtnemer recht op vergoeding van reeds uitgevoerde werkzaamheden, gemaakte kosten en gereserveerde capaciteit.",
      "Reeds gefactureerde bedragen blijven verschuldigd.",
    ],
  },
  {
    title: "13. Overmacht",
    paragraphs: [
      "Onder overmacht wordt verstaan: iedere omstandigheid buiten de redelijke controle van opdrachtnemer, zoals storingen bij hostingproviders, internetuitval, stroomuitval, ziekte, overheidsmaatregelen, cyberincidenten of uitval van toeleveranciers.",
      "Tijdens overmacht worden verplichtingen van opdrachtnemer opgeschort.",
      "Als de overmachtsituatie langer dan 60 dagen duurt, mogen beide partijen de overeenkomst schriftelijk beëindigen zonder recht op schadevergoeding.",
    ],
  },
  {
    title: "14. Toepasselijk recht en bevoegde rechter",
    paragraphs: [
      "Op alle rechtsverhoudingen tussen opdrachtnemer en opdrachtgever is uitsluitend Nederlands recht van toepassing.",
      "Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar opdrachtnemer is gevestigd, tenzij dwingend recht anders bepaalt.",
    ],
  },
];

const VoorwaardenPage = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="border-b border-foreground/5 bg-secondary/30 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Algemene voorwaarden</p>
          <h1 className="mt-4 max-w-3xl font-syne text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl">
            Algemene voorwaarden voor webdevelopment en digitale diensten
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Deze algemene voorwaarden beschrijven duidelijk hoe we samenwerken, wat je van ons mag verwachten en wat wij van jou nodig hebben. Zo voorkomen we onduidelijkheid achteraf en houden we projecten snel, overzichtelijk en professioneel.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Versie: 19 maart 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.5rem] border border-foreground/5 bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-syne text-2xl font-extrabold text-foreground">{section.title}</h2>
              <div className="mt-5 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}

          <div className="rounded-[1.5rem] border border-primary/15 bg-primary/5 p-6 sm:p-8">
            <h2 className="font-syne text-2xl font-extrabold text-foreground">Vragen over deze voorwaarden?</h2>
            <p className="mt-4 max-w-3xl text-foreground/80">
              Als je vragen hebt over scope, onderhoud, aansprakelijkheid of facturatie, bespreken we dat graag vooraf. Duidelijke afspraken zorgen voor snelle uitvoering zonder gedoe.
            </p>
            <div className="mt-6">
              <Link
                to="/aanvraag"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VoorwaardenPage;
