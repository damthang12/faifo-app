# Onboarding Audio Files

This directory contains audio files for the onboarding process, organized by language.

## Directory Structure

```
onboarding/
├── vi/          # Vietnamese audio files
├── en/          # English audio files
├── ko/          # Korean audio files
└── README.md    # This file
```

## Required Audio Files

For each language directory, you need to provide the following audio files:

### Vietnamese (vi/)

- `step1.mp3` - Audio for step 1 (Welcome message)
- `step2.mp3` - Audio for step 2 (Introduction)
- `step3.mp3` - Audio for step 3 (Language selection)
- `step4.mp3` - Audio for step 4 (Preferences)
- `step5.mp3` - Audio for step 5 (Interests)
- `step6.mp3` - Audio for step 6 (Notifications)
- `step7.mp3` - Audio for step 7 (Permissions)
- `step8.mp3` - Audio for step 8 (Final step)
- `success.mp3` - Audio for success screen

### English (en/)

- Same file structure as Vietnamese

### Korean (ko/)

- Same file structure as Vietnamese

## Audio File Requirements

- Format: MP3
- Quality: 128kbps or higher
- Duration: Keep under 30 seconds per step for better UX
- Language: Native speaker recordings recommended
- Content: Should match the text content of each onboarding step

## Usage

The audio files are automatically loaded based on the user's selected language using the `useAudio` hook. The hook will:

1. Detect the current language setting
2. Load the appropriate audio file for the current step
3. Provide play/pause/stop controls
4. Handle audio state management

## Adding New Audio Files

1. Place the audio file in the appropriate language directory
2. Name it according to the step (e.g., `step1.mp3`)
3. Ensure the file is properly encoded as MP3
4. Test the audio playback in the app

## Notes

- Audio files are loaded on-demand to optimize app performance
- The app will gracefully handle missing audio files
- Users can control audio playback through the UI controls
- Audio automatically stops when navigating away from a step
