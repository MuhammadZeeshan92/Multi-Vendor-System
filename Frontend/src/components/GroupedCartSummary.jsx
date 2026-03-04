import React from 'react';

const groupByVendor = (items) => {
  return items.reduce((acc, item) => {
    const vid = item.vendor?._id || item.vendorId;
    const vendor =
      item.vendor || (vid ? { _id: vid, name: item.vendorName || 'Vendor' } : { name: 'Vendor' });
    if (!acc[vid || 'unknown']) {
      acc[vid || 'unknown'] = { vendor, items: [], subtotal: 0 };
    }
    acc[vid || 'unknown'].items.push(item);
    acc[vid || 'unknown'].subtotal += item.price * item.qty;
    return acc;
  }, {});
};

const GroupedCartSummary = ({ items }) => {
  const grouped = groupByVendor(items || []);
  const groups = Object.values(grouped);

  if (!groups.length) return null;

  return (
    <div className="space-y-4">
      {groups.map((group,index) => {
        const { vendor, items: vendorItems, subtotal } = group;
        const platformFee = subtotal * 0.1;
        const vendorPayout = subtotal - platformFee;

        return (
          <section
            key={group.vendor._id || `vendor-${index}`}
            className="card p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden">
                  {vendor.logo ? (
                    <img
                      src={vendor.logo}
                      alt={vendor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-indigo-600">
                      {vendor.name?.[0] || 'V'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {vendor.name || 'Vendor'}
                  </p>
                  {typeof vendor.rating === 'number' && (
                    <p className="text-xs text-gray-500">
                      ⭐ {vendor.rating.toFixed(1)} / 5
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Items: {vendorItems.length}</p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {vendorItems.map((item) => (
                <div
                  key={`${item.productId}-${item.vendorId}`}
                  className="py-2 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.qty} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <p>Vendor subtotal</p>
                <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p>Platform fee (10%)</p>
                <p className="font-semibold text-gray-900">${platformFee.toFixed(2)}</p>
                <p className="text-[11px] text-gray-500">
                  Vendor payout ${vendorPayout.toFixed(2)}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default GroupedCartSummary;

