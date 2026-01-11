import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, FlatList, Image } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');


const BACKEND_URL = 'https://reactnativegymapp.onrender.com'; 

export default function MusicPlayer() {
  const [loading, setLoading] = useState(false);
  const [loadingStream, setLoadingStream] = useState(false);
  const [trackTitle, setTrackTitle] = useState("WhatListen Music");
  const [searchQuery, setSearchQuery] = useState("");
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setShowResults(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }

    } catch (error) {
      console.log("Erro na busca:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const playTrack = async (track) => {
    setLoadingStream(true);
    setPlaying(false);
    
    try {
      // Pega o URL de streaming do backend
      const response = await fetch(
        `${BACKEND_URL}/api/stream/${track.videoId}`
      );
      const data = await response.json();
      
      if (data.url) {
        setAudioUrl(data.url);
        setCurrentTrack(track);
        setTrackTitle(track.name);
        setPlaying(true);
        setShowResults(false);
      }
    } catch (error) {
      console.log("Erro ao carregar stream:", error);
    } finally {
      setLoadingStream(false);
    }
  };

  const togglePlaying = () => {
    if (audioUrl) setPlaying(!playing);
  };

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.trackItem}
      onPress={() => playTrack(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.trackImage}
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.artistName} numberOfLines={1}>{item.artist_name}</Text>
      </View>
      <Text style={styles.duration}>
        {item.duration ? `${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, '0')}` : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../images/gym.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        
        {audioUrl && (
          <Video
            source={{ uri: audioUrl }}
            paused={!playing}
            playInBackground={true}
            playWhenInactive={true}
            ignoreSilentSwitch="ignore"
            style={{ width: 0, height: 0 }}
            onEnd={() => setPlaying(false)}
            onError={(e) => {
              console.log("Erro Player:", e);
              setPlaying(false);
            }}
          />
        )}

        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar no WhatListen..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        <View style={styles.container}>
          
          {/* Resultados da Pesquisa */}
          {showResults && (
            <View style={styles.resultsContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#00ff00" />
              ) : searchResults.length > 0 ? (
                <>
                  <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>{searchResults.length} músicas encontradas</Text>
                    <TouchableOpacity onPress={() => setShowResults(false)}>
                      <Text style={styles.closeButton}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTrackItem}
                    style={styles.resultsList}
                  />
                </>
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResults}>Nenhuma música encontrada</Text>
                  <Text style={styles.tryAgain}>Tenta pesquisar por artista ou título</Text>
                </View>
              )}
            </View>
          )}

          {/* Widget do Player */}
          {!showResults && (
            <View style={styles.centerContent}>
              {loadingStream && (
                <ActivityIndicator size="large" color="#00ff00" />
              )}
              {currentTrack && !loadingStream && (
                <View style={styles.albumArt}>
                  <Image 
                    source={{ uri: currentTrack.image }}
                    style={styles.albumImage}
                  />
                </View>
              )}
            </View>
          )}

          <View style={styles.musicWidget}>
            <View style={styles.musicInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>{trackTitle}</Text>
              {currentTrack && (
                <Text style={styles.artistText} numberOfLines={1}>{currentTrack.artist_name}</Text>
              )}
              <Text style={styles.statusText}>
                {loadingStream ? "A carregar stream..." : 
                 loading ? "A pesquisar..." : 
                 playing ? "A bombar ⚡" : "Pausado"}
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={togglePlaying} 
              style={[styles.playButton, !audioUrl && {opacity: 0.5}]}
              disabled={!audioUrl || loadingStream}
            >
              <Text style={styles.buttonIcon}>{playing ? "⏸️" : "▶️"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  searchBox: { paddingTop: 60, paddingHorizontal: 20, width: '100%' },
  input: { 
    backgroundColor: '#1c1c1e', 
    borderRadius: 15, 
    padding: 18, 
    color: 'white', 
    borderWidth: 1, 
    borderColor: '#333',
    fontSize: 16
  },
  centerContent: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  resultsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 10,
  },
  resultsList: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  duration: {
    color: '#666',
    fontSize: 12,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tryAgain: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  musicWidget: {
    width: width * 0.9,
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 30,
    marginBottom: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  musicInfo: { flex: 1 },
  trackTitle: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  artistText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  statusText: { 
    color: '#00ff00', 
    fontSize: 12, 
    marginTop: 4, 
    fontWeight: 'bold', 
    textTransform: 'uppercase' 
  },
  playButton: {
    backgroundColor: '#2c2c2e',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444'
  },
  buttonIcon: { fontSize: 24 }
});