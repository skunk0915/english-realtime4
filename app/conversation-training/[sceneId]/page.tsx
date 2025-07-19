'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { scenes } from '@/lib/data/scenes';
import { Scene } from '@/lib/types';

// Web Speech API型定義
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  start(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default function ConversationScene() {
  const params = useParams();
  const router = useRouter();
  const sceneId = params.sceneId as string;
  
  const [scene, setScene] = useState<Scene | null>(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [showResponses, setShowResponses] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    const foundScene = scenes.find(s => s.id === sceneId);
    if (foundScene) {
      setScene(foundScene);
    } else {
      router.push('/conversation-training');
    }
  }, [sceneId, router]);
  
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      setShowResponses(true);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerActive, timeLeft]);
  
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setIsTimerActive(true);
        setTimeLeft(6);
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setUserResponse(transcript);
        setIsListening(false);
        setIsTimerActive(false);
        setShowResponses(true);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setIsTimerActive(false);
      };
      
      recognitionRef.current.start();
    } else {
      alert('音声認識がサポートされていません');
    }
  };
  
  const nextTurn = () => {
    if (scene && currentTurnIndex < scene.conversations.length - 1) {
      setCurrentTurnIndex(currentTurnIndex + 1);
      setUserResponse('');
      setShowResponses(false);
      setTimeLeft(6);
    } else {
      router.push('/conversation-training');
    }
  };
  
  const playAudio = async (text: string, speed: 'normal' | 'slow' = 'normal') => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, speed }),
      });

      if (!response.ok) {
        throw new Error('音声合成に失敗しました');
      }

      const data = await response.json();
      
      if (!data.audioData) {
        throw new Error('音声データが取得できませんでした');
      }

      // Base64音声データをBlobに変換
      try {
        const binaryString = atob(data.audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const audioBlob = new Blob([bytes], { type: data.mimeType });
        
        if (audioBlob.size === 0) {
          throw new Error('音声データが空です');
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.addEventListener('ended', () => {
          URL.revokeObjectURL(audioUrl);
        });
        
        audio.addEventListener('error', (error) => {
          console.error('音声再生エラー:', error);
          URL.revokeObjectURL(audioUrl);
        });

        // 音声の読み込み完了を待つ
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          audio.load();
        });

        await audio.play();
      } catch (decodeError) {
        console.error('Base64デコードエラー:', decodeError);
        throw new Error('音声データの形式が不正です');
      }
    } catch (error) {
      console.error('音声再生エラー:', error);
    }
  };
  
  if (!scene) {
    return <div>読み込み中...</div>;
  }
  
  const currentTurn = scene.conversations[currentTurnIndex];
  const isLastTurn = currentTurnIndex === scene.conversations.length - 1;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => router.push('/conversation-training')}
            className="text-blue-600"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {scene.title}
          </h1>
          <span className="text-sm text-gray-500">
            {currentTurnIndex + 1}/{scene.conversations.length}
          </span>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 mb-3">{currentTurn.text}</p>
              <button
                onClick={() => playAudio(currentTurn.text)}
                className="text-blue-600 text-sm underline"
              >
                🔊 音声を再生
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-6">
          {!isListening && !showResponses && (
            <button
              onClick={startListening}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium"
            >
              🎤 音声で応答 (6秒以内)
            </button>
          )}
          
          {isListening && (
            <div className="space-y-3">
              <div className="text-2xl font-bold text-red-500">
                {timeLeft}秒
              </div>
              <div className="text-red-500 animate-pulse">
                🎤 録音中...
              </div>
            </div>
          )}
        </div>
        
        {userResponse && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-2">
              あなたの回答:
            </h3>
            <p className="text-gray-700">{userResponse}</p>
          </div>
        )}
        
        {showResponses && currentTurn.responses && (
          <div className="space-y-4 mb-6">
            <h3 className="font-medium text-gray-800">
              参考回答例:
            </h3>
            
            <div>
              <h4 className="text-sm font-medium text-blue-600 mb-2">
                中学生レベル
              </h4>
              {currentTurn.responses
                .filter(r => r.level === 'beginner')
                .map(response => (
                  <div key={response.id} className="bg-blue-50 rounded-lg p-3 mb-2">
                    <p className="text-gray-800 mb-2">{response.text}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => playAudio(response.text, 'normal')}
                        className="text-blue-600 text-xs underline"
                      >
                        🔊 通常速度
                      </button>
                      <button
                        onClick={() => playAudio(response.text, 'slow')}
                        className="text-blue-600 text-xs underline"
                      >
                        🔊 ゆっくり
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-green-600 mb-2">
                ネイティブレベル
              </h4>
              {currentTurn.responses
                .filter(r => r.level === 'native')
                .map(response => (
                  <div key={response.id} className="bg-green-50 rounded-lg p-3 mb-2">
                    <p className="text-gray-800 mb-2">{response.text}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => playAudio(response.text, 'normal')}
                        className="text-green-600 text-xs underline"
                      >
                        🔊 通常速度
                      </button>
                      <button
                        onClick={() => playAudio(response.text, 'slow')}
                        className="text-green-600 text-xs underline"
                      >
                        🔊 ゆっくり
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {showResponses && (
          <div className="flex space-x-3">
            <button
              onClick={nextTurn}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
            >
              {isLastTurn ? '完了' : '次へ'}
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg">
              復習リストに追加
            </button>
          </div>
        )}
      </div>
    </div>
  );
}