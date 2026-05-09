import { useState } from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ products }) {
  const [search, setSearch] = useState("");

  const filteredProducts = (products || []).filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.category?.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className="flex flex-col gap-8">
      <div className="relative max-w-xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="block w-full pl-11 pr-4 py-3.5 sm:text-sm bg-slate-950/50 border border-slate-700/80 rounded-2xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          type="text"
          placeholder="Search for products, brands and more..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-300">No products found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
}