import React, { useState } from 'react';
import { CharacterData } from '../types';
import { playTextToSpeech } from '../services/geminiService';

interface CharacterInfoProps {
  data: CharacterData | null;
  isLoading: boolean;
}

const PlayButton: React.FC<{ text: string; voice?: string; className?: string }> = ({ text, voice = 'Kore', className = "" }) => {
  const [playing, setPlaying] = useState(false);

  const handleClick = async () => {
    if (playing || !text) return;
    setPlaying(true);
    await playTextToSpeech(text, voice);
    setPlaying(false);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={playing}
      className={`p-2 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-50 ${className}`}
      title="Play Audio"
    >
      {playing ? (
        <svg className="animate-spin h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 hover:text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.618.786l-5-4A1 1 0 012.764 12V8a1 1 0 01.618-.786l5-4zM13.5 10a3 3 0 00-3-3v6a3 3 0 003-3z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
};

const CharacterInfo: React.FC<CharacterInfoProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-full min-h-[300px] flex flex-col gap-4 animate-pulse border border-slate-100">
        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
        <div className="h-px bg-slate-100 w-full my-2"></div>
        <div className="h-10 bg-slate-200 rounded w-full"></div>
        <div className="h-24 bg-slate-100 rounded w-full mt-4"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-full min-h-[300px] flex items-center justify-center text-slate-400 border border-slate-100">
        <div className="text-center">
            <p>输入汉字以获取详情</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full border border-slate-100 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h2 className="text-lg font-bold text-slate-800">汉字详情</h2>
      </div>

      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-4">
        <span className="text-slate-500 text-sm font-medium">拼音</span>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-serif font-bold text-slate-800">{data.pinyin}</span>
          <PlayButton text={data.character} voice="Kore" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-slate-500 text-sm font-medium mb-1">释义</h3>
        <p className="text-slate-700 leading-relaxed">{data.definition}</p>
      </div>

      <div className="mt-auto bg-amber-50 rounded-xl p-4 border border-amber-100">
        <div className="flex items-center gap-2 mb-2 text-amber-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">例句</span>
        </div>
        <div className="flex items-start gap-2 mb-2">
            <p className="text-slate-800 font-medium text-lg flex-1">"{data.exampleSentence}"</p>
            <PlayButton text={data.exampleSentence} voice="Kore" className="shrink-0" />
        </div>
        <div className="flex items-start gap-2">
            <p className="text-slate-500 text-sm flex-1">{data.exampleTranslation}</p>
            <PlayButton text={data.exampleTranslation} voice="Kore" className="shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;