import Link from "next/link";
import { Arrow } from "@/components/ui/primitives";
import { routes } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow eyebrow--light">404</p>
        <h1 className="h1">This page could not be found.</h1>
        <p className="not-found__text">The page may have moved. Try one of these instead.</p>
        <div className="btn-row">
          <Link href="/" className="btn btn--primary btn--on-dark"><span>Home</span><Arrow /></Link>
          <Link href={routes.overview} className="btn btn--secondary btn--on-dark"><span>Assets &amp; Operations</span><Arrow /></Link>
          <Link href={routes.news} className="btn btn--secondary btn--on-dark"><span>News Releases</span><Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
