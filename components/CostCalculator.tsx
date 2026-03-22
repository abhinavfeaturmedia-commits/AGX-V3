
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, TrendingDown } from 'lucide-react';

const AnimatedValue = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const duration = 500; // 0.5 seconds
    const diff = value - start;
    const increment = diff / (duration / 16); // 60fps
    
    if (diff === 0) return;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= value) || (increment < 0 && start <= value)) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>${displayValue.toLocaleString()}</span>;
};

const CostCalculator: React.FC = () => {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(100);

  const monthlyLoss = hours * rate * 4;
  const yearlyLoss = monthlyLoss * 12;
  const dailyLoss = Math.round(monthlyLoss / 30);

  return (
    <section className="px-6 md:px-12 lg:px-24 py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col gap-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="bg-white/5 text-white/60 px-3 py-1.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-full border border-white/10 backdrop-blur-sm">
            <AlertCircle size={14} />
            Warning: Financial Leak Detected
          </div>
          <h2 
            className="text-5xl md:text-7xl font-normal text-white uppercase tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE COST OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">INACTION</span>
          </h2>
          <p className="text-white/60 max-w-2xl text-lg font-light">
            Every hour you spend on admin is an hour you aren't growing your business. Do the math.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="flex flex-col gap-12 justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Hours Wasted / Week</label>
                <div className="text-white/80 text-lg font-bold font-mono">{hours} hrs</div>
              </div>
              <input 
                type="range" min="1" max="60" value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="accent-white"
              />
              <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                <span>1 hr</span>
                <span>Part-time (20)</span>
                <span>Full-time (40+)</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Your Hourly Value</label>
                <div className="text-white/80 text-lg font-bold font-mono">${rate}</div>
              </div>
              <input 
                type="range" min="25" max="1000" step="25" value={rate} 
                onChange={(e) => setRate(parseInt(e.target.value))}
                className="accent-white"
              />
              <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                <span>$25</span>
                <span>Consultant ($200)</span>
                <span>CEO ($1000)</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-white/5"></div>
            
            <div className="text-xs font-bold uppercase text-white/50 tracking-widest">You are setting fire to:</div>
            <motion.div 
              key={monthlyLoss}
              initial={{ scale: 1.1, color: '#ffffff' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-6xl md:text-7xl font-normal text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <AnimatedValue value={monthlyLoss} />
            </motion.div>
            <div className="text-xs font-bold uppercase text-white/40">Per Month</div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-3">
                <TrendingDown size={18} className="text-white/60" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
                  That is <AnimatedValue value={yearlyLoss} /> per year
                </span>
              </div>
              <div className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest mt-1 border-t border-white/5 pt-2 w-full">
                Every day you delay costs you ${dailyLoss.toLocaleString()}
              </div>
            </div>

            <a href="https://wa.me/918698324316" target="_blank" rel="noopener noreferrer" className="liquid-glass w-full relative h-[56px] flex items-center justify-center transition-transform duration-200 hover:scale-[1.03] active:scale-95 group mt-4 rounded-xl">
              <span 
                className="relative z-10 text-white font-medium tracking-wide uppercase text-[14px]"
              >
                Get a free process audit
              </span>
            </a>
            
            <div className="flex items-start text-left gap-2 text-white/70 text-xs font-medium tracking-wide mt-2">
              <span className="text-emerald-400 shrink-0 mt-0.5">🛡️</span> 
              <span>If we don't save you at least 10 hours/week in 30 days, we'll work for free for the next months until we do that.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostCalculator;
