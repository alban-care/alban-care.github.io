import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <p className="w-full text-balance text-center text-sm leading-loose text-muted-foreground">
        Le code source est disponible sur{" "}
        <Link
          href="https://github.com/alban-care/alban-care.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link underline"
        >
          GitHub
        </Link>{" "}
        | Codé avec ❤️ évidemment!
      </p>
    </footer>
  );
}
