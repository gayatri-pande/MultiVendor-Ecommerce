import { useState } from "react";

const ImageUpload = ({ onSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onSelect(file);
  };

  return (
    <div className="image-upload">
      <label>Product Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="image-preview"
        />
      )}
    </div>
  );
};

export default ImageUpload;
