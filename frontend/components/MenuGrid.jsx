// components/MenuGrid.jsx
"use client";
import React from "react";

export default function MenuGrid({ items = [], onAddToCart }) {
  if (!items.length) return <div className="p-6">No menu items found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map(item => (
        <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gray-100">
            <img src={item.image} alt={item.name} className="object-cover w-full h-full"/>
          </div>
          <div className="p-4">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-lg font-bold">₹{item.price}</div>
              <button
                onClick={() => onAddToCart?.(item)}
                className="px-3 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
