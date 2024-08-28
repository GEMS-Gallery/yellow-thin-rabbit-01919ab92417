import React, { useEffect, useState } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, AppBar, Toolbar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Character = {
  name: string;
  description: string | null;
};

type Tip = {
  content: string;
  author: string | null;
};

type Macro = {
  name: string;
  content: string;
  description: string | null;
};

const App: React.FC = () => {
  const [generalInfo, setGeneralInfo] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [macros, setMacros] = useState<Macro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, charactersRes, tipsRes, macrosRes] = await Promise.all([
          backend.getGeneralInfo(),
          backend.getCharacters(),
          backend.getTips(),
          backend.getMacros()
        ]);

        setGeneralInfo(infoRes);
        setCharacters(charactersRes);
        setTips(tipsRes);
        setMacros(macrosRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">WoW Shaman Info</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Card style={{ marginBottom: '2rem' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>General Information</Typography>
            <Typography variant="body1">{generalInfo}</Typography>
          </CardContent>
        </Card>

        <Typography variant="h4" gutterBottom>Important Characters</Typography>
        <Grid container spacing={3}>
          {characters.map((character, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{character.name}</Typography>
                  <Typography variant="body2">{character.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>Tips and Tricks</Typography>
        {tips.map((tip, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Tip #{index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{tip.content}</Typography>
              {tip.author && <Typography variant="caption">Author: {tip.author}</Typography>}
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>Helpful Macros</Typography>
        {macros.map((macro, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{macro.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" style={{ marginBottom: '0.5rem' }}>{macro.description}</Typography>
              <Typography variant="body2" component="pre" style={{ backgroundColor: '#f0f0f0', padding: '0.5rem' }}>
                {macro.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </div>
  );
};

export default App;
