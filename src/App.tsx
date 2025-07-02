import React, { useEffect, useRef, useState } from "react";
import QRCode, { QRCodeHandle, QRCodeProps } from "./Components/QRCode";
import "./App.css";

function App() {
  const [url, setUrl] = useState("https://example.com");
  const [gradientColor1, setGradientColor1] = useState("#000000");
  const [gradientColor2, setGradientColor2] = useState("#ff0000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dotStyle, setDotStyle] = useState<QRCodeProps["dotStyle"]>("square");
  const [cornerStyle, setCornerStyle] =
    useState<QRCodeProps["cornerStyle"]>("square");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0);

  const qrRef = useRef<QRCodeHandle>(null);

  useEffect(() => {
    return () => {
      if (logoFile) {
        URL.revokeObjectURL(URL.createObjectURL(logoFile));
      }
    };
  }, [logoFile]);

  return (
    <div className="app">
      <div className="card">
        <div className="">
          <h1 className="title">QRForge</h1>
          <p className="subtitle">
            Create Beautiful, Custom QR Codes Instantly
          </p>

          <div className="input-div">
            <label className="label">Text / URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-div">
            <label className="label">Upload Logo Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setLogoFile(file || null);
              }}
              className="input"
            />
          </div>

          <div className="color-row">
            <div className="color-group">
              <label className="label">Gradient Color 1</label>
              <input
                type="color"
                value={gradientColor1}
                onChange={(e) => setGradientColor1(e.target.value)}
                className="color"
              />
            </div>
            <div className="color-group">
              <label className="label">Gradient Color 2</label>
              <input
                type="color"
                value={gradientColor2}
                onChange={(e) => setGradientColor2(e.target.value)}
                className="color"
              />
            </div>
            <div className="color-group">
              <label className="label">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="color"
              />
            </div>
          </div>

          <div className="color-row">
            <label className="label">Gradient Rotation (°)</label>
            <input
              type="number"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="input"
            />
          </div>

          <label className="label">Dot Style</label>
          <select
            value={dotStyle}
            onChange={(e) => setDotStyle(e.target.value as any)}
            className="select"
          >
            <option value="square">Square</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy Rounded</option>
            <option value="extra-rounded">Extra Rounded</option>
          </select>

          <label className="label">Corner Style</label>
          <select
            value={cornerStyle}
            onChange={(e) => setCornerStyle(e.target.value as any)}
            className="select"
          >
            <option value="square">Square</option>
            <option value="dot">Dot</option>
            <option value="extra-rounded">Extra-Rounded</option>
          </select>
        </div>

        <div className="qr-container">
          <div className="preview">
            <QRCode
              ref={qrRef}
              data={url}
              gradient={{ color1: gradientColor1, color2: gradientColor2 }}
              bgColor={bgColor}
              dotStyle={dotStyle}
              cornerStyle={cornerStyle}
              logoImage={logoFile ? URL.createObjectURL(logoFile) : undefined}
              gradientRotation={rotation}
            />
          </div>
          <button
            onClick={() => qrRef.current?.download()}
            className="download-button"
          >
            ⬇️ Download QR
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
