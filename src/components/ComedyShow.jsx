import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const ComedyShow = () => {
  const [prompt, setPrompt] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchVideo = async () => {
    setLoading(true);
    setError('');
    setVideoId(null);
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: prompt + ' comedy',
          type: 'video',
          maxResults: 1,
          key: 'AIzaSyCY1f77iPjCXGtGROH7BNOLQrXOCC81v3I',
        },
      });

      if (response.data.items.length > 0) {
        setVideoId(response.data.items[0].id.videoId);
        setModalIsOpen(true);
      } else {
        setError('No video found. Try a different prompt.');
      }
    } catch (err) {
      setError('Error fetching video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>AI Comedy Show</h1>
      <textarea
        type="text"
        style={{ width: '400px', height: '100px' }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your comedy prompt..."
      />
      <button
        style={{ display: 'block', margin: '10px auto', cursor: 'pointer' }}
       onClick={fetchVideo}>Generate Comedy Video</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Comedy Video"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <button onClick={closeModal}>Close</button>
        {videoId && (
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Comedy Video"
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComedyShow;
