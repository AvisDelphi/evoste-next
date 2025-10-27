"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const PRODUCT = [
  {
    id: 1,
    name: "Midnight Cherry",
    notes: "Sweet, Warm, Seductive.",
    price: "Rp 450.000",
    imageUrl:
      "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?auto=format&fit=crop&q=80&w=1169",
    description: `
      Imagine the first kiss after a long-awaited reunion.
      Midnight Cherry captures the warmth of that moment — sweet, intimate,
      and unforgettable. A blend of deep cherry and amber notes creates a seductive scent
      that lingers long after midnight.
    `,
    scentType: "Sweet | Warm | Seductive",
    topNotes: "Cherry, Amber",
    middleNotes: "Vanilla, Rose",
    baseNotes: "Musk, Patchouli",
  },
  {
    id: 2,
    name: "Ivory Bloom",
    notes: "Bright, Romantic, Sensual.",
    price: "Rp 520.000",
    imageUrl:
      "https://images.unsplash.com/photo-1458538977777-0549b2370168?auto=format&fit=crop&q=80&w=1174",
    description: `
      Ivory Bloom is a celebration of love in daylight.
      A floral harmony that dances between innocence and desire — with soft jasmine and radiant white musk forming the heart of the fragrance.
    `,
    scentType: "Floral | Romantic | Soft",
    topNotes: "Jasmine, White Musk",
    middleNotes: "Iris, Peony",
    baseNotes: "Amberwood, Sandalwood",
  },
  {
    id: 3,
    name: "Citrine Flame",
    notes: "Fresh, Masculine, Elegant.",
    price: "Rp 400.000",
    imageUrl:
      "https://images.unsplash.com/photo-1631722670977-60c8b22dfcaf?auto=format&fit=crop&q=80&w=1170",
    description: `
      Citrine Flame radiates quiet confidence — crisp citrus and grounding woods that define modern masculinity. Designed for those who move through the world with purpose and poise.
    `,
    scentType: "Fresh | Citrus | Woody",
    topNotes: "Citrus, Bergamot",
    middleNotes: "Green Tea, Cedar",
    baseNotes: "Amber, Vetiver",
  },
];

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const router = useRouter();

  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(Number(params.id));

  useEffect(() => {
    setSelectedId(Number(id));
  }, [id]);

  const product = PRODUCT.find((p) => p.id === selectedId);

  useEffect(() => {
    const fetchFact = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
        const data = await res.json();
        // API ini pakai field "text" bukan "content"
        setFact(data.text || "Fakta aneh tidak ditemukan hari ini.");
      } catch (err) {
        setFact("Gagal memuat fakta. Internet sedang drama mungkin.");
      } finally {
        setLoading(false);
      }
    };
    fetchFact();
  }, []);

  if (!product) {
    return (
      <main className="bg-black text-white h-screen flex items-center justify-center">
        <p className="text-lg text-gray-400">Product not found</p>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen flex flex-col lg:flex-row">
      {/* Gambar Produk */}
      <div className="lg:w-1/2 w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Detail Produk */}
      <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-light mb-4">{product.name}</h1>
        <p className="text-gray-400 mb-6">{product.notes}</p>

        <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed">
          {product.description}
        </p>

        <div className="text-sm text-gray-400 space-y-2 mb-10">
          <p>
            <span className="font-semibold text-white">Scent Type: </span>
            {product.scentType}
          </p>
          <p>
            <span className="font-semibold text-white">Top Notes: </span>
            {product.topNotes}
          </p>
          <p>
            <span className="font-semibold text-white">Middle Notes: </span>
            {product.middleNotes}
          </p>
          <p>
            <span className="font-semibold text-white">Base Notes: </span>
            {product.baseNotes}
          </p>
        </div>

        <p className="text-xl mb-4">{product.price}</p>

        <div className="flex gap-4">
          <button className="border border-white px-6 py-2 uppercase tracking-widest hover:bg-white hover:text-black transition">
            Add to Cart
          </button>
          <button
            onClick={() => router.push("/")}
            className="border border-gray-400 px-6 py-2 uppercase tracking-widest hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>

        {/* Random Fact Section */}
        <div className="mt-10 text-gray-300 border-t border-gray-700 pt-6">
          <h2 className="text-lg mb-2 font-semibold">Random Fact</h2>
          {loading ? (
            <p className="animate-pulse text-gray-500">Loading...</p>
          ) : (
            <p className="italic text-gray-400">"{fact}"</p>
          )}
        </div>
      </div>
    </main>
  );
}
