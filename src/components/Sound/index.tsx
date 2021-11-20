import React, { useRef, useState } from 'react'

import { SoundComponent, SoundButton } from './styles'

export interface ISound {
  name: string
  changeStateOfAudio: CallableFunction
  VolumeController: CallableFunction
}

export const Sound: React.FC<ISound> = ({
  name,
  changeStateOfAudio,
  VolumeController
}) => {
  const icons: { [index: string]: string } = {
    rain: 'icofont-rainy',
    storm: 'icofont-rainy-thunder',
    wind: 'icofont-wind',
    water: 'icofont-water-drop',
    'ocean-waves': 'icofont-wind-waves',
    'small-waves': 'icofont-wave',
    'forest-ambience': 'icofont-tree-alt',
    leafs: 'icofont-leaf',
    fire: 'icofont-fire-burn',
    night: 'icofont-night',
    coffee: 'icofont-coffee-mug',
    fan: 'icofont-headphone',
    train: 'icofont-train-line',
    'air-plane': 'icofont-airplane',
    underwater: 'icofont-swimmer'
  }

  const [state, setState] = useState(false)
  const audioRef = useRef<HTMLAudioElement>()

  return (
    <SoundComponent>
      <audio loop preload="true" ref={audioRef}>
        <source
          src={`${process.env.CDN_AUDIO_SERVER}/${name}.mp3`}
          type="audio/mp3"
        />
      </audio>

      <SoundButton
        id={`${name}-button`}
        className={state ? 'selected' : ''}
        onClick={() => {
          const audio = audioRef.current
          changeStateOfAudio(audio, state, setState)
        }}
      >
        <i className={`${icons[name]} icons`} />
      </SoundButton>

      <VolumeController
        audioObject={audioRef.current}
        id={`${name}-audio-controller`}
        state={state}
      />
    </SoundComponent>
  )
}
