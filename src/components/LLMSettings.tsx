import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Slider, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setModel, setTemperature, setTopP, setTopK, setMaxTokens } from "../redux/masterConfigSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ModelOptions } from "../constants";

const LLMSettings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { model, temperature, topP, topK, maxTokens } = useSelector(
        (state: RootState) => state.masterConfig
    );

    return (<>
        <Box p={4}>
            <Grid container spacing={4}>
                <Grid component={'div'} size={6}>
                    <Typography variant="h6" gutterBottom>
                        Model Parameters
                    </Typography>
                    <Typography variant="caption" color="text.scondary">
                        Configure LLM behavior and response characteristics
                    </Typography>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Model</InputLabel>
                        <Select
                            value={model}
                            label="Model"
                            onChange={(e) => dispatch(setModel(e.target.value))}
                            sx={{ mb: 2 }}
                        >
                            {ModelOptions.map((option) => (
                                <MenuItem value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                        <Typography>Temperature</Typography>
                        <Typography>{temperature.toFixed(1)}</Typography>
                    </Box>
                    <Slider
                        value={temperature}
                        min={0}
                        max={2}
                        step={0.1}
                        onChange={(_, value) => dispatch(setTemperature(value as number))}
                    />
                    <Typography variant="caption" color="text.secondary" mt={0} mb={2} display="block">
                        Controls randomness in responses
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                        <Typography>Top P</Typography>
                        <Typography>{topP.toFixed(1)}</Typography>
                    </Box>
                    <Slider
                        value={topP}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(_, value) => dispatch(setTopP(value as number))}
                    />
                    <Typography variant="caption" color="text.secondary" mt={0} mb={2} display="block">
                        Nucleus sampling parameter
                    </Typography>


                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                        <Typography>Top K</Typography>
                        <Typography>{topK}</Typography>
                    </Box>
                    <Slider
                        value={topK}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(_, value) => dispatch(setTopK(value as number))}
                    />
                    <Typography variant="caption" color="text.secondary" mt={0} display="block">
                        Limits token selection pool
                    </Typography>
                </Grid>

                <Grid component={'div'} size={6}>
                    <Typography variant="h6" gutterBottom>
                        Response Configuration
                    </Typography>
                    <Typography variant="caption" color="text.scondary" >
                        Configure LLM behavior and response characteristics
                    </Typography>

                    <TextField
                        fullWidth
                        label="Max Tokens"
                        type="number"
                        value={maxTokens}
                        onChange={(e) => dispatch(setMaxTokens(Number(e.target.value)))}
                        margin="normal"
                    />

                    <Box sx={{ border: '1px solid gray', borderRadius: 2, p: 2 }} mt={4}>
                        <Typography variant="subtitle1" gutterBottom>
                            Current Settings
                        </Typography>
                        <Grid sx={{ p: 2 }} container spacing={2}>
                            <Grid component={'div'} size={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Model:
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} variant="body2">
                                    {model}
                                </Typography>
                            </Grid>
                            <Grid component={'div'} size={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Temperature:
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} variant="body2">
                                    {temperature}
                                </Typography>
                            </Grid>
                            <Grid component={'div'} size={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Top P:
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} variant="body2">
                                    {topP.toFixed(1)}
                                </Typography>
                            </Grid>
                            <Grid component={'div'} size={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Top K:
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} variant="body2">
                                    {topK}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    </>)
}

export default LLMSettings;
