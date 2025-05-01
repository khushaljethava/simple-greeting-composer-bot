
import React from 'react';
import CardEditor from '@/components/CardEditor';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-handwriting text-primary animate-float">
            Greeting Card Composer
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Create beautiful custom cards for any occasion
          </p>
        </header>

        <main>
          <CardEditor />
        </main>

        <footer className="text-center mt-12 py-6 text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Greeting Card Composer • Create beautiful personalized greeting cards</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
