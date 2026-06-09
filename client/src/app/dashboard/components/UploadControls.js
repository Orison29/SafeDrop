import UpButton from './UpButtons';
import { useState } from 'react';

export default function UploadControls() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Step 1: Ask user for custom name
    const customName = prompt("Enter file name:", file.name) || file.name;

    try {
      setIsUploading(true);

      // Step 2: Get pre-signed URL from backend
      const res = await fetch("http://localhost:5000/api/files/upload-url", {
        method: "POST",
        credentials: "include", // 👈 cookie-based auth
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: customName,
          fileType: file.type,
          folderUuid: null, // or pass folder if inside one
        }),
      });

      const { uploadUrl, fileUuid, key } = await res.json();

      // Step 3: Upload to S3 directly
      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // Step 4: Confirm upload with backend (save metadata)
      await fetch("http://localhost:5000/api/files/confirm-upload", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUuid,
          fileName: customName,
          fileType: file.type,
          folderUuid: null,
          key,
        }),
      });

      alert("✅ File uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <UpButton
        label={isUploading ? "Uploading..." : "Upload File"}
        onClick={() => document.getElementById("fileInput").click()}
      />
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />

      <UpButton
        label="Create Folder"
        onClick={() => {
          const folderName = prompt("Enter folder name:");
          if (!folderName) return;
          fetch("http://localhost:5000/api/folders", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ folderName }),
          })
            .then((res) => res.json())
            .then((data) => alert(`Folder "${data.name}" created`))
            .catch(() => alert("❌ Folder creation failed"));
        }}
      />
    </div>
  );
}
