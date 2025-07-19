import { Phrase } from '@/lib/types/phrase';
import { Card, CardContent, Button, ProgressBar, AudioControls } from '@/components/ui';

interface PhraseViewProps {
  phrase: Phrase;
  isListening: boolean;
  userResponse: string;
  isCorrect: boolean | null;
  progress: number;
  currentIndex: number;
  totalPhrases: number;
  incorrectCount: number;
  onStartListening: () => void;
  onMarkCorrect: () => void;
  onMarkIncorrect: () => void;
}

const PhraseView = ({
  phrase,
  isListening,
  userResponse,
  isCorrect,
  progress,
  currentIndex,
  totalPhrases,
  incorrectCount,
  onStartListening,
  onMarkCorrect,
  onMarkIncorrect,
}: PhraseViewProps) => {
  return (
    <div className='space-y-6'>
      {/* 進捗表示 */}
      <Card padding='sm'>
        <ProgressBar 
          progress={progress}
          label={`進捗: ${Math.floor(progress / 100 * totalPhrases)}/${totalPhrases}`}
          color='green'
        />
      </Card>

      {/* フレーズ問題 */}
      <Card>
        <CardContent>
          <h3 className='text-lg font-medium text-gray-800 mb-4'>
            次の日本語を英語で言ってください
          </h3>
          <div className='text-xl text-gray-800 mb-4 text-center py-4 bg-gray-50 rounded-lg'>
            {phrase.japanese}
          </div>
          
          <div className='text-center'>
            <Button
              onClick={onStartListening}
              disabled={isListening}
              variant='danger'
              size='lg'
              className='rounded-full'
              loading={isListening}
            >
              {isListening ? '🎤 録音中...' : '🎤 音声で回答'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ユーザー回答と自己採点 */}
      {userResponse && (
        <Card variant='bordered'>
          <CardContent>
            <h3 className='font-medium text-gray-800 mb-2'>
              あなたの回答:
            </h3>
            <p className='text-gray-700 mb-4'>{userResponse}</p>
            
            <div className='flex space-x-3'>
              <Button
                onClick={onMarkCorrect}
                variant='success'
                fullWidth
              >
                正解
              </Button>
              <Button
                onClick={onMarkIncorrect}
                variant='danger'
                fullWidth
              >
                やり直し
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 正解例表示 */}
      {userResponse && (
        <Card className='bg-blue-50' variant='bordered'>
          <CardContent>
            <h3 className='font-medium text-blue-800 mb-3'>
              正解例:
            </h3>
            <p className='text-gray-800 mb-3'>{phrase.english}</p>
            <AudioControls text={phrase.english} />
          </CardContent>
        </Card>
      )}
      
      {/* 正解フィードバック */}
      {isCorrect === true && (
        <Card className='bg-green-50 text-center' variant='bordered'>
          <CardContent>
            <div className='text-2xl mb-2'>✅</div>
            <p className='text-green-800 font-medium'>正解です！</p>
          </CardContent>
        </Card>
      )}
      
      {/* やり直し待ちカウント */}
      {incorrectCount > 0 && (
        <Card className='bg-orange-50' variant='bordered'>
          <CardContent className='py-3'>
            <p className='text-orange-800 text-sm'>
              やり直し待ち: {incorrectCount}個
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhraseView;