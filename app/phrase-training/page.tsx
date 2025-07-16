'use client';

import React from 'react';
import Link from 'next/link';
import { phraseGroups } from '@/lib/data/phrases';

export default function PhraseTraining() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-600 mr-4">
            ← 戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            ワンフレーズトレーニング
          </h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          カテゴリを選択してフレーズ練習を始めましょう
        </p>
        
        <div className="space-y-4">
          {phraseGroups.map((group) => (
            <Link
              key={group.id}
              href={`/phrase-training/${group.id}`}
              className="block bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-800 mb-2">
                {group.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {group.phrases.length}個のフレーズ
              </p>
              <span className="inline-block text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {group.category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}