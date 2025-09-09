import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseAudioProps {
  audioFile?: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

export const useAudio = ({ 
  audioFile, 
  autoPlay = false, 
  loop = false, 
  volume = 1.0 
}: UseAudioProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAudio, setHasAudio] = useState(false);
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    return sound
      ? () => {
          try {
            sound.unloadAsync();
          } catch (err) {
            console.log('Audio cleanup completed');
          }
        }
      : undefined;
  }, [sound]);

  const loadAudio = async (filePath: string) => {
    try {
      // Tránh load lại nếu đã có audio và đang load cùng file
      if (isLoading || (sound && currentFilePath === filePath)) {
        console.log(`Audio already loading or loaded: ${filePath}`);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      setCurrentFilePath(filePath);
      
      console.log(`Loading audio: ${filePath}`);
      
      // Load actual audio files
      console.log(`Attempting to load audio from: ${filePath}`);
      
      // For local assets, we need to use require() instead of uri
      // Since we can't dynamically require, we'll create a mapping
      const audioAssets: { [key: string]: any } = {
        'assets/audio/onboarding/vi/step1.mp3': require('../assets/audio/onboarding/vi/step1.mp3'),
        'assets/audio/onboarding/vi/step2.mp3': require('../assets/audio/onboarding/vi/step2.mp3'),
        'assets/audio/onboarding/vi/step3.mp3': require('../assets/audio/onboarding/vi/step3.mp3'),
        'assets/audio/onboarding/vi/step4.mp3': require('../assets/audio/onboarding/vi/step4.mp3'),
        'assets/audio/onboarding/vi/step5.mp3': require('../assets/audio/onboarding/vi/step5.mp3'),
        'assets/audio/onboarding/vi/step6.mp3': require('../assets/audio/onboarding/vi/step6.mp3'),
        'assets/audio/onboarding/vi/step7.mp3': require('../assets/audio/onboarding/vi/step7.mp3'),
        'assets/audio/onboarding/vi/step8.mp3': require('../assets/audio/onboarding/vi/step8.mp3'),
        'assets/audio/onboarding/vi/success.mp3': require('../assets/audio/onboarding/vi/success.mp3'),
      };
      
      const audioSource = audioAssets[filePath];
      
      if (!audioSource) {
        throw new Error(`Audio file not found: ${filePath}`);
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
        { 
          shouldPlay: autoPlay,
          isLooping: loop,
          volume: volume,
        }
      );
      
      setSound(newSound);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setHasAudio(true);
          setIsPlaying(status.isPlaying);
        }
      });
      
      // Đảm bảo hasAudio được set sau khi sound được load
      if (autoPlay) {
        setIsPlaying(true);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audio');
      setHasAudio(false);
      console.error('Error loading audio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const play = async () => {
    try {
      if (sound && hasAudio) {
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        setError('No audio loaded or audio not ready');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play audio');
      console.error('Error playing audio:', err);
    }
  };

  const pause = async () => {
    try {
      if (sound && hasAudio) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        setError('No audio loaded or audio not ready');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to pause audio');
      console.error('Error pausing audio:', err);
    }
  };

  const stop = async () => {
    try {
      if (sound && hasAudio) {
        await sound.stopAsync();
        setIsPlaying(false);
      } else {
        // Không cần set error cho stop, chỉ cần set isPlaying = false
        setIsPlaying(false);
      }
    } catch (err) {
      // Không log error cho stop function vì có thể sound chưa load xong
      setIsPlaying(false);
      console.log('Stop called but sound not ready yet');
    }
  };

  const setVolume = async (newVolume: number) => {
    try {
      if (sound && hasAudio) {
        await sound.setVolumeAsync(newVolume);
      } else {
        setError('No audio loaded or audio not ready');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set volume');
      console.error('Error setting volume:', err);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  // Get audio file path based on current language
  const getAudioPath = (step: string) => {
    const language = i18n.language || 'vi';
    return `assets/audio/onboarding/${language}/${step}.mp3`;
  };

  return {
    sound,
    isPlaying,
    isLoading,
    error,
    hasAudio,
    loadAudio,
    play,
    pause,
    stop,
    setVolume,
    togglePlayPause,
    getAudioPath,
  };
};