import { Button } from '@/components/ui';

interface PhraseCompletedViewProps {
  onRestart: () => void;
  onSelectOther: () => void;
}

const PhraseCompletedView = ({
  onRestart,
  onSelectOther,
}: PhraseCompletedViewProps) => {
  return (
    <div className='text-center py-12'>
      <div className='text-6xl mb-4'>🎉</div>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>
        完了しました！
      </h2>
      <p className='text-gray-600 mb-6'>
        すべてのフレーズをクリアしました
      </p>
      <div className='space-y-3'>
        <Button
          onClick={onRestart}
          variant='primary'
          fullWidth
        >
          もう一度挑戦
        </Button>
        <Button
          onClick={onSelectOther}
          variant='secondary'
          fullWidth
        >
          他のカテゴリを選択
        </Button>
      </div>
    </div>
  );
};

export default PhraseCompletedView;