import { Scene, ConversationTurn, ConversationResponse } from '../types';

// CSVの行データの型定義
interface CSVRow {
  sceneName: string;
  speaker: string;
  conversationId: string;
  japanese1: string;
  japanese2: string;
  japanese3: string;
  japanese4: string;
  japanese5: string;
  beginnerEnglish1: string;
  beginnerEnglish2: string;
  beginnerEnglish3: string;
  beginnerEnglish4: string;
  beginnerEnglish5: string;
  nativeEnglish1: string;
  nativeEnglish2: string;
  nativeEnglish3: string;
  nativeEnglish4: string;
  nativeEnglish5: string;
}

// RFC 4180準拠のCSV解析関数
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // エスケープされた引用符 ("") の処理
        current += '"';
        i += 2;
      } else {
        // 引用符の開始または終了
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // 引用符外のカンマ = フィールド区切り
      result.push(current);
      current = '';
      i++;
    } else {
      // 通常文字
      current += char;
      i++;
    }
  }
  
  // 最後のフィールドを追加
  result.push(current);
  
  return result;
}

// CSVテキストをパースして行データに変換
function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  const rows: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) { // ヘッダー行をスキップ
    const line = lines[i];
    if (!line) continue;
    const columns = parseCSVLine(line);
    if (columns.length >= 18) {
      rows.push({
        sceneName: columns[0] || '',
        speaker: columns[1] || '',
        conversationId: columns[2] || '',
        japanese1: columns[3] || '',
        japanese2: columns[4] || '',
        japanese3: columns[5] || '',
        japanese4: columns[6] || '',
        japanese5: columns[7] || '',
        beginnerEnglish1: columns[8] || '',
        beginnerEnglish2: columns[9] || '',
        beginnerEnglish3: columns[10] || '',
        beginnerEnglish4: columns[11] || '',
        beginnerEnglish5: columns[12] || '',
        nativeEnglish1: columns[13] || '',
        nativeEnglish2: columns[14] || '',
        nativeEnglish3: columns[15] || '',
        nativeEnglish4: columns[16] || '',
        nativeEnglish5: columns[17] || ''
      });
    }
  }
  
  return rows;
}

// シーン名から英語IDを生成
function generateSceneId(sceneName: string): string {
  const sceneIdMap: { [key: string]: string } = {
    '朝の挨拶': 'morning_greeting',
    'バス停で時刻確認': 'bus_schedule',
    '図書館で本を探す': 'library_search',
    'カフェで注文': 'cafe_order',
    '雨で傘を借りる': 'rain_umbrella',
    '友達を映画に誘う': 'movie_invitation',
    '宿題を忘れた': 'homework_forgotten',
    '道を尋ねる': 'asking_directions',
    '写真を撮ってもらう': 'photo_request',
    '病院で予約': 'hospital_appointment',
    'スーパーで値段確認': 'supermarket_price',
    '充電器を借りる': 'charger_borrow',
    '昼食のメニュー': 'lunch_menu',
    '落とし物を渡す': 'lost_wallet',
    '誕生日を祝う': 'birthday_celebration',
    '電車で席を譲る': 'train_seat',
    'PCトラブル相談': 'printer_trouble',
    '勉強会の予定': 'study_group',
    '天気を確認': 'weather_check',
    '服装を決める': 'clothing_decision',
    'コンビニでバーコード支払い': 'barcode_payment',
    '公園でボールを借りる': 'ball_borrow',
    'スマホを落とした': 'phone_lost',
    '床屋を予約する': 'barbershop_booking',
    'カフェでWi-Fiを聞く': 'cafe_wifi',
    '集合時間を決める': 'meeting_time',
    'ゴミ出しを忘れた': 'trash_forgotten',
    '宅配便を受け取る': 'package_delivery',
    'エレベーターで階を聞く': 'elevator_floor',
    '写真プリント注文': 'photo_printing'
  };
  
  return sceneIdMap[sceneName] || sceneName.toLowerCase().replace(/\s+/g, '_');
}

// カテゴリを決定
function getCategory(sceneName: string): string {
  const categoryMap: { [key: string]: string } = {
    '朝の挨拶': 'daily',
    'バス停で時刻確認': 'transportation',
    '図書館で本を探す': 'study',
    'カフェで注文': 'dining',
    '雨で傘を借りる': 'daily',
    '友達を映画に誘う': 'entertainment',
    '宿題を忘れた': 'study',
    '道を尋ねる': 'navigation',
    '写真を撮ってもらう': 'social',
    '病院で予約': 'medical',
    'スーパーで値段確認': 'shopping',
    '充電器を借りる': 'daily',
    '昼食のメニュー': 'dining',
    '落とし物を渡す': 'social',
    '誕生日を祝う': 'social',
    '電車で席を譲る': 'transportation',
    'PCトラブル相談': 'technology',
    '勉強会の予定': 'study',
    '天気を確認': 'daily',
    '服装を決める': 'daily',
    'コンビニでバーコード支払い': 'shopping',
    '公園でボールを借りる': 'recreation',
    'スマホを落とした': 'daily',
    '床屋を予約する': 'services',
    'カフェでWi-Fiを聞く': 'services',
    '集合時間を決める': 'planning',
    'ゴミ出しを忘れた': 'daily',
    '宅配便を受け取る': 'services',
    'エレベーターで階を聞く': 'transportation',
    '写真プリント注文': 'services'
  };
  
  return categoryMap[sceneName] || 'general';
}

// CSVデータをSceneオブジェクトに変換
export function convertCSVToScenes(csvText: string): Scene[] {
  const rows = parseCSV(csvText);
  const scenesMap = new Map<string, Scene>();
  
  // 各シーンのデータを整理
  const sceneData = new Map<string, { ai: CSVRow[], user: CSVRow[] }>();
  
  rows.forEach(row => {
    const sceneId = generateSceneId(row.sceneName);
    
    if (!sceneData.has(sceneId)) {
      sceneData.set(sceneId, { ai: [], user: [] });
    }
    
    const data = sceneData.get(sceneId)!;
    if (row.speaker === 'A') {
      data.ai.push(row);
    } else if (row.speaker === 'B') {
      data.user.push(row);
    }
  });
  
  // シーンを構築
  sceneData.forEach((data, sceneId) => {
    const firstRow = data.ai[0] || data.user[0];
    if (!firstRow) return;
    
    const scene: Scene = {
      id: sceneId,
      title: firstRow.sceneName,
      description: `${firstRow.sceneName}での会話`,
      category: getCategory(firstRow.sceneName),
      conversations: []
    };
    
    // AI発言とユーザー返答をペアで処理
    data.ai.forEach(aiRow => {
      const conversationId = `${sceneId}_${aiRow.conversationId}`;
      // ユーザーの返答を探す（AI発言の次のB発言）
      const nextConversationId = (parseInt(aiRow.conversationId) + 1).toString();
      const userRow = data.user.find(ur => ur.conversationId === nextConversationId);
      
      const conversation: ConversationTurn = {
        id: conversationId,
        speaker: 'ai',
        text: aiRow.beginnerEnglish1, // 最初の英語を代表として使用
        audio: `/audio/conversation/${conversationId}.mp3`,
        translation: aiRow.japanese1, // 最初の日本語を翻訳として使用
        responses: []
      };
      
      // ユーザーの返答パターンを追加
      if (userRow) {
        const responses: ConversationResponse[] = [];
        
        // 中学生レベルの5パターン
        [userRow.beginnerEnglish1, userRow.beginnerEnglish2, userRow.beginnerEnglish3, userRow.beginnerEnglish4, userRow.beginnerEnglish5]
          .forEach((text, index) => {
            if (text && text.trim()) {
              responses.push({
                id: `${conversation.id}-b${index + 1}`,
                level: 'beginner',
                text: text.trim(),
                audio: `/audio/conversation/${conversation.id}-b${index + 1}.mp3`,
                audioSlow: `/audio/conversation/${conversation.id}-b${index + 1}-slow.mp3`
              });
            }
          });
        
        // ネイティブレベルの5パターン
        [userRow.nativeEnglish1, userRow.nativeEnglish2, userRow.nativeEnglish3, userRow.nativeEnglish4, userRow.nativeEnglish5]
          .forEach((text, index) => {
            if (text && text.trim()) {
              responses.push({
                id: `${conversation.id}-n${index + 1}`,
                level: 'native',
                text: text.trim(),
                audio: `/audio/conversation/${conversation.id}-n${index + 1}.mp3`,
                audioSlow: `/audio/conversation/${conversation.id}-n${index + 1}-slow.mp3`
              });
            }
          });
        
        conversation.responses = responses;
      }
      
      scene.conversations.push(conversation);
    });
    
    scenesMap.set(sceneId, scene);
  });
  
  return Array.from(scenesMap.values());
}

// CSVファイルを読み込んでScenesを取得する関数
export async function loadScenesFromCSV(): Promise<Scene[]> {
  try {
    const response = await fetch('/talk.csv');
    if (!response.ok) {
      throw new Error('Failed to fetch CSV file');
    }
    const csvText = await response.text();
    return convertCSVToScenes(csvText);
  } catch (error) {
    console.error('Error loading scenes from CSV:', error);
    return [];
  }
}