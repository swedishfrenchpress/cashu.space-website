export function CashuMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const fill = inverted ? "#ffffff" : "#000000";
  const stroke = inverted ? "#000000" : "#ffffff";
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill={fill} />
      <path
        d="M22 11.5a6.5 6.5 0 1 0 0 9"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
