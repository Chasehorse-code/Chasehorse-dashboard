import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC<{ onCheckout?: () => void }> = ({ onCheckout }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    shipping,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const navigate = useNavigate();

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CHASEHORSE10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% Corporate Safety Discount applied!' });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "CHASEHORSE10"', error: true });
    }
  };

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, total - discountAmount);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-white border-l border-[#E2DED5] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E2DED5] flex items-center justify-between bg-[#F4F1EA]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#FF4D16]" />
                  <h2 className="text-lg font-bold text-[#171717]">Safety Equipment Cart</h2>
                  <span className="text-xs px-2 py-0.5 bg-white rounded-full font-bold text-[#FF4D16] border border-[#E2DED5]">
                    {items.length} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg text-[#625E58] hover:text-[#171717] hover:bg-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#8C877D]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-base text-[#171717]">Your Cart is Empty</h3>
                    <p className="text-xs text-[#625E58] max-w-xs mx-auto">
                      Explore certified PPE, protective workwear, and safety equipment for your field workforce.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/hse-shop');
                      }}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#FF4D16] text-white rounded-xl text-sm font-semibold hover:bg-[#E53E0B] transition-colors"
                    >
                      <span>Explore HSE Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F4F1EA]/50 rounded-xl border border-[#E2DED5] flex space-x-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#E2DED5]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#171717] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-[#625E58] mt-0.5">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-[#FF4D16]">
                            ₹{item.product.price}
                          </span>
                          <div className="flex items-center space-x-1.5 bg-white border border-[#E2DED5] rounded-md px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-0.5 text-[#625E58] hover:text-[#171717]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-0.5 text-[#625E58] hover:text-[#171717]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-[#8C877D] hover:text-red-500 transition-colors self-start"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#E2DED5] bg-[#FAF8F5] space-y-4">
                  {/* Promo code */}
                  <div className="space-y-1">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Promo Code (CHASEHORSE10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs uppercase bg-white border border-[#E2DED5] rounded-lg focus:outline-none focus:border-[#FF4D16]"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#171717] text-white rounded-lg hover:bg-[#FF4D16] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] ${promoMessage.error ? 'text-red-500' : 'text-green-600'}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#625E58]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#171717]">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Statutory GST (18%)</span>
                      <span>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping (Free over ₹1,500)</span>
                      <span>{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `₹${shipping}`}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Corporate Discount</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-[#171717] pt-2 border-t border-[#E2DED5]">
                      <span>Total Estimated</span>
                      <span className="text-[#FF4D16] text-base">₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      if (onCheckout) {
                        onCheckout();
                      } else {
                        navigate('/hse-shop?action=checkout');
                      }
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-[#FF4D16] text-white rounded-xl font-bold hover:bg-[#E53E0B] transition-all shadow-md hover:shadow-lg"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8C877D]">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>Statutory Tax Invoiced • Pan-India Dispatch</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

