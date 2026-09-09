import { forwardRef } from "react";

const CustomImage = forwardRef(function CustomImage(
  {
    src,
    alt = "",
    width = "100%",
    height = "100%",
    className = "",
    objectFit = "cover",
    objectPosition = "center",
    loading = "eager",
    ...props
  },
  ref,
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      style={{
        display: "block",
        width: width || "100%",
        height: height || "100%",
        objectFit,
        objectPosition,
        opacity: 1,
        visibility: "visible",
        ...props.style,
      }}
      {...props}
    />
  );
});

export default CustomImage;
