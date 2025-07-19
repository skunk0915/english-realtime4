import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Scene } from '@/lib/types/conversation';
import { scenes } from '@/lib/data/scenes';
import { useConversationFlow, useReviewSystem } from '@/hooks';
import ConversationView from './ConversationView';

const ConversationContainer = () => {
  const params = useParams();
  const router = useRouter();
  const sceneId = params.sceneId as string;
  
  const [scene, setScene] = useState<Scene | null>(null);
  const { addToReview } = useReviewSystem();

  useEffect(() => {
    const foundScene = scenes.find(s => s.id === sceneId);
    if (foundScene) {
      setScene(foundScene);
    } else {
      router.push('/conversation-training');
    }
  }, [sceneId, router]);

  const {
    currentTurn,
    currentTurnIndex,
    isLastTurn,
    isListening,
    userResponse,
    showResponses,
    timeLeft,
    isTimerActive,
    startListening,
    nextTurn,
  } = useConversationFlow(
    scene ? { scene } : { scene: { id: '', title: '', description: '', category: '', conversations: [] } }
  );

  const handleAddToReview = () => {
    if (scene && currentTurn) {
      addToReview('conversation', currentTurn.id, { sceneId: scene.id });
    }
  };

  if (!scene || !currentTurn) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>読み込み中...</p>
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
          isListening={isListening}
          userResponse={userResponse}
          showResponses={showResponses}
          timeLeft={timeLeft}
          isTimerActive={isTimerActive}
          onStartListening={startListening}
          onNext={nextTurn}
          onAddToReview={handleAddToReview}
          isLastTurn={isLastTurn}
        />
      </div>
    </div>
  );
};

export default ConversationContainer;