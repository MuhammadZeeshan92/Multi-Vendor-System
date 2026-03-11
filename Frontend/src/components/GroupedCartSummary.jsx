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
            className="card p-4 md:p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
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
                  className="py-3 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-11 w-11 rounded-xl object-cover border border-gray-100"
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

            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-gray-500">Subtotal</p>
                <p className="font-semibold text-gray-900 text-sm">${subtotal.toFixed(2)}</p>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-gray-500">Platform fee (10%)</p>
                <p className="font-semibold text-gray-900 text-sm">${platformFee.toFixed(2)}</p>
              </div>
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2 sm:text-right">
                <p className="text-[11px] uppercase tracking-wide text-indigo-700/80">Vendor payout</p>
                <p className="font-semibold text-gray-900 text-sm">${vendorPayout.toFixed(2)}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default GroupedCartSummary;

