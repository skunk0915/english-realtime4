'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { phraseGroups } from '@/lib/data/phrases';
import { PhraseGroup } from '@/lib/types';

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

export default function PhraseTrainingGroup() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;
  
  const [group, setGroup] = useState<PhraseGroup | null>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [incorrectPhrases, setIncorrectPhrases] = useState<number[]>([]);
  const [completedPhrases, setCompletedPhrases] = useState<Set<number>>(new Set());
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    const foundGroup = phraseGroups.find(g => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
    } else {
      router.push('/phrase-training');
    }
  }, [groupId, router]);
  
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setUserResponse('');
        setIsCorrect(null);
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setUserResponse(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.start();
    } else {
      alert('音声認識がサポートされていません');
    }
  };
  
  const markAsCorrect = () => {
    const newCompleted = new Set(completedPhrases);
    newCompleted.add(currentPhraseIndex);
    setCompletedPhrases(newCompleted);
    setIsCorrect(true);
    
    setTimeout(() => {
      nextPhrase();
    }, 1000);
  };
  
  const markAsIncorrect = () => {
    setIsCorrect(false);
    if (!incorrectPhrases.includes(currentPhraseIndex)) {
      setIncorrectPhrases([...incorrectPhrases, currentPhraseIndex]);
    }
  };
  
  const nextPhrase = () => {
    if (!group) return;
    
    if (currentPhraseIndex < group.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      if (incorrectPhrases.length > 0) {
        setCurrentPhraseIndex(incorrectPhrases[0]);
        setIncorrectPhrases(incorrectPhrases.slice(1));
      } else {
        router.push('/phrase-training');
        return;
      }
    }
    
    setUserResponse('');
    setIsCorrect(null);
  };
  
  const playAudio = async (text: string, speed: number = 1.0) => {
    try {
      console.log('音声合成開始:', text, 'speed:', speed);
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, speed }),
      });

      if (!response.ok) {
        throw new Error(`TTS API Error: ${response.status}`);
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
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.onerror = (error) => {
          console.error('音声再生エラー:', error);
          URL.revokeObjectURL(audioUrl);
        };

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
      console.log('音声再生完了:', text);
      
    } catch (error) {
      console.error('音声合成エラー:', error);
    }
  };
  
  const restartTraining = () => {
    setCurrentPhraseIndex(0);
    setUserResponse('');
    setIsCorrect(null);
    setIncorrectPhrases([]);
    setCompletedPhrases(new Set());
  };
  
  if (!group) {
    return <div>読み込み中...</div>;
  }
  
  const currentPhrase = group.phrases[currentPhraseIndex];
  const progress = ((completedPhrases.size) / group.phrases.length) * 100;
  const isComplete = completedPhrases.size === group.phrases.length && incorrectPhrases.length === 0;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => router.push('/phrase-training')}
            className="text-blue-600"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {group.title}
          </h1>
          <span className="text-sm text-gray-500">
            {currentPhraseIndex + 1}/{group.phrases.length}
          </span>
        </div>
        
        <div className="bg-white rounded-lg p-2 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1 text-center">
            進捗: {completedPhrases.size}/{group.phrases.length}
          </p>
        </div>
        
        {isComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              完了しました！
            </h2>
            <p className="text-gray-600 mb-6">
              すべてのフレーズをクリアしました
            </p>
            <div className="space-y-3">
              <button
                onClick={restartTraining}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                もう一度挑戦
              </button>
              <button
                onClick={() => router.push('/phrase-training')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                他のカテゴリを選択
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                次の日本語を英語で言ってください
              </h3>
              <p className="text-xl text-gray-800 mb-4 text-center py-4 bg-gray-50 rounded-lg">
                {currentPhrase.japanese}
              </p>
              
              <div className="text-center">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`px-6 py-3 rounded-full text-lg font-medium ${
                    isListening 
                      ? 'bg-red-300 text-white cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isListening ? '🎤 録音中...' : '🎤 音声で回答'}
                </button>
              </div>
            </div>
            
            {userResponse && (
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  あなたの回答:
                </h3>
                <p className="text-gray-700 mb-4">{userResponse}</p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={markAsCorrect}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    正解
                  </button>
                  <button
                    onClick={markAsIncorrect}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    やり直し
                  </button>
                </div>
              </div>
            )}
            
            {userResponse && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-3">
                  正解例:
                </h3>
                <p className="text-gray-800 mb-3">{currentPhrase.english}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => playAudio(currentPhrase.english, 1.0)}
                    className="text-blue-600 text-sm underline"
                  >
                    🔊 通常速度
                  </button>
                  <button
                    onClick={() => playAudio(currentPhrase.english, 0.7)}
                    className="text-blue-600 text-sm underline"
                  >
                    🔊 ゆっくり
                  </button>
                </div>
              </div>
            )}
            
            
            {isCorrect === true && (
              <div className="bg-green-50 rounded-lg p-4 mb-6 text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="text-green-800 font-medium">正解です！</p>
              </div>
            )}
            
            {incorrectPhrases.length > 0 && (
              <div className="bg-orange-50 rounded-lg p-3 mb-6">
                <p className="text-orange-800 text-sm">
                  やり直し待ち: {incorrectPhrases.length}個
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}