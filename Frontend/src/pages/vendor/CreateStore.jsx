import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import Button from "../../components/Button";
import Input from "../../components/Input";

const CreateStore = () => {
  const { user } = useSelector(state => state.auth);
  const [form, setForm] = useState({
    storeName: "",
    description: "",
    logo: null,
    banner: null,
  });
  const [files, setFiles] = useState({ logo: null, banner: null });
  const [uploadProgress, setUploadProgress] = useState({ logo: 0, banner: 0 });
  const [uploading, setUploading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => {
    const { name, files: selectedFiles } = e.target;
    if (!selectedFiles.length) return;
    setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const uploadFile = async (file, sigParams, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.cloudinary.com/v1_1/${sigParams.cloudName}/image/upload`;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sigParams.apiKey);
      fd.append("timestamp", sigParams.timestamp);
      fd.append("signature", sigParams.signature);
      fd.append("folder", sigParams.folder);

      xhr.open("POST", url);

      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error("Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.send(fd);
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) return alert("Please login first");
    console.log(user)
    setUploading(true);
    try {
      const sigResp = await api.get("/cloudinary-signature");
      const sigParams = sigResp.data;

      const uploadedLogo = files.logo
        ? await uploadFile(files.logo, sigParams, p => setUploadProgress(prev => ({ ...prev, logo: p })))
        : null;
      const uploadedBanner = files.banner
        ? await uploadFile(files.banner, sigParams, p => setUploadProgress(prev => ({ ...prev, banner: p })))
        : null;

      const payload = {
        storeName: form.storeName,
        description: form.description,
        logo: uploadedLogo?.secure_url || null,
        banner: uploadedBanner?.secure_url || null,
        user: user._id,
      };

      await api.post("/vendors/create", payload);
      alert("Store created successfully!");
      window.location.href = "/vendor/dashboard";
    } catch (err) {
      console.error(err);
      alert("Failed to create store");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Store Name" name="storeName" value={form.storeName} onChange={handleChange} required />
      <Input label="Description" name="description" value={form.description} onChange={handleChange} required />
      <div>
        <label>Logo:</label>
        <input type="file" name="logo" onChange={handleFileChange} />
      </div>
      <div>
        <label>Banner:</label>
        <input type="file" name="banner" onChange={handleFileChange} />
      </div>
      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Create Store"}
      </Button>
    </form>
  );
};

export default CreateStore;