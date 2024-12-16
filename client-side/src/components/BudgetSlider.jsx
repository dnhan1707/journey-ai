import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
// import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#ea580c', // Customize the track color
        },
        thumb: {
          backgroundColor: '#c51162', // Customize the thumb color
          // '&:hover': {
          //   backgroundColor: '#c51162', // Color on hover
          // },
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
          opacity: 0.5,
          backgroundColor: '#bdbdbd', // Customize the rail color
        },
      },
    },
  },
});

const BudgetSlider = ({setBudget}) => {
  const [value, setValue] = useState(1); // Default to "Mid" (index 1)
  
  const budgetLabels = ['Cheap', 'Mid', 'High'];


  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedLabel = budgetLabels[newValue]
    setBudget(selectedLabel);
  };

  const marks = [
    { value: 0, label: 'Cheap' },
    { value: 1, label: 'Mid' },
    { value: 2, label: 'High' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: 300, margin: 'auto' }}>
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="budget-slider"
          step={1}
          marks={marks}
          min={0}
          max={2}
          // valueLabelDisplay="auto"
          // valueLabelFormat={(value) => marks.find(mark => mark.value === value)?.label}
        />
        {/* <Typography>Selected Budget: {marks.find(mark => mark.value === value)?.label}</Typography> */}
      </div>
    </ThemeProvider>
  );
};

export default BudgetSlider;
