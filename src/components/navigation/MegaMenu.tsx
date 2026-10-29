import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MegaMenuData } from '../../data/navigation';
import { ArrowRight, ChevronRight, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  data: MegaMenuData;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.985 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 right-0 w-full pt-3 z-50 pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E2DED5] shadow-2xl p-6 lg:p-8 overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left/Featured Showcase Card (4 cols) with Mouse Hover Flow Motion */}
            {data.featuredTitle && (
              <motion.div 
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="col-span-12 lg:col-span-4 bg-[#F4F1EA] rounded-2xl p-6 flex flex-col justify-between border border-[#E2DED5] shadow-sm relative overflow-hidden group"
              >
                <div>
                  {data.featuredImage && (
                    <div className="rounded-xl overflow-hidden mb-4 h-40 w-full shadow-sm relative">
                      <img
                        src={data.featuredImage}
                        alt={data.featuredTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#FF4D16] text-white text-[10px] font-mono font-bold uppercase">
                        Featured Blueprint
                      </span>
                    </div>
                  )}

                  <h3 className="font-extrabold text-xl text-[#171717] mb-2 group-hover:text-[#FF4D16] transition-colors">
                    {data.featuredTitle}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed mb-6">
                    {data.featuredDescription}
                  </p>
                </div>

                {data.featuredCtaText && data.featuredCtaPath && (
                  <Link
                    to={data.featuredCtaPath}
                    onClick={onClose}
                    className="inline-flex items-center justify-between w-full px-4 py-3 bg-[#FF4D16] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#E53E0B] transition-colors group shadow-sm"
                  >
                    <span>{data.featuredCtaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </motion.div>
            )}

            {/* Middle & Right Columns: Nav Section Pop Cards (8 cols) */}
            <div className={`col-span-12 ${data.featuredTitle ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center space-x-2 border-b border-[#E2DED5] pb-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF4D16]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                        {section.title}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {section.items.map((item, itemIdx) => {
                        const isExternal = item.external || item.path.startsWith('http');
                        
                        const CardContent = (
                          <motion.div 
                            whileHover={{ scale: 1.015, x: 4 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="group flex items-start space-x-3.5 p-3 rounded-xl border border-transparent hover:border-[#E2DED5] hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-none hover:shadow-sm"
                          >
                            {/* Optional Item Image or Glowing Dot */}
                            {item.image ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#E2DED5]/60 border border-[#E2DED5]">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="mt-1 w-2 h-2 rounded-full bg-[#E2DED5] group-hover:bg-[#FF4D16] group-hover:scale-125 transition-all shrink-0" />
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-[#171717] group-hover:text-[#FF4D16] transition-colors leading-tight">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#FFF0EB] text-[#FF4D16] rounded border border-[#FF4D16]/20">
                                    {item.badge}
                                  </span>
                                )}
                                {isExternal && (
                                  <ExternalLink className="w-3 h-3 text-[#8C877D] group-hover:text-[#FF4D16]" />
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-[#625E58] mt-1 line-clamp-1 leading-snug">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            <ChevronRight className="w-4 h-4 text-[#8C877D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#FF4D16] transition-all self-center shrink-0" />
                          </motion.div>
                        );

                        return (
                          <div key={itemIdx}>
                            {isExternal ? (
                              <a
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="block"
                              >
                                {CardContent}
                              </a>
                            ) : (
                              <Link to={item.path} onClick={onClose} className="block">
                                {CardContent}
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions Footer inside Mega Menu */}
              {data.quickActions && data.quickActions.length > 0 && (
                <div className="mt-8 pt-4 border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] -mx-6 -mb-6 p-4 lg:-mx-8 lg:-mb-8 lg:p-4 rounded-b-3xl">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#625E58]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4D16]" />
                    <span>Instant Operations Deployment Available Across India</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {data.quickActions.map((action, aIdx) => {
                      if (action.variant === 'whatsapp') {
                        return (
                          <a
                            key={aIdx}
                            href={action.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{action.label}</span>
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={aIdx}
                          to={action.path}
                          onClick={onClose}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                            action.variant === 'primary'
                              ? 'bg-[#FF4D16] text-white hover:bg-[#E53E0B] shadow-sm'
                              : 'bg-white border border-[#E2DED5] text-[#171717] hover:border-[#171717]'
                          }`}
                        >
                          {action.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};
