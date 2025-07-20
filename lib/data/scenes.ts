import { Scene } from '../types';

export const scenes: Scene[] = [
  {
    id: 'restaurant',
    title: 'レストランでの注文',
    description: 'レストランで食事を注文する際の会話',
    category: 'dining',
    conversations: [
      {
        id: 'r1',
        speaker: 'ai',
        text: 'Good evening! Welcome to our restaurant. How many people will be dining today?',
        audio: '/audio/restaurant/r1.mp3',
        translation: 'こんばんは！当レストランへようこそ。本日は何名様でお食事でしょうか？',
        responses: [
          {
            id: 'r1-b1',
            level: 'beginner',
            text: 'Two people, please.',
            audio: '/audio/restaurant/r1-b1.mp3',
            audioSlow: '/audio/restaurant/r1-b1-slow.mp3'
          },
          {
            id: 'r1-b2',
            level: 'beginner', 
            text: 'Table for two, please.',
            audio: '/audio/restaurant/r1-b2.mp3',
            audioSlow: '/audio/restaurant/r1-b2-slow.mp3'
          },
          {
            id: 'r1-n1',
            level: 'native',
            text: 'We\'d like a table for two, please.',
            audio: '/audio/restaurant/r1-n1.mp3',
            audioSlow: '/audio/restaurant/r1-n1-slow.mp3'
          },
          {
            id: 'r1-n2',
            level: 'native',
            text: 'Good evening! There will be two of us tonight.',
            audio: '/audio/restaurant/r1-n2.mp3',
            audioSlow: '/audio/restaurant/r1-n2-slow.mp3'
          }
        ]
      },
      {
        id: 'r2',
        speaker: 'ai',
        text: 'Perfect! Right this way. Here are your menus. Can I start you off with something to drink?',
        audio: '/audio/restaurant/r2.mp3',
        translation: '素晴らしい！こちらへどうぞ。メニューをお渡しします。まずはお飲み物はいかがですか？',
        responses: [
          {
            id: 'r2-b1',
            level: 'beginner',
            text: 'Water, please.',
            audio: '/audio/restaurant/r2-b1.mp3',
            audioSlow: '/audio/restaurant/r2-b1-slow.mp3'
          },
          {
            id: 'r2-b2',
            level: 'beginner',
            text: 'I would like water.',
            audio: '/audio/restaurant/r2-b2.mp3',
            audioSlow: '/audio/restaurant/r2-b2-slow.mp3'
          },
          {
            id: 'r2-n1',
            level: 'native',
            text: 'Could we have two glasses of water to start?',
            audio: '/audio/restaurant/r2-n1.mp3',
            audioSlow: '/audio/restaurant/r2-n1-slow.mp3'
          },
          {
            id: 'r2-n2',
            level: 'native',
            text: 'We\'ll have water for now, thank you.',
            audio: '/audio/restaurant/r2-n2.mp3',
            audioSlow: '/audio/restaurant/r2-n2-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'airport',
    title: '空港でのチェックイン',
    description: '空港でのチェックイン手続きの会話',
    category: 'travel',
    conversations: [
      {
        id: 'a1',
        speaker: 'ai',
        text: 'Good morning! May I see your passport and ticket, please?',
        audio: '/audio/airport/a1.mp3',
        translation: 'おはようございます！パスポートとチケットを見せていただけますか？',
        responses: [
          {
            id: 'a1-b1',
            level: 'beginner',
            text: 'Here you are.',
            audio: '/audio/airport/a1-b1.mp3',
            audioSlow: '/audio/airport/a1-b1-slow.mp3'
          },
          {
            id: 'a1-b2',
            level: 'beginner',
            text: 'Here is my passport.',
            audio: '/audio/airport/a1-b2.mp3',
            audioSlow: '/audio/airport/a1-b2-slow.mp3'
          },
          {
            id: 'a1-n1',
            level: 'native',
            text: 'Certainly, here\'s my passport and boarding pass.',
            audio: '/audio/airport/a1-n1.mp3',
            audioSlow: '/audio/airport/a1-n1-slow.mp3'
          },
          {
            id: 'a1-n2',
            level: 'native',
            text: 'Of course, here you go.',
            audio: '/audio/airport/a1-n2.mp3',
            audioSlow: '/audio/airport/a1-n2-slow.mp3'
          }
        ]
      }
    ]
  }
];