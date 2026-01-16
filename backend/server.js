const express = require('express');
const cors = require('cors');
const youtube = require('youtube-ext');
const yts = require('yt-search');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    status: 'Backend Working',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/search?q=paramore',
      'GET /api/stream/:videoId'
    ]
  });
});

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Mandatory Query' });
    }
    console.log(`Searching for: ${query}`);
    const results = await yts(query);
    const tracks = results.videos.slice(0, 20).map(video => ({
      id: video.videoId,
      name: video.title,
      artist_name: video.author.name,
      image: video.thumbnail,
      duration: video.timestamp ? 
        video.timestamp.split(':').reduce((acc, time) => (60 * acc) + +time, 0) : 
        video.seconds,
      videoId: video.videoId
    }));
    console.log(`Found ${tracks.length} results`);
    res.json({ results: tracks });
  } catch (error) {
    console.error('[SEARCH ERROR]:', error);
    res.status(500).json({ 
      error: 'Error Searching',
      details: error.message 
    });
  }
});

app.get('/api/stream/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    console.log(`Request for: ${videoId}`);
    
    const info = await youtube.video.info({ videoId });
    
    const audioFormat = info.streamingData.adaptiveFormats.find(f => 
      f.mimeType && f.mimeType.includes('audio')
    );
    
    if (!audioFormat || !audioFormat.url) {
      return res.status(404).json({ error: 'Audio not found' });
    }
    
    console.log(`Stream OK: ${info.videoDetails.title}`);
    res.json({ 
      url: audioFormat.url,
      title: info.videoDetails.title,
      author: info.videoDetails.author,
      thumbnail: info.videoDetails.thumbnails[0]?.url
    });
  } catch (error) {
    console.error('[STREAM ERROR]:', error);
    res.status(500).json({ 
      error: 'Error getting audio',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend on port ${PORT}`);
});