import React, { useState, useRef, useCallback } from 'react';
import HanziWriterDisplay from './components/HanziWriterDisplay';
import CharacterInfo from './components/CharacterInfo';
import { fetchCharacterDetails } from './services/geminiService';
import { CharacterData, HanziWriterHandle } from './types';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('猫');
  const [activeChar, setActiveChar] = useState('猫');
  const [charData, setCharData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [writerLoading, setWriterLoading] = useState(true);
  
  const writerRef = useRef<HanziWriterHandle>(null);

  const handleGenerate = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    const char = inputValue.trim().charAt(0); // Take first character only
    setActiveChar(char);
    setLoading(true);
    setWriterLoading(true); // Reset writer state visual
    
    try {
      const data = await fetchCharacterDetails(char);
      setCharData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [inputValue]);

  // Initial load
  React.useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnimate = () => {
    if (writerRef.current) {
      writerRef.current.animate();
    }
  };

  const handleQuiz = () => {
    if (writerRef.current) {
      writerRef.current.quiz();
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">✍️</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">四季汉字笔画学习器</h1>
          </div>
          <p className="text-slate-500 text-lg">Interactive Stroke Order Practice Board</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-sm p-3 max-w-xl mx-auto mb-12 flex items-center gap-2 border border-slate-200">
          <input
            type="text"
            maxLength={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 h-14 text-center text-2xl font-bold text-slate-800 bg-transparent border-none focus:ring-0 placeholder:text-slate-300"
            placeholder="输入一个汉字"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-emerald-500/20"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            生成笔画
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Canvas Area */}
          <div className="flex flex-col items-center">
            <div className="relative">
                {/* "Preview Mode" Badge style from screenshot */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    预览模式
                </div>
                <HanziWriterDisplay 
                    ref={writerRef} 
                    character={activeChar} 
                    onLoad={() => setWriterLoading(false)}
                />
            </div>

            <div className="mt-8 text-center">
                <p className="text-slate-500 font-medium mb-6">准备就绪！选择模式开始。</p>
                <div className="flex gap-4">
                    <button 
                        onClick={handleAnimate}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        演示笔画
                    </button>
                    <button 
                        onClick={handleQuiz}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        开始描红
                    </button>
                </div>
            </div>
          </div>

          {/* Right: Details Card */}
          <div className="w-full">
            <CharacterInfo data={charData} isLoading={loading} />
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-slate-400 text-sm">
           &copy; 2025 由四季制作
        </div>
      </div>
    </div>
  );
};

export default App;