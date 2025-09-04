import React from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMedicalTerms,
    setComplianceLevel,
    setSpecialProcessing,
    setFinancialTerms,
    setRiskAnalysis,
    setRegulatoryCompliance,
    setTechnicalTerms,
    setCodeAnalysis,
    setPatentAnalysis,
} from '../redux/masterConfigSlice';
import { RootState, AppDispatch } from '../redux/store';
import { ComplianceOptions } from '../constants';

const DomainSettings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        medicalTerms,
        complianceLevel,
        specialProcessing,
        financialTerms,
        riskAnalysis,
        regulatoryCompliance,
        technicalTerms,
        codeAnalysis,
        patentAnalysis,
    } = useSelector((state: RootState) => state.masterConfig);

    return (
        <Box p={4}>
            <Grid container spacing={4} alignItems="stretch" sx={{ height: '100%' }}>
                <Grid component={'div'} size={4} sx={{ display: 'flex' }}>
                    <Box
                        border="1px solid #0f162ecc"
                        borderRadius={2}
                        p={3}
                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <Typography variant="h6" color='success' gutterBottom>
                            Healthcare
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Medical and healthcare-specific processing
                        </Typography>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={medicalTerms}
                                        onChange={(e) => dispatch(setMedicalTerms(e.target.checked))}
                                    />
                                }
                                label="Medical Terms"
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControl fullWidth>
                                <InputLabel>Compliance Level</InputLabel>
                                <Select
                                    value={complianceLevel}
                                    label="Compliance Level"
                                    onChange={(e) =>
                                        dispatch(setComplianceLevel(e.target.value))
                                    }
                                >
                                    {ComplianceOptions.map((option) => (
                                        <MenuItem value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={specialProcessing}
                                        onChange={(e) => dispatch(setSpecialProcessing(e.target.checked))}
                                    />
                                }
                                label="Special Processing"
                            />
                        </Box>
                    </Box>
                </Grid>

                <Grid component={'div'} size={4} sx={{ display: 'flex' }}>
                    <Box
                        border="1px solid #0f162ecc"
                        borderRadius={2}
                        p={3}
                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <Typography variant="h6" color="warning" gutterBottom>
                            Finance
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Financial and regulatory processing
                        </Typography>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={financialTerms}
                                        onChange={(e) => dispatch(setFinancialTerms(e.target.checked))}
                                    />
                                }
                                label="Financial Terms"
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={riskAnalysis}
                                        onChange={(e) => dispatch(setRiskAnalysis(e.target.checked))}
                                    />
                                }
                                label="Risk Analysis"
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={regulatoryCompliance}
                                        onChange={(e) => dispatch(setRegulatoryCompliance(e.target.checked))}
                                    />
                                }
                                label="Regulatory Compliance"
                            />
                        </Box>
                    </Box>
                </Grid>

                <Grid component={'div'} size={4} sx={{ display: 'flex' }}>
                    <Box
                        border="1px solid #0f162ecc"
                        borderRadius={2}
                        p={3}
                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <Typography variant="h6" color="primary" gutterBottom>
                            Technology
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Technical and code analysis
                        </Typography>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={technicalTerms}
                                        onChange={(e) => dispatch(setTechnicalTerms(e.target.checked))}
                                    />
                                }
                                label="Technical Terms"
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={codeAnalysis}
                                        onChange={(e) => dispatch(setCodeAnalysis(e.target.checked))}
                                    />
                                }
                                label="Code Analysis"
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={patentAnalysis}
                                        onChange={(e) => dispatch(setPatentAnalysis(e.target.checked))}
                                    />
                                }
                                label="Patent Analysis"
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DomainSettings;
