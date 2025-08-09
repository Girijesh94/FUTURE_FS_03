// components/RestaurantsList.jsx
"use client";
import React, { useEffect, useState } from "react";
import { API } from "../lib/api";

export default function RestaurantsList({ onSelect }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    API.get("/restaurants")
      .then(data => { if (mounted) setRestaurants(data); })
      .catch(e => { if (mounted) setErr(e.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-6">Loading restaurants…</div>;
  if (err) return <div className="p-6 text-red-500">Error: {err}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {restaurants.map(r => (
        <div key={r._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.cuisine?.join(", ")}</p>
            </div>
            <div className="text-sm text-yellow-600 font-medium">{r.rating?.toFixed(1) ?? "—"}</div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onSelect(r._id)}
              className="px-3 py-1 rounded bg-sky-500 text-white hover:bg-sky-600"
            >
              View Menu
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
