export type Hadith = {
  id: number|string; collection: string; number: string|number; book?: string; chapter?: string; chapterId?: number;
  narrator?: string; arabic: string; english?: string; transliteration?: string; isnad?: string; grade?: string; source?: string;
};
