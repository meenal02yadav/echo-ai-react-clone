import { useState } from "react";
import { SendIcon, PaperclipIcon, MicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-chat-input-background">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 p-3 bg-background border border-border rounded-2xl shadow-sm focus-within:shadow-md transition-shadow duration-200">
            {/* Attachment Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              disabled={disabled}
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>

            {/* Text Input */}
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              className={cn(
                "flex-1 min-h-[20px] max-h-32 resize-none border-0 bg-transparent",
                "focus-visible:ring-0 focus-visible:ring-offset-0 p-0",
                "placeholder:text-muted-foreground"
              )}
              disabled={disabled}
            />

            {/* Voice/Send Button */}
            <div className="flex items-center gap-1">
              {message.trim() ? (
                <Button
                  type="submit"
                  size="sm"
                  className="flex-shrink-0 bg-primary hover:bg-primary-hover"
                  disabled={disabled}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                  disabled={disabled}
                >
                  <MicIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
        
        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-3">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}