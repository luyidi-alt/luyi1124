import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { HanziWriterHandle } from '../types';

interface HanziWriterDisplayProps {
  character: string;
  onLoad?: () => void;
  onError?: () => void;
}

const HanziWriterDisplay = forwardRef<HanziWriterHandle, HanziWriterDisplayProps>(({ character, onLoad, onError }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useImperativeHandle(ref, () => ({
    animate: () => {
      if (writerRef.current) {
        // Revert to default colors for animation
        writerRef.current.updateColor('strokeColor', '#10b981'); // Emerald-500
        writerRef.current.updateColor('radicalColor', '#059669'); // Emerald-600
        writerRef.current.updateColor('drawingColor', '#10b981');
        writerRef.current.showOutline();
        writerRef.current.animateCharacter();
      }
    },
    quiz: () => {
      if (writerRef.current) {
        // Set colors to Red for quiz/tracing
        writerRef.current.updateColor('strokeColor', '#ef4444'); // Red-500
        writerRef.current.updateColor('drawingColor', '#ef4444'); 
        writerRef.current.updateColor('radicalColor', '#b91c1c'); // Red-700
        writerRef.current.quiz();
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current || !character) return;

    setStatus('loading');
    containerRef.current.innerHTML = ''; // Clear previous instance

    try {
      const writer = HanziWriter.create(containerRef.current, character, {
        width: 300,
        height: 300,
        padding: 20,
        showOutline: true,
        strokeAnimationSpeed: 1, // 1x speed
        delayBetweenStrokes: 200, // ms
        strokeColor: '#10b981', // Emerald-500
        radicalColor: '#059669', // Emerald-600
        outlineColor: '#e2e8f0', // Slate-200
        drawingWidth: 20,
        showCharacter: true,
        showHintAfterMisses: 3,
        highlightOnVariation: true,
        // Custom background grid
        backgroundType: 'svg',
      });

      writerRef.current = writer;

      // Add a grid manually using SVG inside the container for better aesthetics
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        // Create grid lines
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.setAttribute('class', 'grid-lines');
        gridGroup.style.opacity = '0.3';
        gridGroup.style.stroke = '#94a3b8'; // Slate-400
        gridGroup.style.strokeDasharray = '5,5';
        
        // Diagonal 1
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '0');
        line1.setAttribute('y1', '0');
        line1.setAttribute('x2', '300');
        line1.setAttribute('y2', '300');
        
        // Diagonal 2
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '300');
        line2.setAttribute('y1', '0');
        line2.setAttribute('x2', '0');
        line2.setAttribute('y2', '300');
        
        // Horizontal Center
        const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line3.setAttribute('x1', '0');
        line3.setAttribute('y1', '150');
        line3.setAttribute('x2', '300');
        line3.setAttribute('y2', '150');
        
        // Vertical Center
        const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line4.setAttribute('x1', '150');
        line4.setAttribute('y1', '0');
        line4.setAttribute('x2', '150');
        line4.setAttribute('y2', '300');

        gridGroup.appendChild(line1);
        gridGroup.appendChild(line2);
        gridGroup.appendChild(line3);
        gridGroup.appendChild(line4);
        
        svg.prepend(gridGroup);
      }

      setStatus('ready');
      if (onLoad) onLoad();

    } catch (err) {
      console.error("HanziWriter init error", err);
      setStatus('error');
      if (onError) onError();
    }
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [character, onLoad, onError]);

  return (
    <div className="relative flex justify-center items-center bg-white rounded-2xl shadow-inner border border-slate-100 p-4">
       <div ref={containerRef} className="w-[300px] h-[300px] cursor-pointer touch-none" />
       {status === 'error' && (
         <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-red-50/80 rounded-2xl">
           无法加载字符
         </div>
       )}
    </div>
  );
});

HanziWriterDisplay.displayName = 'HanziWriterDisplay';
export default HanziWriterDisplay;