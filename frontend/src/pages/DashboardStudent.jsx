import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import {
  Assignment,
  Event,
  Description,
  Person,
  Group,
  School,
  Code,
  Work,
  TrendingUp,
  CalendarToday,
  LocationOn,
  AttachMoney,
  Poll
} from '@mui/icons-material';

const DashboardStudent = () => {
  const [studentName, setStudentName] = useState('Student');
  const [announcements, setAnnouncements] = useState([]);
  const [curatedFeed, setCuratedFeed] = useState({
    hackathons: [],
    internships: [],
    techTrends: [],
    learningResources: [],
    careerTips: [],
    personalizedRecommendations: [],
    realTimeUpdates: [],
    industryInsights: [],
    campusNotifications: []
  });

  useEffect(() => {
    // Get student name from localStorage (or other auth context)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) setStudentName(user.name);

    // TODO: Fetch announcements from API
    setAnnouncements([
      {
        title: 'Academic Calendar Update',
        content: 'The academic calendar for the next semester has been updated with new dates and important deadlines.'
      },
      {
        title: 'New Library Hours',
        content: 'The library will have extended hours during exam week. Check the new schedule on the announcements page.'
      }
    ]);

    // Curated feed data
    setCuratedFeed({
      hackathons: [
        {
          id: 1,
          title: 'AI Innovation Hackathon',
          company: 'TechCorp',
          date: '2024-02-15',
          location: 'Virtual',
          prize: '$10,000',
          description: 'Build innovative AI solutions for real-world problems',
          tags: ['AI', 'Machine Learning', 'Python']
        },
        {
          id: 2,
          title: 'Web3 Development Challenge',
          company: 'Blockchain Inc',
          date: '2024-02-20',
          location: 'Hybrid',
          prize: '$5,000',
          description: 'Create decentralized applications using blockchain technology',
          tags: ['Blockchain', 'Web3', 'Solidity']
        },
        {
          id: 3,
          title: 'Sustainability Hackathon',
          company: 'GreenTech',
          date: '2024-02-25',
          location: 'On-site',
          prize: '$7,500',
          description: 'Develop solutions for environmental challenges',
          tags: ['Sustainability', 'IoT', 'Data Science']
        }
      ],
      internships: [
        {
          id: 1,
          title: 'Software Engineering Intern',
          company: 'Google',
          location: 'Mountain View, CA',
          duration: '3 months',
          stipend: '$8,000/month',
          description: 'Work on cutting-edge projects in a fast-paced environment',
          requirements: ['Python', 'JavaScript', 'React']
        },
        {
          id: 2,
          title: 'Data Science Intern',
          company: 'Microsoft',
          location: 'Seattle, WA',
          duration: '6 months',
          stipend: '$7,500/month',
          description: 'Analyze large datasets and build predictive models',
          requirements: ['Python', 'SQL', 'Machine Learning']
        },
        {
          id: 3,
          title: 'Frontend Developer Intern',
          company: 'Meta',
          location: 'Remote',
          duration: '4 months',
          stipend: '$6,500/month',
          description: 'Build user interfaces for web applications',
          requirements: ['React', 'TypeScript', 'CSS']
        }
      ],
      techTrends: [
        {
          id: 1,
          title: 'AI/ML Revolution',
          description: 'Artificial Intelligence and Machine Learning are transforming industries',
          impact: 'High',
          category: 'Emerging Tech'
        },
        {
          id: 2,
          title: 'Web3 & Blockchain',
          description: 'Decentralized applications and cryptocurrency gaining mainstream adoption',
          impact: 'Medium',
          category: 'Fintech'
        },
        {
          id: 3,
          title: 'Edge Computing',
          description: 'Processing data closer to the source for faster response times',
          impact: 'High',
          category: 'Infrastructure'
        },
        {
          id: 4,
          title: 'Quantum Computing',
          description: 'Next-generation computing with unprecedented processing power',
          impact: 'Medium',
          category: 'Advanced Tech'
        }
      ],
      learningResources: [
        {
          id: 1,
          title: 'Complete React Developer Course',
          platform: 'Udemy',
          duration: '40 hours',
          rating: '4.8/5',
          price: '$29.99',
          description: 'Master React with hooks, context, and modern patterns',
          category: 'Web Development'
        },
        {
          id: 2,
          title: 'Machine Learning Specialization',
          platform: 'Coursera',
          duration: '6 months',
          rating: '4.9/5',
          price: 'Free',
          description: 'Learn ML algorithms and practical applications',
          category: 'Data Science'
        },
        {
          id: 3,
          title: 'AWS Cloud Practitioner',
          platform: 'AWS',
          duration: '20 hours',
          rating: '4.7/5',
          price: '$100',
          description: 'Get certified in cloud computing fundamentals',
          category: 'Cloud Computing'
        }
      ],
      careerTips: [
        {
          id: 1,
          title: 'Build a Strong Portfolio',
          tip: 'Create projects that showcase your skills and solve real problems',
          category: 'Career Development',
          difficulty: 'Medium'
        },
        {
          id: 2,
          title: 'Network Effectively',
          tip: 'Attend tech meetups, join LinkedIn groups, and connect with professionals',
          category: 'Networking',
          difficulty: 'Easy'
        },
        {
          id: 3,
          title: 'Stay Updated with Tech',
          tip: 'Follow tech blogs, subscribe to newsletters, and join online communities',
          category: 'Learning',
          difficulty: 'Easy'
        },
        {
          id: 4,
          title: 'Practice Coding Daily',
          tip: 'Solve problems on LeetCode, HackerRank, or build side projects',
          category: 'Skill Development',
          difficulty: 'Hard'
        }
      ],
      personalizedRecommendations: [
        {
          id: 1,
          title: 'Based on your Python skills',
          recommendation: 'Try the Data Science track - you have strong fundamentals!',
          action: 'Explore Data Science courses',
          confidence: 'High'
        },
        {
          id: 2,
          title: 'Career path suggestion',
          recommendation: 'Consider Full-Stack Development - matches your interests',
          action: 'View Full-Stack opportunities',
          confidence: 'Medium'
        },
        {
          id: 3,
          title: 'Skill gap identified',
          recommendation: 'Learn Docker and Kubernetes for better job prospects',
          action: 'Start DevOps course',
          confidence: 'High'
        }
      ],
      realTimeUpdates: [
        {
          id: 1,
          title: 'New Campus Building Opening',
          content: 'The new student center is set to open next week. Stay tuned for more details.',
          date: '2024-02-10'
        },
        {
          id: 2,
          title: 'Tech Talk: AI in Healthcare',
          content: 'Join us for a free tech talk on AI applications in healthcare.',
          date: '2024-02-15'
        }
      ],
      industryInsights: [
        {
          id: 1,
          title: '2024 Tech Industry Trends',
          content: 'A comprehensive overview of the top trends shaping the tech landscape.',
          date: '2024-02-05'
        },
        {
          id: 2,
          title: 'Blockchain: The Future of Digital Identity',
          content: 'Exploring the potential of blockchain for secure digital identity.',
          date: '2024-02-10'
        }
      ],
      campusNotifications: [
        {
          id: 1,
          title: 'Library Closure for Maintenance',
          content: 'The library will be closed for maintenance on February 20th. All other facilities remain open.',
          date: '2024-02-18'
        },
        {
          id: 2,
          title: 'New Student Orientation Schedule',
          content: 'Check your email for the schedule of the new student orientation.',
          date: '2024-02-25'
        }
      ]
    });
  }, []);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 3 }}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Student Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome, {studentName}!
          </Typography>
        </Container>
      </Box>

      {/* Quick Actions */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Assignment sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Time Scheduler
                </Typography>
                <Typography color="text.secondary">
                  Manage your weekly class schedule
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component="a"
                  href="/timetable"
                  variant="contained"
                  color="primary"
                >
                  View Timetable
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Event sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <Typography color="text.secondary">
                  Check campus events and activities
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component="a"
                  href="/dashboard/student/profile"
                  variant="contained"
                  color="primary"
                >
                  View Upcoming Events
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Description sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Complaints
                </Typography>
                <Typography color="text.secondary">
                  Submit and track complaints
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component="a"
                  href="/complaints"
                  variant="contained"
                  color="primary"
                >
                  Submit Complaint
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <School sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Skill Exchange
                </Typography>
                <Typography color="text.secondary">
                  Learn from peers or share your expertise
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component="a"
                  href="/skill-exchange"
                  variant="contained"
                  color="primary"
                >
                  Browse Skills
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Poll sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Campus Polls
                </Typography>
                <Typography color="text.secondary">
                  Vote on important campus decisions
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component="a"
                  href="/polls"
                  variant="contained"
                  color="primary"
                >
                  View Polls
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Curated Feed */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          🚀 Curated Feed
        </Typography>

        <Grid container spacing={4}>
          {/* Hackathons */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Code sx={{ fontSize: 30, mr: 1, color: '#1976d2' }} />
                  <Typography variant="h6">
                    Latest Hackathons
                  </Typography>
                </Box>
                <List>
                  {curatedFeed.hackathons.map((hackathon, index) => (
                    <React.Fragment key={hackathon.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#1976d2' }}>
                            <Code />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {hackathon.title}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {hackathon.company}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" sx={{ mr: 2 }}>
                                  {hackathon.date}
                                </Typography>
                                <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" sx={{ mr: 2 }}>
                                  {hackathon.location}
                                </Typography>
                                <AttachMoney sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" color="success.main">
                                  {hackathon.prize}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {hackathon.description}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                {hackathon.tags.map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          }
                          primaryTypographyProps={{ component: 'div' }}
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
                      {index < curatedFeed.hackathons.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Internships */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Work sx={{ fontSize: 30, mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6">
                    Internship Opportunities
                  </Typography>
                </Box>
                <List>
                  {curatedFeed.internships.map((internship, index) => (
                    <React.Fragment key={internship.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#2e7d32' }}>
                            <Work />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {internship.title}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {internship.company}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" sx={{ mr: 2 }}>
                                  {internship.location}
                                </Typography>
                                <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" sx={{ mr: 2 }}>
                                  {internship.duration}
                                </Typography>
                                <AttachMoney sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" color="success.main">
                                  {internship.stipend}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {internship.description}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                {internship.requirements.map((req) => (
                                  <Chip
                                    key={req}
                                    label={req}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          }
                          primaryTypographyProps={{ component: 'div' }}
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
                      {index < curatedFeed.internships.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Tech Trends */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ fontSize: 30, mr: 1, color: '#ed6c02' }} />
                  <Typography variant="h6">
                    Emerging Tech Trends
                  </Typography>
                </Box>
                <List>
                  {curatedFeed.techTrends.map((trend, index) => (
                    <React.Fragment key={trend.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#ed6c02' }}>
                            <TrendingUp />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {trend.title}
                              </Typography>
                              <Chip
                                label={trend.impact}
                                color={getImpactColor(trend.impact)}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {trend.category}
                              </Typography>
                              <Typography variant="body2">
                                {trend.description}
                              </Typography>
                            </Box>
                          }
                          primaryTypographyProps={{ component: 'div' }}
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
                      {index < curatedFeed.techTrends.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Additional Learning & Career Sections */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Learning Resources */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <School sx={{ fontSize: 30, mr: 1, color: '#9c27b0' }} />
                  <Typography variant="h6">
                    Learning Resources
                  </Typography>
                </Box>
                <List>
                  {curatedFeed.learningResources.map((resource, index) => (
                    <React.Fragment key={resource.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#9c27b0' }}>
                            <School />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {resource.title}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {resource.platform} • {resource.duration}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant="caption" sx={{ mr: 2 }}>
                                  ⭐ {resource.rating}
                                </Typography>
                                <Typography variant="caption" color="success.main">
                                  {resource.price}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {resource.description}
                              </Typography>
                              <Chip
                                label={resource.category}
                                size="small"
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          }
                          primaryTypographyProps={{ component: 'div' }}
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
                      {index < curatedFeed.learningResources.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Career Tips */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ fontSize: 30, mr: 1, color: '#ff9800' }} />
                  <Typography variant="h6">
                    Career Tips
                  </Typography>
                </Box>
                <List>
                  {curatedFeed.careerTips.map((tip, index) => (
                    <React.Fragment key={tip.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#ff9800' }}>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {tip.title}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {tip.category}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {tip.tip}
                              </Typography>
                              <Chip
                                label={tip.difficulty}
                                size="small"
                                color={tip.difficulty === 'Easy' ? 'success' : tip.difficulty === 'Medium' ? 'warning' : 'error'}
                              />
                            </Box>
                          }
                          primaryTypographyProps={{ component: 'div' }}
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
                      {index < curatedFeed.careerTips.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardStudent;
