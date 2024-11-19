import React, { useState } from 'react';

const ColorPaletteGenerator: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const generatePalette = (baseColor: string) => {
    // Simple palette generator (shades)
    const shades = [0.2, 0.4, 0.6, 0.8, 1];
    return shades.map((shade) => {
      const color = shadeColor(baseColor, shade);
      return color;
    });
  };

  const shadeColor = (color: string, shade: number) => {
    const f = parseInt(color.slice(1), 16);
    const t = 0;
    const R = f >> 16;
    const G = (f >> 8) & 0x00ff;
    const B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((t - R) * shade) + R) * 0x10000 +
        (Math.round((t - G) * shade) + G) * 0x100 +
        (Math.round((t - B) * shade) + B)
      )
        .toString(16)
        .slice(1)
    );
  };

  const palette = generatePalette(selectedColor);

  return (
    <div className="h-full">
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-5 gap-2">
        {palette.map((color, i) => (
          <div
            key={i}
            className="h-20 rounded-lg"
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
