
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

interface UseClipboardReturn {
  copyToClipboard: (text: string) => Promise<void>;
  pasteFromClipboard: () => Promise<string>;
  isCopying: boolean;
  isPasting: boolean;
}

export const useClipboard = (): UseClipboardReturn => {
  const [isCopying, setIsCopying] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = useCallback(async (text: string) => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Content successfully copied!",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsCopying(false);
    }
  }, [toast]);

  const pasteFromClipboard = useCallback(async (): Promise<string> => {
    setIsPasting(true);
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      toast({
        title: "Paste failed",
        description: "Unable to paste from clipboard",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPasting(false);
    }
  }, [toast]);

  return {
    copyToClipboard,
    pasteFromClipboard,
    isCopying,
    isPasting,
  };
};
