import clsx from 'clsx';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showText?: boolean;
  size?: number;
}

export default function BrandLogo({
  className,
  imageClassName,
  textClassName,
  showText = true,
  size = 30,
}: BrandLogoProps) {
  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <img
        src="/logo.png"
        alt="Roota logo"
        className={clsx('object-contain', imageClassName)}
        style={{ width: size, height: size }}
      />
      {showText && <span className={clsx('font-bold tracking-tight', textClassName)}>Roota</span>}
    </span>
  );
}
