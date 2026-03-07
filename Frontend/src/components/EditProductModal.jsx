// VendorProducts.jsx (add near top of file)
import { useState, useEffect } from 'react';
import api from '../utils/api';

const emptyForm = { name:'',description:'',price:'',category:'',stock:'',images:[] };

function EditProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        images: product.images || [],
      });
    }
  }, [product]);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.put(`/products/${product._id}`, form);
      onSaved(res.data);          // notify parent of updated product
      onClose();
    } catch (err) {
      console.error('update failed', err);
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} required
                 className="w-full border px-2 py-1"/>
          <textarea name="description" value={form.description}
                    onChange={handleChange} className="w-full border px-2 py-1"/>
          <input name="price" type="number" value={form.price} onChange={handleChange}
                 className="w-full border px-2 py-1" required/>
          <input name="category" value={form.category} onChange={handleChange}
                 className="w-full border px-2 py-1"/>
          <input name="stock" type="number" value={form.stock} onChange={handleChange}
                 className="w-full border px-2 py-1"/>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;