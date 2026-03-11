import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../utils/api';
import PageHero from '../../components/PageHero';
import Page from '../../components/Page';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
  });
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      imageFiles.forEach((it) => {
        try { URL.revokeObjectURL(it.preview); } catch (e) { }
      });
    };
  }, [imageFiles]);

  const uploadFileWithProgress = (file, sigParams, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.cloudinary.com/v1_1/${sigParams.cloudName}/image/upload`;
      const fd = new FormData();
      fd.append('file', file);
      fd.append('api_key', sigParams.apiKey);
      fd.append('timestamp', sigParams.timestamp);
      fd.append('signature', sigParams.signature);
      fd.append('folder', sigParams.folder);

      xhr.open('POST', url);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Upload failed'));
        }
      };
      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.send(fd);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const maxSize = 5 * 1024 * 1024;
    const invalid = files.find((f) => !f.type.startsWith('image/') || f.size > maxSize);
    if (invalid) {
      alert('Only image files under 5MB are allowed.');
      return;
    }
    const maxFiles = 4;
    const combinedFiles = [...imageFiles, ...files].slice(0, maxFiles);
    const previews = combinedFiles.map((f) => ({
      file: f.file || f,
      preview: f.preview || URL.createObjectURL(f),
    }));
    setImageFiles(previews);
    setForm({ ...form, images: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedUrls = form.images || [];
    if (imageFiles.length > 0) {
      setUploading(true);
      setUploadProgress(Array(imageFiles.length).fill(0));
      try {
        if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
          alert('Only seller accounts can upload products.');
          setUploading(false);
          return;
        }
        const sigResp = await api.get('/cloudinary-signature');
        const sigParams = sigResp.data;
        const uploadPromises = imageFiles.map(({ file }, idx) =>
          uploadFileWithProgress(file, sigParams, (p) => {
            setUploadProgress((prev) => {
              const next = [...prev];
              next[idx] = p;
              return next;
            });
          })
        );
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.map((r) => r.secure_url).filter(Boolean);
      } catch (error) {
        console.error('Upload error', error);
        alert('Image upload failed');
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }
    const payload = { ...form, images: uploadedUrls };
    try {
      await api.post('/products', payload);
      window.location.href = '/vendor/products';
    } catch (error) {
      console.error('Product save error', error);
      alert('Failed to save product');
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-12">
      <PageHero 
        title="Add Product" 
        subtitle="Bring your products to life. High-quality images and clear descriptions help you sell faster."
        gradient="from-violet-600 via-indigo-700 to-blue-800"
      />

      <Page className="container-mt-8 relative z-10 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-4">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Product Name" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Handmade Ceramic Vase" />
              <Input label="Category" name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Home Decor" />
              <Input label="Price ($)" name="price" type="number" value={form.price} onChange={handleChange} required placeholder="0.00" />
              <Input label="Stock Quantity" name="stock" type="number" value={form.stock} onChange={handleChange} required placeholder="0" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your product's unique features, materials, and dimensions..."
                className="w-full min-h-[120px] rounded-2xl bg-gray-50/50 border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700 ml-1">Product Images (Max 4)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageFiles.map((it, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                    <img src={it.preview} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm text-rose-600 rounded-full w-6 h-6 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    {uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2">
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white transition-all duration-300" style={{ width: `${uploadProgress[idx] || 0}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {imageFiles.length < 4 && (
                  <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2">
                    <input type="file" multiple onChange={handleImageUpload} className="hidden" />
                    <span className="text-2xl text-gray-400">+</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Add Image</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={uploading} className="w-full py-4 text-base font-bold shadow-xl shadow-indigo-600/20 rounded-2xl tracking-wide uppercase transition-all hover:scale-[1.01] active:scale-[0.99] disabled:scale-100">
            {uploading ? "Uploading & Saving..." : "Publish Product →"}
          </Button>
        </form>
      </Page>
    </div>
  );
};

export default AddProduct;