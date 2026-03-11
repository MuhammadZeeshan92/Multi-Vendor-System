import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorSales,updateOrderStatus } from '../../features/orders/orderSlice';
import PageHero from '../../components/PageHero';
import Page from '../../components/Page';
import Button from '../../components/Button'; 
import Spinner from '../../components/Spinner';

const VendorSales = () => {
  const dispatch = useDispatch();
  const { vendorSales, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchVendorSales());
  }, [dispatch]);

  if (status === 'loading') return <Spinner />;

  return (
    <div className="bg-gray-50/50 min-h-screen pb-12">
      <PageHero 
        title="My Sales" 
        subtitle="Track your revenue and manage your incoming orders in real-time."
        gradient="from-emerald-600 via-teal-700 to-cyan-800"
      />

      <Page className="container -mt-8 relative z-10 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Recent Sales</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders:</span>
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                {vendorSales.length}
              </span>
            </div>
          </div>

          <ul className="space-y-4">
            {vendorSales.length === 0 && (
              <li className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-lg shadow-gray-200/50">
                <div className="text-4xl mb-4">💹</div>
                <h3 className="text-lg font-bold text-gray-900">No Sales Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  When customers purchase your products, they will appear here as transactions.
                </p>
              </li>
            )}
            {vendorSales.map((o) => (
              <li key={o._id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group border-l-4 border-l-emerald-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="font-black text-gray-900 text-lg">Order #{o._id.slice(-8)}</p>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        o.status === "paid" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {o.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                      Placed on {new Date(o.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Payout</p>
                      <p className="text-lg font-black text-emerald-600">${(o.totalAmount * 0.9).toFixed(2)}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
                  <div className="space-y-3 col-span-2">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Items Sold</h4>
                    <div className="space-y-2">
                      {o.orderItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-50/50 p-3 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-bold text-indigo-600 border border-gray-100 shadow-sm">
                              {item.quantity}
                            </span>
                            <p className="text-sm font-semibold text-gray-700">{item.name}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-indigo-50/30 rounded-2xl p-4 space-y-3">
                    <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Financial Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Gross Revenue</span>
                        <span className="font-bold text-gray-900">${o.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Platform Fee (10%)</span>
                        <span className="font-bold text-rose-500">-${(o.totalAmount * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-indigo-100 flex justify-between">
                        <span className="text-xs font-bold text-indigo-900">Your Net</span>
                        <span className="text-sm font-black text-indigo-700">${(o.totalAmount * 0.9).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </div>
  );
};

export default VendorSales;