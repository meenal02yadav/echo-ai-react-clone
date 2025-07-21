import { UserIcon, BotIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

export function ChatMessage({ message, isUser, timestamp, isTyping }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-4 p-6 transition-colors duration-200",
      isUser ? "bg-chat-user-message" : "bg-chat-ai-message"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted border border-border"
      )}>
        {isUser ? (
          <UserIcon className="h-4 w-4" />
        ) : (
          <BotIcon className="h-4 w-4" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-foreground text-sm">
            {isUser ? "You" : "ChatGPT"}
          </span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">
              {timestamp}
            </span>
          )}
        </div>
        
        <div className="prose prose-sm max-w-none text-foreground">
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap leading-relaxed">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}