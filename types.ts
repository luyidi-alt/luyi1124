export interface CharacterData {
  character: string;
  pinyin: string;
  definition: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface HanziWriterHandle {
  animate: () => void;
  quiz: () => void;
}
