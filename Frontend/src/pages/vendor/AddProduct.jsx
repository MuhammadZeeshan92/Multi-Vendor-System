import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    const urls = [];

    for (let file of files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const result = await res.json();
      urls.push(result.secure_url);
    }

    setForm({ ...form, images: urls });
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/vendor/products', form);
    window.location.href = '/vendor/products';
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
          {form.images.length > 0 && (
            <div className="flex gap-2 mt-2">
              {form.images.map((url, idx) => (
                <img key={idx} src={url} alt="preview" className="w-20 h-20 object-cover" />
              ))}
            </div>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddProduct;