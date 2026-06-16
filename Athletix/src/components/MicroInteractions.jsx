import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, ShoppingCart, AlertCircle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './MicroInteractions.css';

// ============================================
// Flying Cart Animation
// ============================================
export const FlyingCartAnimation = ({
    isActive,
    startPosition,
    endPosition,
    onComplete
}) => {
    if (!isActive || !startPosition || !endPosition) return null;

    return (
        <motion.div
            className="flying-cart-item"
            initial={{
                position: 'fixed',
                left: startPosition.x,
                top: startPosition.y,
                scale: 1,
                opacity: 1,
                zIndex: 9999
            }}
            animate={{
                left: endPosition.x,
                top: endPosition.y,
                scale: 0.2,
                opacity: 0.5
            }}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onAnimationComplete={onComplete}
        >
            <ShoppingCart size={24} />
        </motion.div>
    );
};

// ============================================
// Heart Burst Animation (for Wishlist)
// ============================================
export const HeartBurstAnimation = ({ isActive, onComplete }) => {
    const particles = Array.from({ length: 8 }, (_, i) => i);

    if (!isActive) return null;

    return (
        <div className="heart-burst-container">
            <motion.div
                className="heart-main"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1.3, 1],
                    opacity: [0, 1, 1]
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onAnimationComplete={onComplete}
            >
                <Heart size={24} fill="currentColor" />
            </motion.div>

            {particles.map((i) => (
                <motion.div
                    key={i}
                    className="heart-particle"
                    initial={{
                        scale: 0,
                        opacity: 1,
                        x: 0,
                        y: 0
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                        x: Math.cos((i * Math.PI * 2) / 8) * 40,
                        y: Math.sin((i * Math.PI * 2) / 8) * 40
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1
                    }}
                >
                    <Heart size={10} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

// ============================================
// Ripple Effect Button
// ============================================
export const RippleButton = ({
    children,
    onClick,
    className = '',
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            id: Date.now(),
            x,
            y
        };

        setRipples(prev => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        onClick?.(e);
    };

    return (
        <button
            className={`ripple-button ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
            <span className="ripple-container">
                {ripples.map(ripple => (
                    <span
                        key={ripple.id}
                        className="ripple"
                        style={{
                            left: ripple.x,
                            top: ripple.y
                        }}
                    />
                ))}
            </span>
        </button>
    );
};

// ============================================
// Success Confetti
// ============================================
export const SuccessConfetti = ({ isActive, onComplete }) => {
    const colors = ['#e63946', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    const confettiCount = 50;

    if (!isActive) return null;

    return (
        <div className="confetti-container">
            {Array.from({ length: confettiCount }).map((_, i) => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const delay = Math.random() * 0.5;
                const rotation = Math.random() * 360;
                const size = 5 + Math.random() * 10;

                return (
                    <motion.div
                        key={i}
                        className="confetti-piece"
                        style={{
                            left: `${left}%`,
                            backgroundColor: color,
                            width: size,
                            height: size * 0.4,
                        }}
                        initial={{
                            top: -20,
                            rotate: rotation,
                            opacity: 1
                        }}
                        animate={{
                            top: '100vh',
                            rotate: rotation + 720,
                            opacity: [1, 1, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random(),
                            delay,
                            ease: "easeIn"
                        }}
                        onAnimationComplete={i === 0 ? onComplete : undefined}
                    />
                );
            })}
        </div>
    );
};

// ============================================
// Animated Counter
// ============================================
export const AnimatedCounter = ({ value, duration = 500 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const startValue = displayValue;
        const endValue = value;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuad = 1 - Math.pow(1 - progress, 2);

            const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuad);
            setDisplayValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return (
        <motion.span
            key={value}
            initial={{ scale: 1.2, color: 'var(--color-red)' }}
            animate={{ scale: 1, color: 'inherit' }}
            transition={{ duration: 0.3 }}
        >
            {displayValue}
        </motion.span>
    );
};

// ============================================
// Shake Animation (for validation errors)
// ============================================
export const ShakeWrapper = ({ children, shake }) => {
    return (
        <motion.div
            animate={shake ? {
                x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
            } : {}}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// Staggered List Animation
// ============================================
export const StaggeredList = ({ children, staggerDelay = 0.1 }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggeredItem = ({ children }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4,
                        ease: "easeOut"
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// Toast Notification System
// ============================================
let toastId = 0;
const toastListeners = new Set();

export const toast = {
    success: (message) => addToast('success', message),
    error: (message) => addToast('error', message),
    info: (message) => addToast('info', message),
    cart: (productName) => addToast('cart', `${productName} added to cart!`),
    wishlist: (productName, added = true) =>
        addToast('wishlist', `${productName} ${added ? 'added to' : 'removed from'} wishlist!`)
};

const addToast = (type, message) => {
    const newToast = {
        id: ++toastId,
        type,
        message
    };
    toastListeners.forEach(listener => listener(newToast));
};

export const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const listener = (toast) => {
            setToasts(prev => [...prev, toast]);

            // Auto remove after 3 seconds
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id));
            }, 3000);
        };

        toastListeners.add(listener);
        return () => toastListeners.delete(listener);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <Check size={18} />;
            case 'error': return <AlertCircle size={18} />;
            case 'cart': return <ShoppingCart size={18} />;
            case 'wishlist': return <Heart size={18} fill="currentColor" />;
            default: return <Info size={18} />;
        }
    };

    return (
        <div className="toast-container">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div
                        key={t.id}
                        className={`toast toast-${t.type}`}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="toast-icon">
                            {getIcon(t.type)}
                        </div>
                        <span className="toast-message">{t.message}</span>
                        <button
                            className="toast-close"
                            onClick={() => removeToast(t.id)}
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// Pulse Badge (for notification count)
// ============================================
export const PulseBadge = ({ count, children }) => {
    return (
        <div className="pulse-badge-container">
            {children}
            <AnimatePresence>
                {count > 0 && (
                    <motion.span
                        className="pulse-badge"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                        <motion.span
                            key={count}
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {count > 99 ? '99+' : count}
                        </motion.span>
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// Hover Scale Card
// ============================================
export const HoverScaleCard = ({ children, className = '', scale = 1.02 }) => {
    return (
        <motion.div
            className={`hover-scale-card ${className}`}
            whileHover={{ scale, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// Skeleton Loading
// ============================================
export const Skeleton = ({
    width = '100%',
    height = 20,
    borderRadius = 'var(--radius-md)',
    className = ''
}) => {
    return (
        <motion.div
            className={`skeleton-loader ${className}`}
            style={{ width, height, borderRadius }}
            animate={{
                backgroundPosition: ['200% 0', '-200% 0']
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="product-card-skeleton">
            <Skeleton height={250} borderRadius="var(--radius-lg)" />
            <div className="skeleton-content">
                <Skeleton width="60%" height={14} />
                <Skeleton width="80%" height={18} />
                <Skeleton width="40%" height={20} />
            </div>
        </div>
    );
};
