import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';

// Google Cloud Text-to-Speech クライアントを遅延初期化
function createTTSClient(): TextToSpeechClient {
  try {
    // 本番環境（Vercel）では環境変数からJSON認証情報を取得
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.log('Using GOOGLE_APPLICATION_CREDENTIALS from environment');
      try {
        // 環境変数の値をログ出力（最初の100文字のみ）
        console.log('Credentials preview:', process.env.GOOGLE_APPLICATION_CREDENTIALS.substring(0, 100));
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
        return new TextToSpeechClient({
          credentials,
          projectId: credentials.project_id
        });
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error(`Invalid credentials format: ${parseError}`);
      }
    }
    
    // 開発環境ではキーファイルを使用
    const keyFilePath = './english-training-443903-4a20d037023b.json';
    console.log('Attempting to use key file:', keyFilePath);
    
    // ファイルの存在確認
    if (!fs.existsSync(keyFilePath)) {
      throw new Error(`認証ファイルが見つかりません: ${keyFilePath}`);
    }
    
    return new TextToSpeechClient({
      keyFilename: keyFilePath
    });
  } catch (error) {
    console.error('TTS Client initialization error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to initialize TTS client: ${errorMessage}`);
  }
}

export async function POST(request: NextRequest) {
  console.log('=== TTS API Called ===');
  let text = '';
  
  try {
    // 環境変数の存在確認
    console.log('Environment check:');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- GOOGLE_APPLICATION_CREDENTIALS exists:', !!process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log('- GOOGLE_APPLICATION_CREDENTIALS length:', process.env.GOOGLE_APPLICATION_CREDENTIALS?.length);

    const requestData = await request.json();
    text = requestData.text;
    const speed = requestData.speed || 1.0;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    console.log('TTS API called with text:', text, 'speed:', speed);

    // TTSクライアントを作成
    console.log('Creating TTS client...');
    const client = createTTSClient();
    console.log('TTS client created successfully');

    // Google TTS APIリクエスト
    const ttsRequest = {
      input: { text: text },
      voice: { 
        languageCode: 'en-US', 
        name: 'en-US-Standard-F'
      },
      audioConfig: { 
        audioEncoding: 'MP3' as const,
        speakingRate: speed
      },
    };

    console.log('Calling Google TTS API with request:', JSON.stringify(ttsRequest, null, 2));
    const [response] = await client.synthesizeSpeech(ttsRequest);
    console.log('Google TTS API response received, audio content exists:', !!response.audioContent);
    
    if (!response.audioContent) {
      console.error('No audio content in response');
      return NextResponse.json({ error: 'No audio content generated' }, { status: 500 });
    }

    // 音声データをBase64エンコード
    const audioBase64 = Buffer.from(response.audioContent).toString('base64');
    console.log('Audio data encoded successfully, length:', audioBase64.length);
    
    return NextResponse.json({ 
      audioData: audioBase64,
      mimeType: 'audio/mpeg'
    });

  } catch (error) {
    console.error('=== TTS API ERROR ===');
    console.error('Error:', error);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      console.error('Error stack:', error.stack);
    }
    
    // Google Cloud APIエラーの詳細情報
    if (error && typeof error === 'object') {
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
    
    // 認証エラーまたはAPIエラーの場合、詳細なエラー情報を返す
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('TTS API failed:', errorMessage);
    
    return NextResponse.json({ 
      error: `TTS service failed: ${errorMessage}`,
      details: error 
    }, { status: 500 });
  }
}

// フォールバック: 空のレスポンスを返してフロントエンドで処理する
function createFallbackResponse(text: string): NextResponse {
  console.log('Using fallback response for text:', text);
  
  return NextResponse.json({
    audioData: null,
    mimeType: null,
    fallback: true,
    message: 'TTS service unavailable - audio playback disabled'
  });
}