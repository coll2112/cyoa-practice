import clsx from 'clsx'
import { CSSProperties, FunctionComponent } from 'react'
import { useChapterProvider } from '~/contexts/chapter'
import useGameSave from '~/hooks/useGameSave'
import { Choice as IChoice } from '~/types/story'
import Choice from '~components/Choice'
import SectionText from '~components/SectionText'
import TopBar from '~components/TopBar'

import styles from './storyWizard.module.scss'

const StoryWizard: FunctionComponent = () => {
  const {
    chapter,
    sections,
    currentChoices,
    activeEvent,
    setActiveEvent,
    setStoryChapterIndex
  } = useChapterProvider()

  const { saveData, handleSaveGame, handleLoadGame } = useGameSave()

  const handleChoices = (choice: IChoice) => {
    const buttonClickSoundEffect = new Audio('sounds/button-click.mp3')
    buttonClickSoundEffect.volume = 0.3
    void buttonClickSoundEffect.play()

    if (choice.event === 'endChapter') {
      setStoryChapterIndex((state: number) => state + 1)
      setActiveEvent('startChapter')
    } else {
      setActiveEvent(choice.event)
    }
  }

  const backgroundStyles: CSSProperties = {
    backgroundImage: `url(${chapter?.background?.image})`,
    backgroundSize: 'cover',
    ...chapter?.background?.styles
  }

  if (!chapter || !sections) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      {/* <audio
        autoPlay
        controls
        loop
        id="audio-player"
        src="sounds/find-out.mp3"
      /> */}

      <div className={styles['viewport']}>
        <span className={styles['viewport-bgImage']} style={backgroundStyles} />
        <TopBar
          chapterHeading={chapter.name}
          hasActiveSave={saveData?.savedActiveEvent !== null}
          onLoadClick={handleLoadGame}
          onSaveClick={handleSaveGame}
        />
        <SectionText sectionText={sections?.[activeEvent]?.text} />
        <div
          className={clsx(
            styles['btn-container'],
            currentChoices && currentChoices.length <= 1
              ? styles['btn-container-single-choice']
              : styles['btn-container-multiple-choice']
          )}
        >
          {currentChoices?.map((choice) => (
            <Choice
              key={choice.event}
              choice={choice}
              onClick={() => handleChoices(choice)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoryWizard
