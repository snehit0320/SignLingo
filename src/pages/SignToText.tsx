// import React, { useRef, useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Webcam from 'react-webcam';
// import * as tf from '@tensorflow/tfjs';
// import { Camera, Volume2, VolumeX } from 'lucide-react';

// function SignToText() {
//   const webcamRef = useRef<Webcam>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [prediction, setPrediction] = useState('');
//   const [isModelLoading, setIsModelLoading] = useState(true);

//   useEffect(() => {
//     const loadModel = async () => {
//       try {
//         // Model loading simulation
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setIsModelLoading(false);
//       } catch (error) {
//         console.error('Error loading model:', error);
//       }
//     };
//     loadModel();
//   }, []);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//     // Simulate real-time predictions
//     const interval = setInterval(() => {
//       const predictions = ['Hello', 'Thank you', 'Good morning', 'How are you'];
//       const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
//       setPrediction(randomPrediction);
//     }, 2000);

//     // Clean up interval after 10 seconds
//     setTimeout(() => {
//       clearInterval(interval);
//       setIsRecording(false);
//     }, 10000);
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
//           Sign Language to Text Translation
//         </h1>

//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-6">
//             {isModelLoading ? (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//               </div>
//             ) : (
//               <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>

//           <div className="flex justify-center gap-4 mb-6">
//             <button
//               onClick={handleStartRecording}
//               disabled={isModelLoading || isRecording}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
//                 isRecording
//                   ? 'bg-red-500 hover:bg-red-600'
//                   : 'bg-indigo-600 hover:bg-indigo-700'
//               } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               <Camera size={20} />
//               {isRecording ? 'Recording...' : 'Start Recording'}
//             </button>
//             <button
//               onClick={() => setIsMuted(!isMuted)}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
//             >
//               {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//               {isMuted ? 'Unmute' : 'Mute'}
//             </button>
//           </div>

//           <div className="bg-gray-50 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Translation Output</h3>
//             <div className="min-h-24 bg-white rounded-lg p-4 border border-gray-200">
//               {prediction ? (
//                 <p className="text-xl">{prediction}</p>
//               ) : (
//                 <p className="text-gray-500">
//                   Start recording to see the translation...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
//           <ol className="list-decimal list-inside space-y-2 text-gray-600">
//             <li>Position yourself in front of the camera</li>
//             <li>Ensure good lighting and a clear background</li>
//             <li>Click "Start Recording" to begin translation</li>
//             <li>Perform sign language gestures clearly</li>
//             <li>View the real-time translation below the video</li>
//           </ol>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default SignToText;

// import React, { useRef, useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Webcam from 'react-webcam';
// import * as tf from '@tensorflow/tfjs';
// import { Camera, Volume2, VolumeX } from 'lucide-react';

// function SignToText() {
//   const webcamRef = useRef<Webcam>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [prediction, setPrediction] = useState('');
//   const [model, setModel] = useState<tf.LayersModel | null>(null);
//   const [isModelLoading, setIsModelLoading] = useState(true);
//   const animationFrameRef = useRef<number>();

//   const labels = ['Thank you', 'Yes', 'No', 'Peace', 'Hello'];

//   useEffect(() => {
//     const loadModel = async () => {
//       try {
//         const loadedModel = await tf.loadLayersModel('/modfiles/model.json');
//         setModel(loadedModel);
//         setIsModelLoading(false);
//       } catch (error) {
//         console.error('Error loading model:', error);
//         setIsModelLoading(false);
//       }
//     };
//     loadModel();

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   const startPrediction = async () => {
//     if (!model || !webcamRef.current || !canvasRef.current) return;

//     const video = webcamRef.current.video;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     if (!video || !ctx) return;

//     const predict = async () => {
//       ctx.drawImage(video, 0, 0, 224, 224);
//       const imageData = ctx.getImageData(0, 0, 224, 224);

//       const tensor = tf.browser.fromPixels(imageData)
//         .resizeNearestNeighbor([224, 224])
//         .toFloat()
//         .expandDims();

//       const normalized = tensor.div(255.0);
//       const predictions = await model.predict(normalized) as tf.Tensor;
//       const predictionArray = await predictions.data();
//       const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));

//       setPrediction(labels[maxIndex]);

//       tensor.dispose();
//       normalized.dispose();
//       predictions.dispose();

//       animationFrameRef.current = requestAnimationFrame(predict);
//     };

//     predict();
//   };

//   const handleRecording = () => {
//     if (!isRecording) {
//       setIsRecording(true);
//     } else {
//       setIsRecording(false);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
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
//           Sign Language to Text Translation
//         </h1>

//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-6">
//             {isModelLoading ? (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//               </div>
//             ) : isRecording ? (
//               <>
//                 <Webcam
//                   ref={webcamRef}
//                   audio={false}
//                   className="w-full h-full object-cover"
//                   onUserMedia={startPrediction}
//                 />
//                 <canvas
//                   ref={canvasRef}
//                   width="224"
//                   height="224"
//                   style={{ display: 'none' }}
//                 />
//               </>
//             ) : (
//               <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//                 Click "Start Recording" to begin
//               </div>
//             )}
//           </div>

//           <div className="flex justify-center gap-4 mb-6">
//             <button
//               onClick={handleRecording}
//               disabled={isModelLoading}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
//                 isRecording
//                   ? 'bg-red-500 hover:bg-red-600'
//                   : 'bg-indigo-600 hover:bg-indigo-700'
//               } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               <Camera size={20} />
//               {isRecording ? 'Stop Recording' : 'Start Recording'}
//             </button>
//             <button
//               onClick={() => setIsMuted(!isMuted)}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
//             >
//               {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//               {isMuted ? 'Unmute' : 'Mute'}
//             </button>
//           </div>

//           <div className="bg-gray-50 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Translation Output</h3>
//             <div className="min-h-24 bg-white rounded-lg p-4 border border-gray-200">
//               {prediction ? (
//                 <p className="text-xl">{prediction}</p>
//               ) : (
//                 <p className="text-gray-500">
//                   {isRecording ? 'Processing...' : 'Start recording to see translation'}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
//           <ol className="list-decimal list-inside space-y-2 text-gray-600">
//             <li>Position yourself in front of the camera</li>
//             <li>Ensure good lighting and a clear background</li>
//             <li>Click "Start Recording" to begin translation</li>
//             <li>Perform sign language gestures clearly</li>
//             <li>View the real-time translation below the video</li>
//           </ol>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default SignToText;

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { Camera, Volume2, VolumeX, Play } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  'Thank you': {
    en: 'Thank you',
    hi: 'धन्यवाद',
    ta: 'நன்றி',
    fr: 'Merci',
    de: 'Danke',
    es: 'Gracias',
  },
  Yes: {
    en: 'Yes',
    hi: 'हाँ',
    ta: 'ஆம்',
    fr: 'Oui',
    de: 'Ja',
    es: 'Sí',
  },
  No: {
    en: 'No',
    hi: 'नहीं',
    ta: 'இல்லை',
    fr: 'Non',
    de: 'Nein',
    es: 'No',
  },
  Peace: {
    en: 'Peace',
    hi: 'शांति',
    ta: 'அமைதி',
    fr: 'Paix',
    de: 'Frieden',
    es: 'Paz',
  },
  Hello: {
    en: 'Hello',
    hi: 'नमस्ते',
    ta: 'வணக்கம்',
    fr: 'Bonjour',
    de: 'Hallo',
    es: 'Hola',
  },
};

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'es', label: 'Spanish' },
];

function SignToText() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [basePrediction, setBasePrediction] = useState('');
  const [translatedPrediction, setTranslatedPrediction] = useState('');
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState('en');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const labels = ['Thank you', 'Yes', 'No', 'Peace', 'Hello'];

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/modfiles/model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      } finally {
        setIsModelLoading(false);
      }
    };
    loadModel();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = speechSynthesis.getVoices();
      setVoices(synthVoices);
      const matched = synthVoices.find(v => v.lang.toLowerCase().startsWith(selectedLang));
      setSelectedVoice(matched || null);
    };
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  useEffect(() => {
    const matched = voices.find(v => v.lang.toLowerCase().startsWith(selectedLang));
    setSelectedVoice(matched || null);

    if (basePrediction) {
      translateAndSpeak(basePrediction);
    }
  }, [selectedLang, voices]);

  const speak = (text: string, lang: string) => {
    if (isMuted || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    if (selectedVoice) utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
  };

  const translateAndSpeak = (prediction: string) => {
    const translated = translations[prediction]?.[selectedLang] || prediction;
    setTranslatedPrediction(translated);
    speak(translated, selectedLang);
  };

  const startPrediction = async () => {
    if (!model || !webcamRef.current || !canvasRef.current) return;
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!video || !ctx) return;

    const predict = async () => {
      ctx.drawImage(video, 0, 0, 224, 224);
      const imageData = ctx.getImageData(0, 0, 224, 224);

      const tensor = tf.browser.fromPixels(imageData)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
      const normalized = tensor.div(255.0);

      const predictions = await model.predict(normalized) as tf.Tensor;
      const predictionArray = await predictions.data();
      const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
      const newPrediction = labels[maxIndex];

      if (newPrediction !== basePrediction) {
        setBasePrediction(newPrediction);
        translateAndSpeak(newPrediction);
      }

      tensor.dispose();
      normalized.dispose();
      predictions.dispose();

      animationFrameRef.current = requestAnimationFrame(predict);
    };

    predict();
  };

  const handleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Sign Language to Text & Speech
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-6">
            {isModelLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
              </div>
            ) : isRecording ? (
              <>
                <Webcam ref={webcamRef} audio={false} className="w-full h-full object-cover" onUserMedia={startPrediction} />
                <canvas ref={canvasRef} width="224" height="224" style={{ display: 'none' }} />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Click "Start Recording" to begin
              </div>
            )}
          </div>

          <div className="flex justify-between flex-wrap gap-4 mb-6 items-center">
            <button onClick={handleRecording} disabled={isModelLoading} className={`flex items-center gap-2 px-6 py-3 rounded-lg ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}>
              <Camera size={20} />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            <button onClick={() => setIsMuted(!isMuted)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {isMuted ? 'Unmute' : 'Mute'}
            </button>

            <button onClick={() => speak(translatedPrediction, selectedLang)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white">
              <Play size={20} /> Speak Again
            </button>

            <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Translation Output</h3>
            <div className="min-h-24 bg-white rounded-lg p-4 border border-gray-200 text-xl">
              {translatedPrediction ? (
                <p>{translatedPrediction}</p>
              ) : (
                <p className="text-gray-500">{isRecording ? 'Processing...' : 'Start recording to see translation'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Position yourself in front of the camera</li>
            <li>Ensure good lighting and a clear background</li>
            <li>Click "Start Recording" to begin translation</li>
            <li>Perform sign language gestures clearly</li>
            <li>Choose your preferred language for output</li>
            <li>Click "Speak Again" to replay translation</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}

export default SignToText;
