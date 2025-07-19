import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhraseGroup } from '@/lib/types/phrase';
import { phraseGroups } from '@/lib/data/phrases';
import { usePhraseTraining } from '@/hooks';
import PhraseView from './PhraseView';
import PhraseCompletedView from './PhraseCompletedView';

const PhraseContainer = () => {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;
  
  const [group, setGroup] = useState<PhraseGroup | null>(null);

  useEffect(() => {
    const foundGroup = phraseGroups.find(g => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
    } else {
      router.push('/phrase-training');
    }
  }, [groupId, router]);

  const {
    currentPhrase,
    currentPhraseIndex,
    isListening,
    userResponse,
    isCorrect,
    progress,
    isComplete,
    incorrectCount,
    startListening,
    markAsCorrect,
    markAsIncorrect,
    restartTraining,
    completeTraining,
  } = usePhraseTraining(
    group ? { group } : { group: { id: '', title: '', category: '', phrases: [] } }
  );

  if (!group) {
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
            onClick={() => router.push('/phrase-training')}
            className='text-blue-600 hover:text-blue-800'
          >
            ← 戻る
          </button>
          <h1 className='text-lg font-bold text-gray-800'>
            {group.title}
          </h1>
          <span className='text-sm text-gray-500'>
            {currentPhraseIndex + 1}/{group.phrases.length}
          </span>
        </div>
        
        {/* メインコンテンツ */}
        {isComplete ? (
          <PhraseCompletedView
            onRestart={restartTraining}
            onSelectOther={() => router.push('/phrase-training')}
          />
        ) : currentPhrase ? (
          <PhraseView
            phrase={currentPhrase}
            isListening={isListening}
            userResponse={userResponse}
            isCorrect={isCorrect}
            progress={progress}
            currentIndex={currentPhraseIndex}
            totalPhrases={group.phrases.length}
            incorrectCount={incorrectCount}
            onStartListening={startListening}
            onMarkCorrect={markAsCorrect}
            onMarkIncorrect={markAsIncorrect}
          />
        ) : (
          <div className='text-center'>
            <p className='text-gray-600'>フレーズが見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhraseContainer;