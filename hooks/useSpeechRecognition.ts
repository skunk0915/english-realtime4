import { useEffect, useRef, useState } from 'react';
import { SpeechRecognition, SpeechRecognitionEvent, SpeechError } from '@/lib/types/speech';

interface UseSpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, confidence: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechError) => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  confidence: number;
  error: SpeechError | null;
  isSupported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useSpeechRecognition = (
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn => {
  const {
    lang = 'en-US',
    continuous = false,
    interimResults = false,
    onResult,
    onStart,
    onEnd,
    onError,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<SpeechError | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const isSupported = typeof window !== 'undefined' && 
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) {
      setError({
        type: 'recognition',
        message: '音声認識がサポートされていません',
        code: 'NOT_SUPPORTED',
      });
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    const recognition = recognitionRef.current;
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      onStart?.();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex];
      const resultTranscript = result[0].transcript;
      const resultConfidence = result[0].confidence;
      
      setTranscript(resultTranscript);
      setConfidence(resultConfidence);
      onResult?.(resultTranscript, resultConfidence);
    };

    recognition.onerror = (event) => {
      const speechError: SpeechError = {
        type: 'recognition',
        message: event.message || '音声認識エラーが発生しました',
        code: event.error,
      };
      setError(speechError);
      setIsListening(false);
      onError?.(speechError);
    };

    recognition.onend = () => {
      setIsListening(false);
      onEnd?.();
    };

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [lang, continuous, interimResults, onResult, onStart, onEnd, onError, isSupported]);

  const start = () => {
    if (!recognitionRef.current || isListening) return;
    
    try {
      recognitionRef.current.start();
    } catch (err) {
      const speechError: SpeechError = {
        type: 'recognition',
        message: '音声認識の開始に失敗しました',
      };
      setError(speechError);
      onError?.(speechError);
    }
  };

  const stop = () => {
    if (!recognitionRef.current || !isListening) return;
    
    recognitionRef.current.stop();
  };

  const reset = () => {
    setTranscript('');
    setConfidence(0);
    setError(null);
    if (isListening) {
      stop();
    }
  };

  return {
    isListening,
    transcript,
    confidence,
    error,
    isSupported,
    start,
    stop,
    reset,
  };
};