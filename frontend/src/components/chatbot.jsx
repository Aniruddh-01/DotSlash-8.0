import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Install this with `npm install emoji-picker-react`
import { motion } from "framer-motion"; // Install this with `npm install framer-motion`
import user from './user-profile.png'
import tir from './india.png'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const apiKey = "AIzaSyCm9AFhAXHLZ6K6NqVTPtzvlOiCOx9QEdw"; // Replace with your API key

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setError("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful AI providing concise E-Governance solutions. User: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch response: ${response.status} - ${
            errorData?.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      const botMessage =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand.";
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setError(error.message || "Something went wrong. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput(input + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessages = [
        ...messages,
        { text: `Attachment: ${file.name}`, sender: "user" },
      ];
      setMessages(newMessages);
    }
  };

  return (
    <div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-20 right-5 bg-white shadow-lg w-96 h-96 rounded-lg flex flex-col"
        >
          <div className="bg-orange-500 text-white p-2 rounded-t-lg flex justify-between items-center">
            <span className="text-lg font-bold">Let's Chat</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold hover:text-gray-200"
            >
              ✖
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-2 p-2 border-b">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md my-1 flex items-center gap-2 ${
                  msg.sender === "user"
                    ? "bg-orange-200 self-end justify-end"
                    : "bg-orange-100 self-start justify-start"
                }`}
              >
                {msg.sender === "user" && (
                  <img
                    src={user}
                    alt="User Logo"
                    className="w-6 h-6 ml-2"
                  />
                )}
                {msg.sender === "bot" && (
                  <img
                    src={tir}
                    alt="India Logo"
                    className="w-6 h-6 mr-2"
                  />
                )}
                <span>{msg.text}</span>
              </div>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border p-2 rounded-md focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
            >
              😊
            </button>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 cursor-pointer"
            >
              📎
            </label>
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
            >
              Send
            </button>
          </div>
          {showEmojiPicker && (
            <div className="absolute bottom-28 right-5">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </motion.div>
      )}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700"
      >
        {isOpen ? "✖" : "💬"}
      </motion.button>
    </div>
  );
};

export default Chatbot;