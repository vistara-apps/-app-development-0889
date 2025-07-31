import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import OpenAI from 'openai';

const AIDiscussionModal = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [sportEvent, setSportEvent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const openai = new OpenAI({
    apiKey: "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",
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });

  const generateDiscussionStarter = async () => {
    if (!topic || !sportEvent) return;

    setIsGenerating(true);
    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a sports discussion moderator. Generate engaging discussion starters that encourage thoughtful analysis and predictions. Keep responses under 200 words and focus on specific talking points.'
          },
          {
            role: 'user',
            content: `Create a discussion starter for "${topic}" related to "${sportEvent}". Include key talking points and encourage predictions.`
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      setGeneratedContent(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Unable to generate content at this time. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateTopic = () => {
    // In a real app, this would create the discussion in the backend
    alert('Discussion topic created! (This is a demo - would normally create the actual discussion)');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-purple-600" size={24} />
            Create AI-Enhanced Discussion
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Discussion Topic</label>
            <input
              type="text"
              className="input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Who will win the championship?"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sport Event</label>
            <input
              type="text"
              className="input"
              value={sportEvent}
              onChange={(e) => setSportEvent(e.target.value)}
              placeholder="e.g., NBA Finals 2024"
            />
          </div>

          <button
            onClick={generateDiscussionStarter}
            disabled={!topic || !sportEvent || isGenerating}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="loading-spinner"></div>
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Discussion Starter
              </>
            )}
          </button>

          {generatedContent && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">AI-Generated Discussion Starter:</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{generatedContent}</p>
            </div>
          )}

          {generatedContent && (
            <div className="flex gap-3">
              <button onClick={onClose} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={handleCreateTopic} className="btn btn-success flex-1">
                Create Discussion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDiscussionModal;