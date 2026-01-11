const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
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
    
    
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

   
    const info = await ytdl.getInfo(videoId);
    
    
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    
    
    const audioFormat = audioFormats.find(f => f.hasAudio && !f.hasVideo) || audioFormats[0];

    if (!audioFormat) {
      return res.status(404).json({ error: 'Audio not found' });
    }

    console.log(`Stream Functional : ${info.videoDetails.title}`);
    
   
    res.json({ 
      url: audioFormat.url,
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      thumbnail: info.videoDetails.thumbnails[0]?.url
    });
    
  } catch (error) {
    console.error('[STREAM ERROR]:', error);
    res.status(500).json({ 
      error: 'Error getting the audio',
      details: error.message 
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend functioning on port ${PORT}`);
});