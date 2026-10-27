import Link from "next/link";
import AuthButton from "./AuthButton";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Movie App</h1>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/about">About</Link>
      </nav>
      <AuthButton />
    </header>
  );
}
