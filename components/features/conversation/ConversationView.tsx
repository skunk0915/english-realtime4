import { useState } from 'react';
import { ConversationTurn } from '@/lib/types/conversation';
import { Card, CardContent, Button, Timer, EnhancedAudioControls, SpeechInput, TextReveal } from '@/components/ui';

interface ConversationViewProps {
  turn: ConversationTurn;
  userResponse: string;
  showResponses: boolean;
  timeLeft: number;
  isTimerActive: boolean;
  isInputActive: boolean;
  onSpeechConfirm: (transcript: string) => void;
  onSpeechCancel: () => void;
  onAudioPlayEnd: () => void;
  onNext: () => void;
  onAddToReview: () => void;
  isLastTurn: boolean;
}

const ConversationView = ({
  turn,
  userResponse,
  showResponses,
  timeLeft: _timeLeft,
  isTimerActive,
  isInputActive,
  onSpeechConfirm,
  onSpeechCancel,
  onAudioPlayEnd,
  onNext,
  onAddToReview,
  isLastTurn,
}: ConversationViewProps) => {
  const [isTextRevealed, setIsTextRevealed] = useState(false);
  return (
    <div className='space-y-6'>
      {/* AI メッセージ */}
      <Card>
        <CardContent className='space-y-4'>
          <div className='flex items-start space-x-3'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm'>AI</span>
            </div>
            <div className='flex-1'>
              <div className='mb-3'>
                <TextReveal
                  text={turn.text}
                  isRevealed={isTextRevealed}
                  onReveal={() => setIsTextRevealed(true)}
                  revealButtonText="英文を表示"
                  placeholder="🔊 まずは音声を聞いてみましょう"
                  {...(turn.translation && { translation: turn.translation })}
                />
              </div>
              <EnhancedAudioControls
                text={turn.text}
                autoPlay={true}
                onPlayEnd={onAudioPlayEnd}
                onError={(error) => console.error('音声再生エラー:', error)}
                showSlowSpeed={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 音声入力セクション */}
      <div className='space-y-4'>
        {!showResponses && (
          <>
            <SpeechInput
              onConfirm={onSpeechConfirm}
              onCancel={onSpeechCancel}
              placeholder="6秒以内に話してください..."
              isActive={isInputActive}
              lang="en-US"
            />
            
            {isTimerActive && (
              <div className='text-center'>
                <Timer
                  initialTime={6}
                  isActive={isTimerActive}
                  showAnimation={true}
                />
                <p className='text-gray-600 text-sm mt-2'>
                  残り時間
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ユーザー回答表示 */}
      {userResponse && (
        <Card variant='bordered'>
          <CardContent>
            <h3 className='font-medium text-gray-800 mb-2'>
              あなたの回答:
            </h3>
            <p className='text-gray-700'>{userResponse}</p>
          </CardContent>
        </Card>
      )}

      {/* 回答例表示 */}
      {showResponses && turn.responses && (
        <div className='space-y-4'>
          <h3 className='font-medium text-gray-800'>参考回答例:</h3>
          
          {/* 中学生レベル */}
          <div>
            <h4 className='text-sm font-medium text-blue-600 mb-2'>
              中学生レベル
            </h4>
            {turn.responses
              .filter(r => r.level === 'beginner')
              .map(response => (
                <Card key={response.id} variant='bordered' className='mb-2 bg-blue-50'>
                  <CardContent className='py-3'>
                    <p className='text-gray-800 mb-2'>{response.text}</p>
                    <EnhancedAudioControls
                      text={response.text}
                      autoPlay={false}
                      showSlowSpeed={true}
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
          
          {/* ネイティブレベル */}
          <div>
            <h4 className='text-sm font-medium text-green-600 mb-2'>
              ネイティブレベル
            </h4>
            {turn.responses
              .filter(r => r.level === 'native')
              .map(response => (
                <Card key={response.id} variant='bordered' className='mb-2 bg-green-50'>
                  <CardContent className='py-3'>
                    <p className='text-gray-800 mb-2'>{response.text}</p>
                    <EnhancedAudioControls
                      text={response.text}
                      autoPlay={false}
                      showSlowSpeed={true}
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* アクションボタン */}
      {showResponses && (
        <div className='flex space-x-3'>
          <Button
            onClick={onNext}
            variant='primary'
            fullWidth
          >
            {isLastTurn ? '完了' : '次へ'}
          </Button>
          <Button 
            onClick={onAddToReview}
            variant='warning'
            className='px-4'
          >
            復習リストに追加
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConversationView;