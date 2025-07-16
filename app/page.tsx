'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          English Realtime
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          リアルタイム英会話トレーニング
        </p>
        
        <div className="space-y-4">
          <Link
            href="/conversation-training"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            対話トレーニング
          </Link>
          
          <Link
            href="/phrase-training"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            ワンフレーズトレーニング
          </Link>
          
          <Link
            href="/review"
            className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            復習リスト
          </Link>
        </div>
      </div>
    </div>
  );
}
