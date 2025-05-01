
import React, { useState } from 'react';
import { CardData, CardTemplate as CardTemplateType, TextStyle, BackgroundType } from '@/types/card';
import CardTemplate from '@/components/CardTemplate';
import BackgroundSelector from '@/components/BackgroundSelector';
import TextEditor from '@/components/TextEditor';
import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Default templates
const DEFAULT_TEMPLATES: CardTemplateType[] = [
  {
    id: 'birthday',
    name: 'Birthday Wishes',
    occasion: 'Birthday',
    background: { type: 'color', value: '#a8d0e6' },
    defaultText: [
      {
        text: 'Happy Birthday!',
        font: 'handwriting',
        size: 48,
        color: '#333333',
        bold: true,
        italic: false,
        x: 50,
        y: 40
      },
      {
        text: 'Wishing you a wonderful day filled with joy and laughter!',
        font: 'casual',
        size: 24,
        color: '#444444',
        bold: false,
        italic: false,
        x: 50,
        y: 60
      }
    ]
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    occasion: 'Gratitude',
    background: { type: 'color', value: '#b8e0d2' },
    defaultText: [
      {
        text: 'Thank You',
        font: 'elegant',
        size: 42,
        color: '#2a3840',
        bold: true,
        italic: false,
        x: 50,
        y: 40
      },
      {
        text: 'Your kindness is greatly appreciated!',
        font: 'sans',
        size: 24,
        color: '#333333',
        bold: false,
        italic: true,
        x: 50,
        y: 60
      }
    ]
  },
  {
    id: 'congrats',
    name: 'Congratulations',
    occasion: 'Achievement',
    background: { type: 'color', value: '#ffd166' },
    defaultText: [
      {
        text: 'Congratulations!',
        font: 'handwriting',
        size: 48,
        color: '#333333',
        bold: true,
        italic: false,
        x: 50,
        y: 40
      },
      {
        text: 'On your amazing achievement!',
        font: 'sans',
        size: 24,
        color: '#444444',
        bold: false,
        italic: false,
        x: 50,
        y: 60
      }
    ]
  }
];

// Default card data
const DEFAULT_CARD_DATA: CardData = {
  width: 500,
  height: 350,
  background: { type: 'color', value: '#ffffff' },
  texts: [
    {
      text: 'Your Message Here',
      font: 'sans',
      size: 32,
      color: '#000000',
      bold: false,
      italic: false,
      x: 50,
      y: 50
    }
  ]
};

const CardEditor: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>(DEFAULT_CARD_DATA);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(undefined);
  const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(0);

  const handleSelectTemplate = (template: CardTemplateType) => {
    setSelectedTemplateId(template.id);
    setCardData({
      ...cardData,
      background: template.background,
      texts: JSON.parse(JSON.stringify(template.defaultText)), // Deep clone
      template: template.id
    });
    setSelectedTextIndex(0);
    
    toast({
      title: "Template applied",
      description: `The "${template.name}" template has been applied to your card.`
    });
  };

  const handleUpdateBackground = (background: BackgroundType) => {
    setCardData({
      ...cardData,
      background
    });
  };

  const handleSelectText = (index: number) => {
    setSelectedTextIndex(index);
  };

  const handleUpdateText = (index: number, updatedText: TextStyle) => {
    const newTexts = [...cardData.texts];
    newTexts[index] = updatedText;
    setCardData({
      ...cardData,
      texts: newTexts
    });
  };

  const handleAddText = () => {
    const newText: TextStyle = {
      text: 'New text',
      font: 'sans',
      size: 24,
      color: '#000000',
      bold: false,
      italic: false,
      x: 50,
      y: 70
    };
    
    setCardData({
      ...cardData,
      texts: [...cardData.texts, newText]
    });
    
    // Select the new text
    setSelectedTextIndex(cardData.texts.length);
  };

  const handleRemoveText = () => {
    if (selectedTextIndex === null || cardData.texts.length <= 1) return;
    
    const newTexts = cardData.texts.filter((_, i) => i !== selectedTextIndex);
    setCardData({
      ...cardData,
      texts: newTexts
    });
    
    setSelectedTextIndex(Math.min(selectedTextIndex, newTexts.length - 1));
    
    toast({
      title: "Text removed",
      description: "The selected text has been removed from your card."
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="space-y-6">
          <CardTemplate
            templates={DEFAULT_TEMPLATES}
            onSelectTemplate={handleSelectTemplate}
            selectedTemplateId={selectedTemplateId}
          />
          
          <BackgroundSelector
            selectedBackground={cardData.background}
            onSelectBackground={handleUpdateBackground}
          />
        </div>
        
        {/* Card preview */}
        <div className="md:col-span-1">
          <CardPreview 
            cardData={cardData}
            onTextClick={handleSelectText}
            selectedTextIndex={selectedTextIndex}
          />
        </div>
        
        {/* Right sidebar - text editor */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button onClick={handleAddText} variant="outline" size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add Text
            </Button>
            <Button 
              onClick={handleRemoveText} 
              variant="outline" 
              size="sm"
              disabled={cardData.texts.length <= 1 || selectedTextIndex === null}
            >
              <Trash2 className="mr-1 h-4 w-4" /> Remove Text
            </Button>
          </div>
          
          <TextEditor
            textStyles={cardData.texts}
            selectedTextIndex={selectedTextIndex}
            onSelectText={handleSelectText}
            onUpdateText={handleUpdateText}
          />
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
