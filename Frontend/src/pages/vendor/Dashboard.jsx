import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchVendorProfile, updateVendorProfile } from '../../features/vendors/vendorSlice';
import api from '../../utils/api';
const VendorDashboard = () => {
  // would fetch vendor metrics
  const dispatch = useDispatch();
  const authUser = useSelector(s => s.auth.user);
  const { current: vendor } = useSelector(s => s.vendors);
  console.log(vendor)
  console.log(authUser)

  useEffect(() => {
    if (authUser?._id) {
      dispatch(fetchVendorProfile(authUser.vendor._id));
    }
  }, [dispatch, authUser]);


  if (!vendor) {
    return <div className="p-10">Loading vendor...</div>;
  }
  const isOwner = authUser && vendor?.user && String(authUser) === String(vendor.user);

  const handleFileChange = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB");
      return;
    }

    try {
      // 1️⃣ Get Cloudinary signature from backend
      const sigResp = await api.get('/cloudinary-signature');
      const sigParams = sigResp.data; // { apiKey, timestamp, signature, cloudName, folder }

      // 2️⃣ Upload to Cloudinary
      const uploaded = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `https://api.cloudinary.com/v1_1/${sigParams.cloudName}/image/upload`;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('api_key', sigParams.apiKey);
        fd.append('timestamp', sigParams.timestamp);
        fd.append('signature', sigParams.signature);
        fd.append('folder', sigParams.folder);

        xhr.open('POST', url);
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

      // 3️⃣ Send URL as JSON to backend
      const payload = { [type]: uploaded.secure_url }; // e.g. { logo: "https://..." }
      await dispatch(updateVendorProfile({ id: vendor._id, data: payload })).unwrap();

    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    }
  };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden border border-gray-100">
        <div className="h-48 bg-gray-100 relative group">
          {vendor.banner ? (
            <img src={vendor.banner} alt="Vendor banner" className="h-full w-full object-cover" />
          ) : (
            // dashed placeholder when no banner
            <label className={`h-full w-full flex items-center justify-center cursor-pointer ${isOwner ? 'border-2 border-dashed border-gray-300' : ''}`}>
              <div className="text-gray-400 text-center">
                {isOwner ? 'Click to upload banner' : 'No banner'}
              </div>
              {isOwner && <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} />}
            </label>
          )}

          {/* Hover overlay for owner */}
          {isOwner && vendor.banner && (
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <label className="cursor-pointer text-white font-medium">
                Change Banner
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} />
              </label>
            </div>
          )}
        </div>

        {/* Logo */}

      </div>
        <div className="space-y-6">
          {/* Header + Logo Row */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative h-20 w-20 rounded-full border-4 border-gray-200 bg-gray-100 overflow-hidden flex-shrink-0 group">
              {vendor.logo ? (
                <img src={vendor.logo} alt="Vendor logo" className="h-full w-full object-cover rounded-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xl font-semibold">
                  V
                </div>
              )}

              {isOwner && (
                <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                  <label className="text-xs text-white">
                    Edit
                    <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} />
                  </label>
                </div>
              )}
            </div>

            <header>
              <h1 className="text-2xl font-semibold text-gray-900">Vendor Dashboard</h1>
              <p className="text-sm text-gray-600">
                Monitor your sales, payouts, and storefront performance.
              </p>
            </header>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Revenue (placeholder)
              </p>
              <p className="text-2xl font-semibold text-gray-900">$ {vendor.totalRevenue?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Orders (placeholder)
              </p>
              <p className="text-2xl font-semibold text-gray-900">{vendor.totalOrders || '0'}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Products (placeholder)
              </p>
              <p className="text-2xl font-semibold text-gray-900">{vendor.totalProducts || '0'}</p>
            </div>
          </div>

          <div className="card p-4 text-sm text-gray-600">
            Revenue, fees, net earnings, and charts can be surfaced here once the backend
            metrics are wired up.
          </div>
        </div>
      </>
      );
};

      export default VendorDashboard;