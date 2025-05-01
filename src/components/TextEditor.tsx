
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { TextStyle, Font } from '@/types/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic } from 'lucide-react';

type TextEditorProps = {
  textStyles: TextStyle[];
  selectedTextIndex: number | null;
  onSelectText: (index: number) => void;
  onUpdateText: (index: number, updatedText: TextStyle) => void;
};

const FONT_OPTIONS: { value: Font; label: string }[] = [
  { value: 'sans', label: 'Sans-serif' },
  { value: 'handwriting', label: 'Handwriting' },
  { value: 'casual', label: 'Casual' },
  { value: 'elegant', label: 'Elegant' },
];

const TextEditor: React.FC<TextEditorProps> = ({
  textStyles,
  selectedTextIndex,
  onSelectText,
  onUpdateText,
}) => {
  const selectedText = selectedTextIndex !== null ? textStyles[selectedTextIndex] : null;

  const handleTextChange = (value: string) => {
    if (selectedTextIndex === null) return;
    onUpdateText(selectedTextIndex, {
      ...textStyles[selectedTextIndex],
      text: value
    });
  };

  const handleFontChange = (value: Font) => {
    if (selectedTextIndex === null) return;
    onUpdateText(selectedTextIndex, {
      ...textStyles[selectedTextIndex],
      font: value
    });
  };

  const handleSizeChange = (value: number[]) => {
    if (selectedTextIndex === null) return;
    onUpdateText(selectedTextIndex, {
      ...textStyles[selectedTextIndex],
      size: value[0]
    });
  };

  const handleColorChange = (value: string) => {
    if (selectedTextIndex === null) return;
    onUpdateText(selectedTextIndex, {
      ...textStyles[selectedTextIndex],
      color: value
    });
  };

  const toggleBold = () => {
    if (selectedTextIndex === null) return;
    onUpdateText(selectedTextIndex, {
      ...textStyles[selectedTextIndex],
      bold: !textStyles[selectedTextIndex].bold
    });
  };

  const toggleItalic = () => {
    if (selectedTextIndex === null) return;
    onUpdateText(selectedTextIndex, {
      ...textStyles[selectedTextIndex],
      italic: !textStyles[selectedTextIndex].italic
    });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Edit Text</h3>
        
        <div className="space-y-4">
          {textStyles.length > 0 ? (
            <>
              <div>
                <p className="text-sm font-medium mb-2">Select text to edit</p>
                <div className="flex flex-wrap gap-2">
                  {textStyles.map((text, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                        selectedTextIndex === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/20 hover:bg-secondary/40'
                      }`}
                      onClick={() => onSelectText(index)}
                    >
                      Text {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              {selectedText && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Content</label>
                    <Textarea
                      value={selectedText.text}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Font</label>
                    <Select
                      value={selectedText.font}
                      onValueChange={(value) => handleFontChange(value as Font)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_OPTIONS.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            <span className={`font-${font.value}`}>{font.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium">Size</label>
                      <span className="text-sm">{selectedText.size}px</span>
                    </div>
                    <Slider
                      value={[selectedText.size]}
                      min={12}
                      max={72}
                      step={1}
                      onValueChange={handleSizeChange}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Color</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={selectedText.color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        type="text"
                        value={selectedText.color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Style</label>
                    <div className="flex gap-2">
                      <Toggle 
                        pressed={selectedText.bold} 
                        onPressedChange={toggleBold}
                        aria-label="Toggle bold"
                      >
                        <Bold className="h-4 w-4" />
                      </Toggle>
                      <Toggle 
                        pressed={selectedText.italic} 
                        onPressedChange={toggleItalic}
                        aria-label="Toggle italic"
                      >
                        <Italic className="h-4 w-4" />
                      </Toggle>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground italic">No editable text available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextEditor;
