import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          Pokédex
        </Link>
        <nav aria-label="Principal">
          <ul className="site-header__nav">
            <li>
              <Link href="/">Listagem</Link>
            </li>
            <li>
              <Link href="/team">Equipe</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}