import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Intake en briefing",
    points: [
      "Om snel en gericht te kunnen bouwen, verwachten we vooraf een duidelijke intake met verwachtingen, stijl, kleuren, voorbeelden en bedrijfsinformatie.",
      "Hoe duidelijker de briefing, hoe sneller we een sterke eerste versie kunnen opleveren.",
      "Als belangrijke informatie later pas wordt aangeleverd, kan dat invloed hebben op planning, feedback en meerwerk.",
    ],
  },
  {
    title: "2. Demo en eerste opzet",
    points: [
      "Op basis van de intake bouwen we eerst een demo of eerste opzet van de website.",
      "Die demo is bedoeld om de richting, structuur en uitstraling duidelijk te maken voordat de volledige website wordt uitgewerkt.",
    ],
  },
  {
    title: "3. Feedbackrondes",
    points: [
      "Bij het Starter-pakket zijn maximaal 3 feedbackrondes inbegrepen.",
      "Feedbackrondes zijn bedoeld voor correcties en verfijning binnen de afgesproken scope van het pakket.",
      "Extra feedbackrondes of nieuwe toevoegingen daarna vallen onder meerwerk.",
    ],
  },
  {
    title: "4. Meerwerk",
    points: [
      "Nieuwe wensen, extra onderdelen of aanvullingen buiten de oorspronkelijke afspraak vallen onder meerwerk.",
      "Meerwerk wordt altijd apart benoemd voordat we dit uitvoeren.",
      "Zo blijft vooraf duidelijk wat binnen het pakket valt en wat een extra opdracht is.",
    ],
  },
  {
    title: "5. Uitwerking en oplevering",
    points: [
      "Na akkoord op de demo werken we de website verder uit op basis van de afgesproken inhoud en feedback.",
      "We leveren de website op zodra de afgesproken punten zijn verwerkt en het project klaar is voor livegang.",
    ],
  },
  {
    title: "6. Hosting en overdracht",
    points: [
      "Na oplevering kan de website via ons gehost worden, overgedragen worden aan een eigen IT-partij of met begeleiding zelf gehost worden.",
      "De gekozen vorm van hosting of overdracht stemmen we in overleg af.",
    ],
  },
];

const VoorwaardenPage = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="border-b border-foreground/5 bg-secondary/30 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Voorwaarden</p>
          <h1 className="mt-4 max-w-3xl font-syne text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl">
            Heldere afspraken over intake, feedback en meerwerk
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Hier staat duidelijk wat we van je nodig hebben om snel te kunnen bouwen, wat binnen een pakket valt en wanneer extra werk als meerwerk wordt gezien.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.5rem] border border-foreground/5 bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-syne text-2xl font-extrabold text-foreground">{section.title}</h2>
              <div className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <p key={point} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[1.5rem] border border-primary/15 bg-primary/5 p-6 sm:p-8">
            <h2 className="font-syne text-2xl font-extrabold text-foreground">Twijfel over scope of meerwerk?</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Als je twijfelt of iets binnen het pakket valt of als extra werk wordt gezien, bespreken we dat vooraf zodat daar geen onduidelijkheid over ontstaat.
            </p>
            <div className="mt-6">
              <Link
                to="/aanvraag"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
              >
                Demo aanvragen
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
