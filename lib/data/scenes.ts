import { Scene } from '../types';

// CSVデータから作成された会話シーン
export const scenes: Scene[] = [
  {
    id: 'morning_greeting',
    title: '朝の挨拶',
    description: '朝の挨拶での会話',
    category: 'daily',
    conversations: [
      {
        id: 'mg1',
        speaker: 'ai',
        text: 'Good morning. Did you sleep well?',
        audio: '/audio/conversation/mg1.mp3',
        translation: 'おはよう、昨日はよく眠れた？',
        responses: [
          {
            id: 'mg1-b1',
            level: 'beginner',
            text: 'Yes, very well. And you?',
            audio: '/audio/conversation/mg1-b1.mp3',
            audioSlow: '/audio/conversation/mg1-b1-slow.mp3'
          },
          {
            id: 'mg1-n1',
            level: 'native',
            text: 'Slept like a log. You?',
            audio: '/audio/conversation/mg1-n1.mp3',
            audioSlow: '/audio/conversation/mg1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'mg2',
        speaker: 'ai',
        text: 'Not bad. First class is math, right?',
        audio: '/audio/conversation/mg2.mp3',
        translation: 'まあまあかな。今日の１時間目は数学だよね。',
        responses: [
          {
            id: 'mg2-b1',
            level: 'beginner',
            text: 'Yes. Did you finish the homework?',
            audio: '/audio/conversation/mg2-b1.mp3',
            audioSlow: '/audio/conversation/mg2-b1-slow.mp3'
          },
          {
            id: 'mg2-n1',
            level: 'native',
            text: 'Yep. You knock out the homework?',
            audio: '/audio/conversation/mg2-n1.mp3',
            audioSlow: '/audio/conversation/mg2-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'bus_schedule',
    title: 'バス停で時刻確認',
    description: 'バス停での時刻確認会話',
    category: 'transportation',
    conversations: [
      {
        id: 'bs1',
        speaker: 'ai',
        text: 'When is the next bus?',
        audio: '/audio/conversation/bs1.mp3',
        translation: '次のバスは何時に来る？',
        responses: [
          {
            id: 'bs1-b1',
            level: 'beginner',
            text: 'It comes at 8:15.',
            audio: '/audio/conversation/bs1-b1.mp3',
            audioSlow: '/audio/conversation/bs1-b1-slow.mp3'
          },
          {
            id: 'bs1-n1',
            level: 'native',
            text: 'Says 8:15 on the board.',
            audio: '/audio/conversation/bs1-n1.mp3',
            audioSlow: '/audio/conversation/bs1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'library_search',
    title: '図書館で本を探す',
    description: '図書館での本探しの会話',
    category: 'study',
    conversations: [
      {
        id: 'lib1',
        speaker: 'ai',
        text: 'Are history books on this shelf?',
        audio: '/audio/conversation/lib1.mp3',
        translation: 'この本棚に歴史の本ある？',
        responses: [
          {
            id: 'lib1-b1',
            level: 'beginner',
            text: 'I think on the top row.',
            audio: '/audio/conversation/lib1-b1.mp3',
            audioSlow: '/audio/conversation/lib1-b1-slow.mp3'
          },
          {
            id: 'lib1-n1',
            level: 'native',
            text: 'Yeah, top row.',
            audio: '/audio/conversation/lib1-n1.mp3',
            audioSlow: '/audio/conversation/lib1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'cafe_order',
    title: 'カフェで注文',
    description: 'カフェでの注文会話',
    category: 'dining',
    conversations: [
      {
        id: 'cf1',
        speaker: 'ai',
        text: 'A tall café latte, please.',
        audio: '/audio/conversation/cf1.mp3',
        translation: 'カフェラテのトールサイズください。',
        responses: [
          {
            id: 'cf1-b1',
            level: 'beginner',
            text: 'Any sugar?',
            audio: '/audio/conversation/cf1-b1.mp3',
            audioSlow: '/audio/conversation/cf1-b1-slow.mp3'
          },
          {
            id: 'cf1-n1',
            level: 'native',
            text: 'Want sugar with that?',
            audio: '/audio/conversation/cf1-n1.mp3',
            audioSlow: '/audio/conversation/cf1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'rain_umbrella',
    title: '雨で傘を借りる',
    description: '雨の日に傘を借りる会話',
    category: 'daily',
    conversations: [
      {
        id: 'ru1',
        speaker: 'ai',
        text: 'Heavy rain, huh. Do you have an umbrella?',
        audio: '/audio/conversation/ru1.mp3',
        translation: '雨強いね。傘持ってる？',
        responses: [
          {
            id: 'ru1-b1',
            level: 'beginner',
            text: 'I have one extra. Want it?',
            audio: '/audio/conversation/ru1-b1.mp3',
            audioSlow: '/audio/conversation/ru1-b1-slow.mp3'
          },
          {
            id: 'ru1-n1',
            level: 'native',
            text: 'Yeah, I\'ve got an extra. Need it?',
            audio: '/audio/conversation/ru1-n1.mp3',
            audioSlow: '/audio/conversation/ru1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'movie_invitation',
    title: '友達を映画に誘う',
    description: '映画に誘う会話',
    category: 'entertainment',
    conversations: [
      {
        id: 'mi1',
        speaker: 'ai',
        text: 'Want to see a movie this weekend?',
        audio: '/audio/conversation/mi1.mp3',
        translation: '今週末映画観に行かない？',
        responses: [
          {
            id: 'mi1-b1',
            level: 'beginner',
            text: 'Sounds good. Which one?',
            audio: '/audio/conversation/mi1-b1.mp3',
            audioSlow: '/audio/conversation/mi1-b1-slow.mp3'
          },
          {
            id: 'mi1-n1',
            level: 'native',
            text: 'Sure! What\'re we seeing?',
            audio: '/audio/conversation/mi1-n1.mp3',
            audioSlow: '/audio/conversation/mi1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'homework_forgotten',
    title: '宿題を忘れた',
    description: '宿題を忘れた時の会話',
    category: 'study',
    conversations: [
      {
        id: 'hf1',
        speaker: 'ai',
        text: 'Did you bring your homework?',
        audio: '/audio/conversation/hf1.mp3',
        translation: 'あれ、宿題持ってきた？',
        responses: [
          {
            id: 'hf1-b1',
            level: 'beginner',
            text: 'Oh no, I left it at home!',
            audio: '/audio/conversation/hf1-b1.mp3',
            audioSlow: '/audio/conversation/hf1-b1-slow.mp3'
          },
          {
            id: 'hf1-n1',
            level: 'native',
            text: 'Crap, I left it at home!',
            audio: '/audio/conversation/hf1-n1.mp3',
            audioSlow: '/audio/conversation/hf1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'asking_directions',
    title: '道を尋ねる',
    description: '道を尋ねる会話',
    category: 'navigation',
    conversations: [
      {
        id: 'ad1',
        speaker: 'ai',
        text: 'Excuse me, where is the station?',
        audio: '/audio/conversation/ad1.mp3',
        translation: 'すみません、駅はどちらですか？',
        responses: [
          {
            id: 'ad1-b1',
            level: 'beginner',
            text: 'Go straight and turn left at the second light.',
            audio: '/audio/conversation/ad1-b1.mp3',
            audioSlow: '/audio/conversation/ad1-b1-slow.mp3'
          },
          {
            id: 'ad1-n1',
            level: 'native',
            text: 'Head straight down this road and take a left at the second light.',
            audio: '/audio/conversation/ad1-n1.mp3',
            audioSlow: '/audio/conversation/ad1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'photo_request',
    title: '写真を撮ってもらう',
    description: '写真撮影をお願いする会話',
    category: 'social',
    conversations: [
      {
        id: 'pr1',
        speaker: 'ai',
        text: 'Excuse me, could you take a picture for us?',
        audio: '/audio/conversation/pr1.mp3',
        translation: 'すみません、写真を撮っていただけますか？',
        responses: [
          {
            id: 'pr1-b1',
            level: 'beginner',
            text: 'Sure. Which button?',
            audio: '/audio/conversation/pr1-b1.mp3',
            audioSlow: '/audio/conversation/pr1-b1-slow.mp3'
          },
          {
            id: 'pr1-n1',
            level: 'native',
            text: 'Sure thing—what button do I hit?',
            audio: '/audio/conversation/pr1-n1.mp3',
            audioSlow: '/audio/conversation/pr1-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'hospital_appointment',
    title: '病院で予約',
    description: '病院での予約会話',
    category: 'medical',
    conversations: [
      {
        id: 'ha1',
        speaker: 'ai',
        text: 'Can I make an appointment next week in the morning?',
        audio: '/audio/conversation/ha1.mp3',
        translation: '来週の午前で予約できますか？',
        responses: [
          {
            id: 'ha1-b1',
            level: 'beginner',
            text: 'Tuesday at 10 a.m. is open.',
            audio: '/audio/conversation/ha1-b1.mp3',
            audioSlow: '/audio/conversation/ha1-b1-slow.mp3'
          },
          {
            id: 'ha1-n1',
            level: 'native',
            text: 'We\'ve got Tuesday at 10 a.m. open.',
            audio: '/audio/conversation/ha1-n1.mp3',
            audioSlow: '/audio/conversation/ha1-n1-slow.mp3'
          }
        ]
      }
    ]
  }
];