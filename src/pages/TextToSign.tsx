// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Mic, Volume2, VolumeX, Play, Square } from 'lucide-react';

// function TextToSign() {
//   const [text, setText] = useState('');
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [currentAnimation, setCurrentAnimation] = useState('');

//   const handleTextSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!text.trim()) return;
    
//     setIsPlaying(true);
//     // Simulate animation sequence
//     const words = text.split(' ');
//     let currentIndex = 0;

//     const interval = setInterval(() => {
//       if (currentIndex < words.length) {
//         setCurrentAnimation(words[currentIndex]);
//         currentIndex++;
//       } else {
//         clearInterval(interval);
//         setIsPlaying(false);
//       }
//     }, 1000);
//   };

//   const handleMicClick = () => {
//     setIsListening(!isListening);
//     if (!isListening) {
//       // Simulate speech recognition
//       setTimeout(() => {
//         setText('Hello, how are you?');
//         setIsListening(false);
//       }, 3000);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="container mx-auto px-4 py-12"
//     >
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//           Text to Sign Language Translation
//         </h1>

//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <form onSubmit={handleTextSubmit} className="mb-6">
//             <div className="flex gap-4 mb-4">
//               <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Enter text or use voice input..."
//                 className="flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
//                 rows={4}
//               />
//               <button
//                 type="button"
//                 onClick={handleMicClick}
//                 className={`flex items-center justify-center p-4 rounded-lg ${
//                   isListening
//                     ? 'bg-red-500 hover:bg-red-600'
//                     : 'bg-gray-200 hover:bg-gray-300'
//                 } transition-colors`}
//               >
//                 <Mic size={24} className={isListening ? 'text-white' : ''} />
//               </button>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 type="submit"
//                 disabled={!text.trim() || isPlaying}
//                 className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Play size={20} />
//                 Translate to Sign Language
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsMuted(!isMuted)}
//                 className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//                 {isMuted ? 'Unmute' : 'Mute'}
//               </button>
//             </div>
//           </form>

//           <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
//             {isPlaying ? (
//               <div className="text-center">
//                 <div className="mb-4">
//                   <motion.div
//                     key={currentAnimation}
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.8, opacity: 0 }}
//                     className="text-4xl font-bold text-indigo-600"
//                   >
//                     {currentAnimation}
//                   </motion.div>
//                 </div>
//                 <p className="text-gray-500">Animating sign language...</p>
//               </div>
//             ) : (
//               <p className="text-gray-500">
//                 Enter text and click translate to see sign language animation
//               </p>
//             )}
//           </div>

//           {isPlaying && (
//             <div className="flex justify-center">
//               <button
//                 onClick={() => setIsPlaying(false)}
//                 className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 <Square size={20} />
//                 Stop Animation
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
//           <ol className="list-decimal list-inside space-y-2 text-gray-600">
//             <li>Type text or use voice input</li>
//             <li>Click "Translate to Sign Language"</li>
//             <li>Watch the animated sign language translation</li>
//             <li>Use the mute button to toggle sound</li>
//             <li>Click "Stop Animation" to end the translation</li>
//           </ol>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default TextToSign;

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, VolumeX, Play, Square } from 'lucide-react';

const ISL_GIFS = [
  'any questions', 'are you angry', 'are you busy', 'are you hungry', 'are you sick', 'be careful',
  'can we meet tomorrow', 'did you book tickets', 'did you finish homework', 'do you go to office',
  'do you have money', 'do you want something to drink', 'do you want tea or coffee', 'do you watch TV',
  'dont worry', 'flower is beautiful', 'good afternoon', 'good evening', 'good morning', 'good night',
  'good question', 'had your lunch', 'happy journey', 'hello what is your name',
  'how many people are there in your family', 'i am a clerk', 'i am bore doing nothing',
  'i am fine', 'i am sorry', 'i am thinking', 'i am tired', 'i dont understand anything',
  'i go to a theatre', 'i love to shop', 'i had to say something but i forgot', 'i have headache',
  'i like pink colour', 'i live in nagpur', 'lets go for lunch', 'my mother is a homemaker',
  'my name is john', 'nice to meet you', 'no smoking please', 'open the door', 'please call me later',
  'please clean the room', 'please give me your pen', 'please use dustbin dont throw garbage',
  'please wait for sometime', 'shall I help you', 'shall we go together tommorow',
  'sign language interpreter', 'sit down', 'stand up', 'take care', 'there was traffic jam',
  'wait I am thinking', 'what are you doing', 'what is the problem', 'what is todays date',
  'what is your father do', 'what is your job', 'what is your mobile number', 'what is your name',
  'whats up', 'when is your interview', 'when we will go', 'where do you stay',
  'where is the bathroom', 'where is the police station', 'you are wrong'
];

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

function TextToSign() {
  const [text, setText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentGif, setCurrentGif] = useState('');
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [letterIndex, setLetterIndex] = useState(0);
  const [showGif, setShowGif] = useState(false);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Speech recognition setup (from second code)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')
          .toLowerCase();

        setText(transcript);
        processInput(transcript);
      };

      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Display letters with delay logic (from second code)
  const displayLettersWithDelay = (inputText: string) => {
    const letters = inputText.split('').filter(letter => letter !== ' ');
    setLetterIndex(0);
    setCurrentLetter(null);

    const showNextLetter = (index: number) => {
      if (index < letters.length) {
        setCurrentLetter(letters[index]);
        setLetterIndex(index + 1);
        timerRef.current = setTimeout(() => showNextLetter(index + 1), 800);
      }
    };

    showNextLetter(0);
  };

  // Process input text (from second code)
  const processInput = (inputText: string) => {
    if (ISL_GIFS.includes(inputText)) {
      setCurrentGif(inputText);
      setShowGif(true);
      setCurrentLetter(null);
    } else {
      setShowGif(false);
      displayLettersWithDelay(inputText);
    }
  };

  // Form submission handler
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    processInput(text.toLowerCase());
  };

  // Microphone button handler (from second code)
  const handleMicClick = () => {
    if (!isListening) {
      recognitionRef.current?.start();
      setIsListening(true);
      setText('');
      setCurrentLetter(null);
      setLetterIndex(0);
      setShowGif(false);
    }
  };

  // Reset display logic (from second code)
  const resetDisplay = () => {
    setText('');
    setCurrentLetter(null);
    setLetterIndex(0);
    setShowGif(false);
    setCurrentGif('');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-4xl mx-auto">
        {/* Keep original header */}
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Text to Sign Language Translation
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Keep original form structure */}
          <form onSubmit={handleTextSubmit} className="mb-6">
            <div className="flex gap-4 mb-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or use voice input..."
                className="flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={4}
              />
              <button
                type="button"
                onClick={handleMicClick}
                className={`flex items-center justify-center p-4 rounded-lg ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors`}
              >
                <Mic size={24} className={isListening ? 'text-white' : ''} />
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={!text.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={20} />
                Translate to Sign Language
              </button>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </form>

          {/* Modified display area with larger GIF */}
          <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            {showGif ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center w-full h-full"
              >
                <img
                  src={`/ISL_Gifs/${currentGif}.gif`}
                  alt={currentGif}
                  className="max-h-[500px] max-w-[500px] object-contain" // Increased size here
                />
                <p className="mt-2 text-gray-600">Showing sign for: {currentGif}</p>
              </motion.div>
            ) : currentLetter ? (
              <motion.div
                key={currentLetter}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <img
                  src={`/letters/${currentLetter}.jpg`}
                  alt={currentLetter}
                  className="h-[300px] w-[300px] object-contain" // Adjusted size for letters as well
                />
                {/* <p className="mt-2 text-gray-600">
                  Letter {letterIndex} of {text.length}
                </p> */}
              </motion.div>
            ) : (
              <p className="text-gray-500">
                {text ? 'No translation available' : 'Enter text and click translate to see sign language'}
              </p>
            )}
          </div>

          {/* Reset button */}
          {(showGif || currentLetter) && (
            <div className="flex justify-center">
              <button
                onClick={resetDisplay}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Square size={20} />
                Clear Display
              </button>
            </div>
          )}
        </div>

        {/* Keep original instructions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Type text or use voice input</li>
            <li>Click "Translate to Sign Language"</li>
            <li>View the sign language translation</li>
            <li>Use the mute button to toggle sound</li>
            <li>Click "Clear Display" to reset</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}

export default TextToSign;