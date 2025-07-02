import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import QRCodeStyling from "qr-code-styling";

export interface QRCodeProps {
  data: string;
  size?: number;
  gradient?: { color1: string; color2: string };
  gradientRotation?: number;
  bgColor?: string;
  dotStyle?:
    | "square"
    | "dots"
    | "rounded"
    | "classy"
    | "classy-rounded"
    | "extra-rounded";
  cornerStyle?: "square" | "dot" | "extra-rounded";
  logoImage?: string;
}

export interface QRCodeHandle {
  download: () => void;
}

const QRCode = forwardRef<QRCodeHandle, QRCodeProps>(
  (
    {
      data,
      size = 256,
      gradient = { color1: "#000000", color2: "#ff0000" },
      gradientRotation = 0,
      bgColor = "#ffffff",
      dotStyle = "square",
      cornerStyle = "square",
      logoImage,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<QRCodeStyling | null>(null);

    useEffect(() => {
      qrRef.current = new QRCodeStyling({
        width: size,
        height: size,
        data,
        image: logoImage,
        dotsOptions: {
          type: dotStyle,
          gradient: {
            type: "linear",
            rotation: gradientRotation,
            colorStops: [
              { offset: 0, color: gradient.color1 },
              { offset: 1, color: gradient.color2 },
            ],
          },
        },
        cornersSquareOptions: {
          type: cornerStyle,
          gradient: {
            type: "linear",
            rotation: gradientRotation,
            colorStops: [
              { offset: 0, color: gradient.color1 },
              { offset: 1, color: gradient.color2 },
            ],
          },
        },
        cornersDotOptions: {
          type: cornerStyle,
          gradient: {
            type: "linear",
            rotation: gradientRotation,
            colorStops: [
              { offset: 0, color: gradient.color1 },
              { offset: 1, color: gradient.color2 },
            ],
          },
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
        },
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        qrRef.current.append(containerRef.current);
      }
    }, []);

    useEffect(() => {
      qrRef.current?.update({
        data,
        image: logoImage,
        dotsOptions: {
          type: dotStyle,
          gradient: {
            type: "linear",
            rotation: gradientRotation,
            colorStops: [
              { offset: 0, color: gradient.color1 },
              { offset: 1, color: gradient.color2 },
            ],
          },
        },
        cornersSquareOptions: {
          type: cornerStyle,
          gradient: {
            type: "linear",
            rotation: gradientRotation,
            colorStops: [
              { offset: 0, color: gradient.color1 },
              { offset: 1, color: gradient.color2 },
            ],
          },
        },
        cornersDotOptions: {
          type: cornerStyle,
          gradient: {
            type: "linear",
            rotation: gradientRotation,
            colorStops: [
              { offset: 0, color: gradient.color1 },
              { offset: 1, color: gradient.color2 },
            ],
          },
        },
        backgroundOptions: {
          color: bgColor,
        },
      });
    }, [
      data,
      dotStyle,
      gradient,
      bgColor,
      cornerStyle,
      logoImage,
      gradientRotation,
    ]);

    // Expose download method
    useImperativeHandle(ref, () => ({
      download: () => {
        qrRef.current?.download({
          name: "qr-code",
          extension: "png",
        });
      },
    }));

    return <div ref={containerRef} />;
  }
);

export default QRCode;
