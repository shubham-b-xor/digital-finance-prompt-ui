import { Box, Button, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import LLMSettings from "../components/LLMSettings";
import FileProcessingSettings from "../components/FileProcessingSettings";
import DomainSettings from "../components/DomainSettings";
import { useDispatch } from "react-redux";
import { resetState } from "../redux/masterConfigSlice";


const MasterConfiguration: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    
  const handleReset = () => {
    dispatch(resetState());
  };

  const handleSave = () => {
    console.log('Configuration saved!');
  };


    return (<>
        <Box
      sx={{
        height: '100%',
        maxWidth: 1000,
        width: '100%',
        p: 0,
      }}
    >
      <Box
        sx={{
          display: 'block',
          maxWidth: 1000,
          width: '100%',
          p: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography color="textSecondary" variant="h4" gutterBottom>
            Master Configuration
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" onClick={handleReset}>
              Reset to default
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save configuration
            </Button>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography color="textSecondary" variant="caption" gutterBottom>
            Configure processing parameters and domain settings
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ width: '100%', maxWidth: 1000, mx: 'auto', borderRadius: 2 }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            sx={{ py: 0.2 }}
            icon={<MemoryRoundedIcon />}
            iconPosition="start"
            label="LLM Settings"
          />
          <Tab
            sx={{ py: 0.2 }}
            icon={<BoltRoundedIcon />}
            iconPosition="start"
            label="Processing"
          />
          <Tab
            sx={{ py: 0.2 }}
            icon={<StorageRoundedIcon />}
            iconPosition="start"
            label="Domain Config"
          />
        </Tabs>

        <Box sx={{ p: 0.2, backgroundColor: '#030711', boxShadow: 0 }}>
          {value === 0 && <LLMSettings />}
          {value === 1 && <FileProcessingSettings />}
          {value === 2 && <DomainSettings />}
        </Box>
      </Paper>
    </Box>
    </>);
}

export default MasterConfiguration;
