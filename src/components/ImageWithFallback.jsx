import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";

export default function ImageWithFallback({
  src,
  alt,
  title,
  className = "",
  placeholderClassName = "",
  style = {},
  placeholderStyle = {},
  width,
  height,
  iconClassName = "",
  fallback,
}) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  if (!src || imageError) {
    if (fallback !== undefined) {
      return fallback;
    }

    return (
      <span
        className={`d-flex justify-content-center align-items-center text-muted ${className} ${placeholderClassName}`}
        style={{
          ...style,
          width,
          height,
          ...placeholderStyle,
        }}
        title={title}
        role="img"
        aria-label={title || alt}
      >
        <FaImage className={iconClassName} aria-hidden="true" />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      title={title}
      className={className}
      style={style}
      width={width}
      height={height}
      onError={() => setImageError(true)}
    />
  );
}
