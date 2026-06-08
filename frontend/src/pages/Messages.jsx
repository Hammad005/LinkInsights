import { useState } from 'react';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Image,
  Smile,
  Check,
  CheckCheck,
  ArrowLeft,
  Circle,
} from 'lucide-react';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      user: {
        name: 'John Smith',
        avatar: 'JS',
        online: true,
      },
      lastMessage: 'Hi, is this product still available?',
      time: '2 min ago',
      unread: 2,
      messages: [
        { id: 1, text: 'Hello! I saw your wireless headphones listing.', sender: 'user', time: '10:30 AM', status: 'read' },
        { id: 2, text: 'Hi John! Yes, how can I help you?', sender: 'vendor', time: '10:32 AM', status: 'read' },
        { id: 3, text: 'Is the product still available?', sender: 'user', time: '10:33 AM', status: 'read' },
        { id: 4, text: 'Yes, we have it in stock! Would you like to place an order?', sender: 'vendor', time: '10:35 AM', status: 'read' },
        { id: 5, text: 'Hi, is this product still available?', sender: 'user', time: '10:40 AM', status: 'delivered' },
      ],
    },
    {
      id: 2,
      user: {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        online: true,
      },
      lastMessage: 'Thank you for the quick delivery! ⭐',
      time: '1 hour ago',
      unread: 0,
      messages: [
        { id: 1, text: 'I just received my order!', sender: 'user', time: '9:00 AM', status: 'read' },
        { id: 2, text: "That's great! How do you like it?", sender: 'vendor', time: '9:05 AM', status: 'read' },
        { id: 3, text: 'Thank you for the quick delivery! ⭐', sender: 'user', time: '9:10 AM', status: 'read' },
      ],
    },
    {
      id: 3,
      user: {
        name: 'Mike Brown',
        avatar: 'MB',
        online: false,
      },
      lastMessage: 'Can I get a discount for bulk order?',
      time: '3 hours ago',
      unread: 1,
      messages: [
        { id: 1, text: 'Hello, I want to order 50 units of the USB cables', sender: 'user', time: '7:00 AM', status: 'read' },
        { id: 2, text: 'Hi Mike! That sounds great. Let me check our inventory.', sender: 'vendor', time: '7:15 AM', status: 'read' },
        { id: 3, text: 'Can I get a discount for bulk order?', sender: 'user', time: '7:20 AM', status: 'delivered' },
      ],
    },
    {
      id: 4,
      user: {
        name: 'Emily Davis',
        avatar: 'ED',
        online: false,
      },
      lastMessage: 'What colors are available?',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, text: 'Hi, I love the phone cases you have!', sender: 'user', time: 'Yesterday 2:00 PM', status: 'read' },
        { id: 2, text: 'Thank you Emily! Which one caught your eye?', sender: 'vendor', time: 'Yesterday 2:05 PM', status: 'read' },
        { id: 3, text: 'The premium silicone one. What colors are available?', sender: 'user', time: 'Yesterday 2:10 PM', status: 'read' },
      ],
    },
    {
      id: 5,
      user: {
        name: 'Chris Wilson',
        avatar: 'CW',
        online: true,
      },
      lastMessage: 'I need to return my order',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, text: 'Hi, I received the wrong item in my order #1234', sender: 'user', time: 'Yesterday 11:00 AM', status: 'read' },
        { id: 2, text: "I'm so sorry about that! Let me look into it right away.", sender: 'vendor', time: 'Yesterday 11:10 AM', status: 'read' },
        { id: 3, text: 'I need to return my order', sender: 'user', time: 'Yesterday 11:15 AM', status: 'read' },
      ],
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // In a real app, this would send the message via API
    setMessageInput('');
  };

  const getStatusIcon = (status) => {
    if (status === 'read') {
      return <CheckCheck className="w-4 h-4 text-blue-500" />;
    }
    return <Check className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Page Header - Only show on mobile when no chat selected */}
      <div className={`mb-4 ${selectedChat ? 'hidden md:block' : ''}`}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500 mt-1">Chat with your customers</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex">
        {/* Conversations List */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col ${
            selectedChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === conv.id ? 'bg-red-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {conv.user.avatar}
                    </div>
                    {conv.user.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{conv.user.name}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 truncate pr-2">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No conversations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedChat.user.avatar}
                  </div>
                  {selectedChat.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedChat.user.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedChat.user.online ? (
                      <span className="text-green-600">Online</span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {/* Date Divider */}
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 bg-white text-xs text-gray-500 rounded-full shadow-sm">
                  Today
                </span>
              </div>

              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[60%] ${
                      message.sender === 'vendor'
                        ? 'bg-red-500 text-white rounded-2xl rounded-br-md'
                        : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm'
                    } px-4 py-3`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 ${
                        message.sender === 'vendor' ? 'text-red-100' : 'text-gray-400'
                      }`}
                    >
                      <span className="text-xs">{message.time}</span>
                      {message.sender === 'vendor' && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
                >
                  <Image className="w-5 h-5 text-gray-500" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Smile className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Select a conversation</h3>
              <p className="text-gray-500 mt-1">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
