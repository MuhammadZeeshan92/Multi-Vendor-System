import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../features/products/productSlice';
import Spinner from '../../components/Spinner';
import { addItem } from '../../features/cart/cartSlice';
import Button from '../../components/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status } = useSelector((state) => state.products);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === 'loading' || !current) return <Spinner />;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: current._id,
        name: current.name,
        price: current.price,
        qty,
        image: current.images?.[0] || '',
        vendorId: current.vendorId,
        stock: current.stock,
      })
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <img
            src={current.images?.[0]}
            alt={current.name}
            className="rounded-lg w-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">{current.name}</h1>
          <p className="text-gray-700 mb-4">{current.description}</p>
          <p className="text-xl font-bold mb-4">${current.price}</p>
          <p className="mb-4">
            Stock:{' '}
            <span
              className={`${
                current.stock > 5
                  ? 'bg-emerald-100 text-emerald-700'
                  : current.stock > 0
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
              } px-2 rounded-full`}
            >
              {current.stock}
            </span>
          </p>
          <div className="flex items-center mb-4">
            <input
              type="number"
              min="1"
              max={current.stock}
              value={qty}
              onChange={(e) => setQty(Math.min(current.stock, +e.target.value))}
              className="w-20 border border-gray-300 rounded-md px-2 py-1"
            />
          </div>
          <Button onClick={handleAddToCart} disabled={current.stock === 0}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;