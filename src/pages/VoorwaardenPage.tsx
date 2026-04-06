import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/hooks/use-page-seo";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "1. Definities",
    paragraphs: [
      "In deze algemene voorwaarden betekent opdrachtnemer: Webvakwerk, een eenmanszaak gevestigd in Nederland, zoals nader vermeld in offerte, factuur of opdrachtbevestiging.",
      "Opdrachtgever: de zakelijke wederpartij die handelt in de uitoefening van een beroep of bedrijf. Deze voorwaarden zijn primair bedoeld voor B2B-opdrachten.",
      "Diensten: alle werkzaamheden van opdrachtnemer op het gebied van software development, webdevelopment, IT-diensten, technisch beheer, onderhoud, support, hosting en aanverwante digitale dienstverlening, voor zover schriftelijk afgesproken.",
      "Overeenkomst: iedere afspraak tussen opdrachtnemer en opdrachtgever, waaronder offertes, opdrachtbevestigingen, e-mailafspraken en opdrachten via de website.",
      "Meerwerk: alle werkzaamheden of wensen die buiten de oorspronkelijk afgesproken scope vallen.",
    ],
  },
  {
    title: "2. Toepasselijkheid",
    paragraphs: [
      "Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten, vervolgopdrachten en diensten van opdrachtnemer.",
      "Opdrachtnemer stelt deze voorwaarden voor of bij het sluiten van de overeenkomst aan opdrachtgever ter beschikking op een manier die door opdrachtgever kan worden opgeslagen voor latere kennisneming.",
      "Een overeenkomst komt tot stand zodra opdrachtgever schriftelijk of elektronisch akkoord geeft, of zodra opdrachtnemer op verzoek van opdrachtgever met de uitvoering start.",
      "Afwijkingen of aanvullingen zijn alleen geldig als deze schriftelijk zijn bevestigd door opdrachtnemer.",
      "Algemene voorwaarden van opdrachtgever zijn uitdrukkelijk uitgesloten, tenzij opdrachtnemer deze schriftelijk heeft aanvaard.",
      "Als opdrachtgever een consument blijkt te zijn, gelden de bepalingen uit deze voorwaarden alleen voor zover zij niet in strijd zijn met dwingend consumentenrecht.",
    ],
  },
  {
    title: "3. Offertes en prijzen",
    paragraphs: [
      "Offertes zijn vrijblijvend en geldig gedurende 14 dagen, tenzij in de offerte een andere termijn staat.",
      "Tenzij uitdrukkelijk anders vermeld, zijn alle prijzen in euro en exclusief btw, externe licenties, domeinregistratie, hosting, transactiekosten en andere kosten van derden.",
      "Begrotingen, ureninschattingen, doorlooptijden en planningen zijn indicatief, tenzij uitdrukkelijk schriftelijk als bindend vastgelegd.",
      "Kennelijke fouten, verschrijvingen of omissies in offertes, prijsopgaven of communicatie binden opdrachtnemer niet.",
    ],
  },
  {
    title: "4. Uitvoering van de opdracht",
    paragraphs: [
      "Opdrachtnemer voert de opdracht uit naar beste inzicht, deskundigheid en vermogen. Tenzij uitdrukkelijk schriftelijk anders afgesproken, geldt een inspanningsverplichting en geen resultaatsverplichting.",
      "Opdrachtnemer mag werkzaamheden geheel of gedeeltelijk laten uitvoeren door derden wanneer dat redelijkerwijs nodig is voor een goede uitvoering van de opdracht.",
      "Opdrachtnemer geeft geen garantie op specifieke commerciële of technische resultaten, zoals omzetgroei, SEO-posities, bereik, conversie, compatibiliteit met alle systemen of foutloze en ononderbroken werking.",
      "Opleverdata en termijnen gelden als streefdata en niet als fatale termijnen, tenzij partijen schriftelijk uitdrukkelijk anders zijn overeengekomen.",
    ],
  },
  {
    title: "5. Medewerking opdrachtgever",
    paragraphs: [
      "Opdrachtgever verstrekt tijdig alle informatie, teksten, beelden, feedback, toegang, inloggegevens, contactpersonen en overige input die nodig is voor de uitvoering van de opdracht.",
      "Opdrachtgever staat in voor de juistheid, volledigheid, rechtmatigheid en bruikbaarheid van aangeleverde gegevens en materialen.",
      "Vertraging, extra werk of extra kosten die ontstaan doordat opdrachtgever niet tijdig of niet volledig meewerkt, komen voor rekening van opdrachtgever.",
    ],
    bullets: [
      "Als input, feedback of goedkeuring uitblijft, mag opdrachtnemer de planning opschuiven.",
      "Wachttijd, herstelwerk of extra afstemming door vertraging of wijzigende instructies aan klantzijde mag als meerwerk worden doorbelast.",
    ],
  },
  {
    title: "6. Scope, wijzigingen en meerwerk",
    paragraphs: [
      "De opdracht wordt uitgevoerd op basis van de schriftelijk overeengekomen scope. Werkzaamheden of functionaliteiten die niet uitdrukkelijk zijn inbegrepen, vallen buiten de scope.",
      "Wijzigingen, aanvullende wensen, extra correctierondes, migraties, koppelingen, contentinvoer, technische onderzoeken, spoedwerk en werkzaamheden door veranderde inzichten gelden als meerwerk, tenzij schriftelijk anders afgesproken.",
      "Opdrachtnemer mag meerwerk uitvoeren na mondelinge, schriftelijke of elektronische opdracht van opdrachtgever. Meerwerk kan invloed hebben op prijs, planning en opleverdatum.",
    ],
  },
  {
    title: "7. Oplevering, acceptatie, bugs en support",
    paragraphs: [
      "Een website, applicatie, module of ander onderdeel geldt als opgeleverd zodra opdrachtnemer heeft gemeld dat het gereed is voor controle, livegang of gebruik.",
      "Opdrachtgever dient zichtbare gebreken of bezwaren binnen 14 dagen na oplevering schriftelijk en zo concreet mogelijk te melden. Bij uitblijven van tijdige en voldoende concrete feedback geldt het opgeleverde als geaccepteerd.",
      "Onder een bug wordt verstaan: een reproduceerbare en wezenlijke afwijking ten opzichte van de schriftelijk overeengekomen functionaliteit. Wensen, optimalisaties, browserafwijkingen, wijzigingen door derden of nieuwe inzichten gelden niet automatisch als bug.",
      "Herstel van bugs die aantoonbaar aan opdrachtnemer zijn toe te rekenen en binnen de overeengekomen scope vallen, wordt binnen een redelijke termijn uitgevoerd.",
      "Onderhoud, monitoring, beveiligingsupdates, support, SLA's en doorontwikkeling maken alleen onderdeel uit van de overeenkomst als dat uitdrukkelijk schriftelijk is afgesproken.",
    ],
    bullets: [
      "Na acceptatie worden nieuwe wijzigingen, aanvullende support of extra correcties uitgevoerd als meerwerk of binnen een afzonderlijk onderhouds- of supportcontract.",
      "Opdrachtnemer is niet verplicht om onbeperkt revisies of correcties uit te voeren binnen een vaste pakketprijs.",
    ],
  },
  {
    title: "8. Betaling",
    paragraphs: [
      "Facturen hebben een betalingstermijn van 14 dagen na factuurdatum, tenzij schriftelijk anders overeengekomen.",
      "Opdrachtnemer mag een aanbetaling, termijnfacturatie of vooruitbetaling verlangen, bijvoorbeeld bij start, tussentijdse opleveringen of livegang.",
      "Bij niet-tijdige betaling is opdrachtgever van rechtswege in verzuim, zonder dat een nadere ingebrekestelling nodig is, voor zover de wet dit toelaat.",
    ],
    bullets: [
      "Vanaf de vervaldatum is de wettelijke handelsrente verschuldigd. Als dwingend recht dat vereist, geldt de wettelijke rente in plaats van de wettelijke handelsrente.",
      "Buitengerechtelijke incasso- en invorderingskosten komen voor rekening van opdrachtgever conform de wet. Bij zakelijke opdrachtgevers mag opdrachtnemer daarnaast de redelijke werkelijk gemaakte kosten verhalen voor zover de wet dat toelaat.",
      "Opdrachtnemer mag bij betalingsachterstand werkzaamheden, livegang, support, toegang of oplevering opschorten totdat alle openstaande bedragen zijn voldaan.",
    ],
  },
  {
    title: "9. Hosting, externe diensten en back-ups",
    paragraphs: [
      "Indien voor de opdracht gebruik wordt gemaakt van hosting, domeinregistratie, e-maildiensten, cloudplatformen, payment providers, AI-diensten, plugins, libraries, frameworks, API's of andere diensten van derden, dan zijn de beschikbaarheid en continuiteit daarvan mede afhankelijk van die derde partijen.",
      "Opdrachtnemer is niet aansprakelijk voor storingen, prijswijzigingen, beleidswijzigingen, beveiligingsincidenten, beëindiging van diensten of andere tekortkomingen van dergelijke derden, tenzij sprake is van opzet of bewuste roekeloosheid aan de zijde van opdrachtnemer.",
      "Tenzij schriftelijk anders overeengekomen, is opdrachtgever zelf verantwoordelijk voor het maken en controleren van actuele back-ups van content, databases, bestanden, mailboxen en configuraties.",
      "Als hosting of beheer door opdrachtnemer is afgesproken, zal opdrachtnemer zich redelijk inspannen voor stabiliteit en beveiliging, maar geen 100% uptime of volledige foutloosheid garanderen.",
    ],
  },
  {
    title: "10. Aansprakelijkheid",
    paragraphs: [
      "Iedere aansprakelijkheid van opdrachtnemer is beperkt tot directe schade die het rechtstreekse en uitsluitende gevolg is van een toerekenbare tekortkoming in de uitvoering van de opdracht.",
      "De totale aansprakelijkheid van opdrachtnemer is beperkt tot het bedrag dat opdrachtgever voor de betreffende opdracht in de 6 maanden voorafgaand aan de schadeveroorzakende gebeurtenis daadwerkelijk heeft betaald, met als absoluut maximum het exclusief btw overeengekomen factuurbedrag voor die opdracht.",
      "Opdrachtnemer is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste omzet, gemiste besparingen, reputatieschade, dataverlies, schade door bedrijfsstagnatie of schade door claims van derden.",
      "Opdrachtnemer is evenmin aansprakelijk voor schade die ontstaat door onjuiste of onvolledige input van opdrachtgever, door handelen van opdrachtgever of derden, door niet tijdig installeren van updates, of door storingen in netwerken, hosting, software, browsers, apparaten, externe API's of andere voorzieningen buiten de invloedssfeer van opdrachtnemer.",
      "Iedere aanspraak op schadevergoeding vervalt als opdrachtgever de schade niet binnen 30 dagen na ontdekking schriftelijk meldt en uiterlijk binnen 12 maanden na de gebeurtenis een rechtsvordering instelt, tenzij dwingend recht anders bepaalt.",
    ],
    bullets: [
      "De beperkingen in dit artikel gelden niet voor schade die is veroorzaakt door opzet of bewuste roekeloosheid van opdrachtnemer.",
      "Opdrachtgever vrijwaart opdrachtnemer tegen aanspraken van derden die voortvloeien uit door opdrachtgever aangeleverde materialen, gegevens, content, instructies of onrechtmatig gebruik van het opgeleverde.",
    ],
  },
  {
    title: "11. Intellectueel eigendom",
    paragraphs: [
      "Alle intellectuele eigendomsrechten op door opdrachtnemer ontwikkelde of gebruikte concepten, ontwerpen, code, scripts, documentatie, templates, werkwijzen, libraries, modules, tooling en knowhow blijven bij opdrachtnemer of diens licentiegevers, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.",
      "Na volledige betaling van alle opeisbare facturen krijgt opdrachtgever een niet-exclusief, niet-overdraagbaar gebruiksrecht op het specifiek voor opdrachtgever opgeleverde werk voor het afgesproken zakelijke doel.",
      "Generieke onderdelen, herbruikbare componenten, standaardscripts, frameworks, libraries, koppelingen, templates en reeds bestaande bouwstenen blijven eigendom van opdrachtnemer of de betreffende rechthebbende en mogen door opdrachtnemer ook voor andere opdrachten worden gebruikt.",
      "Opdrachtgever heeft alleen recht op broncode, editable designbestanden, repositories, ontwikkelomgevingen, documentatie of overdracht van accounts voor zover dat uitdrukkelijk onderdeel is van de overeenkomst.",
      "Voor software, plugins, libraries, lettertypes, afbeeldingen, AI-tools en andere onderdelen van derden gelden de licentievoorwaarden van die derden. Opdrachtgever is verantwoordelijk voor de naleving daarvan voor zover deze betrekking hebben op het gebruik aan opdrachtgeverzijde.",
      "Opdrachtgever garandeert dat aangeleverde teksten, afbeeldingen, data en andere materialen geen inbreuk maken op rechten van derden.",
    ],
  },
  {
    title: "12. Geheimhouding en persoonsgegevens",
    paragraphs: [
      "Partijen behandelen vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar ontvangen vertrouwelijk en gebruiken deze alleen voor de uitvoering van de overeenkomst.",
      "Indien opdrachtnemer in opdracht van opdrachtgever persoonsgegevens verwerkt, maken partijen daarover zo nodig afzonderlijke afspraken, bijvoorbeeld in een verwerkersovereenkomst.",
      "Opdrachtgever blijft verantwoordelijk voor de rechtmatigheid van de door hem aangeleverde persoonsgegevens, content en instructies.",
    ],
  },
  {
    title: "13. Beëindiging, annulering en opschorting",
    paragraphs: [
      "Beide partijen mogen de overeenkomst schriftelijk beëindigen indien de andere partij wezenlijk tekortschiet en, na een redelijke schriftelijke hersteltermijn, niet alsnog nakomt.",
      "Opdrachtnemer mag de overeenkomst geheel of gedeeltelijk opschorten of beëindigen bij niet-tijdige betaling, faillissement, surseance van betaling, bedrijfsbeëindiging of andere omstandigheden waaruit blijkt dat opdrachtgever zijn verplichtingen vermoedelijk niet zal nakomen.",
      "Bij annulering of voortijdige beëindiging door opdrachtgever is opdrachtgever alle reeds verrichte werkzaamheden, gemaakte kosten, aangegane verplichtingen jegens derden en redelijkerwijs gereserveerde capaciteit verschuldigd.",
      "Reeds gefactureerde bedragen blijven onverminderd verschuldigd en reeds betaalde bedragen worden niet terugbetaald, tenzij schriftelijk anders is overeengekomen of dwingend recht anders bepaalt.",
    ],
  },
  {
    title: "14. Overmacht",
    paragraphs: [
      "Onder overmacht wordt verstaan iedere omstandigheid buiten de redelijke controle van opdrachtnemer, waaronder in ieder geval: storingen of uitval bij hostingproviders, registrars, cloudplatformen, externe API's of softwareleveranciers, internet- of stroomuitval, cyberincidenten, DDoS-aanvallen, ziekte, arbeidsongeschiktheid, overheidsmaatregelen en problemen bij toeleveranciers.",
      "Tijdens overmacht worden verplichtingen van opdrachtnemer opgeschort voor de duur van de overmachtsituatie.",
      "Indien een overmachtsituatie langer duurt dan 60 dagen, mogen beide partijen de overeenkomst schriftelijk geheel of gedeeltelijk beëindigen zonder verplichting tot schadevergoeding. Reeds verrichte werkzaamheden en gemaakte kosten mogen wel in rekening worden gebracht.",
    ],
  },
  {
    title: "15. Toepasselijk recht en geschillen",
    paragraphs: [
      "Op alle rechtsverhoudingen tussen opdrachtnemer en opdrachtgever is uitsluitend Nederlands recht van toepassing.",
      "Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar opdrachtnemer is gevestigd, tenzij dwingend recht anders bepaalt.",
      "Als een bepaling uit deze algemene voorwaarden nietig is of wordt vernietigd, blijven de overige bepalingen onverminderd van kracht. Partijen zullen de ongeldige bepaling dan vervangen door een bepaling die zoveel mogelijk hetzelfde doel en dezelfde strekking heeft.",
    ],
  },
];

const VoorwaardenPage = () => {
  usePageSeo({
    title: "Algemene voorwaarden | Webvakwerk",
    description:
      "Lees de algemene voorwaarden van Webvakwerk voor software development, webdevelopment en IT-diensten. Van toepassing op alle opdrachten en overeenkomsten.",
    canonicalPath: "/voorwaarden",
  });

  useBreadcrumbSchema([{ name: "Voorwaarden", path: "/voorwaarden" }]);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <main id="main-content">
        <section className="border-b border-foreground/5 bg-secondary/30 px-6 py-16">
          <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Algemene voorwaarden</p>
          <h1 className="mt-4 max-w-3xl font-syne text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl">
            Algemene voorwaarden voor software development, webdevelopment en IT-diensten
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground">
            Deze algemene voorwaarden beschrijven hoe we samenwerken, wat binnen en buiten de opdracht valt, hoe betaling en aansprakelijkheid zijn geregeld en hoe we omgaan met bugs, support, meerwerk en intellectueel eigendom. Zo voorkomen we onduidelijkheid achteraf en houden we projecten snel, overzichtelijk en professioneel.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-medium text-foreground/80">
            Deze voorwaarden zijn primair bedoeld voor zakelijke opdrachtgevers. Versie: 20 maart 2026
          </p>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.35))] px-6 py-16">
          <div className="mx-auto max-w-4xl space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground sm:text-[1.9rem]">{section.title}</h2>
              <div className="mt-6 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-none text-[1.02rem] leading-8 text-foreground sm:text-[1.05rem]">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-3 pl-6 text-[1.02rem] leading-8 text-foreground marker:text-primary sm:text-[1.05rem]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}

          <div className="rounded-[1.5rem] border border-primary/20 bg-primary/8 p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.18)] sm:p-9">
            <h2 className="font-syne text-2xl font-extrabold text-foreground">Vragen over deze voorwaarden?</h2>
            <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-foreground">
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
      </main>

      <Footer />
    </div>
  );
};

export default VoorwaardenPage;
