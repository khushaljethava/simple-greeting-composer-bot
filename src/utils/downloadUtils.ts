
import html2canvas from 'html2canvas';
import { toast } from '@/components/ui/use-toast';

export const downloadCardAsImage = async (cardElement: HTMLElement | null, filename = 'greeting-card'): Promise<void> => {
  if (!cardElement) {
    toast({
      title: "Error",
      description: "Could not find card to download",
      variant: "destructive",
    });
    return;
  }
  
  try {
    // Show loading toast
    toast({
      title: "Creating your card...",
      description: "Please wait while we prepare your download",
    });
    
    const canvas = await html2canvas(cardElement, { 
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });
    
    const image = canvas.toDataURL('image/png', 0.9);
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = image;
    downloadLink.download = `${filename}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast({
      title: "Success!",
      description: "Your greeting card has been downloaded",
    });
  } catch (error) {
    console.error('Error downloading card:', error);
    toast({
      title: "Download failed",
      description: "There was a problem creating your card",
      variant: "destructive",
    });
  }
};
