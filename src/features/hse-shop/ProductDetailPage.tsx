import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HSE_PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  RefreshCcw, 
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = HSE_PRODUCTS.find((p) => p.slug === productSlug);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.variants?.sizes ? product.variants.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.variants?.colors ? product.variants.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#171717]">Product Not Found</h2>
        <p className="text-sm text-[#625E58]">The safety equipment item could not be found.</p>
        <Link
          to="/hse-shop"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#FF4D16] text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to HSE Shop</span>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="w-full bg-[#F4F1EA] py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#625E58]">
          <Link to="/" className="hover:text-[#FF4D16]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <Link to="/hse-shop" className="hover:text-[#FF4D16]">HSE Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <span className="font-bold text-[#171717]">{product.name}</span>
        </nav>

        {/* Product Main Container */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Gallery Column (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E2DED5] h-[340px] sm:h-[440px]">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 rounded-lg text-xs font-bold text-[#171717] border border-[#E2DED5]">
                  {product.categoryLabel}
                </div>
              </div>

              {/* Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex items-center space-x-3">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        (selectedImage || product.image) === img
                          ? 'border-[#FF4D16] shadow-sm'
                          : 'border-[#E2DED5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Purchase Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Standards Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {product.standards.map((std, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#FAF8F5] text-[#FF4D16] rounded-md border border-[#E2DED5]"
                    >
                      {std}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="ml-1">{product.rating}</span>
                  </div>
                  <span className="text-[#8C877D]">•</span>
                  <span className="text-[#625E58]">{product.reviewsCount} verified enterprise reviews</span>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] flex items-baseline space-x-3">
                  <span className="text-3xl font-extrabold text-[#171717] font-mono">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#8C877D] line-through font-mono">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#625E58]">exclusive of 18% statutory GST</span>
                </div>

                <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                  {product.description}
                </p>

                {/* Size Variants */}
                {product.variants?.sizes && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-[#171717] block">
                      Select Size / Rating:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                            selectedSize === size
                              ? 'bg-[#171717] text-white border-[#171717]'
                              : 'bg-[#FAF8F5] text-[#171717] border-[#E2DED5] hover:border-[#171717]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Variants */}
                {product.variants?.colors && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-[#171717] block">
                      Select Safety Color:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-2 transition-colors ${
                            selectedColor === color.name
                              ? 'border-[#FF4D16] bg-[#FFF0EB]'
                              : 'border-[#E2DED5] bg-white hover:border-[#171717]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-[#171717] block">Order Quantity:</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-[#FAF8F5] border border-[#E2DED5] rounded-xl px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 text-[#625E58] hover:text-[#171717]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-xs font-bold text-[#171717] font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 text-[#625E58] hover:text-[#171717]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-[#8C877D]">
                      Total: ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="pt-6 border-t border-[#E2DED5] space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors flex items-center justify-center space-x-2 shadow-lg text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Safety Cart</span>
                </button>

                <div className="grid grid-cols-2 gap-3 text-[11px] text-[#625E58]">
                  <div className="flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-[#FF4D16]" />
                    <span>Free Pan-India Delivery &gt; ₹1,500</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RefreshCcw className="w-4 h-4 text-[#FF4D16]" />
                    <span>30-Day Hassle-Free Sizing Exchange</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-10 shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-[#171717]">Technical Specifications & Standards</h3>
          <div className="divide-y divide-[#E2DED5]/60 border-t border-[#E2DED5]/60 text-xs">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="font-bold text-[#171717]">{key}</span>
                <span className="sm:col-span-2 text-[#625E58]">{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

