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
        try { URL.revokeObjectURL(it.preview); } catch (e) {}
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
    if (files.length > maxFiles) {
      alert(`You can upload up to ${maxFiles} images. Only the first ${maxFiles} will be used.`);
    }

    const limited = files.slice(0, maxFiles);
    const previews = limited.map((f) => ({ file: f, preview: URL.createObjectURL(f) }));
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
    <div className="container mx-auto py-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <div>
          <label className="text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
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
        <div>
          <label className="text-gray-700">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="block w-full"
          />
          {uploading && <p>Uploading...</p>}
          {imageFiles.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-2">
                {imageFiles.map((it, idx) => (
                  <img key={idx} src={it.preview} alt="preview" className="w-20 h-20 object-cover" />
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddProduct;