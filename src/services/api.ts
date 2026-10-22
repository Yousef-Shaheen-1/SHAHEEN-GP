export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  dispatchId?: string;
  timestamp?: string;
  message?: string;
  error?: string;
}

export interface AiGeneratePayload {
  task: 'draft_project' | 'draft_article' | 'translate' | 'seo_optimize';
  prompt: string;
  targetLang?: 'en' | 'ar';
  context?: string;
}

export interface AiGenerateResponse {
  content?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  source?: 'gemini_api' | 'local_engine';
  error?: string;
}

export async function sendContactDispatch(payload: ContactPayload): Promise<ContactResponse> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error transmitting dispatch',
    };
  }
}

export async function requestAiContent(payload: AiGeneratePayload): Promise<AiGenerateResponse> {
  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to reach AI service',
    };
  }
}
