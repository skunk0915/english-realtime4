'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReviewList() {
  const [reviewItems, setReviewItems] = useState<Array<{
    id: string;
    type: string;
    title: string;
    addedAt: Date;
    nextReview: Date;
    difficulty: number;
  }>>([]);
  
  useEffect(() => {
    const mockReviewItems = [
      {
        id: '1',
        type: 'conversation',
        title: 'レストランでの注文 - ターン1',
        addedAt: new Date('2024-01-15'),
        nextReview: new Date('2024-01-16'),
        difficulty: 3
      },
      {
        id: '2', 
        type: 'phrase',
        title: 'おはようございます',
        addedAt: new Date('2024-01-14'),
        nextReview: new Date('2024-01-17'),
        difficulty: 2
      }
    ];
    setReviewItems(mockReviewItems);
  }, []);
  
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return '簡単';
    if (difficulty <= 3) return '普通';
    return '難しい';
  };
  
  const isReviewDue = (nextReview: Date) => {
    return new Date() >= nextReview;
  };
  
  const dueItems = reviewItems.filter(item => isReviewDue(item.nextReview));
  const upcomingItems = reviewItems.filter(item => !isReviewDue(item.nextReview));
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-600 mr-4">
            ← 戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            復習リスト
          </h1>
        </div>
        
        {dueItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              復習期限到来 ({dueItems.length}件)
            </h2>
            <div className="space-y-3">
              {dueItems.map((item) => (
                <div key={item.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-800">
                      {item.title}
                    </h3>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {item.type === 'conversation' ? '対話' : 'フレーズ'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(item.difficulty)}`}>
                      {getDifficultyText(item.difficulty)}
                    </span>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">
                      復習開始
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {upcomingItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              今後の復習予定 ({upcomingItems.length}件)
            </h2>
            <div className="space-y-3">
              {upcomingItems.map((item) => (
                <div key={item.id} className="bg-white border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-800">
                      {item.title}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {item.type === 'conversation' ? '対話' : 'フレーズ'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(item.difficulty)}`}>
                      {getDifficultyText(item.difficulty)}
                    </span>
                    <span className="text-xs text-gray-600">
                      次回: {item.nextReview.toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {reviewItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              復習リストは空です
            </h2>
            <p className="text-gray-600 mb-6">
              トレーニング中に「復習リストに追加」ボタンを押すと、<br />
              ここに項目が追加されます
            </p>
            <div className="space-y-3">
              <Link
                href="/conversation-training"
                className="block bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                対話トレーニングを始める
              </Link>
              <Link
                href="/phrase-training"
                className="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                フレーズトレーニングを始める
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}