import Image from "next/image";
import linkIcon from "../../public/link.svg";

export default function GoodReadsLink({
  href,
  alt,
  className = "",
}: {
  href: string;
  alt: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
    >
      <span className="flex gap-1">
        <Image width={12} height={12} src={linkIcon} alt={alt} />
        Goodreads
      </span>
    </a>
  );
}
