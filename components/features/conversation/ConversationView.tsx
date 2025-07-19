import { ConversationTurn } from '@/lib/types/conversation';
import { Card, CardContent, Button, Timer, AudioControls } from '@/components/ui';

interface ConversationViewProps {
  turn: ConversationTurn;
  isListening: boolean;
  userResponse: string;
  showResponses: boolean;
  timeLeft: number;
  isTimerActive: boolean;
  onStartListening: () => void;
  onNext: () => void;
  onAddToReview: () => void;
  isLastTurn: boolean;
}

const ConversationView = ({
  turn,
  isListening,
  userResponse,
  showResponses,
  timeLeft,
  isTimerActive,
  onStartListening,
  onNext,
  onAddToReview,
  isLastTurn,
}: ConversationViewProps) => {
  return (
    <div className='space-y-6'>
      {/* AI メッセージ */}
      <Card>
        <CardContent className='flex items-start space-x-3'>
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm'>AI</span>
          </div>
          <div className='flex-1'>
            <p className='text-gray-800 mb-3'>{turn.text}</p>
            <AudioControls text={turn.text} />
          </div>
        </CardContent>
      </Card>

      {/* 音声入力セクション */}
      <div className='text-center space-y-4'>
        {!isListening && !showResponses && (
          <Button
            onClick={onStartListening}
            variant='danger'
            size='lg'
            className='rounded-full'
          >
            🎤 音声で応答 (6秒以内)
          </Button>
        )}
        
        {isListening && (
          <div className='space-y-3'>
            <Timer
              initialTime={6}
              isActive={isTimerActive}
              showAnimation={true}
            />
            <div className='text-red-500 animate-pulse'>
              🎤 録音中...
            </div>
          </div>
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
                    <AudioControls text={response.text} />
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
                    <AudioControls text={response.text} />
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