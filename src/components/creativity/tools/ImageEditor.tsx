import React, { useState } from 'react';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center w-full">
        {image ? (
          <img src={image as string} alt="Uploaded" className="max-h-40 mb-4" />
        ) : (
          <p className="mb-2">Drop an image here or</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300 cursor-pointer">
          Browse Files
        </label>
      </div>
    </div>
  );
};

export default ImageEditor;
