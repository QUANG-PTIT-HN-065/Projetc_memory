import type { Dispatch,  SetStateAction } from "react";

export interface DiaryEntry {
  id?: string; 
  mood: string;
  date: string;
  title: string;
  content: string;
  image: string;
  caption: string;
}

export interface NewDiaryEntry {
  mood: string;
  title: string;
  content: string;
  caption: string;
}

export interface SpreadProps {
  entry: DiaryEntry;
  pageNum: number;
  addMode: boolean;
  newEntry: NewDiaryEntry;
  setNewEntry: Dispatch<SetStateAction<NewDiaryEntry>>;
  imgFile: string;
  setImgFile: Dispatch<SetStateAction<string>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export interface FlipOverlayProps {
  dir: "forward" | "back";
  fromEntry: DiaryEntry;
  toEntry: DiaryEntry;
}
/* ─── HELPERS ───────────────────────────────────────────── */
export type Stage = "closed" | "opening" | "open" | "closing";