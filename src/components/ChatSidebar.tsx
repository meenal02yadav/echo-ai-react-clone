import { useState } from "react";
import { PlusIcon, MessageSquareIcon, SettingsIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "React Components Best Practices",
    lastMessage: "How to structure reusable components",
    timestamp: "2 hours ago"
  },
  {
    id: "2", 
    title: "TypeScript Advanced Types",
    lastMessage: "Exploring utility types and generics",
    timestamp: "1 day ago"
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox",
    lastMessage: "When to use each layout method",
    timestamp: "3 days ago"
  },
  {
    id: "4",
    title: "API Integration Patterns",
    lastMessage: "Error handling and data fetching",
    timestamp: "1 week ago"
  }
];

export function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [activeConversation, setActiveConversation] = useState<string>("1");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out",
        "flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "w-80 lg:relative lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="h-6 w-6 text-sidebar-foreground" />
            <span className="font-semibold text-sidebar-foreground">ChatGPT Clone</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden hover:bg-sidebar-hover"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button 
            className="w-full justify-start gap-3 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
            onClick={() => setActiveConversation("")}
          >
            <PlusIcon className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors duration-200",
                  "hover:bg-sidebar-hover",
                  activeConversation === conversation.id 
                    ? "bg-sidebar-active border border-sidebar-border" 
                    : "border border-transparent"
                )}
              >
                <div className="flex items-start gap-3">
                  <MessageSquareIcon className="h-4 w-4 mt-1 text-sidebar-foreground/60 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sidebar-foreground text-sm truncate">
                      {conversation.title}
                    </h3>
                    <p className="text-xs text-sidebar-foreground/60 mt-1 line-clamp-2">
                      {conversation.lastMessage}
                    </p>
                    <span className="text-xs text-sidebar-foreground/40 mt-1 block">
                      {conversation.timestamp}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 hover:bg-sidebar-hover text-sidebar-foreground"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </>
  );
}