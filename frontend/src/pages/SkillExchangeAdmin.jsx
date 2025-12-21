import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Code, MusicNote, Brush, Language } from '@mui/icons-material';
import { skillApi } from '../api/skillApi';

const SkillExchangeAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');

  const categories = [
    { name: "Programming", icon: <Code />, color: "#1976d2" },
    { name: "Music", icon: <MusicNote />, color: "#d32f2f" },
    { name: "Design", icon: <Brush />, color: "#7b1fa2" },
    { name: "Languages", icon: <Language />, color: "#388e3c" }
  ];

  // Fetch all skills for admin
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillApi.getAllSkillsForAdmin();
      setSkills(response.skills || []);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle moderation actions
  const handleModeration = async (skillId, status) => {
    try {
      setLoading(true);
      await skillApi.moderateSkill(skillId, status);
      setSuccess(`Skill ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
      fetchSkills(); // Refresh the list
      setActionDialog(false);
      setSelectedSkill(null);
    } catch (err) {
      console.error('Error moderating skill:', err);
      setError(`Failed to ${status} skill`);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (skillId) => {
    try {
      setLoading(true);
      await skillApi.adminDeleteSkill(skillId);
      setSuccess('Skill deleted successfully!');
      fetchSkills(); // Refresh the list
      setActionDialog(false);
      setSelectedSkill(null);
    } catch (err) {
      console.error('Error deleting skill:', err);
      setError('Failed to delete skill');
    } finally {
      setLoading(false);
    }
  };

  // Open action dialog
  const openActionDialog = (skill, type) => {
    setSelectedSkill(skill);
    setActionType(type);
    setActionDialog(true);
  };

  // Confirm action
  const confirmAction = () => {
    if (!selectedSkill) return;
    
    if (actionType === 'approve') {
      handleModeration(selectedSkill._id, 'approved');
    } else if (actionType === 'reject') {
      handleModeration(selectedSkill._id, 'rejected');
    } else if (actionType === 'delete') {
      handleDelete(selectedSkill._id);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            🎯 Skill Exchange Admin
          </Typography>
          <Typography variant="h6">
            Moderate and manage the student skill marketplace
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

        {/* Categories */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Skill Categories
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: category.color, mb: 2 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Skills List */}
        <Typography variant="h5" gutterBottom>
          Skills ({skills.length})
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : skills.length === 0 ? (
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                No skills found. Students will appear here when they list their skills.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid item xs={12} key={skill._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        {skill.title}
                      </Typography>
                      <Chip 
                        label={skill.status} 
                        color={getStatusColor(skill.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      By: {skill.studentId?.name || 'Unknown Student'} ({skill.studentId?.rollNumber || 'N/A'})
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Category: {skill.category} | Experience: {skill.experience} | Price: ₹{skill.price}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {skill.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Session Duration: {skill.sessionDuration} minutes | Availability: {skill.availability}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      {skill.status === 'pending' && (
                        <>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="success"
                            onClick={() => openActionDialog(skill, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="error"
                            onClick={() => openActionDialog(skill, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        onClick={() => openActionDialog(skill, 'delete')}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog} onClose={() => setActionDialog(false)}>
        <DialogTitle>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {actionType} "{selectedSkill?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog(false)}>Cancel</Button>
          <Button 
            onClick={confirmAction} 
            variant="contained" 
            color={actionType === 'delete' ? 'error' : actionType === 'approve' ? 'success' : 'warning'}
            disabled={loading}
          >
            {loading ? 'Processing...' : actionType === 'approve' ? 'Approve' : actionType === 'reject' ? 'Reject' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillExchangeAdmin; 