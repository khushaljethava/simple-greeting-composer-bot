
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CardData, TextStyle } from '@/types/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadCardAsImage } from '@/utils/downloadUtils';
import { cn } from '@/lib/utils';

type CardPreviewProps = {
  cardData: CardData;
  onTextClick?: (index: number) => void;
  selectedTextIndex?: number | null;
};

const CardPreview: React.FC<CardPreviewProps> = ({ 
  cardData, 
  onTextClick,
  selectedTextIndex 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const renderText = (textStyle: TextStyle, index: number) => {
    const fontClass = `font-${textStyle.font}`;
    const styleObj = {
      fontSize: `${textStyle.size}px`,
      color: textStyle.color,
      fontWeight: textStyle.bold ? 'bold' : 'normal',
      fontStyle: textStyle.italic ? 'italic' : 'normal',
      left: `${textStyle.x}%`,
      top: `${textStyle.y}%`,
      transform: 'translate(-50%, -50%)',
      cursor: onTextClick ? 'pointer' : 'default'
    };
    
    return (
      <div 
        key={index}
        className={cn(
          'absolute max-w-[80%] break-words text-center',
          fontClass,
          selectedTextIndex === index && 'ring-2 ring-blue-500 ring-offset-2'
        )}
        style={styleObj}
        onClick={() => onTextClick && onTextClick(index)}
      >
        {textStyle.text}
      </div>
    );
  };

  const handleDownload = () => {
    downloadCardAsImage(cardRef.current, 'greeting-card');
  };

  const backgroundStyle = cardData.background.type === 'color' 
    ? { backgroundColor: cardData.background.value }
    : { };

  const backgroundClass = cardData.background.type === 'pattern' 
    ? cardData.background.value
    : '';

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Card Preview</h3>
          <Button onClick={handleDownload} size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="relative card-shadow rounded-md overflow-hidden" ref={cardRef}>
            <div 
              className={cn("relative", backgroundClass)}
              style={{
                ...backgroundStyle,
                width: `${cardData.width}px`,
                height: `${cardData.height}px`,
              }}
            >
              {cardData.texts.map((text, i) => renderText(text, i))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPreview;
