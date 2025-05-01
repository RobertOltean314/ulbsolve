import React, { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
}

const ChatPage: React.FC = () => {
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeContact, setActiveContact] = useState<ChatContact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch contacts and messages (mock data for example)
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data would be replaced with API calls
        const mockContacts = [
          {
            id: "1",
            name: "TaskMaster",
            avatar: "TM",
            lastMessage: "When do you think you can finish the task?",
            lastMessageTime: new Date(Date.now() - 15 * 60000),
            unreadCount: 2,
            online: true,
          },
          {
            id: "2",
            name: "CryptoBuilder",
            avatar: "CB",
            lastMessage: "Thanks for the explanation!",
            lastMessageTime: new Date(Date.now() - 2 * 3600000),
            unreadCount: 0,
            online: false,
          },
        ];

        setContacts(mockContacts);
        if (mockContacts.length > 0) {
          setActiveContact(mockContacts[0]);
          // Mock messages for first contact
          setMessages([
            {
              id: "1",
              senderId: "1",
              senderName: "TaskMaster",
              message: "Hi there! I saw you started working on my task.",
              timestamp: new Date(Date.now() - 40 * 60000),
              isCurrentUser: false,
            },
            {
              id: "2",
              senderId: "current-user",
              senderName: "You",
              message:
                "Yes, I just started looking into it. The requirements look clear.",
              timestamp: new Date(Date.now() - 38 * 60000),
              isCurrentUser: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return;

    // Add new message to chat
    const newMsg = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      message: newMessage.trim(),
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Update last message in contacts
    setContacts(
      contacts.map((contact) =>
        contact.id === activeContact.id
          ? {
              ...contact,
              lastMessage: newMessage.trim(),
              lastMessageTime: new Date(),
            }
          : contact
      )
    );

    // Simulate response (for demo)
    setTimeout(() => {
      const responseMsg = {
        id: (Date.now() + 1).toString(),
        senderId: activeContact.id,
        senderName: activeContact.name,
        message: "I got your message. I'll get back to you soon!",
        timestamp: new Date(),
        isCurrentUser: false,
      };

      setMessages((prev) => [...prev, responseMsg]);
    }, 1000);
  };

  const handleContactSelect = (contact: ChatContact) => {
    setActiveContact(contact);
    // Mark messages as read
    setContacts(
      contacts.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c))
    );

    // Here you would fetch messages for this contact
    // For demo, we'll just show loading and provide mock data
    setIsLoading(true);
    setTimeout(() => {
      setMessages([
        {
          id: "1",
          senderId: contact.id,
          senderName: contact.name,
          message: "Hello! Thanks for working on my project.",
          timestamp: new Date(Date.now() - 120 * 60000),
          isCurrentUser: false,
        },
        {
          id: "2",
          senderId: "current-user",
          senderName: "You",
          message: "No problem! Happy to help.",
          timestamp: new Date(Date.now() - 115 * 60000),
          isCurrentUser: true,
        },
      ]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A1232] pt-24 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4683df] mb-6">Messages</h1>

        <div className="bg-[#131b3d] rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-200px)]">
            {/* Contacts sidebar */}
            <div className="bg-[#0c1429] border-r border-[#1d2a4d]">
              <div className="overflow-y-auto h-full">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border-b border-[#1d2a4d] cursor-pointer hover:bg-[#16203d] ${
                      activeContact?.id === contact.id ? "bg-[#16203d]" : ""
                    }`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#4683df] flex items-center justify-center font-medium">
                          {contact.avatar}
                        </div>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0c1429]"></div>
                        )}
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-xs text-gray-400">
                            {contact.lastMessageTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-400 truncate w-32">
                            {contact.lastMessage}
                          </p>
                          {contact.unreadCount > 0 && (
                            <span className="bg-[#4683df] text-white text-xs rounded-full px-2 py-0.5">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="col-span-2 flex flex-col">
              {activeContact ? (
                <>
                  {/* Chat header */}
                  <div className="bg-[#0c1429] p-4 border-b border-[#1d2a4d] flex items-center">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#4683df] flex items-center justify-center font-medium">
                        {activeContact.avatar}
                      </div>
                      {activeContact.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0c1429]"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{activeContact.name}</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <svg
                          className="animate-spin h-8 w-8 text-[#4683df]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.isCurrentUser
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                                message.isCurrentUser
                                  ? "bg-[#4683df] text-white rounded-br-none"
                                  : "bg-[#16203d] text-white rounded-bl-none"
                              }`}
                            >
                              {!message.isCurrentUser && (
                                <div className="font-medium text-[#4683df] text-sm mb-1">
                                  {message.senderName}
                                </div>
                              )}
                              <p>{message.message}</p>
                              <div className="text-xs text-right mt-1 opacity-70">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message input */}
                  <div className="p-4 border-t border-[#1d2a4d]">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-grow bg-[#16203d] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <button
                        className="p-2 bg-[#4683df] rounded-full hover:bg-[#5a9aec] transition-colors ml-2"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 bg-[#16203d] rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#4683df]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-[#4683df]">
                    Your Messages
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Select a contact to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
