import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import Button from "../../components/Button";
import Input from "../../components/Input";

import Page from "../../components/Page";

const CreateStore = () => {
  const { user } = useSelector(state => state.auth);
  const [form, setForm] = useState({
    storeName: "",
    description: "",
  });
  const [files, setFiles] = useState({ logo: null, banner: null });
  const [previews, setPreviews] = useState({ logo: null, banner: null });
  const [uploadProgress, setUploadProgress] = useState({ logo: 0, banner: 0 });
  const [uploading, setUploading] = useState(false);
  console.log(user)

  // Revoke previews on unmount
  useEffect(() => {
    return () => {
      if (previews.logo) URL.revokeObjectURL(previews.logo);
      if (previews.banner) URL.revokeObjectURL(previews.banner);
    };
  }, [previews]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => {
    const { name, files: selectedFiles } = e.target;
    if (!selectedFiles.length) return;
    const file = selectedFiles[0];
    setFiles(prev => ({ ...prev, [name]: file }));
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviews(prev => {
      if (prev[name]) URL.revokeObjectURL(prev[name]);
      return { ...prev, [name]: objectUrl };
    });
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
      alert("Failed to create store. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Page className="container py-12 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Help/Inspiration Section */}
        <div className="md:w-1/3 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Your Store</h1>
            <p className="text-gray-500 leading-relaxed">
              Launch your independent storefront and start reaching thousands of customers today.
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
              ?
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-indigo-900">Need help?</h3>
              <p className="text-xs text-indigo-700 leading-relaxed">
                A great store name and professional banner can increase your sales by up to 40%. Use high-quality images!
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Input 
                  label="Store Name" 
                  name="storeName" 
                  placeholder="e.g. Minimalist Home Decor"
                  value={form.storeName} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-50/50"
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Store Description</label>
                  <textarea 
                    name="description" 
                    placeholder="Tell customers what makes your store unique..."
                    value={form.description} 
                    onChange={handleChange} 
                    required 
                    className="w-full min-h-[120px] rounded-2xl bg-gray-50/50 border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Branding Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest ml-1">Branding</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Banner Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Store Banner</label>
                    <div className="relative group">
                      <div className={`w-full h-40 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-colors ${!previews.banner && 'hover:bg-gray-200 hover:border-indigo-400'}`}>
                        {previews.banner ? (
                          <img src={previews.banner} alt="Banner Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-gray-400">
                            <span className="text-2xl block mb-1">🖼️</span>
                            <span className="text-xs">1920 x 400 suggested</span>
                          </div>
                        )}
                        <input 
                          type="file" 
                          name="banner" 
                          onChange={handleFileChange} 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      {uploadProgress.banner > 0 && uploadProgress.banner < 100 && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
                          <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${uploadProgress.banner}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="flex items-center gap-6">
                    <div className="relative group shrink-0">
                      <div className={`w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-colors ${!previews.logo && 'hover:bg-gray-200 hover:border-indigo-400'}`}>
                        {previews.logo ? (
                          <img src={previews.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">🏷️</span>
                        )}
                        <input 
                          type="file" 
                          name="logo" 
                          onChange={handleFileChange} 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      {uploadProgress.logo > 0 && uploadProgress.logo < 100 && (
                         <div className="absolute inset-x-2 bottom-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${uploadProgress.logo}%` }} />
                         </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">Store Logo</p>
                      <p className="text-xs text-gray-500">Square images look best. PNG or JPG only.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={uploading}
              className="w-full py-4 text-base font-semibold shadow-xl shadow-indigo-600/20 rounded-2xl tracking-wide uppercase transition-all hover:scale-[1.01] active:scale-[0.99] disabled:scale-100"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Initializing Launch...
                </span>
              ) : "Launch Store →"}
            </Button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default CreateStore;