import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Calendar, Target, Plus } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import PredictionModal from '../components/PredictionModal';

const Predictions = () => {
  const { user, isAuthenticated, updateDebatePoints } = useUser();
  const [predictions, setPredictions] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // Mock upcoming events
    const mockEvents = [
      {
        id: 1,
        title: 'Lakers vs Warriors',
        sport: 'Basketball',
        date: '2024-01-20',
        time: '8:00 PM EST',
        odds: { lakers: 1.85, warriors: 1.95 },
        description: 'Western Conference showdown between division rivals',
        potentialPoints: 25
      },
      {
        id: 2,
        title: 'Chiefs vs Bills',
        sport: 'Football',
        date: '2024-01-21',
        time: '4:30 PM EST',
        odds: { chiefs: 1.75, bills: 2.10 },
        description: 'AFC Championship game rematch',
        potentialPoints: 30
      },
      {
        id: 3,
        title: 'Real Madrid vs Barcelona',
        sport: 'Soccer',
        date: '2024-01-22',
        time: '3:00 PM EST',
        odds: { real: 1.90, barcelona: 1.80 },
        description: 'El Clásico - La Liga fixture',
        potentialPoints: 35
      }
    ];

    // Mock user predictions
    const mockPredictions = [
      {
        id: 1,
        eventId: 1,
        eventTitle: 'Lakers vs Warriors',
        prediction: 'Lakers to win',
        confidence: 85,
        odds: 1.85,
        status: 'pending',
        submittedAt: '2024-01-18',
        potentialPoints: 25
      },
      {
        id: 2,
        eventId: 2,
        eventTitle: 'Chiefs vs Bills',
        prediction: 'Chiefs to win by 7+',
        confidence: 70,
        odds: 2.10,
        status: 'correct',
        submittedAt: '2024-01-15',
        pointsEarned: 35
      },
      {
        id: 3,
        eventId: 3,
        eventTitle: 'Real Madrid vs Barcelona',
        prediction: 'Over 2.5 goals',
        confidence: 90,
        odds: 1.75,
        status: 'incorrect',
        submittedAt: '2024-01-10',
        pointsLost: 0
      }
    ];

    setUpcomingEvents(mockEvents);
    setPredictions(mockPredictions);
  }, []);

  const handleMakePrediction = (event) => {
    setSelectedEvent(event);
    setShowPredictionModal(true);
  };

  const handlePredictionSubmit = (predictionData) => {
    const newPrediction = {
      id: Date.now(),
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      prediction: predictionData.prediction,
      confidence: predictionData.confidence,
      odds: predictionData.odds,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
      potentialPoints: selectedEvent.potentialPoints
    };

    setPredictions([newPrediction, ...predictions]);
    setShowPredictionModal(false);
    setSelectedEvent(null);

    // Award points for making a prediction
    updateDebatePoints(5);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'correct': return 'status-correct';
      case 'incorrect': return 'status-incorrect';
      default: return '';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <Target size={64} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Make Sports Predictions</h2>
          <p className="text-gray-600 mb-8">
            Login to make predictions and earn Debate Points for accuracy
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sports Predictions</h1>
        <p className="text-gray-600">
          Make predictions and earn Debate Points based on accuracy and confidence
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-3 gap-6 mb-8">
        <div className="card text-center">
          <Target size={32} className="mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold">{predictions.length}</div>
          <div className="text-gray-600">Total Predictions</div>
        </div>
        <div className="card text-center">
          <Award size={32} className="mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold">
            {predictions.filter(p => p.status === 'correct').length}
          </div>
          <div className="text-gray-600">Correct Predictions</div>
        </div>
        <div className="card text-center">
          <TrendingUp size={32} className="mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold">
            {predictions.length > 0 
              ? Math.round((predictions.filter(p => p.status === 'correct').length / predictions.filter(p => p.status !== 'pending').length) * 100) || 0
              : 0}%
          </div>
          <div className="text-gray-600">Accuracy Rate</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'upcoming'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'predictions'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          My Predictions
        </button>
      </div>

      {/* Upcoming Events Tab */}
      {activeTab === 'upcoming' && (
        <div className="grid grid-2 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="prediction-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {event.date} at {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={16} />
                      Up to {event.potentialPoints} points
                    </span>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {event.sport}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Current Odds:</h4>
                <div className="flex gap-4">
                  {Object.entries(event.odds).map(([team, odds]) => (
                    <div key={team} className="text-sm">
                      <span className="capitalize font-medium">{team}:</span> {odds}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleMakePrediction(event)}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Make Prediction
              </button>
            </div>
          ))}
        </div>
      )}

      {/* My Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="space-y-4">
          {predictions.len > 0 ? (
            predictions.map((prediction) => (
              <div key={prediction.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{prediction.eventTitle}</h3>
                    <p className="text-gray-600 mb-2">{prediction.prediction}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Confidence: {prediction.confidence}%</span>
                      <span>Odds: {prediction.odds}</span>
                      <span>Submitted: {prediction.submittedAt}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold capitalize ${getStatusColor(prediction.status)}`}>
                      {prediction.status}
                    </span>
                    {prediction.status === 'correct' && (
                      <div className="text-green-600 font-bold">
                        +{prediction.pointsEarned} points
                      </div>
                    )}
                    {prediction.status === 'pending' && (
                      <div className="text-gray-600">
                        Potential: {prediction.potentialPoints} points
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Target size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">No Predictions Yet</h3>
              <p className="text-gray-600 mb-6">
                Start making predictions to earn Debate Points
              </p>
              <button
                onClick={() => setActiveTab('upcoming')}
                className="btn btn-primary"
              >
                View Upcoming Events
              </button>
            </div>
          )}
        </div>
      )}

      {showPredictionModal && selectedEvent && (
        <PredictionModal
          event={selectedEvent}
          onClose={() => {
            setShowPredictionModal(false);
            setSelectedEvent(null);
          }}
          onSubmit={handlePredictionSubmit}
        />
      )}
    </div>
  );
};

export default Predictions;