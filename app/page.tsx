"use client";
import React, { useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  notes: string;
  price: string;
  imageUrl: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Midnight Cherry",
    notes: "Sweet, Warm, Seductive.",
    price: "Rp 450.000",
    imageUrl:
      "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1169",
  },
  {
    id: 2,
    name: "Ivory Bloom",
    notes: "Bright, Romantic, Sensual.",
    price: "Rp 520.000",
    imageUrl:
      "https://images.unsplash.com/photo-1458538977777-0549b2370168?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1174",
  },
  {
    id: 3,
    name: "Citrine Flame",
    notes: "Fresh, Masculine, Elegant.",
    price: "Rp 400.000",
    imageUrl:
      "https://images.unsplash.com/photo-1631722670977-60c8b22dfcaf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  },
];

const Home: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    mood: "",
    time: "",
    style: "",
  });

  const handleAnswer = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
    setStep(step + 1);
  };

  const getRecommendation = () => {
    if (answers.mood === "romantis") return PRODUCTS[1];
    if (answers.mood === "maskulin") return PRODUCTS[2];
    return PRODUCTS[0];
  };

  const recommended = getRecommendation();

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-black">
        <h1 className="text-5xl font-light tracking-wide mb-6">Evoste</h1>
        <p className="text-lg text-gray-300 mb-10 italic">
          "Your scent. Their memory. Forever."
        </p>
        <p className="text-gray-400 leading-relaxed max-w-2xl text-center">
          EVOSTE is more than a fragrance brand - it is a journey through the senses.
          Each bottle holds a curated collection of exclusive scents, inspired by deep emotions,
          unforgettable moments, and the untamed richness of nature.
          <br />
          <br />
          Our fragrances are a tribute to elegance, authenticity, and individuality — designed for those who desire more than just perfume.
          They are for those who seek connection, presence, and identity in every spritz.
          With EVOSTE, scent becomes a signature, a statement, and a story.
        </p>
      </section>

      {/* Catalog Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto bg-linear-to-b from-black via-gray-900 to-gray-800 transition-colors duration-700">
        <h2 className="text-3xl font-light text-white mb-10 text-center">
          Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black p-6 flex flex-col items-center rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-medium mb-2">{product.name}</h3>
              <p className="text-lg mb-4">{product.notes}</p>
              <p className="text-lg mb-4">{product.price}</p>
              <Link
                href={`/product/${product.id}`}
                className="border border-black px-5 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Quiz */}
      <section className="bg-linear-to-b from-gray-800 via-gray-900 to-black py-16 text-center transition-colors duration-700">
        <h2 className="text-3xl font-light mb-8">Find Your Perfect Scent</h2>

        {step === 0 && (
          <div>
            <p className="mb-4 text-gray-300">What’s your current mood?</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => handleAnswer("mood", "romantis")}
                className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
              >
                Romantic
              </button>
              <button
                onClick={() => handleAnswer("mood", "maskulin")}
                className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
              >
                Masculine
              </button>
              <button
                onClick={() => handleAnswer("mood", "misterius")}
                className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
              >
                Mysterious
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-8">
            <p className="mb-4 text-gray-300">When do you usually wear perfume?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAnswer("time", "day")}
                className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
              >
                Daytime
              </button>
              <button
                onClick={() => handleAnswer("time", "night")}
                className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
              >
                Night
              </button>
            </div>
          </div>
        )}

        {step > 1 && (
          <div className="mt-10">
            <h3 className="text-2xl font-light mb-4">Recommended for you:</h3>
            <p className="text-lg text-gray-300 mb-4">{recommended.name}</p>
            <Link
              href={`/product/${recommended.id}`}
              className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
            >
              View {recommended.name}
            </Link>
            <div className="mt-6">
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers({ mood: "", time: "", style: "" });
                }}
                className="text-sm text-gray-400 underline hover:text-gray-200"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 text-center">
        <h2 className="text-2xl mb-4 font-light">Stay Connected</h2>
        <p className="mb-4 text-gray-300">
          Let your story linger in every breath — make your scent unforgettable.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://instagram.com/hafidz.marsya"
            target="_blank"
            className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="border border-white px-5 py-2 hover:bg-white hover:text-black transition"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;