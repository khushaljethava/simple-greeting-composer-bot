
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackgroundType } from '@/types/card';
import { cn } from '@/lib/utils';

const COLORS = [
  '#ffffff', '#a8d0e6', '#f8bbd0', '#b8e0d2', '#ffd166', 
  '#d4a5ff', '#ffb6b9', '#f1f7ed', '#e8e9eb', '#fde2e6'
];

const PATTERNS = [
  'pattern-dots', 'pattern-lines', 'pattern-zigzag'
];

type BackgroundSelectorProps = {
  selectedBackground: BackgroundType;
  onSelectBackground: (background: BackgroundType) => void;
};

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  onSelectBackground
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Background</h3>
        <Tabs defaultValue="colors">
          <TabsList className="mb-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="mt-0">
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <div
                  key={color}
                  className={cn(
                    "h-8 w-8 rounded-full border cursor-pointer transition-transform hover:scale-110",
                    selectedBackground.type === 'color' && 
                    selectedBackground.value === color && 
                    "ring-2 ring-primary ring-offset-2"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onSelectBackground({ type: 'color', value: color })}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="patterns" className="mt-0">
            <div className="grid grid-cols-3 gap-2">
              {PATTERNS.map((pattern) => (
                <div
                  key={pattern}
                  className={cn(
                    "h-16 w-full rounded border cursor-pointer transition-transform hover:scale-105",
                    pattern,
                    selectedBackground.type === 'pattern' && 
                    selectedBackground.value === pattern && 
                    "ring-2 ring-primary"
                  )}
                  onClick={() => onSelectBackground({ type: 'pattern', value: pattern })}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BackgroundSelector;
