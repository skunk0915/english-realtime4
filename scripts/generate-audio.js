const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// データファイルを直接読み込み
const phraseGroups = [
  {
    id: 'office-basics',
    title: 'オフィス基本フレーズ',
    category: 'office',
    phrases: [
      {
        id: 'o1',
        japanese: 'おはようございます',
        english: 'Good morning',
        audio: '/audio/phrases/office/o1.mp3',
        audioSlow: '/audio/phrases/office/o1-slow.mp3'
      },
      {
        id: 'o2',
        japanese: 'お疲れ様でした',
        english: 'Good work today',
        audio: '/audio/phrases/office/o2.mp3',
        audioSlow: '/audio/phrases/office/o2-slow.mp3'
      },
      {
        id: 'o3',
        japanese: '会議はいつですか？',
        english: 'When is the meeting?',
        audio: '/audio/phrases/office/o3.mp3',
        audioSlow: '/audio/phrases/office/o3-slow.mp3'
      },
      {
        id: 'o4',
        japanese: 'すみません、質問があります',
        english: 'Excuse me, I have a question',
        audio: '/audio/phrases/office/o4.mp3',
        audioSlow: '/audio/phrases/office/o4-slow.mp3'
      },
      {
        id: 'o5',
        japanese: 'メールを確認しました',
        english: 'I checked the email',
        audio: '/audio/phrases/office/o5.mp3',
        audioSlow: '/audio/phrases/office/o5-slow.mp3'
      },
      {
        id: 'o6',
        japanese: '明日までに完成させます',
        english: 'I will finish it by tomorrow',
        audio: '/audio/phrases/office/o6.mp3',
        audioSlow: '/audio/phrases/office/o6-slow.mp3'
      },
      {
        id: 'o7',
        japanese: 'プロジェクトの進捗はどうですか？',
        english: 'How is the project progress?',
        audio: '/audio/phrases/office/o7.mp3',
        audioSlow: '/audio/phrases/office/o7-slow.mp3'
      },
      {
        id: 'o8',
        japanese: '少し遅れています',
        english: 'I am a little behind schedule',
        audio: '/audio/phrases/office/o8.mp3',
        audioSlow: '/audio/phrases/office/o8-slow.mp3'
      },
      {
        id: 'o9',
        japanese: '手伝いが必要ですか？',
        english: 'Do you need any help?',
        audio: '/audio/phrases/office/o9.mp3',
        audioSlow: '/audio/phrases/office/o9-slow.mp3'
      },
      {
        id: 'o10',
        japanese: 'ありがとうございます、大丈夫です',
        english: 'Thank you, I am fine',
        audio: '/audio/phrases/office/o10.mp3',
        audioSlow: '/audio/phrases/office/o10-slow.mp3'
      }
    ]
  },
  {
    id: 'shopping-basics',
    title: 'ショッピング基本フレーズ',
    category: 'shopping',
    phrases: [
      {
        id: 's1',
        japanese: 'いくらですか？',
        english: 'How much is it?',
        audio: '/audio/phrases/shopping/s1.mp3',
        audioSlow: '/audio/phrases/shopping/s1-slow.mp3'
      },
      {
        id: 's2',
        japanese: 'これを試着できますか？',
        english: 'Can I try this on?',
        audio: '/audio/phrases/shopping/s2.mp3',
        audioSlow: '/audio/phrases/shopping/s2-slow.mp3'
      },
      {
        id: 's3',
        japanese: '他のサイズはありますか？',
        english: 'Do you have other sizes?',
        audio: '/audio/phrases/shopping/s3.mp3',
        audioSlow: '/audio/phrases/shopping/s3-slow.mp3'
      },
      {
        id: 's4',
        japanese: 'これを買います',
        english: 'I will buy this',
        audio: '/audio/phrases/shopping/s4.mp3',
        audioSlow: '/audio/phrases/shopping/s4-slow.mp3'
      },
      {
        id: 's5',
        japanese: 'クレジットカードで払えますか？',
        english: 'Can I pay by credit card?',
        audio: '/audio/phrases/shopping/s5.mp3',
        audioSlow: '/audio/phrases/shopping/s5-slow.mp3'
      },
      {
        id: 's6',
        japanese: 'レシートをください',
        english: 'May I have a receipt?',
        audio: '/audio/phrases/shopping/s6.mp3',
        audioSlow: '/audio/phrases/shopping/s6-slow.mp3'
      },
      {
        id: 's7',
        japanese: '割引はありますか？',
        english: 'Is there any discount?',
        audio: '/audio/phrases/shopping/s7.mp3',
        audioSlow: '/audio/phrases/shopping/s7-slow.mp3'
      },
      {
        id: 's8',
        japanese: '返品できますか？',
        english: 'Can I return this?',
        audio: '/audio/phrases/shopping/s8.mp3',
        audioSlow: '/audio/phrases/shopping/s8-slow.mp3'
      },
      {
        id: 's9',
        japanese: '店員さんはどこですか？',
        english: 'Where is the store clerk?',
        audio: '/audio/phrases/shopping/s9.mp3',
        audioSlow: '/audio/phrases/shopping/s9-slow.mp3'
      },
      {
        id: 's10',
        japanese: 'ありがとうございました',
        english: 'Thank you very much',
        audio: '/audio/phrases/shopping/s10.mp3',
        audioSlow: '/audio/phrases/shopping/s10-slow.mp3'
      }
    ]
  }
];

const scenes = [
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

// macOSのsayコマンドを使用して音声ファイルを生成する関数
function generateAudio(text, outputPath, speed = 1.0) {
  return new Promise((resolve, reject) => {
    const speedFlag = speed < 1.0 ? '-r 150' : '-r 200'; // 読み上げ速度を調整
    // .aiff形式で直接生成
    const command = `say -v "Alex" ${speedFlag} -o "${outputPath}" "${text.replace(/'/g, "\\'")}"`; 
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating audio for "${text}": ${error.message}`);
        reject(error);
        return;
      }
      console.log(`Generated: ${outputPath}`);
      resolve();
    });
  });
}

// 音声ファイルを生成する関数（.aiff → .mp3変換）
async function generateAudioWithConversion(text, outputPath, speed = 1.0) {
  const aiffPath = outputPath.replace('.mp3', '.aiff');
  
  try {
    // まずAIFFファイルを生成
    await generateAudio(text, aiffPath, speed);
    
    // AIFFをMP3に変換
    return new Promise((resolve, reject) => {
      const command = `ffmpeg -i "${aiffPath}" -codec:a libmp3lame -b:a 128k -y "${outputPath}"`;
      exec(command, (error, stdout, stderr) => {
        // 一時ファイルを削除
        if (fs.existsSync(aiffPath)) {
          fs.unlinkSync(aiffPath);
        }
        
        if (error) {
          console.error(`Error converting to mp3: ${error.message}`);
          reject(error);
          return;
        }
        console.log(`Converted: ${outputPath}`);
        resolve();
      });
    });
  } catch (error) {
    // 一時ファイルを削除
    if (fs.existsSync(aiffPath)) {
      fs.unlinkSync(aiffPath);
    }
    throw error;
  }
}

// フレーズグループの音声ファイルを生成
async function generatePhrasesAudio() {
  console.log('Generating phrases audio...');
  
  for (const group of phraseGroups) {
    const groupDir = path.join(__dirname, '../public/audio/phrases', group.category);
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(groupDir)) {
      fs.mkdirSync(groupDir, { recursive: true });
    }
    
    for (const phrase of group.phrases) {
      const normalPath = path.join(groupDir, `${phrase.id}.mp3`);
      const slowPath = path.join(groupDir, `${phrase.id}-slow.mp3`);
      
      // 通常速度
      if (!fs.existsSync(normalPath)) {
        await generateAudioWithConversion(phrase.english, normalPath, 1.0);
      }
      
      // ゆっくり速度
      if (!fs.existsSync(slowPath)) {
        await generateAudioWithConversion(phrase.english, slowPath, 0.7);
      }
    }
  }
}

// シーンの音声ファイルを生成
async function generateScenesAudio() {
  console.log('Generating scenes audio...');
  
  for (const scene of scenes) {
    const sceneDir = path.join(__dirname, '../public/audio', scene.id);
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(sceneDir)) {
      fs.mkdirSync(sceneDir, { recursive: true });
    }
    
    for (const conversation of scene.conversations) {
      // AI音声
      const aiPath = path.join(sceneDir, `${conversation.id}.mp3`);
      if (!fs.existsSync(aiPath)) {
        await generateAudioWithConversion(conversation.text, aiPath, 1.0);
      }
      
      // 応答例音声
      if (conversation.responses) {
        for (const response of conversation.responses) {
          const responsePath = path.join(sceneDir, `${response.id}.mp3`);
          const responseSlowPath = path.join(sceneDir, `${response.id}-slow.mp3`);
          
          // 通常速度
          if (!fs.existsSync(responsePath)) {
            await generateAudioWithConversion(response.text, responsePath, 1.0);
          }
          
          // ゆっくり速度
          if (!fs.existsSync(responseSlowPath)) {
            await generateAudioWithConversion(response.text, responseSlowPath, 0.7);
          }
        }
      }
    }
  }
}

// メイン関数
async function main() {
  try {
    console.log('Starting audio generation...');
    
    await generatePhrasesAudio();
    await generateScenesAudio();
    
    console.log('Audio generation completed!');
  } catch (error) {
    console.error('Error during audio generation:', error);
    process.exit(1);
  }
}

// スクリプトとして実行された場合
if (require.main === module) {
  main();
}

module.exports = { generateAudioWithConversion, generatePhrasesAudio, generateScenesAudio };