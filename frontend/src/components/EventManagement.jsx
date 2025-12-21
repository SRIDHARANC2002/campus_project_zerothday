import React, { useState, useEffect } from 'react';
import { eventApi } from '../api/api';

const EventManagement = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventApi.getEvents();
      setEvents(data);
      setError('');
    } catch (error) {
      setError('Failed to load events. Please try again.');
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      const data = await eventApi.createEvent(newEvent);
      setEvents(prev => [...prev, data]);
      setNewEvent({ title: '', date: '', description: '', location: '' });
      setError('');
    } catch (error) {
      setError('Failed to create event. Please try again.');
      console.error('Create failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      setLoading(true);
      const data = await eventApi.updateEvent(editEvent._id, editEvent);
      setEvents(events.map(e => e._id === editEvent._id ? data : e));
      setEditEvent(null);
      setNewEvent({ title: '', date: '', description: '', location: '' });
      setError('');
    } catch (error) {
      setError('Failed to update event. Please try again.');
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      setLoading(true);
      await eventApi.deleteEvent(eventId);
      setEvents(events.filter(e => e._id !== eventId));
      setError('');
    } catch (error) {
      setError('Failed to delete event. Please try again.');
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setNewEvent({ ...event });
  };

  return (
    <div>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <div style={{ marginBottom: '1rem' }}>
        <h2>Events</h2>
        <button onClick={fetchEvents}>Refresh</button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3>Create/Update Event</h3>
          <div>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Event Title"
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              placeholder="Event Description"
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Location"
              disabled={loading}
            />
          </div>
          <div>
            <button onClick={editEvent ? handleUpdateEvent : handleCreateEvent} disabled={loading}>
              {loading ? 'Processing...' : editEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Event List</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {events.map(event => (
              <div key={event._id} style={{ padding: '0.5rem', border: '1px solid #ccc', marginBottom: '0.5rem' }}>
                <h4>{event.title}</h4>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <button onClick={() => handleEditEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
