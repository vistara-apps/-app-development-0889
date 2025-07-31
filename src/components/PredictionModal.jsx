import React, { useState } from 'react';
import { X, Target, Award } from 'lucide-react';

const PredictionModal = ({ event, onClose, onSubmit }) => {
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState(50);
  const [selectedOdds, setSelectedOdds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prediction || !selectedOdds) return;

    onSubmit({
      prediction,
      confidence,
      odds: parseFloat(selectedOdds)
    });
  };

  const calculatePotentialPoints = () => {
    const basePoints = event.potentialPoints;
    const confidenceMultiplier = confidence / 100;
    const oddsMultiplier = selectedOdds ? parseFloat(selectedOdds) : 1;
    return Math.round(basePoints * confidenceMultiplier * oddsMultiplier);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="text-purple-600" size={24} />
            Make Prediction
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg">{event.title}</h3>
          <p className="text-gray-600 mb-2">{event.description}</p>
          <div className="text-sm text-gray-500">
            {event.date} at {event.time}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">Your Prediction</label>
            <textarea
              className="input"
              rows="3"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              placeholder="Enter your detailed prediction..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Odds</label>
            <div className="grid grid-2 gap-3">
              {Object.entries(event.odds).map(([team, odds]) => (
                <label key={team} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="odds"
                    value={odds}
                    checked={selectedOdds === odds.toString()}
                    onChange={(e) => setSelectedOdds(e.target.value)}
                    className="text-purple-600"
                  />
                  <span className="capitalize font-medium">{team}</span>
                  <span className="text-gray-600">({odds})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Confidence Level: {confidence}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low Confidence</span>
              <span>High Confidence</span>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-purple-800 font-semibold mb-2">
              <Award size={18} />
              Potential Debate Points
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {calculatePotentialPoints()} points
            </div>
            <p className="text-sm text-purple-700 mt-1">
              Based on confidence level, odds, and accuracy
            </p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!prediction || !selectedOdds}
              className="btn btn-primary flex-1"
            >
              Submit Prediction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionModal;