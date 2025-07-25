import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Scene } from '@/lib/types/conversation';
import { loadScenesFromCSV } from '@/lib/data/csvParser';
import { useConversationFlow, useReviewSystem } from '@/hooks';
import ConversationView from './ConversationView';

const ConversationContainer = () => {
  const params = useParams();
  const router = useRouter();
  const sceneId = params.sceneId as string;
  
  const [scene, setScene] = useState<Scene | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToReview } = useReviewSystem();

  useEffect(() => {
    const loadScene = async () => {
      try {
        const scenes = await loadScenesFromCSV();
        const foundScene = scenes.find(s => s.id === sceneId);
        if (foundScene) {
          setScene(foundScene);
        } else {
          router.push('/conversation-training');
        }
      } catch (error) {
        console.error('Failed to load scene:', error);
        router.push('/conversation-training');
      } finally {
        setIsLoading(false);
      }
    };

    loadScene();
  }, [sceneId, router]);

  const {
    currentTurn,
    currentTurnIndex,
    isLastTurn,
    userResponse,
    showResponses,
    timeLeft,
    isTimerActive,
    isInputActive,
    isTimeUp,
    handleSpeechConfirm,
    handleSpeechCancel,
    handleSpeechRetry,
    handleRetryAfterTimeUp,
    handleShowCorrectAnswer,
    handleAudioPlayEnd,
    nextTurn,
  } = useConversationFlow(
    scene ? { scene } : { scene: { id: '', title: '', description: '', category: '', conversations: [] } }
  );

  const handleAddToReview = () => {
    if (scene && currentTurn) {
      addToReview('conversation', currentTurn.id, { sceneId: scene.id });
    }
  };

  if (isLoading || !scene || !currentTurn) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>シーンを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-md mx-auto'>
        {/* ヘッダー */}
        <div className='flex items-center justify-between mb-6'>
          <button 
            onClick={() => router.push('/conversation-training')}
            className='text-blue-600 hover:text-blue-800'
          >
            ← 戻る
          </button>
          <h1 className='text-lg font-bold text-gray-800'>
            {scene.title}
          </h1>
          <span className='text-sm text-gray-500'>
            {currentTurnIndex + 1}/{scene.conversations.length}
          </span>
        </div>
        
        {/* メインコンテンツ */}
        <ConversationView
          turn={currentTurn}
          userResponse={userResponse}
          showResponses={showResponses}
          timeLeft={timeLeft}
          isTimerActive={isTimerActive}
          isInputActive={isInputActive}
          isTimeUp={isTimeUp}
          onSpeechConfirm={handleSpeechConfirm}
          onSpeechCancel={handleSpeechCancel}
          onSpeechRetry={handleSpeechRetry}
          onRetryAfterTimeUp={handleRetryAfterTimeUp}
          onShowCorrectAnswer={handleShowCorrectAnswer}
          onAudioPlayEnd={handleAudioPlayEnd}
          onNext={nextTurn}
          onAddToReview={handleAddToReview}
          isLastTurn={isLastTurn}
        />
      </div>
    </div>
  );
};

export default ConversationContainer;