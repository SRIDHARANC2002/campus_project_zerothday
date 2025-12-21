import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00-09:30', '09:30-11:00', '11:00-12:30', '12:30-14:00', '14:00-15:30', '15:30-17:00'];

const defaultTimetable = Array(days.length).fill().map(() => Array(timeSlots.length).fill({ subject: '' }));

const getInitialData = () => {
  const saved = localStorage.getItem('studentTimetableV2');
  if (saved) return JSON.parse(saved);
  return { tasksByDate: {}, timetableByDate: {} };
};

const Timetable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskForm, setTaskForm] = useState({ name: '', duration: 1 });
  const [step, setStep] = useState('input');
  const [editCell, setEditCell] = useState(null); // { dayIndex, timeIndex }
  const [form, setForm] = useState({ subject: '' });
  const [data, setData] = useState(getInitialData());

  // Format date as yyyy-MM-dd for keying
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const tasks = data.tasksByDate[dateKey] || [];
  const timetable = data.timetableByDate[dateKey] || defaultTimetable;

  useEffect(() => {
    localStorage.setItem('studentTimetableV2', JSON.stringify(data));
  }, [data]);

  const handleEdit = (dayIndex, timeIndex) => {
    setEditCell({ dayIndex, timeIndex });
    setForm({ subject: timetable[dayIndex][timeIndex].subject });
  };

  const handleDelete = (dayIndex, timeIndex) => {
    const updated = timetable.map((row, d) =>
      row.map((cell, t) => (d === dayIndex && t === timeIndex ? { subject: '' } : cell))
    );
    setData(prev => ({
      ...prev,
      timetableByDate: { ...prev.timetableByDate, [dateKey]: updated }
    }));
  };

  const handleDialogClose = () => {
    setEditCell(null);
    setForm({ subject: '' });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = timetable.map((row, d) =>
      row.map((cell, t) => (d === editCell.dayIndex && t === editCell.timeIndex ? { subject: form.subject } : cell))
    );
    setData(prev => ({
      ...prev,
      timetableByDate: { ...prev.timetableByDate, [dateKey]: updated }
    }));
    handleDialogClose();
  };

  const handleTaskFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    if (!taskForm.name.trim() || !taskForm.duration) return;
    setData(prev => {
      const prevTasks = prev.tasksByDate[dateKey] || [];
      return {
        ...prev,
        tasksByDate: {
          ...prev.tasksByDate,
          [dateKey]: [...prevTasks, { name: taskForm.name.trim(), duration: Number(taskForm.duration) }]
        }
      };
    });
    setTaskForm({ name: '', duration: 1 });
  };

  const handleDeleteTask = (idx) => {
    setData(prev => {
      const prevTasks = prev.tasksByDate[dateKey] || [];
      return {
        ...prev,
        tasksByDate: {
          ...prev.tasksByDate,
          [dateKey]: prevTasks.filter((_, i) => i !== idx)
        }
      };
    });
  };

  const handleGenerateTimetable = () => {
    let flatSlots = [];
    for (let d = 0; d < days.length; d++) {
      for (let t = 0; t < timeSlots.length; t++) {
        flatSlots.push({ d, t });
      }
    }
    let slotIdx = 0;
    const newTable = Array(days.length).fill().map(() => Array(timeSlots.length).fill({ subject: '' }));
    for (const task of tasks) {
      for (let i = 0; i < task.duration && slotIdx < flatSlots.length; i++) {
        const { d, t } = flatSlots[slotIdx++];
        newTable[d][t] = { subject: task.name };
      }
    }
    setData(prev => ({
      ...prev,
      timetableByDate: { ...prev.timetableByDate, [dateKey]: newTable }
    }));
    setStep('timetable');
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0eafc 100%)', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Card sx={{ borderRadius: 5, boxShadow: 6, p: 4, background: 'rgba(255,255,255,0.98)' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1a237e', letterSpacing: 1, mb: 1 }}>
            Time Scheduler
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
            Select a date, assign tasks, and generate your timetable for that day
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start', mb: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar value={selectedDate} onChange={setSelectedDate} sx={{ maxWidth: 340, borderRadius: 3, boxShadow: 2, background: '#f8fafc' }} />
            </LocalizationProvider>
            <Box sx={{ flex: 1 }}>
              {step === 'input' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#3949ab' }}>Tasks for {dateKey}</Typography>
                  <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6} md={5}>
                      <TextField label="Task Name" name="name" value={taskForm.name} onChange={handleTaskFormChange} fullWidth />
                    </Grid>
                    <Grid item xs={8} sm={4} md={3}>
                      <TextField label="Duration (slots)" name="duration" type="number" value={taskForm.duration} onChange={handleTaskFormChange} fullWidth inputProps={{ min: 1, max: days.length * timeSlots.length }} />
                    </Grid>
                    <Grid item xs={4} sm={2} md={2}>
                      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ height: '100%', fontWeight: 600 }}>Add Task</Button>
                    </Grid>
                  </Grid>
                  <Box sx={{ mb: 2 }}>
                    {tasks.length > 0 && (
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Tasks to Schedule:</Typography>
                        <Grid container spacing={1}>
                          {tasks.map((task, idx) => (
                            <Grid item key={idx} xs={12} sm={6} md={4}>
                              <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 3, boxShadow: 2 }}>
                                <span><b>{task.name}</b> ({task.duration} slot{task.duration > 1 ? 's' : ''})</span>
                                <Button color="error" size="small" onClick={() => handleDeleteTask(idx)}>Delete</Button>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Box>
                  <Button variant="contained" color="success" onClick={handleGenerateTimetable} disabled={tasks.length === 0} sx={{ mt: 2, fontWeight: 700, fontSize: 18, px: 4 }}>
                    Generate Timetable
                  </Button>
                </>
              )}
              {step === 'timetable' && (
                <>
                  <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
                          <TableCell sx={{ fontWeight: 700, fontSize: 17, color: '#263238' }}>Time</TableCell>
                          {days.map((day, index) => (
                            <TableCell key={index} align="center" sx={{ fontWeight: 700, fontSize: 17, color: '#263238' }}>{day}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {timeSlots.map((time, rowIndex) => (
                          <TableRow key={rowIndex}>
                            <TableCell sx={{ fontWeight: 600, fontSize: 15, background: '#f0f4fa' }}>{time}</TableCell>
                            {days.map((_, dayIndex) => (
                              <TableCell key={dayIndex} align="center" sx={{ position: 'relative', minWidth: 180, background: '#f9fbfd', border: '1px solid #e3eaf2' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center', minHeight: 70, justifyContent: 'center' }}>
                                  <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600, fontSize: 15 }}>
                                    {timetable[dayIndex][rowIndex].subject || <span style={{ color: '#b0b0b0' }}>No Class</span>}
                                  </Typography>
                                  <Box sx={{ mt: 1 }}>
                                    <IconButton size="small" color="primary" onClick={() => handleEdit(dayIndex, rowIndex)} sx={{ mr: 1, background: '#e3eafc', '&:hover': { background: '#bbdefb' } }}>
                                      <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(dayIndex, rowIndex)} sx={{ background: '#ffebee', '&:hover': { background: '#ffcdd2' } }}>
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button variant="outlined" color="primary" onClick={() => setStep('input')} sx={{ mt: 2, fontWeight: 600 }}>
                    Back to Task Input
                  </Button>
                </>
              )}
              {/* Edit Dialog */}
              <Dialog open={!!editCell} onClose={handleDialogClose} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 700, color: '#1a237e', pb: 1 }}>Edit Schedule</DialogTitle>
                <DialogContent sx={{ minWidth: 350, background: '#f8fafc', borderRadius: 2 }}>
                  <TextField
                    margin="dense"
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleFormChange}
                    fullWidth
                    select
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="">No Class</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Lunch Break">Lunch Break</MenuItem>
                  </TextField>
                </DialogContent>
                <DialogActions sx={{ background: '#f8fafc', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                  <Button onClick={handleDialogClose} sx={{ fontWeight: 600 }}>Cancel</Button>
                  <Button onClick={handleSave} variant="contained" sx={{ fontWeight: 600, background: '#1976d2' }}>Save</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Timetable;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [taskForm, setTaskForm] = useState({ name: '', duration: 1 });
//   const [step, setStep] = useState('input');
//   const [editCell, setEditCell] = useState(null); // { dayIndex, timeIndex }
//   const [form, setForm] = useState({ subject: '' });
//   const [data, setData] = useState(getInitialData());

//   // Format date as yyyy-MM-dd for keying
//   const dateKey = format(selectedDate, 'yyyy-MM-dd');
//   const tasks = data.tasksByDate[dateKey] || [];
//   const timetable = data.timetableByDate[dateKey] || defaultTimetable;

//   useEffect(() => {
//     localStorage.setItem('studentTimetableV2', JSON.stringify(data));
//   }, [data]);

//   const handleEdit = (dayIndex, timeIndex) => {
//     setEditCell({ dayIndex, timeIndex });
//     setForm({ subject: timetable[dayIndex][timeIndex].subject });
//   };

//   const handleDelete = (dayIndex, timeIndex) => {
//     const updated = timetable.map((row, d) =>
//       row.map((cell, t) => (d === dayIndex && t === timeIndex ? { subject: '' } : cell))
//     );
//     setData(prev => ({
//       ...prev,
//       timetableByDate: { ...prev.timetableByDate, [dateKey]: updated }
//     }));
//   };

//   const handleDialogClose = () => {
//     setEditCell(null);
//     setForm({ subject: '' });
//   };

//   const handleFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     const updated = timetable.map((row, d) =>
//       row.map((cell, t) => (d === editCell.dayIndex && t === editCell.timeIndex ? { subject: form.subject } : cell))
//     );
//     setData(prev => ({
//       ...prev,
//       timetableByDate: { ...prev.timetableByDate, [dateKey]: updated }
//     }));
//     handleDialogClose();
//   };

//   const handleTaskFormChange = (e) => {
//     setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
//   };

//   const handleAddTask = () => {
//     if (!taskForm.name.trim() || !taskForm.duration) return;
//     setData(prev => {
//       const prevTasks = prev.tasksByDate[dateKey] || [];
//       return {
//         ...prev,
//         tasksByDate: {
//           ...prev.tasksByDate,
//           [dateKey]: [...prevTasks, { name: taskForm.name.trim(), duration: Number(taskForm.duration) }]
//         }
//       };
//     });
//     setTaskForm({ name: '', duration: 1 });
//   };

//   const handleDeleteTask = (idx) => {
//     setData(prev => {
//       const prevTasks = prev.tasksByDate[dateKey] || [];
//       return {
//         ...prev,
//         tasksByDate: {
//           ...prev.tasksByDate,
//           [dateKey]: prevTasks.filter((_, i) => i !== idx)
//         }
//       };
//     });
//   };

//   const handleGenerateTimetable = () => {
//     let flatSlots = [];
//     for (let d = 0; d < days.length; d++) {
//       for (let t = 0; t < timeSlots.length; t++) {
//         flatSlots.push({ d, t });
//       }
//     }
//     let slotIdx = 0;
//     const newTable = Array(days.length).fill().map(() => Array(timeSlots.length).fill({ subject: '' }));
//     for (const task of tasks) {
//       for (let i = 0; i < task.duration && slotIdx < flatSlots.length; i++) {
//         const { d, t } = flatSlots[slotIdx++];
//         newTable[d][t] = { subject: task.name };
//       }
//     }
//     setData(prev => ({
//       ...prev,
//       timetableByDate: { ...prev.timetableByDate, [dateKey]: newTable }
//     }));
//     setStep('timetable');
//   };

//   return (
//     <Box sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0eafc 100%)', minHeight: '100vh', py: 6 }}>
//       <Container maxWidth="lg">
//         <Card sx={{ borderRadius: 5, boxShadow: 6, p: 4, background: 'rgba(255,255,255,0.98)' }}>
//           <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1a237e', letterSpacing: 1, mb: 1 }}>
//             Time Scheduler
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
//             Select a date, assign tasks, and generate your timetable for that day
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start', mb: 4 }}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DateCalendar value={selectedDate} onChange={setSelectedDate} sx={{ maxWidth: 340, borderRadius: 3, boxShadow: 2, background: '#f8fafc' }} />
//             </LocalizationProvider>
//             <Box sx={{ flex: 1 }}>
//               {step === 'input' && (
//                 <>
//                   <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#3949ab' }}>Tasks for {dateKey}</Typography>
//                   <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
//                     <Grid item xs={12} sm={6} md={5}>
//                       <TextField label="Task Name" name="name" value={taskForm.name} onChange={handleTaskFormChange} fullWidth />
//                     </Grid>
//                     <Grid item xs={8} sm={4} md={3}>
//                       <TextField label="Duration (slots)" name="duration" type="number" value={taskForm.duration} onChange={handleTaskFormChange} fullWidth inputProps={{ min: 1, max: days.length * timeSlots.length }} />
//                     </Grid>
//                     <Grid item xs={4} sm={2} md={2}>
//                       <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ height: '100%', fontWeight: 600 }}>Add Task</Button>
//                     </Grid>
//                   </Grid>
//                   <Box sx={{ mb: 2 }}>
//                     {tasks.length > 0 && (
//                       <Box>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Tasks to Schedule:</Typography>
//                         <Grid container spacing={1}>
//                           {tasks.map((task, idx) => (
//                             <Grid item key={idx} xs={12} sm={6} md={4}>
//                               <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 3, boxShadow: 2 }}>
//                                 <span><b>{task.name}</b> ({task.duration} slot{task.duration > 1 ? 's' : ''})</span>
//                                 <Button color="error" size="small" onClick={() => handleDeleteTask(idx)}>Delete</Button>
//                               </Card>
//                             </Grid>
//                           ))}
//                         </Grid>
//                       </Box>
//                     )}
//                   </Box>
//                   <Button variant="contained" color="success" onClick={handleGenerateTimetable} disabled={tasks.length === 0} sx={{ mt: 2, fontWeight: 700, fontSize: 18, px: 4 }}>
//                     Generate Timetable
//                   </Button>
//                 </>
//               )}
//               {step === 'timetable' && (
//                 <>
//                   <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
//                     <Table>
//                       <TableHead>
//                         <TableRow sx={{ background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
//                           <TableCell sx={{ fontWeight: 700, fontSize: 17, color: '#263238' }}>Time</TableCell>
//                           {days.map((day, index) => (
//                             <TableCell key={index} align="center" sx={{ fontWeight: 700, fontSize: 17, color: '#263238' }}>{day}</TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {timeSlots.map((time, rowIndex) => (
//                           <TableRow key={rowIndex}>
//                             <TableCell sx={{ fontWeight: 600, fontSize: 15, background: '#f0f4fa' }}>{time}</TableCell>
//                             {days.map((_, dayIndex) => (
//                               <TableCell key={dayIndex} align="center" sx={{ position: 'relative', minWidth: 180, background: '#f9fbfd', border: '1px solid #e3eaf2' }}>
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center', minHeight: 70, justifyContent: 'center' }}>
//                                   <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600, fontSize: 15 }}>
//                                     {timetable[dayIndex][rowIndex].subject || <span style={{ color: '#b0b0b0' }}>No Class</span>}
//                                   </Typography>
//                                   <Box sx={{ mt: 1 }}>
//                                     <IconButton size="small" color="primary" onClick={() => handleEdit(dayIndex, rowIndex)} sx={{ mr: 1, background: '#e3eafc', '&:hover': { background: '#bbdefb' } }}>
//                                       <Edit fontSize="small" />
//                                     </IconButton>
//                                     <IconButton size="small" color="error" onClick={() => handleDelete(dayIndex, rowIndex)} sx={{ background: '#ffebee', '&:hover': { background: '#ffcdd2' } }}>
//                                       <Delete fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </Box>
//                               </TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <Button variant="outlined" color="primary" onClick={() => setStep('input')} sx={{ mt: 2, fontWeight: 600 }}>
//                     Back to Task Input
//                   </Button>
//                 </>
//               )}
//               {/* Edit Dialog */}
//               <Dialog open={!!editCell} onClose={handleDialogClose} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
//                 <DialogTitle sx={{ fontWeight: 700, color: '#1a237e', pb: 1 }}>Edit Schedule</DialogTitle>
//                 <DialogContent sx={{ minWidth: 350, background: '#f8fafc', borderRadius: 2 }}>
//                   <TextField
//                     margin="dense"
//                     label="Subject"
//                     name="subject"
//                     value={form.subject}
//                     onChange={handleFormChange}
//                     fullWidth
//                     select
//                     sx={{ mb: 2 }}
//                   >
//                     <MenuItem value="">No Class</MenuItem>
//                     <MenuItem value="Mathematics">Mathematics</MenuItem>
//                     <MenuItem value="Physics">Physics</MenuItem>
//                     <MenuItem value="Chemistry">Chemistry</MenuItem>
//                     <MenuItem value="Computer Science">Computer Science</MenuItem>
//                     <MenuItem value="Electronics">Electronics</MenuItem>
//                     <MenuItem value="Lunch Break">Lunch Break</MenuItem>
//                   </TextField>
//                 </DialogContent>
//                 <DialogActions sx={{ background: '#f8fafc', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
//                   <Button onClick={handleDialogClose} sx={{ fontWeight: 600 }}>Cancel</Button>
//                   <Button onClick={handleSave} variant="contained" sx={{ fontWeight: 600, background: '#1976d2' }}>Save</Button>
//                 </DialogActions>
//               </Dialog>
//             </Box>
//           </Box>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

//   const handleGenerateTimetable = () => {
//     // Simple greedy fill: assign tasks in order to slots
//     let flatSlots = [];
//     for (let d = 0; d < days.length; d++) {
//       for (let t = 0; t < timeSlots.length; t++) {
//         flatSlots.push({ d, t });
//       }
//     }
//     let slotIdx = 0;
//     const newTable = Array(days.length).fill().map(() => Array(timeSlots.length).fill({ subject: '' }));
//     for (const task of tasks) {
//       for (let i = 0; i < task.duration && slotIdx < flatSlots.length; i++) {
//         const { d, t } = flatSlots[slotIdx++];
//         newTable[d][t] = { subject: task.name };
//       }
//     }
//     setTimetable(newTable);
//     setStep('timetable');
//   };


//   return (
//     <Box sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0eafc 100%)', minHeight: '100vh', py: 6 }}>
//       <Container maxWidth="lg">
//         <Card sx={{ borderRadius: 5, boxShadow: 6, p: 4, background: 'rgba(255,255,255,0.98)' }}>
//           <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1a237e', letterSpacing: 1, mb: 1 }}>
//             Time Scheduler
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
//             Schedule your tasks and generate your weekly timetable
//           </Typography>
//           {step === 'input' && (
//             <Box>
//               <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#3949ab' }}>Add Tasks to Schedule</Typography>
//               <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
//                 <Grid item xs={12} sm={6} md={5}>
//                   <TextField label="Task Name" name="name" value={taskForm.name} onChange={handleTaskFormChange} fullWidth />
//                 </Grid>
//                 <Grid item xs={8} sm={4} md={3}>
//                   <TextField label="Duration (slots)" name="duration" type="number" value={taskForm.duration} onChange={handleTaskFormChange} fullWidth inputProps={{ min: 1, max: days.length * timeSlots.length }} />
//                 </Grid>
//                 <Grid item xs={4} sm={2} md={2}>
//                   <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ height: '100%', fontWeight: 600 }}>Add Task</Button>
//                 </Grid>
//               </Grid>
//               <Box sx={{ mb: 2 }}>
//                 {tasks.length > 0 && (
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Tasks to Schedule:</Typography>
//                     <Grid container spacing={1}>
//                       {tasks.map((task, idx) => (
//                         <Grid item key={idx} xs={12} sm={6} md={4}>
//                           <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 3, boxShadow: 2 }}>
//                             <span><b>{task.name}</b> ({task.duration} slot{task.duration > 1 ? 's' : ''})</span>
//                             <Button color="error" size="small" onClick={() => handleDeleteTask(idx)}>Delete</Button>
//                           </Card>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Box>
//                 )}
//               </Box>
//               <Button variant="contained" color="success" onClick={handleGenerateTimetable} disabled={tasks.length === 0} sx={{ mt: 2, fontWeight: 700, fontSize: 18, px: 4 }}>
//                 Generate Timetable
//               </Button>
//             </Box>
//           )}
//           {step === 'timetable' && (
//             <>
//               {/* Calendar View */}
//               <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DateCalendar readOnly disableHighlightToday sx={{ maxWidth: 340, borderRadius: 3, boxShadow: 2, background: '#f8fafc' }} />
//                 </LocalizationProvider>
//               </Box>
//               <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
//                       <TableCell sx={{ fontWeight: 700, fontSize: 17, color: '#263238' }}>Time</TableCell>
//                       {days.map((day, index) => (
//                         <TableCell key={index} align="center" sx={{ fontWeight: 700, fontSize: 17, color: '#263238' }}>{day}</TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {timeSlots.map((time, rowIndex) => (
//                       <TableRow key={rowIndex}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: 15, background: '#f0f4fa' }}>{time}</TableCell>
//                         {days.map((_, dayIndex) => (
//                           <TableCell key={dayIndex} align="center" sx={{ position: 'relative', minWidth: 180, background: '#f9fbfd', border: '1px solid #e3eaf2' }}>
//                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center', minHeight: 70, justifyContent: 'center' }}>
//                               <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600, fontSize: 15 }}>
//                                 {timetable[dayIndex][rowIndex].subject || <span style={{ color: '#b0b0b0' }}>No Class</span>}
//                               </Typography>
//                               <Box sx={{ mt: 1 }}>
//                                 <IconButton size="small" color="primary" onClick={() => handleEdit(dayIndex, rowIndex)} sx={{ mr: 1, background: '#e3eafc', '&:hover': { background: '#bbdefb' } }}>
//                                   <Edit fontSize="small" />
//                                 </IconButton>
//                                 <IconButton size="small" color="error" onClick={() => handleDelete(dayIndex, rowIndex)} sx={{ background: '#ffebee', '&:hover': { background: '#ffcdd2' } }}>
//                                   <Delete fontSize="small" />
//                                 </IconButton>
//                               </Box>
//                             </Box>
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <Button variant="outlined" color="primary" onClick={() => setStep('input')} sx={{ mt: 2, fontWeight: 600 }}>
//                 Back to Task Input
//               </Button>
//             </>
//           )}
//           {/* Edit Dialog */}
//           <Dialog open={!!editCell} onClose={handleDialogClose} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
//             <DialogTitle sx={{ fontWeight: 700, color: '#1a237e', pb: 1 }}>Edit Schedule</DialogTitle>
//             <DialogContent sx={{ minWidth: 350, background: '#f8fafc', borderRadius: 2 }}>
//               <TextField
//                 margin="dense"
//                 label="Subject"
//                 name="subject"
//                 value={form.subject}
//                 onChange={handleFormChange}
//                 fullWidth
//                 select
//                 sx={{ mb: 2 }}
//               >
//                 <MenuItem value="">No Class</MenuItem>
//                 <MenuItem value="Mathematics">Mathematics</MenuItem>
//                 <MenuItem value="Physics">Physics</MenuItem>
//                 <MenuItem value="Chemistry">Chemistry</MenuItem>
//                 <MenuItem value="Computer Science">Computer Science</MenuItem>
//                 <MenuItem value="Electronics">Electronics</MenuItem>
//                 <MenuItem value="Lunch Break">Lunch Break</MenuItem>
//               </TextField>
//             </DialogContent>
//             <DialogActions sx={{ background: '#f8fafc', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
//               <Button onClick={handleDialogClose} sx={{ fontWeight: 600 }}>Cancel</Button>
//               <Button onClick={handleSave} variant="contained" sx={{ fontWeight: 600, background: '#1976d2' }}>Save</Button>
//             </DialogActions>
//           </Dialog>
//         </Card>
//       </Container>
//     </Box>
//   );
// export default Timetable;
