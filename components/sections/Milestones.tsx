import { Eyebrow } from "../ui/primitives";
import { milestones } from "@/lib/content";

/** Group milestones by year. The year is the last four digits of the date string. */
const byYear = milestones.reduce<{ year: string; items: typeof milestones }[]>((acc, m) => {
  const year = m.date.slice(-4);
  const group = acc.find((g) => g.year === year);
  if (group) group.items.push(m);
  else acc.push({ year, items: [m] });
  return acc;
}, []);

export default function Milestones() {
  return (
    <section id="milestones" className="section milestones" aria-labelledby="ms-title">
      <div className="container grid">
        <header className="milestones__head" data-reveal>
          <Eyebrow>Company Milestones</Eyebrow>
          <h2 id="ms-title" className="h2">From Basin Selection to Partnership.</h2>
          <p>
            Since 2021, BluEnergies has moved from a technology-driven screening of more than 30 basins to an exploration programme in the
            Harper basin, in partnership with TotalEnergies.
          </p>
        </header>

        <div className="timeline">
          <span className="timeline__rail" aria-hidden>
            <span className="timeline__fill" data-line />
          </span>
          {byYear.map((g) => (
            <div key={g.year} className="timeline__year">
              <h3 className="timeline__label">{g.year}</h3>
              <ol>
                {g.items.map((m) => (
                  <li key={m.title} className={m.upcoming ? "is-upcoming" : ""} data-reveal>
                    {(m.date.length > 4 || m.upcoming) && (
                      <p className="timeline__date">
                        {m.date.length > 4 ? m.date.replace(/,?\s*\d{4}$/, "") : null}
                        {m.upcoming && <span className="timeline__tag">Upcoming</span>}
                      </p>
                    )}
                    <h4>{m.title}</h4>
                    <p>{m.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
