import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  CircularProgress,
  LinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from '@mui/material';
import {

  HowToVote,




} from '@mui/icons-material';
import { pollApi } from '../api/pollApi';

const StudentPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch polls and categories
  const fetchPolls = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch polls
      let pollsResponse;
      try {
        pollsResponse = await pollApi.getActivePolls({ category: selectedCategory });
      } catch (err) {
        console.error('Error fetching polls list:', err);
        setError('Failed to load polls');
        setPolls([]);
        return;
      }

      // Normalize polls response: backend may return either an array or an object { polls: [...] }
      const pollsData = Array.isArray(pollsResponse)
        ? pollsResponse
        : (pollsResponse.polls || pollsResponse || []);

      // Fetch categories (optional)
      let categoriesData = [];
      try {
        const categoriesResponse = await pollApi.getCategories();
        categoriesData = categoriesResponse.categories || [];
      } catch (err) {
        // If categories endpoint is not available (404) or errors, continue without categories
        console.warn('Could not fetch poll categories, proceeding without them:', err.message || err);
      }

      setPolls(pollsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Unexpected error fetching polls:', err);
      setError('Failed to load polls');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  // Open vote dialog
  const openVoteDialog = async (poll) => {
    try {
      const pollDetails = await pollApi.getPollById(poll._id);
      setSelectedPoll(pollDetails.poll);
      setSelectedOptions([]);
      setVoteDialogOpen(true);
    } catch (err) {
      console.error('Error fetching poll details:', err);
      setError('Failed to load poll details');
    }
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex, optionText) => {
    if (selectedPoll.allowMultipleVotes) {
      // Multiple selection
      setSelectedOptions(prev => {
        const existing = prev.find(opt => opt.optionIndex === optionIndex);
        if (existing) {
          return prev.filter(opt => opt.optionIndex !== optionIndex);
        } else {
          return [...prev, { optionIndex, optionText }];
        }
      });
    } else {
      // Single selection
      setSelectedOptions([{ optionIndex, optionText }]);
    }
  };

  // Submit vote
  const handleVote = async () => {
    try {
      if (selectedOptions.length === 0) {
        setError('Please select at least one option');
        return;
      }

      await pollApi.voteOnPoll(selectedPoll._id, selectedOptions);
      setSuccess('Vote submitted successfully!');
      setVoteDialogOpen(false);
      fetchPolls(); // Refresh polls to get updated results
    } catch (err) {
      console.error('Error submitting vote:', err);
      setError(err.response?.data?.message || 'Failed to submit vote');
    }
  };



  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            📊 Campus Polls
          </Typography>
          <Typography variant="h6">
            Participate in interactive polls and see real-time results
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Filter by Category
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="All"
              onClick={() => setSelectedCategory('')}
              color={selectedCategory === '' ? 'primary' : 'default'}
              variant={selectedCategory === '' ? 'filled' : 'outlined'}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        {/* Polls List */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Active Polls ({polls.length})
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : polls.length === 0 ? (
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                No active polls found. Check back later for new polls!
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {polls.map((poll) => (
              <Grid xs={12} md={6} key={poll._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        {poll.title}
                      </Typography>
                      <Chip
                        label={poll.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body1" gutterBottom>
                      {poll.question}
                    </Typography>

                    {poll.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {poll.description}
                      </Typography>
                    )}

                    {/* Quick Results Preview */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Current Results:
                      </Typography>
                      {poll.options.slice(0, 3).map((option, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2">
                              {option.text}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              {option.votes} votes
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      ))}
                      {poll.options.length > 3 && (
                        <Typography variant="body2" color="text.secondary">
                          +{poll.options.length - 3} more options
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Total votes: {poll.totalVotes || 0}
                      </Typography>

                      <Button
                        variant="contained"
                        startIcon={<HowToVote />}
                        onClick={() => openVoteDialog(poll)}
                      >
                        Vote Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Vote Dialog */}
      <Dialog
        open={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">
            {selectedPoll?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedPoll?.question}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedPoll && (
            <Box>
              {selectedPoll.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedPoll.description}
                </Typography>
              )}

              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  Select your {selectedPoll.allowMultipleVotes ? 'options' : 'option'}:
                </FormLabel>

                {selectedPoll.allowMultipleVotes ? (
                  // Multiple selection
                  <Box>
                    {selectedPoll.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={selectedOptions.some(opt => opt.optionIndex === index)}
                            onChange={() => handleOptionSelect(index, option.text)}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography>{option.text}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.votes} votes
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', mb: 1 }}
                      />
                    ))}
                  </Box>
                ) : (
                  // Single selection
                  <RadioGroup>
                    {selectedPoll.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={
                          <Radio
                            checked={selectedOptions.some(opt => opt.optionIndex === index)}
                            onChange={() => handleOptionSelect(index, option.text)}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography>{option.text}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.votes} votes
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', mb: 1 }}
                      />
                    ))}
                  </RadioGroup>
                )}
              </FormControl>

              {selectedPoll.hasVoted && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  You have already voted on this poll.
                </Alert>
              )}

              {/* Current Results */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Current Results
                </Typography>
                {selectedPoll.options.map((option, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {option.text}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {option.percentage}% ({option.votes} votes)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={option.percentage}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVoteDialogOpen(false)}>
            Cancel
          </Button>
          {!selectedPoll?.hasVoted && (
            <Button
              variant="contained"
              onClick={handleVote}
              disabled={selectedOptions.length === 0}
            >
              Submit Vote
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentPolls; 