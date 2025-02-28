import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../services/productsApi";
import ProductCard from "./ProductCard";
import Categories from "./Categories";

const Products = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    select: (data) => {
      if (!data) return [];
      
      // Get unique categories and sort them to ensure consistent order
      const categories = [...new Set(data.map(p => p.category_product))].sort();
      
      // Use the current date as a seed for randomization
      const today = new Date().toDateString();
      const seededRandom = (seed: string) => {
        const x = Math.sin(Array.from(seed).reduce((a, b) => {
          return a + b.charCodeAt(0);
        }, 0)) * 10000;
        return x - Math.floor(x);
      };
      
      // Select 2 products from each category using seeded random
      const randomProducts = categories.flatMap(category => {
        const categoryProducts = data.filter(p => p.category_product === category);
        const shuffled = [...categoryProducts].sort(() => 
          seededRandom(`${today}-${category}`) - 0.5
        );
        return shuffled.slice(0, 2);
      });
      
      // Final shuffle with same seed
      return randomProducts.sort(() => 
        seededRandom(today) - 0.5
      );
    }
  });

  // Navigation handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Enable/disable navigation buttons
  const [prevEnabled, setPrevEnabled] = React.useState(false);
  const [nextEnabled, setNextEnabled] = React.useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (error) {
    console.error("Error loading products:", error);
    return <div className="text-center text-red-500">Failed to load products</div>;
  }

  return (
    <div className="products-wrapper">
      <div className="products-container">
        <h1 className="products-title">Nos produits</h1>
        <Categories />
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="skeleton-card"></div>
                  </div>
                ))
              : products?.map((product) => (
                  <div className="embla__slide" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        </div>
        <button
          className={`embla__button embla__button--prev ${
            !prevEnabled && "embla__button--disabled"
          }`}
          onClick={scrollPrev}
          disabled={!prevEnabled}
        >
          <div>{'<'}</div>
        </button>
        <button
          className={`embla__button embla__button--next ${
            !nextEnabled && "embla__button--disabled"
          }`}
          onClick={scrollNext}
          disabled={!nextEnabled}
        >
          <div>{'>'}</div>
        </button>
      </div>
      <style>
        {`
        .products-wrapper {
          width: 100%;
          overflow: hidden;
          background-color: #f9fafb;
          position: relative;
        }
        .products-container {
          margin: 0 auto;
          padding: 2rem 1rem;
          max-width: 1200px;
        }
        .products-title {
          font-size: 2rem;
          text-align: center;
          color: #700100;
          margin-bottom: 2rem;
          font-family: "WomanFontBold";
        }
        .embla {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .embla__container {
          display: flex;
          gap: 1rem;
          transition: transform 0.3s ease;
        }
        .embla__slide {
          min-width: 300px;
          flex: 0 0 auto;
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .skeleton-card {
          height: 400px;
          width: 100%;
          background-color: #e5e7eb;
          border-radius: 8px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { background-color: #e5e7eb; }
          50% { background-color: #d1d5db; }
          100% { background-color: #e5e7eb; }
        }
        .embla__button {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -40%);
          background-color: #700100;
          color: white;
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3.5rem;
          font-weight: bold;
          cursor: pointer;
          z-index: 10;
          transition: background-color 0.3s ease;
        }
        .embla__button--prev { left: 2rem; }
        .embla__button div {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          font-size: 3.25rem;
          margin: 10px;
          top: 4px;
          right: 3px;
          bottom: 100px;
        }
        .embla__button--next { right: 2rem; }
        .embla__button:hover { background-color: #000; }
        .embla__button--disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
        }
        `}
      </style>
    </div>
  );
};

export default Products;