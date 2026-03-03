import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../utils/api';

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

  // Revoke object URLs when imageFiles change or on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      imageFiles.forEach((it) => {
        try { URL.revokeObjectURL(it.preview); } catch (e) { }
      });
    };
  }, [imageFiles]);

  // helper to upload a single file with progress using XMLHttpRequest
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
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try { resolve(JSON.parse(xhr.responseText)); } catch (err) { reject(err); }
        } else {
          // include server response if available for easier debugging
          const resp = xhr.responseText;
          let parsed;
          try { parsed = JSON.parse(resp); } catch (e) { parsed = { message: resp || 'Upload failed' }; }
          reject(new Error(parsed.message || 'Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.send(fd);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // On file select: validate, enforce 3-4 images, and store File objects + local preview URLs; upload happens on submit
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalid = files.find((f) => !f.type.startsWith('image/') || f.size > maxSize);
    if (invalid) {
      alert('Only image files under 5MB are allowed.');
      return;
    }

    const maxFiles = 4; // allow up to 4 images
    let newFiles = files.slice(0, maxFiles);

    if (newFiles.length > maxFiles) {
      alert(`You can upload up to ${maxFiles} images. Only the first ${maxFiles} will be used.`);
    }

    const combinedFiles = [...imageFiles, ...newFiles].slice(0, maxFiles);

    // const limited = files.slice(0, maxFiles);
    // const previews = limited.map((f) => ({ file: f, preview: URL.createObjectURL(f) }));
    const previews = combinedFiles.map((f) => ({
      file: f.file || f, // handle both File or existing {file, preview}
      preview: f.preview || URL.createObjectURL(f),
    }));
    setImageFiles(previews);
    // reset previously uploaded urls until submit
    setForm({ ...form, images: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedUrls = form.images || [];

    if (imageFiles.length > 0) {
      setUploading(true);
      // initialize progress array
      setUploadProgress(Array(imageFiles.length).fill(0));
      try {
        // ensure current user is a vendor
        if (!user || user.role !== 'seller') {
          alert('Only vendor accounts can upload product images.');
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
        const msg = error?.response?.data?.message || error.message || 'Image upload failed';
        alert(msg);
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
      alert('Failed to save product. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
        <p className="text-sm text-gray-600">
          Create a new product for your storefront. Images are uploaded via Cloudinary.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="card p-5 space-y-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col gap-1 text-sm">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <Input
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <div className="space-y-2 text-sm">
          <label className="text-sm font-medium text-gray-700">Images</label>
          <input
            id="imageUpload"
            type="file"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 4v8m0 0l-4-4m4 4l4-4" />
              </svg>
              <p className="text-sm text-gray-500">
                {imageFiles.length > 0
                  ? `${imageFiles.length} image(s) selected`
                  : (
                    <>
                      <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                    </>
                  )}
              </p>
              <p className="text-xs text-gray-400">PNG, JPG up to 5MB (Max 4 images)</p>
            </div>
          </label>
          {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
          {imageFiles.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-2">
                {imageFiles.map((it, idx) => (
                  <div key={idx} className="relative">
                    <img src={it.preview} className="w-20 h-20 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() =>
                        setImageFiles(prev => prev.filter((_, i) => i !== idx))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {uploadProgress.length > 0 && (
                <div className="w-full">
                  {uploadProgress.map((p, i) => (
                    <div key={i} className="mb-2">
                      <div className="text-sm">Image {i + 1} - {p}%</div>
                      <div className="w-full bg-gray-200 h-2 rounded">
                        <div className="bg-blue-500 h-2 rounded" style={{ width: `${p}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : form.images.length > 0 ? (
            <div className="flex gap-2 mt-2">
              {form.images.map((url, idx) => (
                <img key={idx} src={url} alt="preview" className="w-20 h-20 object-cover" />
              ))}
            </div>
          ) : null}
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;