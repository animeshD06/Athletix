import { useState, useRef, useEffect } from 'react';
import { RotateCcw, Play, Pause, Maximize2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductViewer360.css';

const ProductViewer360 = ({
    images = [],
    productName = 'Product',
    autoRotate = false,
    autoRotateSpeed = 1500 // Slower for multi-angle viewing (1.5s per frame)
}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoRotate);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(0);

    const containerRef = useRef(null);
    const startXRef = useRef(0);
    const autoPlayRef = useRef(null);

    // Preload all images
    useEffect(() => {
        if (images.length === 0) return;

        setIsLoading(true);
        setLoadedImages(0);

        images.forEach((src) => {
            const img = new Image();
            img.onload = () => {
                setLoadedImages(prev => {
                    const newCount = prev + 1;
                    if (newCount >= images.length) {
                        setIsLoading(false);
                    }
                    return newCount;
                });
            };
            img.onerror = () => {
                setLoadedImages(prev => prev + 1);
            };
            img.src = src;
        });
    }, [images]);

    // Auto-rotate logic
    useEffect(() => {
        if (isAutoPlaying && !isDragging && images.length > 1) {
            autoPlayRef.current = setInterval(() => {
                setCurrentFrame(prev => (prev + 1) % images.length);
            }, autoRotateSpeed);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, isDragging, images.length, autoRotateSpeed]);

    // Handle mouse/touch drag
    const handleDragStart = (e) => {
        setIsDragging(true);
        startXRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    };

    const handleDragMove = (e) => {
        if (!isDragging || images.length <= 1) return;

        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startXRef.current;

        // Change frame every 20 pixels of drag
        const sensitivity = 20;
        const frameChange = Math.floor(diff / sensitivity);

        if (frameChange !== 0) {
            setCurrentFrame(prev => {
                let newFrame = prev - frameChange;
                // Wrap around
                while (newFrame < 0) newFrame += images.length;
                return newFrame % images.length;
            });
            startXRef.current = currentX;
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // Toggle auto-play
    const toggleAutoPlay = () => {
        setIsAutoPlaying(prev => !prev);
    };

    // Reset to first frame
    const resetRotation = () => {
        setCurrentFrame(0);
        setIsAutoPlaying(false);
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(prev => !prev);
    };

    // Handle zoom
    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.25, 1));
    };

    // Listen for fullscreen change
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // If no images or single image, show static image
    if (images.length <= 1) {
        return (
            <div className="product-viewer-360 single-image">
                <img
                    src={images[0] || '/placeholder.jpg'}
                    alt={productName}
                    className="viewer-image"
                />
            </div>
        );
    }

    const loadingProgress = images.length > 0 ? (loadedImages / images.length) * 100 : 0;

    return (
        <motion.div
            ref={containerRef}
            className={`product-viewer-360 ${isFullscreen ? 'fullscreen' : ''} ${isDragging ? 'dragging' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Loading Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="viewer-loading"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="loading-spinner">
                            <RotateCcw className="spin-icon" size={32} />
                        </div>
                        <div className="loading-progress">
                            <div
                                className="loading-bar"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                        <span className="loading-text">Loading Images...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Image Container */}
            <div
                className="viewer-stage"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <motion.img
                    src={images[currentFrame]}
                    alt={`${productName} - View ${currentFrame + 1}`}
                    className="viewer-image"
                    style={{
                        transform: `scale(${zoomLevel})`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    draggable={false}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Multi-Angle Badge */}
                <div className="viewer-badge">
                    <RotateCcw size={14} />
                    <span>{images.length} Views</span>
                </div>

                {/* Navigation Arrows */}
                <button
                    className="nav-arrow nav-prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentFrame(prev => prev === 0 ? images.length - 1 : prev - 1);
                        setIsAutoPlaying(false);
                    }}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="nav-arrow nav-next"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentFrame(prev => (prev + 1) % images.length);
                        setIsAutoPlaying(false);
                    }}
                >
                    <ChevronRight size={24} />
                </button>

                {/* Drag Hint */}
                {!isDragging && !isAutoPlaying && (
                    <motion.div
                        className="drag-hint"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span>↔ Drag or use arrows</span>
                    </motion.div>
                )}
            </div>

            {/* Frame Indicator */}
            <div className="frame-indicator">
                <div className="frame-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`frame-dot ${index === currentFrame ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentFrame(index);
                                setIsAutoPlaying(false);
                            }}
                        />
                    ))}
                </div>
                <span className="frame-counter">{currentFrame + 1} / {images.length}</span>
            </div>

            {/* Controls */}
            <div className="viewer-controls">
                <button
                    className="control-btn"
                    onClick={resetRotation}
                    title="Reset rotation"
                >
                    <RotateCcw size={18} />
                </button>

                <button
                    className={`control-btn ${isAutoPlaying ? 'active' : ''}`}
                    onClick={toggleAutoPlay}
                    title={isAutoPlaying ? 'Pause' : 'Auto-rotate'}
                >
                    {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <div className="zoom-controls">
                    <button
                        className="control-btn"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 1}
                        title="Zoom out"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                    <button
                        className="control-btn"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        title="Zoom in"
                    >
                        <ZoomIn size={18} />
                    </button>
                </div>

                <button
                    className="control-btn"
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                >
                    <Maximize2 size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default ProductViewer360;
