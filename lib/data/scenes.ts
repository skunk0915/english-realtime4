import { Scene } from '../types';

// talk.csvから作成された全62シーンの会話データ
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
        japaneseExample: 'はい、よく眠れました。あなたはどうでしたか？',
        responses: [
          {
            id: 'mg1-b1',
            level: 'beginner',
            text: 'Yes, very well. And you?',
            audio: '/audio/conversation/mg1-b1.mp3',
            audioSlow: '/audio/conversation/mg1-b1-slow.mp3'
          },
          {
            id: 'mg1-b2',
            level: 'beginner',
            text: 'Yeah, I slept fine. You?',
            audio: '/audio/conversation/mg1-b2.mp3',
            audioSlow: '/audio/conversation/mg1-b2-slow.mp3'
          },
          {
            id: 'mg1-b3',
            level: 'beginner',
            text: 'I slept great. How about you?',
            audio: '/audio/conversation/mg1-b3.mp3',
            audioSlow: '/audio/conversation/mg1-b3-slow.mp3'
          },
          {
            id: 'mg1-b4',
            level: 'beginner',
            text: 'Yes, I was. What about you?',
            audio: '/audio/conversation/mg1-b4.mp3',
            audioSlow: '/audio/conversation/mg1-b4-slow.mp3'
          },
          {
            id: 'mg1-b5',
            level: 'beginner',
            text: 'Yes, I did. And you?',
            audio: '/audio/conversation/mg1-b5.mp3',
            audioSlow: '/audio/conversation/mg1-b5-slow.mp3'
          },
          {
            id: 'mg1-n1', 
            level: 'native',
            text: 'Slept like a log. You?',
            audio: '/audio/conversation/mg1-n1.mp3',
            audioSlow: '/audio/conversation/mg1-n1-slow.mp3'
          },
          {
            id: 'mg1-n2', 
            level: 'native',
            text: 'Totally. How about yourself?',
            audio: '/audio/conversation/mg1-n2.mp3',
            audioSlow: '/audio/conversation/mg1-n2-slow.mp3'
          },
          {
            id: 'mg1-n3', 
            level: 'native',
            text: 'Pretty great. You?',
            audio: '/audio/conversation/mg1-n3.mp3',
            audioSlow: '/audio/conversation/mg1-n3-slow.mp3'
          },
          {
            id: 'mg1-n4', 
            level: 'native',
            text: 'Yeah, out like a light. What about you?',
            audio: '/audio/conversation/mg1-n4.mp3',
            audioSlow: '/audio/conversation/mg1-n4-slow.mp3'
          },
          {
            id: 'mg1-n5', 
            level: 'native',
            text: 'Sure did. You?',
            audio: '/audio/conversation/mg1-n5.mp3',
            audioSlow: '/audio/conversation/mg1-n5-slow.mp3'
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
            id: 'mg2-b2',
            level: 'beginner',
            text: 'That\'s right. Did you do the math work?',
            audio: '/audio/conversation/mg2-b2.mp3',
            audioSlow: '/audio/conversation/mg2-b2-slow.mp3'
          },
          {
            id: 'mg2-b3',
            level: 'beginner',
            text: 'True. Homework done?',
            audio: '/audio/conversation/mg2-b3.mp3',
            audioSlow: '/audio/conversation/mg2-b3-slow.mp3'
          },
          {
            id: 'mg2-b4',
            level: 'beginner',
            text: 'Yes. Did you finish the task?',
            audio: '/audio/conversation/mg2-b4.mp3',
            audioSlow: '/audio/conversation/mg2-b4-slow.mp3'
          },
          {
            id: 'mg2-b5',
            level: 'beginner',
            text: 'Right. Homework ready?',
            audio: '/audio/conversation/mg2-b5.mp3',
            audioSlow: '/audio/conversation/mg2-b5-slow.mp3'
          },
          {
            id: 'mg2-n1',
            level: 'native', 
            text: 'Yep. You knock out the homework?',
            audio: '/audio/conversation/mg2-n1.mp3',
            audioSlow: '/audio/conversation/mg2-n1-slow.mp3'
          },
          {
            id: 'mg2-n2',
            level: 'native', 
            text: 'Right. Homework finished?',
            audio: '/audio/conversation/mg2-n2.mp3',
            audioSlow: '/audio/conversation/mg2-n2-slow.mp3'
          },
          {
            id: 'mg2-n3',
            level: 'native', 
            text: 'Yep. Did the assignment?',
            audio: '/audio/conversation/mg2-n3.mp3',
            audioSlow: '/audio/conversation/mg2-n3-slow.mp3'
          },
          {
            id: 'mg2-n4',
            level: 'native', 
            text: 'True. Homework all done?',
            audio: '/audio/conversation/mg2-n4.mp3',
            audioSlow: '/audio/conversation/mg2-n4-slow.mp3'
          },
          {
            id: 'mg2-n5',
            level: 'native', 
            text: 'Yep. Homework sorted?',
            audio: '/audio/conversation/mg2-n5.mp3',
            audioSlow: '/audio/conversation/mg2-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'mg3',
        speaker: 'ai',
        text: 'I did. It was a little hard.',
        audio: '/audio/conversation/mg3.mp3',
        translation: 'もちろん。ちょっと難しかったけど。',
        responses: [
          {
            id: 'mg3-b1',
            level: 'beginner',
            text: 'Let\'s check it later.',
            audio: '/audio/conversation/mg3-b1.mp3',
            audioSlow: '/audio/conversation/mg3-b1-slow.mp3'
          },
          {
            id: 'mg3-b2',
            level: 'beginner',
            text: 'We can compare answers later.',
            audio: '/audio/conversation/mg3-b2.mp3',
            audioSlow: '/audio/conversation/mg3-b2-slow.mp3'
          },
          {
            id: 'mg3-b3',
            level: 'beginner',
            text: 'Let\'s look at it together.',
            audio: '/audio/conversation/mg3-b3.mp3',
            audioSlow: '/audio/conversation/mg3-b3-slow.mp3'
          },
          {
            id: 'mg3-b4',
            level: 'beginner',
            text: 'We\'ll check later.',
            audio: '/audio/conversation/mg3-b4.mp3',
            audioSlow: '/audio/conversation/mg3-b4-slow.mp3'
          },
          {
            id: 'mg3-b5',
            level: 'beginner',
            text: 'We\'ll review after class.',
            audio: '/audio/conversation/mg3-b5.mp3',
            audioSlow: '/audio/conversation/mg3-b5-slow.mp3'
          },
          {
            id: 'mg3-n1',
            level: 'native',
            text: 'Let\'s compare notes later.',
            audio: '/audio/conversation/mg3-n1.mp3',
            audioSlow: '/audio/conversation/mg3-n1-slow.mp3'
          },
          {
            id: 'mg3-n2',
            level: 'native',
            text: 'We\'ll swap answers later.',
            audio: '/audio/conversation/mg3-n2.mp3',
            audioSlow: '/audio/conversation/mg3-n2-slow.mp3'
          },
          {
            id: 'mg3-n3',
            level: 'native',
            text: 'We can go over it later.',
            audio: '/audio/conversation/mg3-n3.mp3',
            audioSlow: '/audio/conversation/mg3-n3-slow.mp3'
          },
          {
            id: 'mg3-n4',
            level: 'native',
            text: 'Let\'s check answers later on.',
            audio: '/audio/conversation/mg3-n4.mp3',
            audioSlow: '/audio/conversation/mg3-n4-slow.mp3'
          },
          {
            id: 'mg3-n5',
            level: 'native',
            text: 'We\'ll trade answers later.',
            audio: '/audio/conversation/mg3-n5.mp3',
            audioSlow: '/audio/conversation/mg3-n5-slow.mp3'
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
            id: 'bs1-b2',
            level: 'beginner',
            text: 'About 8:15.',
            audio: '/audio/conversation/bs1-b2.mp3',
            audioSlow: '/audio/conversation/bs1-b2-slow.mp3'
          },
          {
            id: 'bs1-b3',
            level: 'beginner',
            text: '8:15, I think.',
            audio: '/audio/conversation/bs1-b3.mp3',
            audioSlow: '/audio/conversation/bs1-b3-slow.mp3'
          },
          {
            id: 'bs1-b4',
            level: 'beginner',
            text: 'Next one is 8:15.',
            audio: '/audio/conversation/bs1-b4.mp3',
            audioSlow: '/audio/conversation/bs1-b4-slow.mp3'
          },
          {
            id: 'bs1-b5',
            level: 'beginner',
            text: 'At 8:15.',
            audio: '/audio/conversation/bs1-b5.mp3',
            audioSlow: '/audio/conversation/bs1-b5-slow.mp3'
          },
          {
            id: 'bs1-n1',
            level: 'native',
            text: 'Says 8:15 on the board.',
            audio: '/audio/conversation/bs1-n1.mp3',
            audioSlow: '/audio/conversation/bs1-n1-slow.mp3'
          },
          {
            id: 'bs1-n2',
            level: 'native',
            text: 'About 8:15.',
            audio: '/audio/conversation/bs1-n2.mp3',
            audioSlow: '/audio/conversation/bs1-n2-slow.mp3'
          },
          {
            id: 'bs1-n3',
            level: 'native',
            text: 'Quarter past eight.',
            audio: '/audio/conversation/bs1-n3.mp3',
            audioSlow: '/audio/conversation/bs1-n3-slow.mp3'
          },
          {
            id: 'bs1-n4',
            level: 'native',
            text: 'Eight-fifteen, give or take.',
            audio: '/audio/conversation/bs1-n4.mp3',
            audioSlow: '/audio/conversation/bs1-n4-slow.mp3'
          },
          {
            id: 'bs1-n5',
            level: 'native',
            text: 'Yeah, 8:15.',
            audio: '/audio/conversation/bs1-n5.mp3',
            audioSlow: '/audio/conversation/bs1-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'bs2',
        speaker: 'ai',
        text: 'Good, we can make it.',
        audio: '/audio/conversation/bs2.mp3',
        translation: '間に合いそうでよかった。',
        responses: [
          {
            id: 'bs2-b1',
            level: 'beginner',
            text: 'It may be a bit late.',
            audio: '/audio/conversation/bs2-b1.mp3',
            audioSlow: '/audio/conversation/bs2-b1-slow.mp3'
          },
          {
            id: 'bs2-b2',
            level: 'beginner',
            text: 'It might be slow.',
            audio: '/audio/conversation/bs2-b2.mp3',
            audioSlow: '/audio/conversation/bs2-b2-slow.mp3'
          },
          {
            id: 'bs2-b3',
            level: 'beginner',
            text: 'Maybe some delay.',
            audio: '/audio/conversation/bs2-b3.mp3',
            audioSlow: '/audio/conversation/bs2-b3-slow.mp3'
          },
          {
            id: 'bs2-b4',
            level: 'beginner',
            text: 'Could be late.',
            audio: '/audio/conversation/bs2-b4.mp3',
            audioSlow: '/audio/conversation/bs2-b4-slow.mp3'
          },
          {
            id: 'bs2-b5',
            level: 'beginner',
            text: 'It might run late.',
            audio: '/audio/conversation/bs2-b5.mp3',
            audioSlow: '/audio/conversation/bs2-b5-slow.mp3'
          },
          {
            id: 'bs2-n1',
            level: 'native',
            text: 'Might run a bit behind though.',
            audio: '/audio/conversation/bs2-n1.mp3',
            audioSlow: '/audio/conversation/bs2-n1-slow.mp3'
          },
          {
            id: 'bs2-n2',
            level: 'native',
            text: 'Could be a delay.',
            audio: '/audio/conversation/bs2-n2.mp3',
            audioSlow: '/audio/conversation/bs2-n2-slow.mp3'
          },
          {
            id: 'bs2-n3',
            level: 'native',
            text: 'Might slip a few minutes.',
            audio: '/audio/conversation/bs2-n3.mp3',
            audioSlow: '/audio/conversation/bs2-n3-slow.mp3'
          },
          {
            id: 'bs2-n4',
            level: 'native',
            text: 'Unless it\'s late again.',
            audio: '/audio/conversation/bs2-n4.mp3',
            audioSlow: '/audio/conversation/bs2-n4-slow.mp3'
          },
          {
            id: 'bs2-n5',
            level: 'native',
            text: 'Might lag.',
            audio: '/audio/conversation/bs2-n5.mp3',
            audioSlow: '/audio/conversation/bs2-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'bs3',
        speaker: 'ai',
        text: 'Then we can take a taxi.',
        audio: '/audio/conversation/bs3.mp3',
        translation: 'そうしたらタクシー考えよう。',
        responses: [
          {
            id: 'bs3-b1',
            level: 'beginner',
            text: 'Okay, let\'s wait first.',
            audio: '/audio/conversation/bs3-b1.mp3',
            audioSlow: '/audio/conversation/bs3-b1-slow.mp3'
          },
          {
            id: 'bs3-b2',
            level: 'beginner',
            text: 'Sure, we\'ll see.',
            audio: '/audio/conversation/bs3-b2.mp3',
            audioSlow: '/audio/conversation/bs3-b2-slow.mp3'
          },
          {
            id: 'bs3-b3',
            level: 'beginner',
            text: 'Let\'s watch the clock.',
            audio: '/audio/conversation/bs3-b3.mp3',
            audioSlow: '/audio/conversation/bs3-b3-slow.mp3'
          },
          {
            id: 'bs3-b4',
            level: 'beginner',
            text: 'Sounds good.',
            audio: '/audio/conversation/bs3-b4.mp3',
            audioSlow: '/audio/conversation/bs3-b4-slow.mp3'
          },
          {
            id: 'bs3-b5',
            level: 'beginner',
            text: 'Let\'s decide soon.',
            audio: '/audio/conversation/bs3-b5.mp3',
            audioSlow: '/audio/conversation/bs3-b5-slow.mp3'
          },
          {
            id: 'bs3-n1',
            level: 'native',
            text: 'Cool, we\'ll play it by ear.',
            audio: '/audio/conversation/bs3-n1.mp3',
            audioSlow: '/audio/conversation/bs3-n1-slow.mp3'
          },
          {
            id: 'bs3-n2',
            level: 'native',
            text: 'Works for me.',
            audio: '/audio/conversation/bs3-n2.mp3',
            audioSlow: '/audio/conversation/bs3-n2-slow.mp3'
          },
          {
            id: 'bs3-n3',
            level: 'native',
            text: 'Let\'s watch.',
            audio: '/audio/conversation/bs3-n3.mp3',
            audioSlow: '/audio/conversation/bs3-n3-slow.mp3'
          },
          {
            id: 'bs3-n4',
            level: 'native',
            text: 'Sounds like a plan.',
            audio: '/audio/conversation/bs3-n4.mp3',
            audioSlow: '/audio/conversation/bs3-n4-slow.mp3'
          },
          {
            id: 'bs3-n5',
            level: 'native',
            text: 'Got it.',
            audio: '/audio/conversation/bs3-n5.mp3',
            audioSlow: '/audio/conversation/bs3-n5-slow.mp3'
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
            id: 'lib1-b2',
            level: 'beginner',
            text: 'Yes, top shelf.',
            audio: '/audio/conversation/lib1-b2.mp3',
            audioSlow: '/audio/conversation/lib1-b2-slow.mp3'
          },
          {
            id: 'lib1-b3',
            level: 'beginner',
            text: 'Top level here.',
            audio: '/audio/conversation/lib1-b3.mp3',
            audioSlow: '/audio/conversation/lib1-b3-slow.mp3'
          },
          {
            id: 'lib1-b4',
            level: 'beginner',
            text: 'Up there.',
            audio: '/audio/conversation/lib1-b4.mp3',
            audioSlow: '/audio/conversation/lib1-b4-slow.mp3'
          },
          {
            id: 'lib1-b5',
            level: 'beginner',
            text: 'Top shelf should have it.',
            audio: '/audio/conversation/lib1-b5.mp3',
            audioSlow: '/audio/conversation/lib1-b5-slow.mp3'
          },
          {
            id: 'lib1-n1',
            level: 'native',
            text: 'Yeah, top row.',
            audio: '/audio/conversation/lib1-n1.mp3',
            audioSlow: '/audio/conversation/lib1-n1-slow.mp3'
          },
          {
            id: 'lib1-n2',
            level: 'native',
            text: 'Up on the highest shelf.',
            audio: '/audio/conversation/lib1-n2.mp3',
            audioSlow: '/audio/conversation/lib1-n2-slow.mp3'
          },
          {
            id: 'lib1-n3',
            level: 'native',
            text: 'Top tier.',
            audio: '/audio/conversation/lib1-n3.mp3',
            audioSlow: '/audio/conversation/lib1-n3-slow.mp3'
          },
          {
            id: 'lib1-n4',
            level: 'native',
            text: 'Right here, top shelf.',
            audio: '/audio/conversation/lib1-n4.mp3',
            audioSlow: '/audio/conversation/lib1-n4-slow.mp3'
          },
          {
            id: 'lib1-n5',
            level: 'native',
            text: 'Top shelf over there.',
            audio: '/audio/conversation/lib1-n5.mp3',
            audioSlow: '/audio/conversation/lib1-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'lib2',
        speaker: 'ai',
        text: 'I look for "Sengoku Period of Japan."',
        audio: '/audio/conversation/lib2.mp3',
        translation: '「日本の戦国時代」を探してるんだ。',
        responses: [
          {
            id: 'lib2-b1',
            level: 'beginner',
            text: 'The number is 210.4.',
            audio: '/audio/conversation/lib2-b1.mp3',
            audioSlow: '/audio/conversation/lib2-b1-slow.mp3'
          },
          {
            id: 'lib2-b2',
            level: 'beginner',
            text: 'Call number 210.4.',
            audio: '/audio/conversation/lib2-b2.mp3',
            audioSlow: '/audio/conversation/lib2-b2-slow.mp3'
          },
          {
            id: 'lib2-b3',
            level: 'beginner',
            text: 'Try 210.4.',
            audio: '/audio/conversation/lib2-b3.mp3',
            audioSlow: '/audio/conversation/lib2-b3-slow.mp3'
          },
          {
            id: 'lib2-b4',
            level: 'beginner',
            text: 'Number 210.4.',
            audio: '/audio/conversation/lib2-b4.mp3',
            audioSlow: '/audio/conversation/lib2-b4-slow.mp3'
          },
          {
            id: 'lib2-b5',
            level: 'beginner',
            text: 'Code 210.4.',
            audio: '/audio/conversation/lib2-b5.mp3',
            audioSlow: '/audio/conversation/lib2-b5-slow.mp3'
          },
          {
            id: 'lib2-n1',
            level: 'native',
            text: 'Call number\'s 210.4.',
            audio: '/audio/conversation/lib2-n1.mp3',
            audioSlow: '/audio/conversation/lib2-n1-slow.mp3'
          },
          {
            id: 'lib2-n2',
            level: 'native',
            text: 'That\'s 210.4.',
            audio: '/audio/conversation/lib2-n2.mp3',
            audioSlow: '/audio/conversation/lib2-n2-slow.mp3'
          },
          {
            id: 'lib2-n3',
            level: 'native',
            text: 'Number 210.4.',
            audio: '/audio/conversation/lib2-n3.mp3',
            audioSlow: '/audio/conversation/lib2-n3-slow.mp3'
          },
          {
            id: 'lib2-n4',
            level: 'native',
            text: 'Try 210.4.',
            audio: '/audio/conversation/lib2-n4.mp3',
            audioSlow: '/audio/conversation/lib2-n4-slow.mp3'
          },
          {
            id: 'lib2-n5',
            level: 'native',
            text: 'Call no. 210.4.',
            audio: '/audio/conversation/lib2-n5.mp3',
            audioSlow: '/audio/conversation/lib2-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'lib3',
        speaker: 'ai',
        text: 'Thanks, I\'ll check.',
        audio: '/audio/conversation/lib3.mp3',
        translation: 'ありがとう、すぐ見てみる。',
        responses: [
          {
            id: 'lib3-b1',
            level: 'beginner',
            text: 'Ask staff if not there.',
            audio: '/audio/conversation/lib3-b1.mp3',
            audioSlow: '/audio/conversation/lib3-b1-slow.mp3'
          },
          {
            id: 'lib3-b2',
            level: 'beginner',
            text: 'We can ask later.',
            audio: '/audio/conversation/lib3-b2.mp3',
            audioSlow: '/audio/conversation/lib3-b2-slow.mp3'
          },
          {
            id: 'lib3-b3',
            level: 'beginner',
            text: 'Ask a librarian if missing.',
            audio: '/audio/conversation/lib3-b3.mp3',
            audioSlow: '/audio/conversation/lib3-b3-slow.mp3'
          },
          {
            id: 'lib3-b4',
            level: 'beginner',
            text: 'Staff can help too.',
            audio: '/audio/conversation/lib3-b4.mp3',
            audioSlow: '/audio/conversation/lib3-b4-slow.mp3'
          },
          {
            id: 'lib3-b5',
            level: 'beginner',
            text: 'Let\'s ask if needed.',
            audio: '/audio/conversation/lib3-b5.mp3',
            audioSlow: '/audio/conversation/lib3-b5-slow.mp3'
          },
          {
            id: 'lib3-n1',
            level: 'native',
            text: 'If it\'s gone, we\'ll ask the librarian.',
            audio: '/audio/conversation/lib3-n1.mp3',
            audioSlow: '/audio/conversation/lib3-n1-slow.mp3'
          },
          {
            id: 'lib3-n2',
            level: 'native',
            text: 'We can flag a staffer if it\'s missing.',
            audio: '/audio/conversation/lib3-n2.mp3',
            audioSlow: '/audio/conversation/lib3-n2-slow.mp3'
          },
          {
            id: 'lib3-n3',
            level: 'native',
            text: 'Ask the desk if you strike out.',
            audio: '/audio/conversation/lib3-n3.mp3',
            audioSlow: '/audio/conversation/lib3-n3-slow.mp3'
          },
          {
            id: 'lib3-n4',
            level: 'native',
            text: 'Librarian can help if not there.',
            audio: '/audio/conversation/lib3-n4.mp3',
            audioSlow: '/audio/conversation/lib3-n4-slow.mp3'
          },
          {
            id: 'lib3-n5',
            level: 'native',
            text: 'Let\'s ask if it\'s checked out.',
            audio: '/audio/conversation/lib3-n5.mp3',
            audioSlow: '/audio/conversation/lib3-n5-slow.mp3'
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
            id: 'cf1-b2',
            level: 'beginner',
            text: 'Sugar?',
            audio: '/audio/conversation/cf1-b2.mp3',
            audioSlow: '/audio/conversation/cf1-b2-slow.mp3'
          },
          {
            id: 'cf1-b3',
            level: 'beginner',
            text: 'Do you need sugar?',
            audio: '/audio/conversation/cf1-b3.mp3',
            audioSlow: '/audio/conversation/cf1-b3-slow.mp3'
          },
          {
            id: 'cf1-b4',
            level: 'beginner',
            text: 'With sugar?',
            audio: '/audio/conversation/cf1-b4.mp3',
            audioSlow: '/audio/conversation/cf1-b4-slow.mp3'
          },
          {
            id: 'cf1-b5',
            level: 'beginner',
            text: 'Sugar added?',
            audio: '/audio/conversation/cf1-b5.mp3',
            audioSlow: '/audio/conversation/cf1-b5-slow.mp3'
          },
          {
            id: 'cf1-n1',
            level: 'native',
            text: 'Want sugar with that?',
            audio: '/audio/conversation/cf1-n1.mp3',
            audioSlow: '/audio/conversation/cf1-n1-slow.mp3'
          },
          {
            id: 'cf1-n2',
            level: 'native',
            text: 'Sugar?',
            audio: '/audio/conversation/cf1-n2.mp3',
            audioSlow: '/audio/conversation/cf1-n2-slow.mp3'
          },
          {
            id: 'cf1-n3',
            level: 'native',
            text: 'Need any sugar packs?',
            audio: '/audio/conversation/cf1-n3.mp3',
            audioSlow: '/audio/conversation/cf1-n3-slow.mp3'
          },
          {
            id: 'cf1-n4',
            level: 'native',
            text: 'Sweetener?',
            audio: '/audio/conversation/cf1-n4.mp3',
            audioSlow: '/audio/conversation/cf1-n4-slow.mp3'
          },
          {
            id: 'cf1-n5',
            level: 'native',
            text: 'With sugar?',
            audio: '/audio/conversation/cf1-n5.mp3',
            audioSlow: '/audio/conversation/cf1-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'cf2',
        speaker: 'ai',
        text: 'No, only milk.',
        audio: '/audio/conversation/cf2.mp3',
        translation: 'いいえ、ミルクだけで。',
        responses: [
          {
            id: 'cf2-b1',
            level: 'beginner',
            text: 'Anything else?',
            audio: '/audio/conversation/cf2-b1.mp3',
            audioSlow: '/audio/conversation/cf2-b1-slow.mp3'
          },
          {
            id: 'cf2-b2',
            level: 'beginner',
            text: 'Something more?',
            audio: '/audio/conversation/cf2-b2.mp3',
            audioSlow: '/audio/conversation/cf2-b2-slow.mp3'
          },
          {
            id: 'cf2-b3',
            level: 'beginner',
            text: 'Anything else?',
            audio: '/audio/conversation/cf2-b3.mp3',
            audioSlow: '/audio/conversation/cf2-b3-slow.mp3'
          },
          {
            id: 'cf2-b4',
            level: 'beginner',
            text: 'More orders?',
            audio: '/audio/conversation/cf2-b4.mp3',
            audioSlow: '/audio/conversation/cf2-b4-slow.mp3'
          },
          {
            id: 'cf2-b5',
            level: 'beginner',
            text: 'Anything more?',
            audio: '/audio/conversation/cf2-b5.mp3',
            audioSlow: '/audio/conversation/cf2-b5-slow.mp3'
          },
          {
            id: 'cf2-n1',
            level: 'native',
            text: 'Anything else for you?',
            audio: '/audio/conversation/cf2-n1.mp3',
            audioSlow: '/audio/conversation/cf2-n1-slow.mp3'
          },
          {
            id: 'cf2-n2',
            level: 'native',
            text: 'Something to eat?',
            audio: '/audio/conversation/cf2-n2.mp3',
            audioSlow: '/audio/conversation/cf2-n2-slow.mp3'
          },
          {
            id: 'cf2-n3',
            level: 'native',
            text: 'Anything else?',
            audio: '/audio/conversation/cf2-n3.mp3',
            audioSlow: '/audio/conversation/cf2-n3-slow.mp3'
          },
          {
            id: 'cf2-n4',
            level: 'native',
            text: 'Want a snack?',
            audio: '/audio/conversation/cf2-n4.mp3',
            audioSlow: '/audio/conversation/cf2-n4-slow.mp3'
          },
          {
            id: 'cf2-n5',
            level: 'native',
            text: 'Anything else today?',
            audio: '/audio/conversation/cf2-n5.mp3',
            audioSlow: '/audio/conversation/cf2-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'cf3',
        speaker: 'ai',
        text: 'One chocolate muffin.',
        audio: '/audio/conversation/cf3.mp3',
        translation: 'チョコマフィンを一つ。',
        responses: [
          {
            id: 'cf3-b1',
            level: 'beginner',
            text: 'Certainly.',
            audio: '/audio/conversation/cf3-b1.mp3',
            audioSlow: '/audio/conversation/cf3-b1-slow.mp3'
          },
          {
            id: 'cf3-b2',
            level: 'beginner',
            text: 'Sure.',
            audio: '/audio/conversation/cf3-b2.mp3',
            audioSlow: '/audio/conversation/cf3-b2-slow.mp3'
          },
          {
            id: 'cf3-b3',
            level: 'beginner',
            text: 'Okay.',
            audio: '/audio/conversation/cf3-b3.mp3',
            audioSlow: '/audio/conversation/cf3-b3-slow.mp3'
          },
          {
            id: 'cf3-b4',
            level: 'beginner',
            text: 'Got it.',
            audio: '/audio/conversation/cf3-b4.mp3',
            audioSlow: '/audio/conversation/cf3-b4-slow.mp3'
          },
          {
            id: 'cf3-b5',
            level: 'beginner',
            text: 'Alright.',
            audio: '/audio/conversation/cf3-b5.mp3',
            audioSlow: '/audio/conversation/cf3-b5-slow.mp3'
          },
          {
            id: 'cf3-n1',
            level: 'native',
            text: 'You got it.',
            audio: '/audio/conversation/cf3-n1.mp3',
            audioSlow: '/audio/conversation/cf3-n1-slow.mp3'
          },
          {
            id: 'cf3-n2',
            level: 'native',
            text: 'Coming right up.',
            audio: '/audio/conversation/cf3-n2.mp3',
            audioSlow: '/audio/conversation/cf3-n2-slow.mp3'
          },
          {
            id: 'cf3-n3',
            level: 'native',
            text: 'Sure thing.',
            audio: '/audio/conversation/cf3-n3.mp3',
            audioSlow: '/audio/conversation/cf3-n3-slow.mp3'
          },
          {
            id: 'cf3-n4',
            level: 'native',
            text: 'Absolutely.',
            audio: '/audio/conversation/cf3-n4.mp3',
            audioSlow: '/audio/conversation/cf3-n4-slow.mp3'
          },
          {
            id: 'cf3-n5',
            level: 'native',
            text: 'Of course.',
            audio: '/audio/conversation/cf3-n5.mp3',
            audioSlow: '/audio/conversation/cf3-n5-slow.mp3'
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
      },
      {
        id: 'ru2',
        speaker: 'ai',
        text: 'Thanks! Can I return it tomorrow?',
        audio: '/audio/conversation/ru2.mp3',
        translation: '助かる！返すのは明日でいい？',
        responses: [
          {
            id: 'ru2-b1',
            level: 'beginner',
            text: 'Sure, be careful.',
            audio: '/audio/conversation/ru2-b1.mp3',
            audioSlow: '/audio/conversation/ru2-b1-slow.mp3'
          },
          {
            id: 'ru2-n1',
            level: 'native',
            text: 'No worries—stay dry.',
            audio: '/audio/conversation/ru2-n1.mp3',
            audioSlow: '/audio/conversation/ru2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ru3',
        speaker: 'ai',
        text: 'Thanks a lot.',
        audio: '/audio/conversation/ru3.mp3',
        translation: '本当にありがとう。',
        responses: [
          {
            id: 'ru3-b1',
            level: 'beginner',
            text: 'You\'re welcome.',
            audio: '/audio/conversation/ru3-b1.mp3',
            audioSlow: '/audio/conversation/ru3-b1-slow.mp3'
          },
          {
            id: 'ru3-n1',
            level: 'native',
            text: 'Anytime.',
            audio: '/audio/conversation/ru3-n1.mp3',
            audioSlow: '/audio/conversation/ru3-n1-slow.mp3'
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
      },
      {
        id: 'mi2',
        speaker: 'ai',
        text: 'The new anime film.',
        audio: '/audio/conversation/mi2.mp3',
        translation: '新しいアニメ映画だよ。',
        responses: [
          {
            id: 'mi2-b1',
            level: 'beginner',
            text: 'I\'m free Saturday afternoon.',
            audio: '/audio/conversation/mi2-b1.mp3',
            audioSlow: '/audio/conversation/mi2-b1-slow.mp3'
          },
          {
            id: 'mi2-n1',
            level: 'native',
            text: 'I\'m free Saturday afternoon.',
            audio: '/audio/conversation/mi2-n1.mp3',
            audioSlow: '/audio/conversation/mi2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'mi3',
        speaker: 'ai',
        text: 'How about the 3 p.m. show?',
        audio: '/audio/conversation/mi3.mp3',
        translation: 'じゃあ３時の回でどう？',
        responses: [
          {
            id: 'mi3-b1',
            level: 'beginner',
            text: 'Great, can\'t wait.',
            audio: '/audio/conversation/mi3-b1.mp3',
            audioSlow: '/audio/conversation/mi3-b1-slow.mp3'
          },
          {
            id: 'mi3-n1',
            level: 'native',
            text: 'Perfect, looking forward to it.',
            audio: '/audio/conversation/mi3-n1.mp3',
            audioSlow: '/audio/conversation/mi3-n1-slow.mp3'
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
      },
      {
        id: 'hf2',
        speaker: 'ai',
        text: 'The teacher is strict. Are you okay?',
        audio: '/audio/conversation/hf2.mp3',
        translation: '先生厳しいよ、大丈夫？',
        responses: [
          {
            id: 'hf2-b1',
            level: 'beginner',
            text: 'I\'ll ask if I can hand it in after school.',
            audio: '/audio/conversation/hf2-b1.mp3',
            audioSlow: '/audio/conversation/hf2-b1-slow.mp3'
          },
          {
            id: 'hf2-n1',
            level: 'native',
            text: 'I\'ll ask if I can turn it in after school.',
            audio: '/audio/conversation/hf2-n1.mp3',
            audioSlow: '/audio/conversation/hf2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'hf3',
        speaker: 'ai',
        text: 'Need any help?',
        audio: '/audio/conversation/hf3.mp3',
        translation: '手伝えることある？',
        responses: [
          {
            id: 'hf3-b1',
            level: 'beginner',
            text: 'Can I borrow a copy?',
            audio: '/audio/conversation/hf3-b1.mp3',
            audioSlow: '/audio/conversation/hf3-b1-slow.mp3'
          },
          {
            id: 'hf3-n1',
            level: 'native',
            text: 'Mind if I peek at yours to make a copy?',
            audio: '/audio/conversation/hf3-n1.mp3',
            audioSlow: '/audio/conversation/hf3-n1-slow.mp3'
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
      },
      {
        id: 'ad2',
        speaker: 'ai',
        text: 'About ten minutes on foot?',
        audio: '/audio/conversation/ad2.mp3',
        translation: '徒歩で10分くらい？',
        responses: [
          {
            id: 'ad2-b1',
            level: 'beginner',
            text: 'Yes, around that.',
            audio: '/audio/conversation/ad2-b1.mp3',
            audioSlow: '/audio/conversation/ad2-b1-slow.mp3'
          },
          {
            id: 'ad2-n1',
            level: 'native',
            text: 'Yep, give or take.',
            audio: '/audio/conversation/ad2-n1.mp3',
            audioSlow: '/audio/conversation/ad2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ad3',
        speaker: 'ai',
        text: 'Thank you.',
        audio: '/audio/conversation/ad3.mp3',
        translation: 'ありがとうございます。',
        responses: [
          {
            id: 'ad3-b1',
            level: 'beginner',
            text: 'You\'re welcome.',
            audio: '/audio/conversation/ad3-b1.mp3',
            audioSlow: '/audio/conversation/ad3-b1-slow.mp3'
          },
          {
            id: 'ad3-n1',
            level: 'native',
            text: 'No worries.',
            audio: '/audio/conversation/ad3-n1.mp3',
            audioSlow: '/audio/conversation/ad3-n1-slow.mp3'
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
      },
      {
        id: 'pr2',
        speaker: 'ai',
        text: 'This one. Please get the tower behind us.',
        audio: '/audio/conversation/pr2.mp3',
        translation: 'このボタンです。背景にタワーが入るようにお願いします。',
        responses: [
          {
            id: 'pr2-b1',
            level: 'beginner',
            text: 'Okay. Say cheese!',
            audio: '/audio/conversation/pr2-b1.mp3',
            audioSlow: '/audio/conversation/pr2-b1-slow.mp3'
          },
          {
            id: 'pr2-n1',
            level: 'native',
            text: 'Absolutely. Okay, say cheese!',
            audio: '/audio/conversation/pr2-n1.mp3',
            audioSlow: '/audio/conversation/pr2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pr3',
        speaker: 'ai',
        text: 'Thank you. Is it good?',
        audio: '/audio/conversation/pr3.mp3',
        translation: 'ありがとうございます。ちゃんと撮れましたか？',
        responses: [
          {
            id: 'pr3-b1',
            level: 'beginner',
            text: 'It\'s great.',
            audio: '/audio/conversation/pr3-b1.mp3',
            audioSlow: '/audio/conversation/pr3-b1-slow.mp3'
          },
          {
            id: 'pr3-n1',
            level: 'native',
            text: 'Looks awesome.',
            audio: '/audio/conversation/pr3-n1.mp3',
            audioSlow: '/audio/conversation/pr3-n1-slow.mp3'
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
      },
      {
        id: 'ha2',
        speaker: 'ai',
        text: 'I\'ll take it.',
        audio: '/audio/conversation/ha2.mp3',
        translation: 'その時間でお願いします。',
        responses: [
          {
            id: 'ha2-b1',
            level: 'beginner',
            text: 'Do you have your insurance card?',
            audio: '/audio/conversation/ha2-b1.mp3',
            audioSlow: '/audio/conversation/ha2-b1-slow.mp3'
          },
          {
            id: 'ha2-n1',
            level: 'native',
            text: 'Do you have your insurance card with you?',
            audio: '/audio/conversation/ha2-n1.mp3',
            audioSlow: '/audio/conversation/ha2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ha3',
        speaker: 'ai',
        text: 'Yes, here.',
        audio: '/audio/conversation/ha3.mp3',
        translation: 'はい、こちらです。',
        responses: [
          {
            id: 'ha3-b1',
            level: 'beginner',
            text: 'Your appointment is set.',
            audio: '/audio/conversation/ha3-b1.mp3',
            audioSlow: '/audio/conversation/ha3-b1-slow.mp3'
          },
          {
            id: 'ha3-n1',
            level: 'native',
            text: 'Great, you\'re all set.',
            audio: '/audio/conversation/ha3-n1.mp3',
            audioSlow: '/audio/conversation/ha3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'supermarket_price',
    title: 'スーパーで値段確認',
    description: 'スーパーでの値段確認会話',
    category: 'shopping',
    conversations: [
      {
        id: 'sp1',
        speaker: 'ai',
        text: 'Excuse me, how much is this apple?',
        audio: '/audio/conversation/sp1.mp3',
        translation: 'すみません、このりんごはいくらですか？',
        responses: [
          {
            id: 'sp1-b1',
            level: 'beginner',
            text: 'It\'s 120 yen each.',
            audio: '/audio/conversation/sp1-b1.mp3',
            audioSlow: '/audio/conversation/sp1-b1-slow.mp3'
          },
          {
            id: 'sp1-n1',
            level: 'native',
            text: 'They\'re 120 yen each.',
            audio: '/audio/conversation/sp1-n1.mp3',
            audioSlow: '/audio/conversation/sp1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'sp2',
        speaker: 'ai',
        text: 'I\'ll take three.',
        audio: '/audio/conversation/sp2.mp3',
        translation: '３つお願いします。',
        responses: [
          {
            id: 'sp2-b1',
            level: 'beginner',
            text: 'Sure.',
            audio: '/audio/conversation/sp2-b1.mp3',
            audioSlow: '/audio/conversation/sp2-b1-slow.mp3'
          },
          {
            id: 'sp2-n1',
            level: 'native',
            text: 'Sure thing.',
            audio: '/audio/conversation/sp2-n1.mp3',
            audioSlow: '/audio/conversation/sp2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'sp3',
        speaker: 'ai',
        text: 'Any other good fruit?',
        audio: '/audio/conversation/sp3.mp3',
        translation: '他におすすめはありますか？',
        responses: [
          {
            id: 'sp3-b1',
            level: 'beginner',
            text: 'Bananas are cheap today.',
            audio: '/audio/conversation/sp3-b1.mp3',
            audioSlow: '/audio/conversation/sp3-b1-slow.mp3'
          },
          {
            id: 'sp3-n1',
            level: 'native',
            text: 'Bananas are a steal today.',
            audio: '/audio/conversation/sp3-n1.mp3',
            audioSlow: '/audio/conversation/sp3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'charger_borrow',
    title: '充電器を借りる',
    description: '充電器を借りる会話',
    category: 'daily',
    conversations: [
      {
        id: 'cb1',
        speaker: 'ai',
        text: 'My battery is 1%. Can I borrow your charger?',
        audio: '/audio/conversation/cb1.mp3',
        translation: 'ごめん、電池が１％しかない！充電器貸してくれる？',
        responses: [
          {
            id: 'cb1-b1',
            level: 'beginner',
            text: 'Sure, use this.',
            audio: '/audio/conversation/cb1-b1.mp3',
            audioSlow: '/audio/conversation/cb1-b1-slow.mp3'
          },
          {
            id: 'cb1-b2',
            level: 'beginner',
            text: 'Here you go.',
            audio: '/audio/conversation/cb1-b2.mp3',
            audioSlow: '/audio/conversation/cb1-b2-slow.mp3'
          },
          {
            id: 'cb1-b3',
            level: 'beginner',
            text: 'Of course.',
            audio: '/audio/conversation/cb1-b3.mp3',
            audioSlow: '/audio/conversation/cb1-b3-slow.mp3'
          },
          {
            id: 'cb1-b4',
            level: 'beginner',
            text: 'Take mine.',
            audio: '/audio/conversation/cb1-b4.mp3',
            audioSlow: '/audio/conversation/cb1-b4-slow.mp3'
          },
          {
            id: 'cb1-b5',
            level: 'beginner',
            text: 'Yes, here.',
            audio: '/audio/conversation/cb1-b5.mp3',
            audioSlow: '/audio/conversation/cb1-b5-slow.mp3'
          },
          {
            id: 'cb1-n1',
            level: 'native',
            text: 'Yeah, here you go.',
            audio: '/audio/conversation/cb1-n1.mp3',
            audioSlow: '/audio/conversation/cb1-n1-slow.mp3'
          },
          {
            id: 'cb1-n2',
            level: 'native',
            text: 'Not at all.',
            audio: '/audio/conversation/cb1-n2.mp3',
            audioSlow: '/audio/conversation/cb1-n2-slow.mp3'
          },
          {
            id: 'cb1-n3',
            level: 'native',
            text: 'Sure, use mine.',
            audio: '/audio/conversation/cb1-n3.mp3',
            audioSlow: '/audio/conversation/cb1-n3-slow.mp3'
          },
          {
            id: 'cb1-n4',
            level: 'native',
            text: 'Absolutely.',
            audio: '/audio/conversation/cb1-n4.mp3',
            audioSlow: '/audio/conversation/cb1-n4-slow.mp3'
          },
          {
            id: 'cb1-n5',
            level: 'native',
            text: 'Here, plug in.',
            audio: '/audio/conversation/cb1-n5.mp3',
            audioSlow: '/audio/conversation/cb1-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'cb2',
        speaker: 'ai',
        text: 'Thanks, only 30 minutes.',
        audio: '/audio/conversation/cb2.mp3',
        translation: '助かった、30分だけ借りるね。',
        responses: [
          {
            id: 'cb2-b1',
            level: 'beginner',
            text: 'Okay.',
            audio: '/audio/conversation/cb2-b1.mp3',
            audioSlow: '/audio/conversation/cb2-b1-slow.mp3'
          },
          {
            id: 'cb2-b2',
            level: 'beginner',
            text: 'No problem.',
            audio: '/audio/conversation/cb2-b2.mp3',
            audioSlow: '/audio/conversation/cb2-b2-slow.mp3'
          },
          {
            id: 'cb2-b3',
            level: 'beginner',
            text: 'That\'s fine.',
            audio: '/audio/conversation/cb2-b3.mp3',
            audioSlow: '/audio/conversation/cb2-b3-slow.mp3'
          },
          {
            id: 'cb2-b4',
            level: 'beginner',
            text: 'Sure.',
            audio: '/audio/conversation/cb2-b4.mp3',
            audioSlow: '/audio/conversation/cb2-b4-slow.mp3'
          },
          {
            id: 'cb2-b5',
            level: 'beginner',
            text: 'Fine.',
            audio: '/audio/conversation/cb2-b5.mp3',
            audioSlow: '/audio/conversation/cb2-b5-slow.mp3'
          },
          {
            id: 'cb2-n1',
            level: 'native',
            text: 'Cool.',
            audio: '/audio/conversation/cb2-n1.mp3',
            audioSlow: '/audio/conversation/cb2-n1-slow.mp3'
          },
          {
            id: 'cb2-n2',
            level: 'native',
            text: 'Sounds good.',
            audio: '/audio/conversation/cb2-n2.mp3',
            audioSlow: '/audio/conversation/cb2-n2-slow.mp3'
          },
          {
            id: 'cb2-n3',
            level: 'native',
            text: 'All good.',
            audio: '/audio/conversation/cb2-n3.mp3',
            audioSlow: '/audio/conversation/cb2-n3-slow.mp3'
          },
          {
            id: 'cb2-n4',
            level: 'native',
            text: 'That\'s fine.',
            audio: '/audio/conversation/cb2-n4.mp3',
            audioSlow: '/audio/conversation/cb2-n4-slow.mp3'
          },
          {
            id: 'cb2-n5',
            level: 'native',
            text: 'Take your time.',
            audio: '/audio/conversation/cb2-n5.mp3',
            audioSlow: '/audio/conversation/cb2-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'cb3',
        speaker: 'ai',
        text: 'Really thank you.',
        audio: '/audio/conversation/cb3.mp3',
        translation: '本当にありがとう。',
        responses: [
          {
            id: 'cb3-b1',
            level: 'beginner',
            text: 'You\'re welcome.',
            audio: '/audio/conversation/cb3-b1.mp3',
            audioSlow: '/audio/conversation/cb3-b1-slow.mp3'
          },
          {
            id: 'cb3-b2',
            level: 'beginner',
            text: 'Anytime.',
            audio: '/audio/conversation/cb3-b2.mp3',
            audioSlow: '/audio/conversation/cb3-b2-slow.mp3'
          },
          {
            id: 'cb3-b3',
            level: 'beginner',
            text: 'No problem.',
            audio: '/audio/conversation/cb3-b3.mp3',
            audioSlow: '/audio/conversation/cb3-b3-slow.mp3'
          },
          {
            id: 'cb3-b4',
            level: 'beginner',
            text: 'Welcome.',
            audio: '/audio/conversation/cb3-b4.mp3',
            audioSlow: '/audio/conversation/cb3-b4-slow.mp3'
          },
          {
            id: 'cb3-b5',
            level: 'beginner',
            text: 'Welcome.',
            audio: '/audio/conversation/cb3-b5.mp3',
            audioSlow: '/audio/conversation/cb3-b5-slow.mp3'
          },
          {
            id: 'cb3-n1',
            level: 'native',
            text: 'No worries.',
            audio: '/audio/conversation/cb3-n1.mp3',
            audioSlow: '/audio/conversation/cb3-n1-slow.mp3'
          },
          {
            id: 'cb3-n2',
            level: 'native',
            text: 'Anytime.',
            audio: '/audio/conversation/cb3-n2.mp3',
            audioSlow: '/audio/conversation/cb3-n2-slow.mp3'
          },
          {
            id: 'cb3-n3',
            level: 'native',
            text: 'Happy to help.',
            audio: '/audio/conversation/cb3-n3.mp3',
            audioSlow: '/audio/conversation/cb3-n3-slow.mp3'
          },
          {
            id: 'cb3-n4',
            level: 'native',
            text: 'You bet.',
            audio: '/audio/conversation/cb3-n4.mp3',
            audioSlow: '/audio/conversation/cb3-n4-slow.mp3'
          },
          {
            id: 'cb3-n5',
            level: 'native',
            text: 'Sure thing.',
            audio: '/audio/conversation/cb3-n5.mp3',
            audioSlow: '/audio/conversation/cb3-n5-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'lunch_menu',
    title: '昼食のメニュー',
    description: '昼食メニューを決める会話',
    category: 'dining',
    conversations: [
      {
        id: 'lm1',
        speaker: 'ai',
        text: 'What should we eat for lunch?',
        audio: '/audio/conversation/lm1.mp3',
        translation: '今日のお昼、何にする？',
        responses: [
          {
            id: 'lm1-b1',
            level: 'beginner',
            text: 'I can\'t choose pasta or curry.',
            audio: '/audio/conversation/lm1-b1.mp3',
            audioSlow: '/audio/conversation/lm1-b1-slow.mp3'
          },
          {
            id: 'lm1-n1',
            level: 'native',
            text: 'Torn between pasta and curry.',
            audio: '/audio/conversation/lm1-n1.mp3',
            audioSlow: '/audio/conversation/lm1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'lm2',
        speaker: 'ai',
        text: 'Let\'s pick curry; it\'s cold.',
        audio: '/audio/conversation/lm2.mp3',
        translation: 'カレーにしようよ、雨で寒いし。',
        responses: [
          {
            id: 'lm2-b1',
            level: 'beginner',
            text: 'Okay, curry it is.',
            audio: '/audio/conversation/lm2-b1.mp3',
            audioSlow: '/audio/conversation/lm2-b1-slow.mp3'
          },
          {
            id: 'lm2-n1',
            level: 'native',
            text: 'Works for me.',
            audio: '/audio/conversation/lm2-n1.mp3',
            audioSlow: '/audio/conversation/lm2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'lm3',
        speaker: 'ai',
        text: 'I\'ll get a large size.',
        audio: '/audio/conversation/lm3.mp3',
        translation: '大盛りにしようかな。',
        responses: [
          {
            id: 'lm3-b1',
            level: 'beginner',
            text: 'Me too!',
            audio: '/audio/conversation/lm3-b1.mp3',
            audioSlow: '/audio/conversation/lm3-b1-slow.mp3'
          },
          {
            id: 'lm3-n1',
            level: 'native',
            text: 'Make that two.',
            audio: '/audio/conversation/lm3-n1.mp3',
            audioSlow: '/audio/conversation/lm3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'lost_wallet',
    title: '落とし物を渡す',
    description: '落とし物を拾って渡す会話',
    category: 'social',
    conversations: [
      {
        id: 'lw1',
        speaker: 'ai',
        text: 'I found this wallet in the hall.',
        audio: '/audio/conversation/lw1.mp3',
        translation: 'これ、廊下で財布を拾ったんだけど。',
        responses: [
          {
            id: 'lw1-b1',
            level: 'beginner',
            text: 'We should take it to the office.',
            audio: '/audio/conversation/lw1-b1.mp3',
            audioSlow: '/audio/conversation/lw1-b1-slow.mp3'
          },
          {
            id: 'lw1-n1',
            level: 'native',
            text: 'Let\'s hand it in at the staff room.',
            audio: '/audio/conversation/lw1-n1.mp3',
            audioSlow: '/audio/conversation/lw1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'lw2',
        speaker: 'ai',
        text: 'Can you come with me?',
        audio: '/audio/conversation/lw2.mp3',
        translation: 'じゃあ一緒に行ってくれる？',
        responses: [
          {
            id: 'lw2-b1',
            level: 'beginner',
            text: 'Sure.',
            audio: '/audio/conversation/lw2-b1.mp3',
            audioSlow: '/audio/conversation/lw2-b1-slow.mp3'
          },
          {
            id: 'lw2-n1',
            level: 'native',
            text: 'Of course.',
            audio: '/audio/conversation/lw2-n1.mp3',
            audioSlow: '/audio/conversation/lw2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'lw3',
        speaker: 'ai',
        text: 'Hope the owner gets it back.',
        audio: '/audio/conversation/lw3.mp3',
        translation: '持ち主見つかるといいね。',
        responses: [
          {
            id: 'lw3-b1',
            level: 'beginner',
            text: 'Yes, I hope so.',
            audio: '/audio/conversation/lw3-b1.mp3',
            audioSlow: '/audio/conversation/lw3-b1-slow.mp3'
          },
          {
            id: 'lw3-n1',
            level: 'native',
            text: 'Yeah, ASAP.',
            audio: '/audio/conversation/lw3-n1.mp3',
            audioSlow: '/audio/conversation/lw3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'birthday_celebration',
    title: '誕生日を祝う',
    description: '友達の誕生日を祝う会話',
    category: 'social',
    conversations: [
      {
        id: 'bc1',
        speaker: 'ai',
        text: 'Happy birthday!',
        audio: '/audio/conversation/bc1.mp3',
        translation: '誕生日おめでとう！',
        responses: [
          {
            id: 'bc1-b1',
            level: 'beginner',
            text: 'Thanks! You remembered.',
            audio: '/audio/conversation/bc1-b1.mp3',
            audioSlow: '/audio/conversation/bc1-b1-slow.mp3'
          },
          {
            id: 'bc1-n1',
            level: 'native',
            text: 'Thanks—you remembered!',
            audio: '/audio/conversation/bc1-n1.mp3',
            audioSlow: '/audio/conversation/bc1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bc2',
        speaker: 'ai',
        text: 'Let\'s eat cake after school.',
        audio: '/audio/conversation/bc2.mp3',
        translation: '放課後ケーキ食べに行こうよ。',
        responses: [
          {
            id: 'bc2-b1',
            level: 'beginner',
            text: 'Sounds fun.',
            audio: '/audio/conversation/bc2-b1.mp3',
            audioSlow: '/audio/conversation/bc2-b1-slow.mp3'
          },
          {
            id: 'bc2-n1',
            level: 'native',
            text: 'Absolutely, can\'t wait.',
            audio: '/audio/conversation/bc2-n1.mp3',
            audioSlow: '/audio/conversation/bc2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bc3',
        speaker: 'ai',
        text: 'I have a gift, too.',
        audio: '/audio/conversation/bc3.mp3',
        translation: 'プレゼントも用意したよ。',
        responses: [
          {
            id: 'bc3-b1',
            level: 'beginner',
            text: 'Can\'t wait!',
            audio: '/audio/conversation/bc3-b1.mp3',
            audioSlow: '/audio/conversation/bc3-b1-slow.mp3'
          },
          {
            id: 'bc3-n1',
            level: 'native',
            text: 'You\'re the best!',
            audio: '/audio/conversation/bc3-n1.mp3',
            audioSlow: '/audio/conversation/bc3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'train_seat',
    title: '電車で席を譲る',
    description: '電車で席を譲る会話',
    category: 'transportation',
    conversations: [
      {
        id: 'ts1',
        speaker: 'ai',
        text: 'Please take this seat.',
        audio: '/audio/conversation/ts1.mp3',
        translation: 'どうぞ、お掛けください。',
        responses: [
          {
            id: 'ts1-b1',
            level: 'beginner',
            text: 'Thank you, that helps.',
            audio: '/audio/conversation/ts1-b1.mp3',
            audioSlow: '/audio/conversation/ts1-b1-slow.mp3'
          },
          {
            id: 'ts1-n1',
            level: 'native',
            text: 'Thanks, that\'s very kind.',
            audio: '/audio/conversation/ts1-n1.mp3',
            audioSlow: '/audio/conversation/ts1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ts2',
        speaker: 'ai',
        text: 'The train shakes, be careful.',
        audio: '/audio/conversation/ts2.mp3',
        translation: '揺れるので気をつけて。',
        responses: [
          {
            id: 'ts2-b1',
            level: 'beginner',
            text: 'I will, thanks.',
            audio: '/audio/conversation/ts2-b1.mp3',
            audioSlow: '/audio/conversation/ts2-b1-slow.mp3'
          },
          {
            id: 'ts2-n1',
            level: 'native',
            text: 'I\'ll hold on, thanks.',
            audio: '/audio/conversation/ts2-n1.mp3',
            audioSlow: '/audio/conversation/ts2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ts3',
        speaker: 'ai',
        text: 'Need help with bags?',
        audio: '/audio/conversation/ts3.mp3',
        translation: '他に荷物お持ちしましょうか？',
        responses: [
          {
            id: 'ts3-b1',
            level: 'beginner',
            text: 'I\'m fine.',
            audio: '/audio/conversation/ts3-b1.mp3',
            audioSlow: '/audio/conversation/ts3-b1-slow.mp3'
          },
          {
            id: 'ts3-n1',
            level: 'native',
            text: 'No, I\'m good.',
            audio: '/audio/conversation/ts3-n1.mp3',
            audioSlow: '/audio/conversation/ts3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'printer_trouble',
    title: 'PCトラブル相談',
    description: 'PC・プリンターのトラブル相談',
    category: 'technology',
    conversations: [
      {
        id: 'pt1',
        speaker: 'ai',
        text: 'My printer won\'t work.',
        audio: '/audio/conversation/pt1.mp3',
        translation: 'プリンタが動かないんだ。',
        responses: [
          {
            id: 'pt1-b1',
            level: 'beginner',
            text: 'Is the cable in?',
            audio: '/audio/conversation/pt1-b1.mp3',
            audioSlow: '/audio/conversation/pt1-b1-slow.mp3'
          },
          {
            id: 'pt1-b2',
            level: 'beginner',
            text: 'Cable OK?',
            audio: '/audio/conversation/pt1-b2.mp3',
            audioSlow: '/audio/conversation/pt1-b2-slow.mp3'
          },
          {
            id: 'pt1-b3',
            level: 'beginner',
            text: 'Plug connected?',
            audio: '/audio/conversation/pt1-b3.mp3',
            audioSlow: '/audio/conversation/pt1-b3-slow.mp3'
          },
          {
            id: 'pt1-b4',
            level: 'beginner',
            text: 'Check cable?',
            audio: '/audio/conversation/pt1-b4.mp3',
            audioSlow: '/audio/conversation/pt1-b4-slow.mp3'
          },
          {
            id: 'pt1-b5',
            level: 'beginner',
            text: 'Cable inserted?',
            audio: '/audio/conversation/pt1-b5.mp3',
            audioSlow: '/audio/conversation/pt1-b5-slow.mp3'
          },
          {
            id: 'pt1-n1',
            level: 'native',
            text: 'Is the USB plugged in tight?',
            audio: '/audio/conversation/pt1-n1.mp3',
            audioSlow: '/audio/conversation/pt1-n1-slow.mp3'
          },
          {
            id: 'pt1-n2',
            level: 'native',
            text: 'Cable seated properly?',
            audio: '/audio/conversation/pt1-n2.mp3',
            audioSlow: '/audio/conversation/pt1-n2-slow.mp3'
          },
          {
            id: 'pt1-n3',
            level: 'native',
            text: 'Check the connection first?',
            audio: '/audio/conversation/pt1-n3.mp3',
            audioSlow: '/audio/conversation/pt1-n3-slow.mp3'
          },
          {
            id: 'pt1-n4',
            level: 'native',
            text: 'Is the cord fully in?',
            audio: '/audio/conversation/pt1-n4.mp3',
            audioSlow: '/audio/conversation/pt1-n4-slow.mp3'
          },
          {
            id: 'pt1-n5',
            level: 'native',
            text: 'Cable plugged?',
            audio: '/audio/conversation/pt1-n5.mp3',
            audioSlow: '/audio/conversation/pt1-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'pt2',
        speaker: 'ai',
        text: 'Yes, but it shows error.',
        audio: '/audio/conversation/pt2.mp3',
        translation: 'うん、でもエラーが出る。',
        responses: [
          {
            id: 'pt2-b1',
            level: 'beginner',
            text: 'Let\'s update the driver.',
            audio: '/audio/conversation/pt2-b1.mp3',
            audioSlow: '/audio/conversation/pt2-b1-slow.mp3'
          },
          {
            id: 'pt2-b2',
            level: 'beginner',
            text: 'Try driver update.',
            audio: '/audio/conversation/pt2-b2.mp3',
            audioSlow: '/audio/conversation/pt2-b2-slow.mp3'
          },
          {
            id: 'pt2-b3',
            level: 'beginner',
            text: 'Update software.',
            audio: '/audio/conversation/pt2-b3.mp3',
            audioSlow: '/audio/conversation/pt2-b3-slow.mp3'
          },
          {
            id: 'pt2-b4',
            level: 'beginner',
            text: 'Update driver.',
            audio: '/audio/conversation/pt2-b4.mp3',
            audioSlow: '/audio/conversation/pt2-b4-slow.mp3'
          },
          {
            id: 'pt2-b5',
            level: 'beginner',
            text: 'Driver update maybe.',
            audio: '/audio/conversation/pt2-b5.mp3',
            audioSlow: '/audio/conversation/pt2-b5-slow.mp3'
          },
          {
            id: 'pt2-n1',
            level: 'native',
            text: 'Maybe update the driver.',
            audio: '/audio/conversation/pt2-n1.mp3',
            audioSlow: '/audio/conversation/pt2-n1-slow.mp3'
          },
          {
            id: 'pt2-n2',
            level: 'native',
            text: 'Let\'s run a driver update.',
            audio: '/audio/conversation/pt2-n2.mp3',
            audioSlow: '/audio/conversation/pt2-n2-slow.mp3'
          },
          {
            id: 'pt2-n3',
            level: 'native',
            text: 'Might need new drivers.',
            audio: '/audio/conversation/pt2-n3.mp3',
            audioSlow: '/audio/conversation/pt2-n3-slow.mp3'
          },
          {
            id: 'pt2-n4',
            level: 'native',
            text: 'Try reinstalling the driver.',
            audio: '/audio/conversation/pt2-n4.mp3',
            audioSlow: '/audio/conversation/pt2-n4-slow.mp3'
          },
          {
            id: 'pt2-n5',
            level: 'native',
            text: 'Driver update could fix it.',
            audio: '/audio/conversation/pt2-n5.mp3',
            audioSlow: '/audio/conversation/pt2-n5-slow.mp3'
          }
        ]
      },
      {
        id: 'pt3',
        speaker: 'ai',
        text: 'Teach me how?',
        audio: '/audio/conversation/pt3.mp3',
        translation: 'やり方教えてくれる？',
        responses: [
          {
            id: 'pt3-b1',
            level: 'beginner',
            text: 'Sure!',
            audio: '/audio/conversation/pt3-b1.mp3',
            audioSlow: '/audio/conversation/pt3-b1-slow.mp3'
          },
          {
            id: 'pt3-b2',
            level: 'beginner',
            text: 'Okay.',
            audio: '/audio/conversation/pt3-b2.mp3',
            audioSlow: '/audio/conversation/pt3-b2-slow.mp3'
          },
          {
            id: 'pt3-b3',
            level: 'beginner',
            text: 'Will do.',
            audio: '/audio/conversation/pt3-b3.mp3',
            audioSlow: '/audio/conversation/pt3-b3-slow.mp3'
          },
          {
            id: 'pt3-b4',
            level: 'beginner',
            text: 'I\'ll help.',
            audio: '/audio/conversation/pt3-b4.mp3',
            audioSlow: '/audio/conversation/pt3-b4-slow.mp3'
          },
          {
            id: 'pt3-b5',
            level: 'beginner',
            text: 'Sure.',
            audio: '/audio/conversation/pt3-b5.mp3',
            audioSlow: '/audio/conversation/pt3-b5-slow.mp3'
          },
          {
            id: 'pt3-n1',
            level: 'native',
            text: 'Absolutely.',
            audio: '/audio/conversation/pt3-n1.mp3',
            audioSlow: '/audio/conversation/pt3-n1-slow.mp3'
          },
          {
            id: 'pt3-n2',
            level: 'native',
            text: 'No problem.',
            audio: '/audio/conversation/pt3-n2.mp3',
            audioSlow: '/audio/conversation/pt3-n2-slow.mp3'
          },
          {
            id: 'pt3-n3',
            level: 'native',
            text: 'Sure thing.',
            audio: '/audio/conversation/pt3-n3.mp3',
            audioSlow: '/audio/conversation/pt3-n3-slow.mp3'
          },
          {
            id: 'pt3-n4',
            level: 'native',
            text: 'Got you.',
            audio: '/audio/conversation/pt3-n4.mp3',
            audioSlow: '/audio/conversation/pt3-n4-slow.mp3'
          },
          {
            id: 'pt3-n5',
            level: 'native',
            text: 'Happy to.',
            audio: '/audio/conversation/pt3-n5.mp3',
            audioSlow: '/audio/conversation/pt3-n5-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'study_group',
    title: '勉強会の予定',
    description: '勉強会の予定を決める会話',
    category: 'study',
    conversations: [
      {
        id: 'sg1',
        speaker: 'ai',
        text: 'Let\'s have a study group before finals.',
        audio: '/audio/conversation/sg1.mp3',
        translation: '期末テスト前に勉強会しよう。',
        responses: [
          {
            id: 'sg1-b1',
            level: 'beginner',
            text: 'Good idea. When?',
            audio: '/audio/conversation/sg1-b1.mp3',
            audioSlow: '/audio/conversation/sg1-b1-slow.mp3'
          },
          {
            id: 'sg1-n1',
            level: 'native',
            text: 'Totally. When works?',
            audio: '/audio/conversation/sg1-n1.mp3',
            audioSlow: '/audio/conversation/sg1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'sg2',
        speaker: 'ai',
        text: 'Friday after school.',
        audio: '/audio/conversation/sg2.mp3',
        translation: '金曜の放課後がいいかな。',
        responses: [
          {
            id: 'sg2-b1',
            level: 'beginner',
            text: 'I\'m free.',
            audio: '/audio/conversation/sg2-b1.mp3',
            audioSlow: '/audio/conversation/sg2-b1-slow.mp3'
          },
          {
            id: 'sg2-n1',
            level: 'native',
            text: 'I\'m open then.',
            audio: '/audio/conversation/sg2-n1.mp3',
            audioSlow: '/audio/conversation/sg2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'sg3',
        speaker: 'ai',
        text: 'I\'ll book a room.',
        audio: '/audio/conversation/sg3.mp3',
        translation: '教室を予約しておくね。',
        responses: [
          {
            id: 'sg3-b1',
            level: 'beginner',
            text: 'Thanks!',
            audio: '/audio/conversation/sg3-b1.mp3',
            audioSlow: '/audio/conversation/sg3-b1-slow.mp3'
          },
          {
            id: 'sg3-n1',
            level: 'native',
            text: 'Awesome, thanks.',
            audio: '/audio/conversation/sg3-n1.mp3',
            audioSlow: '/audio/conversation/sg3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'weather_check',
    title: '天気を確認',
    description: '明日の天気を確認する会話',
    category: 'daily',
    conversations: [
      {
        id: 'wc1',
        speaker: 'ai',
        text: 'Will it rain for tomorrow\'s picnic?',
        audio: '/audio/conversation/wc1.mp3',
        translation: '明日のピクニック、雨降るかな？',
        responses: [
          {
            id: 'wc1-b1',
            level: 'beginner',
            text: 'Forecast says cloudy then sunny.',
            audio: '/audio/conversation/wc1-b1.mp3',
            audioSlow: '/audio/conversation/wc1-b1-slow.mp3'
          },
          {
            id: 'wc1-n1',
            level: 'native',
            text: 'Forecast says cloudy turning sunny.',
            audio: '/audio/conversation/wc1-n1.mp3',
            audioSlow: '/audio/conversation/wc1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'wc2',
        speaker: 'ai',
        text: 'No umbrella needed?',
        audio: '/audio/conversation/wc2.mp3',
        translation: '傘はいらなさそうだね。',
        responses: [
          {
            id: 'wc2-b1',
            level: 'beginner',
            text: 'Maybe take a small one.',
            audio: '/audio/conversation/wc2-b1.mp3',
            audioSlow: '/audio/conversation/wc2-b1-slow.mp3'
          },
          {
            id: 'wc2-n1',
            level: 'native',
            text: 'I\'ll toss a compact one in, just in case.',
            audio: '/audio/conversation/wc2-n1.mp3',
            audioSlow: '/audio/conversation/wc2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'wc3',
        speaker: 'ai',
        text: 'Okay, I\'ll pack it.',
        audio: '/audio/conversation/wc3.mp3',
        translation: '了解、準備しておく。',
        responses: [
          {
            id: 'wc3-b1',
            level: 'beginner',
            text: 'Can\'t wait!',
            audio: '/audio/conversation/wc3-b1.mp3',
            audioSlow: '/audio/conversation/wc3-b1-slow.mp3'
          },
          {
            id: 'wc3-n1',
            level: 'native',
            text: 'Can\'t wait!',
            audio: '/audio/conversation/wc3-n1.mp3',
            audioSlow: '/audio/conversation/wc3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'clothing_decision',
    title: '服装を決める',
    description: '天気に合わせて服装を決める会話',
    category: 'daily',
    conversations: [
      {
        id: 'cd1',
        speaker: 'ai',
        text: 'High is 25°C today.',
        audio: '/audio/conversation/cd1.mp3',
        translation: '今日の最高気温25度だって。',
        responses: [
          {
            id: 'cd1-b1',
            level: 'beginner',
            text: 'So short sleeves are okay?',
            audio: '/audio/conversation/cd1-b1.mp3',
            audioSlow: '/audio/conversation/cd1-b1-slow.mp3'
          },
          {
            id: 'cd1-n1',
            level: 'native',
            text: 'So T-shirts are fine?',
            audio: '/audio/conversation/cd1-n1.mp3',
            audioSlow: '/audio/conversation/cd1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'cd2',
        speaker: 'ai',
        text: 'Morning is cool; take a light jacket.',
        audio: '/audio/conversation/cd2.mp3',
        translation: '朝は涼しいから薄手の上着持とう。',
        responses: [
          {
            id: 'cd2-b1',
            level: 'beginner',
            text: 'Good idea.',
            audio: '/audio/conversation/cd2-b1.mp3',
            audioSlow: '/audio/conversation/cd2-b1-slow.mp3'
          },
          {
            id: 'cd2-n1',
            level: 'native',
            text: 'Good call.',
            audio: '/audio/conversation/cd2-n1.mp3',
            audioSlow: '/audio/conversation/cd2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'cd3',
        speaker: 'ai',
        text: 'Maybe a hat, too.',
        audio: '/audio/conversation/cd3.mp3',
        translation: '帽子もあった方がいいかも。',
        responses: [
          {
            id: 'cd3-b1',
            level: 'beginner',
            text: 'I won\'t forget.',
            audio: '/audio/conversation/cd3-b1.mp3',
            audioSlow: '/audio/conversation/cd3-b1-slow.mp3'
          },
          {
            id: 'cd3-n1',
            level: 'native',
            text: 'I\'ll pack one.',
            audio: '/audio/conversation/cd3-n1.mp3',
            audioSlow: '/audio/conversation/cd3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'barcode_payment',
    title: 'コンビニでバーコード支払い',
    description: 'コンビニでのバーコード決済会話',
    category: 'shopping',
    conversations: [
      {
        id: 'bp1',
        speaker: 'ai',
        text: 'Can I pay with this barcode?',
        audio: '/audio/conversation/bp1.mp3',
        translation: '支払いはこのバーコードでできますか？',
        responses: [
          {
            id: 'bp1-b1',
            level: 'beginner',
            text: 'Yes, you can.',
            audio: '/audio/conversation/bp1-b1.mp3',
            audioSlow: '/audio/conversation/bp1-b1-slow.mp3'
          },
          {
            id: 'bp1-n1',
            level: 'native',
            text: 'Absolutely, that works.',
            audio: '/audio/conversation/bp1-n1.mp3',
            audioSlow: '/audio/conversation/bp1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bp2',
        speaker: 'ai',
        text: 'Do I get points, too?',
        audio: '/audio/conversation/bp2.mp3',
        translation: 'ポイントも付きますか？',
        responses: [
          {
            id: 'bp2-b1',
            level: 'beginner',
            text: 'Yes, same points.',
            audio: '/audio/conversation/bp2-b1.mp3',
            audioSlow: '/audio/conversation/bp2-b1-slow.mp3'
          },
          {
            id: 'bp2-n1',
            level: 'native',
            text: 'Yep, you\'ll get the usual points.',
            audio: '/audio/conversation/bp2-n1.mp3',
            audioSlow: '/audio/conversation/bp2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bp3',
        speaker: 'ai',
        text: 'Then please.',
        audio: '/audio/conversation/bp3.mp3',
        translation: 'じゃあお願いします。',
        responses: [
          {
            id: 'bp3-b1',
            level: 'beginner',
            text: 'Certainly.',
            audio: '/audio/conversation/bp3-b1.mp3',
            audioSlow: '/audio/conversation/bp3-b1-slow.mp3'
          },
          {
            id: 'bp3-n1',
            level: 'native',
            text: 'You got it.',
            audio: '/audio/conversation/bp3-n1.mp3',
            audioSlow: '/audio/conversation/bp3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'ball_borrow',
    title: '公園でボールを借りる',
    description: '公園でボールを借りる会話',
    category: 'recreation',
    conversations: [
      {
        id: 'bb1',
        speaker: 'ai',
        text: 'Could I borrow your ball?',
        audio: '/audio/conversation/bb1.mp3',
        translation: 'ボール貸してもらえますか？',
        responses: [
          {
            id: 'bb1-b1',
            level: 'beginner',
            text: 'Sure, go ahead.',
            audio: '/audio/conversation/bb1-b1.mp3',
            audioSlow: '/audio/conversation/bb1-b1-slow.mp3'
          },
          {
            id: 'bb1-n1',
            level: 'native',
            text: 'Yeah, no worries.',
            audio: '/audio/conversation/bb1-n1.mp3',
            audioSlow: '/audio/conversation/bb1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bb2',
        speaker: 'ai',
        text: 'I\'ll return it in ten minutes.',
        audio: '/audio/conversation/bb2.mp3',
        translation: '10分後に返します。',
        responses: [
          {
            id: 'bb2-b1',
            level: 'beginner',
            text: 'Okay, take your time.',
            audio: '/audio/conversation/bb2-b1.mp3',
            audioSlow: '/audio/conversation/bb2-b1-slow.mp3'
          },
          {
            id: 'bb2-n1',
            level: 'native',
            text: 'Cool, no hurry.',
            audio: '/audio/conversation/bb2-n1.mp3',
            audioSlow: '/audio/conversation/bb2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bb3',
        speaker: 'ai',
        text: 'Thanks, that helps!',
        audio: '/audio/conversation/bb3.mp3',
        translation: 'ありがとう、助かる！',
        responses: [
          {
            id: 'bb3-b1',
            level: 'beginner',
            text: 'You\'re welcome!',
            audio: '/audio/conversation/bb3-b1.mp3',
            audioSlow: '/audio/conversation/bb3-b1-slow.mp3'
          },
          {
            id: 'bb3-n1',
            level: 'native',
            text: 'No worries at all!',
            audio: '/audio/conversation/bb3-n1.mp3',
            audioSlow: '/audio/conversation/bb3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'phone_lost',
    title: 'スマホを落とした',
    description: 'スマホを落とした時の会話',
    category: 'daily',
    conversations: [
      {
        id: 'pl1',
        speaker: 'ai',
        text: 'I think I dropped my phone. Can you call it?',
        audio: '/audio/conversation/pl1.mp3',
        translation: 'スマホ落としたかも！電話鳴らしてくれる？',
        responses: [
          {
            id: 'pl1-b1',
            level: 'beginner',
            text: 'Sure, calling now.',
            audio: '/audio/conversation/pl1-b1.mp3',
            audioSlow: '/audio/conversation/pl1-b1-slow.mp3'
          },
          {
            id: 'pl1-n1',
            level: 'native',
            text: 'Yeah, I\'ll buzz it right now.',
            audio: '/audio/conversation/pl1-n1.mp3',
            audioSlow: '/audio/conversation/pl1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pl2',
        speaker: 'ai',
        text: 'Oh, it was in my bag!',
        audio: '/audio/conversation/pl2.mp3',
        translation: 'あ、バッグの中にあった！',
        responses: [
          {
            id: 'pl2-b1',
            level: 'beginner',
            text: 'Glad you found it!',
            audio: '/audio/conversation/pl2-b1.mp3',
            audioSlow: '/audio/conversation/pl2-b1-slow.mp3'
          },
          {
            id: 'pl2-n1',
            level: 'native',
            text: 'Whew, glad it turned up!',
            audio: '/audio/conversation/pl2-n1.mp3',
            audioSlow: '/audio/conversation/pl2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pl3',
        speaker: 'ai',
        text: 'Sorry for the trouble.',
        audio: '/audio/conversation/pl3.mp3',
        translation: '手間かけてごめんね。',
        responses: [
          {
            id: 'pl3-b1',
            level: 'beginner',
            text: 'Don\'t worry!',
            audio: '/audio/conversation/pl3-b1.mp3',
            audioSlow: '/audio/conversation/pl3-b1-slow.mp3'
          },
          {
            id: 'pl3-n1',
            level: 'native',
            text: 'No biggie!',
            audio: '/audio/conversation/pl3-n1.mp3',
            audioSlow: '/audio/conversation/pl3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'barbershop_booking',
    title: '床屋を予約する',
    description: '床屋で予約を取る会話',
    category: 'services',
    conversations: [
      {
        id: 'bs1',
        speaker: 'ai',
        text: 'Can I book a haircut for tomorrow?',
        audio: '/audio/conversation/bs1.mp3',
        translation: '明日カット予約できますか？',
        responses: [
          {
            id: 'bs1-b1',
            level: 'beginner',
            text: 'We have 2 p.m. open.',
            audio: '/audio/conversation/bs1-b1.mp3',
            audioSlow: '/audio/conversation/bs1-b1-slow.mp3'
          },
          {
            id: 'bs1-n1',
            level: 'native',
            text: 'I\'ve got a 2 p.m. open.',
            audio: '/audio/conversation/bs1-n1.mp3',
            audioSlow: '/audio/conversation/bs1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bs2',
        speaker: 'ai',
        text: 'Then 2 p.m., please.',
        audio: '/audio/conversation/bs2.mp3',
        translation: 'では2時でお願いします。',
        responses: [
          {
            id: 'bs2-b1',
            level: 'beginner',
            text: 'May I have your name?',
            audio: '/audio/conversation/bs2-b1.mp3',
            audioSlow: '/audio/conversation/bs2-b1-slow.mp3'
          },
          {
            id: 'bs2-n1',
            level: 'native',
            text: 'Could I have your name?',
            audio: '/audio/conversation/bs2-n1.mp3',
            audioSlow: '/audio/conversation/bs2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'bs3',
        speaker: 'ai',
        text: 'Tanaka.',
        audio: '/audio/conversation/bs3.mp3',
        translation: '田中です。',
        responses: [
          {
            id: 'bs3-b1',
            level: 'beginner',
            text: 'Your booking is set.',
            audio: '/audio/conversation/bs3-b1.mp3',
            audioSlow: '/audio/conversation/bs3-b1-slow.mp3'
          },
          {
            id: 'bs3-n1',
            level: 'native',
            text: 'You\'re all booked for 2 p.m.',
            audio: '/audio/conversation/bs3-n1.mp3',
            audioSlow: '/audio/conversation/bs3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'cafe_wifi',
    title: 'カフェでWi-Fiを聞く',
    description: 'カフェでWi-Fiパスワードを聞く会話',
    category: 'services',
    conversations: [
      {
        id: 'cw1',
        speaker: 'ai',
        text: 'Could I have the Wi-Fi password?',
        audio: '/audio/conversation/cw1.mp3',
        translation: 'Wi-Fiのパスワード教えてもらえますか？',
        responses: [
          {
            id: 'cw1-b1',
            level: 'beginner',
            text: 'It\'s printed on your receipt.',
            audio: '/audio/conversation/cw1-b1.mp3',
            audioSlow: '/audio/conversation/cw1-b1-slow.mp3'
          },
          {
            id: 'cw1-n1',
            level: 'native',
            text: 'You\'ll find it on your receipt.',
            audio: '/audio/conversation/cw1-n1.mp3',
            audioSlow: '/audio/conversation/cw1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'cw2',
        speaker: 'ai',
        text: 'Oh, I\'ll check.',
        audio: '/audio/conversation/cw2.mp3',
        translation: 'あ、確認してみます。',
        responses: [
          {
            id: 'cw2-b1',
            level: 'beginner',
            text: 'Let me know if it doesn\'t work.',
            audio: '/audio/conversation/cw2-b1.mp3',
            audioSlow: '/audio/conversation/cw2-b1-slow.mp3'
          },
          {
            id: 'cw2-n1',
            level: 'native',
            text: 'If it\'s glitchy, let me know.',
            audio: '/audio/conversation/cw2-n1.mp3',
            audioSlow: '/audio/conversation/cw2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'cw3',
        speaker: 'ai',
        text: 'Thank you!',
        audio: '/audio/conversation/cw3.mp3',
        translation: 'ありがとうございます！',
        responses: [
          {
            id: 'cw3-b1',
            level: 'beginner',
            text: 'You\'re welcome.',
            audio: '/audio/conversation/cw3-b1.mp3',
            audioSlow: '/audio/conversation/cw3-b1-slow.mp3'
          },
          {
            id: 'cw3-n1',
            level: 'native',
            text: 'No worries.',
            audio: '/audio/conversation/cw3-n1.mp3',
            audioSlow: '/audio/conversation/cw3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'meeting_time',
    title: '集合時間を決める',
    description: '待ち合わせ時間を決める会話',
    category: 'planning',
    conversations: [
      {
        id: 'mt1',
        speaker: 'ai',
        text: 'What time should we meet?',
        audio: '/audio/conversation/mt1.mp3',
        translation: '何時に待ち合わせる？',
        responses: [
          {
            id: 'mt1-b1',
            level: 'beginner',
            text: 'How about eleven?',
            audio: '/audio/conversation/mt1-b1.mp3',
            audioSlow: '/audio/conversation/mt1-b1-slow.mp3'
          },
          {
            id: 'mt1-n1',
            level: 'native',
            text: 'Eleven sound good?',
            audio: '/audio/conversation/mt1-n1.mp3',
            audioSlow: '/audio/conversation/mt1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'mt2',
        speaker: 'ai',
        text: 'Sounds good.',
        audio: '/audio/conversation/mt2.mp3',
        translation: 'いいね、その時間で。',
        responses: [
          {
            id: 'mt2-b1',
            level: 'beginner',
            text: 'Station front okay?',
            audio: '/audio/conversation/mt2-b1.mp3',
            audioSlow: '/audio/conversation/mt2-b1-slow.mp3'
          },
          {
            id: 'mt2-n1',
            level: 'native',
            text: 'Station entrance good?',
            audio: '/audio/conversation/mt2-n1.mp3',
            audioSlow: '/audio/conversation/mt2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'mt3',
        speaker: 'ai',
        text: 'Yes, easy to find.',
        audio: '/audio/conversation/mt3.mp3',
        translation: 'うん、わかりやすいね。',
        responses: [
          {
            id: 'mt3-b1',
            level: 'beginner',
            text: 'See you tomorrow then!',
            audio: '/audio/conversation/mt3-b1.mp3',
            audioSlow: '/audio/conversation/mt3-b1-slow.mp3'
          },
          {
            id: 'mt3-n1',
            level: 'native',
            text: 'Catch you tomorrow!',
            audio: '/audio/conversation/mt3-n1.mp3',
            audioSlow: '/audio/conversation/mt3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'trash_forgotten',
    title: 'ゴミ出しを忘れた',
    description: 'ゴミ出しを忘れた時の会話',
    category: 'daily',
    conversations: [
      {
        id: 'tf1',
        speaker: 'ai',
        text: 'I forgot to take out the trash!',
        audio: '/audio/conversation/tf1.mp3',
        translation: 'ゴミ出し忘れた！',
        responses: [
          {
            id: 'tf1-b1',
            level: 'beginner',
            text: 'We might still make it—hurry!',
            audio: '/audio/conversation/tf1-b1.mp3',
            audioSlow: '/audio/conversation/tf1-b1-slow.mp3'
          },
          {
            id: 'tf1-n1',
            level: 'native',
            text: 'We could still catch the truck—move!',
            audio: '/audio/conversation/tf1-n1.mp3',
            audioSlow: '/audio/conversation/tf1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'tf2',
        speaker: 'ai',
        text: 'I\'ll grab the bag!',
        audio: '/audio/conversation/tf2.mp3',
        translation: '袋持ってくる！',
        responses: [
          {
            id: 'tf2-b1',
            level: 'beginner',
            text: 'I\'ll hold the door.',
            audio: '/audio/conversation/tf2-b1.mp3',
            audioSlow: '/audio/conversation/tf2-b1-slow.mp3'
          },
          {
            id: 'tf2-n1',
            level: 'native',
            text: 'I got the door!',
            audio: '/audio/conversation/tf2-n1.mp3',
            audioSlow: '/audio/conversation/tf2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'tf3',
        speaker: 'ai',
        text: 'Made it!',
        audio: '/audio/conversation/tf3.mp3',
        translation: 'よし、間に合った！',
        responses: [
          {
            id: 'tf3-b1',
            level: 'beginner',
            text: 'Let\'s be careful next time.',
            audio: '/audio/conversation/tf3-b1.mp3',
            audioSlow: '/audio/conversation/tf3-b1-slow.mp3'
          },
          {
            id: 'tf3-n1',
            level: 'native',
            text: 'Next time, set a reminder.',
            audio: '/audio/conversation/tf3-n1.mp3',
            audioSlow: '/audio/conversation/tf3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'package_delivery',
    title: '宅配便を受け取る',
    description: '宅配便の受け取り会話',
    category: 'services',
    conversations: [
      {
        id: 'pd1',
        speaker: 'ai',
        text: 'Has my package arrived?',
        audio: '/audio/conversation/pd1.mp3',
        translation: '荷物届いていますか？',
        responses: [
          {
            id: 'pd1-b1',
            level: 'beginner',
            text: 'Yes, this box. Please sign.',
            audio: '/audio/conversation/pd1-b1.mp3',
            audioSlow: '/audio/conversation/pd1-b1-slow.mp3'
          },
          {
            id: 'pd1-n1',
            level: 'native',
            text: 'Yep, this is yours—need a signature.',
            audio: '/audio/conversation/pd1-n1.mp3',
            audioSlow: '/audio/conversation/pd1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pd2',
        speaker: 'ai',
        text: 'Do I sign here?',
        audio: '/audio/conversation/pd2.mp3',
        translation: 'ここにサインでいいですか？',
        responses: [
          {
            id: 'pd2-b1',
            level: 'beginner',
            text: 'Yes, thank you.',
            audio: '/audio/conversation/pd2-b1.mp3',
            audioSlow: '/audio/conversation/pd2-b1-slow.mp3'
          },
          {
            id: 'pd2-n1',
            level: 'native',
            text: 'Perfect, thanks.',
            audio: '/audio/conversation/pd2-n1.mp3',
            audioSlow: '/audio/conversation/pd2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pd3',
        speaker: 'ai',
        text: 'Can I check inside?',
        audio: '/audio/conversation/pd3.mp3',
        translation: '中身確認してもいいですか？',
        responses: [
          {
            id: 'pd3-b1',
            level: 'beginner',
            text: 'Sure, go ahead.',
            audio: '/audio/conversation/pd3-b1.mp3',
            audioSlow: '/audio/conversation/pd3-b1-slow.mp3'
          },
          {
            id: 'pd3-n1',
            level: 'native',
            text: 'Absolutely, go for it.',
            audio: '/audio/conversation/pd3-n1.mp3',
            audioSlow: '/audio/conversation/pd3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'elevator_floor',
    title: 'エレベーターで階を聞く',
    description: 'エレベーターで階数を聞く会話',
    category: 'transportation',
    conversations: [
      {
        id: 'ef1',
        speaker: 'ai',
        text: 'Which floor?',
        audio: '/audio/conversation/ef1.mp3',
        translation: '何階に行かれますか？',
        responses: [
          {
            id: 'ef1-b1',
            level: 'beginner',
            text: 'Fifth, please.',
            audio: '/audio/conversation/ef1-b1.mp3',
            audioSlow: '/audio/conversation/ef1-b1-slow.mp3'
          },
          {
            id: 'ef1-n1',
            level: 'native',
            text: 'Fifth floor, thanks.',
            audio: '/audio/conversation/ef1-n1.mp3',
            audioSlow: '/audio/conversation/ef1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ef2',
        speaker: 'ai',
        text: 'It\'s pressed.',
        audio: '/audio/conversation/ef2.mp3',
        translation: '押しました。',
        responses: [
          {
            id: 'ef2-b1',
            level: 'beginner',
            text: 'Thank you.',
            audio: '/audio/conversation/ef2-b1.mp3',
            audioSlow: '/audio/conversation/ef2-b1-slow.mp3'
          },
          {
            id: 'ef2-n1',
            level: 'native',
            text: 'Thanks, appreciate it.',
            audio: '/audio/conversation/ef2-n1.mp3',
            audioSlow: '/audio/conversation/ef2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'ef3',
        speaker: 'ai',
        text: 'I\'ll let you know when we arrive.',
        audio: '/audio/conversation/ef3.mp3',
        translation: '降りる際声かけますね。',
        responses: [
          {
            id: 'ef3-b1',
            level: 'beginner',
            text: 'That helps!',
            audio: '/audio/conversation/ef3-b1.mp3',
            audioSlow: '/audio/conversation/ef3-b1-slow.mp3'
          },
          {
            id: 'ef3-n1',
            level: 'native',
            text: 'Big help, thanks!',
            audio: '/audio/conversation/ef3-n1.mp3',
            audioSlow: '/audio/conversation/ef3-n1-slow.mp3'
          }
        ]
      }
    ]
  },
  {
    id: 'photo_printing',
    title: '写真プリント注文',
    description: '写真プリントを注文する会話',
    category: 'services',
    conversations: [
      {
        id: 'pp1',
        speaker: 'ai',
        text: 'Could I get ten L-size prints of this photo?',
        audio: '/audio/conversation/pp1.mp3',
        translation: 'この写真をL判で10枚お願いします。',
        responses: [
          {
            id: 'pp1-b1',
            level: 'beginner',
            text: 'Glossy or matte?',
            audio: '/audio/conversation/pp1-b1.mp3',
            audioSlow: '/audio/conversation/pp1-b1-slow.mp3'
          },
          {
            id: 'pp1-n1',
            level: 'native',
            text: 'Glossy or matte for the finish?',
            audio: '/audio/conversation/pp1-n1.mp3',
            audioSlow: '/audio/conversation/pp1-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pp2',
        speaker: 'ai',
        text: 'Glossy, please.',
        audio: '/audio/conversation/pp2.mp3',
        translation: '光沢でお願いします。',
        responses: [
          {
            id: 'pp2-b1',
            level: 'beginner',
            text: 'It\'ll be ready in about 30 minutes.',
            audio: '/audio/conversation/pp2-b1.mp3',
            audioSlow: '/audio/conversation/pp2-b1-slow.mp3'
          },
          {
            id: 'pp2-n1',
            level: 'native',
            text: 'Should be ready in thirty.',
            audio: '/audio/conversation/pp2-n1.mp3',
            audioSlow: '/audio/conversation/pp2-n1-slow.mp3'
          }
        ]
      },
      {
        id: 'pp3',
        speaker: 'ai',
        text: 'I\'ll shop and come back.',
        audio: '/audio/conversation/pp3.mp3',
        translation: 'では買い物して戻ります。',
        responses: [
          {
            id: 'pp3-b1',
            level: 'beginner',
            text: 'We\'ll be waiting.',
            audio: '/audio/conversation/pp3-b1.mp3',
            audioSlow: '/audio/conversation/pp3-b1-slow.mp3'
          },
          {
            id: 'pp3-n1',
            level: 'native',
            text: 'We\'ll have them ready for you.',
            audio: '/audio/conversation/pp3-n1.mp3',
            audioSlow: '/audio/conversation/pp3-n1-slow.mp3'
          }
        ]
      }
    ]
  }
];