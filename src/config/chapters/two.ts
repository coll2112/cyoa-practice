import { Chapter, ChapterChoices } from '~/types/story'

export const ChapterTwoChoices: ChapterChoices = {
  startChapter: { event: 'startChapter' }
}

export const ChapterTwo: Chapter = {
  chapterIndex: 1,
  chapterName: 'This section is a work in progress',
  background: {
    image: 'https://media.tenor.com/EaJbvOuvPiYAAAAd/pixel-art-pixel.gif',
    styles: {
      backgroundPosition: 'center',
      opacity: '0.6'
    }
  },
  sections: {
    [ChapterTwoChoices.startChapter.event]: {
      text: 'Work in progress...'
    }
  }
}
