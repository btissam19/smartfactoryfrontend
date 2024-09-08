import React, { useState } from 'react';

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Here you would typically send the message to your backend
      // and then receive a response to add to the messages
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "Thank you for your message. An agent will respond shortly.", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat with us</h3>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Chat;