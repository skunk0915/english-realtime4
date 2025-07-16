'use client';

import { useState } from 'react';
import Link from 'next/link';
import { scenes } from '@/lib/data/scenes';

export default function ConversationTraining() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-600 mr-4">
            ← 戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            対話トレーニング
          </h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          シーンを選択してリアルタイム英会話を始めましょう
        </p>
        
        <div className="space-y-4">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              href={`/conversation-training/${scene.id}`}
              className="block bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-800 mb-2">
                {scene.title}
              </h3>
              <p className="text-sm text-gray-600">
                {scene.description}
              </p>
              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {scene.category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}