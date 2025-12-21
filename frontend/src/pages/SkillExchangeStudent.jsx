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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
  IconButton,

  Divider
} from '@mui/material';
import {
  Code,
  MusicNote,
  Brush,
  Language,
  SportsEsports,
  School,
  MoreHoriz,
  Add,
  Search,
  FilterList,
  Edit,
  Delete,

  Schedule,
  LocationOn,
  Person,
  AttachMoney
} from '@mui/icons-material';
import { skillApi } from '../api/skillApi';

const SkillExchangeStudent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Skill form state
  const [skillFormOpen, setSkillFormOpen] = useState(false);
  const [skillForm, setSkillForm] = useState({
    title: '',
    category: '',
    description: '',
    sessionDuration: 60,
    price: '',
    availability: '',
    experienceLevel: '',
    tags: '',
    contactInfo: {
      email: '',
      phone: ''
    }
  });



  const categories = [
    { name: "Programming", icon: <Code />, color: "#1976d2", examples: ["JavaScript", "Python", "React", "Node.js"] },
    { name: "Music", icon: <MusicNote />, color: "#d32f2f", examples: ["Guitar", "Piano", "Singing", "Music Theory"] },
    { name: "Design", icon: <Brush />, color: "#7b1fa2", examples: ["Photoshop", "Illustrator", "UI/UX", "Graphic Design"] },
    { name: "Languages", icon: <Language />, color: "#388e3c", examples: ["English", "Spanish", "French", "German"] },
    { name: "Sports", icon: <SportsEsports />, color: "#f57c00", examples: ["Football", "Basketball", "Tennis", "Swimming"] },
    { name: "Academic", icon: <School />, color: "#5d4037", examples: ["Mathematics", "Physics", "Chemistry", "Biology"] },
    { name: "Other", icon: <MoreHoriz />, color: "#616161", examples: ["Cooking", "Photography", "Writing", "Public Speaking"] }
  ];

  const experienceLevels = [
    { value: "Beginner", label: "Beginner (0-1 years)" },
    { value: "Intermediate", label: "Intermediate (1-3 years)" },
    { value: "Advanced", label: "Advanced (3-5 years)" },
    { value: "Expert", label: "Expert (5+ years)" }
  ];

  const availabilityOptions = [
    { value: "Weekdays", label: "Weekdays Only" },
    { value: "Weekends", label: "Weekends Only" },
    { value: "Both", label: "Weekdays & Weekends" },
    { value: "Flexible", label: "Flexible Schedule" }
  ];

  // Load skills on component mount
  useEffect(() => {
    loadSkills();
    loadMySkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const response = await skillApi.getAllSkills();
      setSkills(response.skills || []);
    } catch (err) {
      setError('Failed to load skills');
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMySkills = async () => {
    try {
      const response = await skillApi.getMySkills();
      setMySkills(response.skills || []);
    } catch (err) {
      console.error('Error loading my skills:', err);
    }
  };

  const handleSkillFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSkillForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSkillForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmitSkill = async () => {
    setLoading(true);
    setError('');

    try {
      const skillData = {
        ...skillForm,
        tags: skillForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await skillApi.createSkill(skillData);
      setSuccess('Skill created successfully! It will be reviewed by admin.');
      setSkillFormOpen(false);
      setSkillForm({
        title: '',
        category: '',
        description: '',
        sessionDuration: 60,
        price: '',
        availability: '',
        experienceLevel: '',
        tags: '',
        contactInfo: { email: '', phone: '' }
      });
      loadMySkills();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillApi.deleteSkill(skillId);
        setSuccess('Skill deleted successfully!');
        loadMySkills();
      } catch (err) {
        setError('Failed to delete skill');
      }
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || skill.category === categoryFilter;
    const matchesExperience = experienceFilter === 'all' || skill.experience === experienceFilter;
    return matchesSearch && matchesCategory && matchesExperience;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };



  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : '#616161';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                🎯 Skill Exchange
              </Typography>
              <Typography variant="h6">
                Learn from your peers or share your expertise
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<Add />}
              onClick={() => setSkillFormOpen(true)}
              sx={{ bgcolor: 'white', color: '#1976d2', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              List Your Skill
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Status Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Browse Skills" />
            <Tab label="My Skills" />
            <Tab label="Categories" />
          </Tabs>
        </Box>

        {/* Browse Skills Tab */}
        {activeTab === 0 && (
          <>
            {/* Search and Filter */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Search skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                    <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        label="Category"
                      >
                        <MenuItem value="all">All Categories</MenuItem>
                        {categories.map(category => (
                          <MenuItem key={category.name} value={category.name}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel>Experience</InputLabel>
                      <Select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        label="Experience"
                      >
                        <MenuItem value="all">All Levels</MenuItem>
                        {experienceLevels.map(level => (
                          <MenuItem key={level.value} value={level.value}>
                            {level.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<FilterList />}
                      onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('all');
                        setExperienceFilter('all');
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Skills List */}
            <Typography variant="h5" gutterBottom>
              Available Skills ({filteredSkills.length})
            </Typography>

            <Grid container spacing={3}>
              {filteredSkills.map((skill) => (
                <Grid item xs={12} md={12} key={skill._id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {skill.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            By: {skill.studentName || 'Anonymous'}
                          </Typography>
                        </Box>
                        <Chip
                          label={skill.category}
                          size="small"
                          sx={{ bgcolor: getCategoryColor(skill.category), color: 'white' }}
                        />
                      </Box>

                      <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                        {skill.description}
                      </Typography>

                      {skill.tags && skill.tags.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {skill.tags.map((tag, index) => (
                            <Chip key={index} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                      )}

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {skill.experience}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AttachMoney fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              ₹{skill.price}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Schedule fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {skill.sessionDuration} min
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {skill.availability}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => alert(`Booking session for ${skill.title}`)}
                      >
                        Book Session
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))} 
            </Grid>

            {filteredSkills.length === 0 && (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No skills found matching your criteria
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setSkillFormOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    Be the first to list a skill!
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* My Skills Tab */}
        {activeTab === 1 && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3, gap: 2 }}>
              <Typography variant="h5">
                My Skills ({mySkills.length})
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setSkillFormOpen(true)}
              >
                Add New Skill
              </Button>
            </Box>

            <Grid container spacing={3}>
              {mySkills.map((skill) => (
                <Grid item xs={12} md={12} key={skill._id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {skill.title}
                          </Typography>
                          <Chip
                            label={skill.status}
                            color={getStatusColor(skill.status)}
                            size="small"
                          />
                        </Box>
                        <Box>
                          <IconButton size="small" color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteSkill(skill._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>

                      <Typography variant="body2" paragraph>
                        {skill.description}
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Category: <strong>{skill.category}</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Price: <strong>₹{skill.price}</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Duration: <strong>{skill.sessionDuration} min</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Status: <strong>{skill.status}</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {mySkills.length === 0 && (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    You haven't listed any skills yet
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setSkillFormOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    List Your First Skill
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Categories Tab */}
        {activeTab === 2 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Browse by Category
            </Typography>
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid item xs={12} sm={12} md={12} key={category.name}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                    onClick={() => {
                      setCategoryFilter(category.name);
                      setActiveTab(0);
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Box sx={{ color: category.color, mb: 2 }}>
                        {category.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {category.examples.join(', ')}
                      </Typography>
                      <Chip
                        label={`${skills.filter(s => s.category === category.name).length} skills`}
                        size="small"
                        color="primary"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>

      {/* Skill Form Dialog */}
      <Dialog
        open={skillFormOpen}
        onClose={() => setSkillFormOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { p: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h4" component="div">
            List Your Skill
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your expertise with other students
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1, width: '100%' }}>
            {/* Skill Title */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Skill Title *</Typography>
              <TextField
                fullWidth
                value={skillForm.title}
                onChange={(e) => handleSkillFormChange('title', e.target.value)}
                placeholder="Enter skill title"
                required
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Category</Typography>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={skillForm.category}
                  onChange={(e) => handleSkillFormChange('category', e.target.value)}
                  inputProps={{ 'aria-label': 'Category' }}
                >
                  <MenuItem value="" disabled>Select Category</MenuItem>
                  {categories.map(c => (
                    <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Experience */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Experience</Typography>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={skillForm.experienceLevel}
                  onChange={(e) => handleSkillFormChange('experienceLevel', e.target.value)}
                  inputProps={{ 'aria-label': 'Experience' }}
                >
                  <MenuItem value="" disabled>Select Experience</MenuItem>
                  {experienceLevels.map(level => (
                    <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Description *</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={skillForm.description}
                onChange={(e) => handleSkillFormChange('description', e.target.value)}
                placeholder="Write a short description"
                required
              />
            </Grid>

            {/* Session Duration & Price side-by-side */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Session Duration (min)</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={skillForm.sessionDuration}
                    onChange={(e) => handleSkillFormChange('sessionDuration', parseInt(e.target.value || '0'))}
                    placeholder="60"
                    inputProps={{ min: 15, max: 480 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Price per Session (₹) *</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={skillForm.price}
                    onChange={(e) => handleSkillFormChange('price', parseInt(e.target.value || '0'))}
                    placeholder="Enter price"
                    inputProps={{ min: 0 }}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Availability & Tags side-by-side */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Availability</Typography>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={skillForm.availability}
                      onChange={(e) => handleSkillFormChange('availability', e.target.value)}
                      inputProps={{ 'aria-label': 'Availability' }}
                    >
                      <MenuItem value="" disabled>Select Availability</MenuItem>
                      {availabilityOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Tags (comma separated)</Typography>
                  <TextField
                    fullWidth
                    value={skillForm.tags}
                    onChange={(e) => handleSkillFormChange('tags', e.target.value)}
                    placeholder="flutter, ui, dart"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Contact Information (Optional)</Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Email</Typography>
              <TextField
                fullWidth
                type="email"
                value={skillForm.contactInfo.email}
                onChange={(e) => handleSkillFormChange('contactInfo.email', e.target.value)}
                placeholder="you@example.com"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Phone</Typography>
              <TextField
                fullWidth
                value={skillForm.contactInfo.phone}
                onChange={(e) => handleSkillFormChange('contactInfo.phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setSkillFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitSkill}
            disabled={loading || !skillForm.title || !skillForm.category || !skillForm.description}
          >
            {loading ? 'Creating...' : 'Create Skill'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillExchangeStudent; 