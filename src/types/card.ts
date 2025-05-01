
export type Font = 'handwriting' | 'casual' | 'elegant' | 'sans';

export type TextStyle = {
  text: string;
  font: Font;
  size: number;
  color: string;
  bold: boolean;
  italic: boolean;
  x: number;
  y: number;
};

export type BackgroundType = {
  type: 'color' | 'pattern';
  value: string;
};

export type CardTemplate = {
  id: string;
  name: string;
  occasion: string;
  background: BackgroundType;
  defaultText: TextStyle[];
};

export type CardData = {
  width: number;
  height: number;
  background: BackgroundType;
  texts: TextStyle[];
  template?: string;
};
