
import React from 'react';
import { CardTemplate as CardTemplateType } from '@/types/card';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type CardTemplateProps = {
  templates: CardTemplateType[];
  onSelectTemplate: (template: CardTemplateType) => void;
  selectedTemplateId?: string;
};

const CardTemplate: React.FC<CardTemplateProps> = ({ 
  templates, 
  onSelectTemplate,
  selectedTemplateId
}) => {
  return (
    <Card className="shadow-md h-full">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Choose a template</h3>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-1 gap-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className={`cursor-pointer relative overflow-hidden rounded-md border-2 transition-all hover:opacity-90 ${
                  selectedTemplateId === template.id ? 'border-primary scale-105' : 'border-border'
                }`}
                onClick={() => onSelectTemplate(template)}
              >
                <div 
                  className={`aspect-[7/5] p-2 flex items-center justify-center`}
                  style={{
                    backgroundColor: template.background.type === 'color' ? template.background.value : undefined,
                    backgroundImage: template.background.type === 'pattern' ? `url(${template.background.value})` : undefined,
                  }}
                >
                  <div className="text-center">
                    <p className="font-medium text-sm">{template.name}</p>
                    <span className="text-xs text-muted-foreground">{template.occasion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CardTemplate;
