
import React, { useState } from 'react'
import { Button, Checkbox, Container, Grid, Typography, Card, CardContent, List, ListItem, FormControlLabel } from '@mui/material'
import { foodList } from './datasets'

type card = {
  word: string,
  correct?: boolean,
}

const defaultCard: card = {
  word: '',
  correct: false,
}

const defaultCards: card[] = [defaultCard, defaultCard, defaultCard, defaultCard, defaultCard]

export const App = () => {

  const [cards, setCards] = useState<card[]>(defaultCards)

  const [rounds, setRounds] = useState<number>(0)
  const [usedCards, setUsedCards] = useState<string[]>([])
  const [correctCards, setCorrectCards] = useState<string[]>([])
  const [missedCards, setMissedCards] = useState<string[]>([])

  
  const onReset = () => {
    setCards(defaultCards)
    setRounds(0)
    setUsedCards([])
    setCorrectCards([])
    setMissedCards([])
  }

  const onStart = () => {
    setRounds(rounds + 1)

    // Shuffle words
    const shuffledWords = usedCards.length === 0
      ? foodList.sort(() => 0.5 - Math.random())
      : foodList.filter((word: string) => !usedCards.includes(word)).sort(() => 0.5 - Math.random())

    // Get 5 random cards
    let random5Cards = shuffledWords.slice(0, 5)

    setCards(random5Cards.map((word: string) => ({ word, correct: false } as card)))
  }

  const onReveal = () => {
    setUsedCards(usedCards.concat(cards.map(c => c.word)))
    setCorrectCards(correctCards.concat(cards.filter(c => c.correct).map(c => c.word)))
    setMissedCards(missedCards.concat(cards.filter(c => !c.correct).map(c => c.word)))
    onStart()
    setRounds(rounds + 1)
  }

  const onToggleCheckbox = (selectedWord: string) => {

    let updated = cards.map(card => card.word === selectedWord ? ({ ...card, correct: !card.correct } as card) : card)
    setCards(updated)
  }

  return (
    <Container>

      <Grid container spacing={3} sx={{ marginTop: 10 }}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h4">
            Priorities
          </Typography>
          <List dense>
            {rounds > 0 && cards.map(({ word, correct }, index) => (
              <ListItem>
                <FormControlLabel
                  label={`${index + 1}. ${word}`}
                  control={<Checkbox checked={correct} onClick={() => onToggleCheckbox(word)} />}
                />
              </ListItem>
            ))}
          </List>
          <Container sx={{ display: 'flex', gap: 5 }}>
            <Button variant="contained" onClick={onStart} disabled={rounds > 0}>
              Start
            </Button>
            <Button variant="contained" onClick={onReveal} disabled={rounds === 0}>
              Next Round
            </Button>
            <Button variant="contained" onClick={onReset} disabled={rounds === 0}>
              Reset
            </Button>
          </Container>
        </Grid>
        <Grid item sm={6} xs={12}>

          <Typography variant="h4">
            Game Details:
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 5 }}>
            Rounds: {rounds}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 5 }}>
            Correct Words: {correctCards.length}
          </Typography>
          <Typography>
            {correctCards.length > 0
              ? correctCards.map((word: string, index: number) => `${word}, `)
              : '-'}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 5 }}>
            Missed Words: {missedCards.length}
          </Typography>
          <Typography>
            {missedCards.length > 0
              ? missedCards.map((word: string, index: number) => {
                const useCommon = index + 1 !== missedCards.length - 1
                return `${word}${useCommon ? ', ': ''}`
              })
              : '-'}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 5 }}>
            Used Words: {usedCards.length}
          </Typography>
          {/* <Typography>
            {usedCards.length > 0
              ? usedCards.map((word: string, index: number) => {
                const useCommon = index + 1 !== usedCards.length - 1
                return `${word}${useCommon ? ', ': ''}`
              })
              : '-'}
          </Typography> */}

        </Grid>

        <Grid xs={12}>
          <Card sx={{ marginTop: 5 }}>
            <CardContent>
              <Typography variant="h4">
                How to Play
              </Typography>
              <Typography>
                <ul>
                  <li>Number of players: 2 or more</li>
                  <li>Click Start to start playing</li>
                  <li>Players take turns each round to organize 5 given words to their preferred order somewhere on paper or on their phone</li>
                  <li>Rest of players tries to guess the player's set order</li>
                  <li>Once decided, cross check with the player's written list and check the checkboxes for the words guessed correctly in the same order number then click next round</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sx={{ marginTop: 5 }}>
          <Typography>
            Made with ❤️ and ☕ ~ Kayee {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
