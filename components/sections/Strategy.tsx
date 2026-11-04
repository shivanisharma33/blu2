import Image from "next/image";
import { Eyebrow } from "../ui/primitives";
import { programme } from "@/lib/content";

export default function Strategy() {
  return (
    <section id="strategy" className="section section--navy strategy" aria-labelledby="strategy-title">
      <div className="container">
        <header className="grid strategy__head">
          <div className="strategy__title" data-reveal>
            <Eyebrow>Exploration Strategy &amp; Technical Insights</Eyebrow>
            <h2 id="strategy-title" className="h2">Building the Evidence Before the First Well.</h2>
          </div>
          <p className="lead strategy__intro" data-reveal>
            BluEnergies and TotalEnergies have jointly committed a work programme that uses state-of-the-art seismic reprocessing and
            new sea-bottom data. The aim is to evaluate prospectivity, de-risk the hydrocarbon potential and accelerate the selection
            of the first test of the play.
          </p>
        </header>

        {/* Chapter 1: Cenomanian */}
        <div className="chapter">
          <figure className="chapter__figure" data-reveal="image">
            <div className="plate">
              <Image
                src="/images/seismic-cenomanian-fans.jpg"
                alt="3D seismic relative acoustic impedance at the Cenomanian top, showing the Thea, Apollo, Diana and Zeus fan systems with reservoir sand in red, sand input points and oil migration from the source rock"
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <figcaption className="caption caption--dark">
              Relative acoustic impedance, Cenomanian top 100 m. Reservoir sand shown in red. Data property of TGS.
            </figcaption>
          </figure>
          <div className="chapter__text" data-reveal>
            <span className="chapter__no">01</span>
            <h3 className="h3">Seven fan systems, imaged in 3D</h3>
            <p>
              Interpreting 6,167 km² of 3D seismic has revealed seven Cretaceous fan systems across the licence, imaged at Cenomanian
              and Turonian levels. At the Cenomanian top, the Thea, Apollo, Diana and Zeus fans are fed by several sand inputs,
              with oil migration interpreted from the underlying source rock.
            </p>
          </div>
        </div>

        {/* Chapter 2: Turonian */}
        <div className="chapter chapter--flip">
          <figure className="chapter__figure" data-reveal="image">
            <div className="plate">
              <Image
                src="/images/seismic-turonian-fans.jpg"
                alt="3D seismic relative acoustic impedance at Turonian level, showing the Saturn, Neptune and Jupiter fans between the Grand Cess and Cape Palmas transforms"
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <figcaption className="caption caption--dark">
              Relative acoustic impedance, Turonian. Saturn, Neptune and Jupiter fans between the Grand Cess and Cape Palmas
              transforms.
            </figcaption>
          </figure>
          <div className="chapter__text" data-reveal>
            <span className="chapter__no">02</span>
            <h3 className="h3">Structural confinement</h3>
            <p>
              At Turonian level, the Saturn, Neptune and Jupiter fans lie between the Grand Cess and Cape Palmas transforms. The Cape
              Palmas transform forms a backstop, and reservoir sands pond against its reverse slope, confining thicker, stacked
              sands.
            </p>
          </div>
        </div>

        {/* Chapter 3: Work programme */}
        <div className="programme" id="programme">
          <div className="programme__head" data-reveal>
            <span className="chapter__no">03</span>
            <h3 className="h3">The 2026 work programme</h3>
            <p>Four complementary data sets, each designed to de-risk prospects and identify optimal drilling locations.</p>
          </div>
          <ol className="programme__list" data-stagger>
            {programme.map((p) => (
              <li key={p.id}>
                <span className="programme__index">{p.index}</span>
                <h4>{p.title}</h4>
                <p className="programme__by">{p.contractor}</p>
                <p>{p.body}</p>
                <p className="programme__status">{p.status}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
