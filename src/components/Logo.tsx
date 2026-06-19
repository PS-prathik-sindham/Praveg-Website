// Praveg.ai logo — renders the provided nav-logo.svg (viewBox 39 x 45).
export default function Logo({
  size = 30,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/assets/nav-logo.svg"
      alt="Praveg.ai"
      width={(size * 39) / 45}
      height={size}
      className={className}
      style={{ width: (size * 39) / 45, height: size }}
    />
  );
}
