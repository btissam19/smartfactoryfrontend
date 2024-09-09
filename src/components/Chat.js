import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;
function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setLoading(true); // Set loading state to true

      try {
        const response = await fetch(`${baseURL}/generate_answers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questions: [inputMessage] }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.answers[0], sender: 'bot' }
        ]);
      } catch (error) {
        console.error('Error fetching answer:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Sorry, there was an error processing your request.', sender: 'bot' }
        ]);
      } finally {
        setLoading(false); // Set loading state to false
      }
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        {isOpen ? 'Close Chat' : 'Get awnser to your questions'}
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-300">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat with us</h3>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-center mt-2 text-black">
                <span className='text-black'>Loading...</span>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-l-lg border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
