import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    Select,
    MenuItem} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setEnableLlambdaIndex,
    setVectorTopK,
    setBaseIRI,
    setOntologyIRI,
    setUseOntologyClustering,
    setExtractionTemperature,
    setStrictPrompt,
    setEvidencePrompt,
    setEnableCooccurrence,
    setMaxCooccurrence,
    setChunkSize,
    setRelationWhitelistPolicy,
    setAliasNormalization,
    setSkipEdgesWithoutEvidence,
    setLouvinResolution,
    setRandomState
} from '../redux/settingsSlice';
import SliderWithValue from '../components/SliderWithValue';


const Settings: React.FC = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);

    return (
        <Box sx={{ flexGrow: 1, padding: 2, alignItems: 'left', textAlign: 'left', width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Settings
            </Typography>
            <Grid container spacing={2}>
                <Grid component={'div'} size={4}>
                    <Typography variant="subtitle1">
                        Vector Search
                    </Typography>
                    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.enableLlambdaIndex}
                                    onChange={e => dispatch(setEnableLlambdaIndex(e.target.checked))}
                                />
                            }
                            label="Enable LlambdaIndex Vector Search"
                        />
                        <Typography gutterBottom>Vector top-k</Typography>
                        <SliderWithValue
                            value={settings.vectorTopK}
                            min={2}
                            max={16}
                            step={1}
                            onChange={v => dispatch(setVectorTopK(v))}
                        />
                    </Paper>
                    <Typography variant="subtitle1">
                        RDF/Ontology (optional)
                    </Typography>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <TextField
                            label="Base IRI (entities)"
                            value={settings.baseIRI}
                            onChange={e => dispatch(setBaseIRI(e.target.value))}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Ontology IRI"
                            value={settings.ontologyIRI}
                            onChange={e => dispatch(setOntologyIRI(e.target.value))}
                            fullWidth
                            margin="dense"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.useOntologyClustering}
                                    onChange={e => dispatch(setUseOntologyClustering(e.target.checked))}
                                />
                            }
                            label="Use ontology for clustering (relation-weighted)"
                        />
                    </Paper>

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Build Ontology (TTL)
                    </Button>
                    <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1, mb: 2 }}>
                        Export Graph as RDF (TTL + JSON-LD)
                    </Button>

                    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography>filename.ttl</Typography>
                            <Button variant="outlined" size="small">Download (12 KB)</Button>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography>filename.jsonld</Typography>
                            <Button variant="outlined" size="small">Download (8 KB)</Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid component={'div'} size={8}>
                    <Typography variant="subtitle1">
                        Graph Tuning Panel
                    </Typography>
                    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                        <Typography variant="subtitle1">
                            Extraction Temperature
                        </Typography>
                        <SliderWithValue
                            value={settings.extractionTemperature}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={v => dispatch(setExtractionTemperature(v))}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.strictPrompt}
                                    onChange={e => dispatch(setStrictPrompt(e.target.checked))}
                                />
                            }
                            label="Strict prompt (reject weak edges)"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.evidencePrompt}
                                    onChange={e => dispatch(setEvidencePrompt(e.target.checked))}
                                />
                            }
                            label="Require evidence on edges"
                        />
                    </Paper>
                    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.enableCooccurrence}
                                    onChange={e => dispatch(setEnableCooccurrence(e.target.checked))}
                                />
                            }
                            label="Enable fallback co-occurences"
                        />
                        <Typography gutterBottom>Max co-occurence pairs/sentence</Typography>
                        <SliderWithValue
                            value={settings.maxCooccurrence}
                            min={0}
                            max={10}
                            step={1}
                            onChange={v => dispatch(setMaxCooccurrence(v))}
                        />
                    </Paper>
                    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                        <Typography gutterBottom>Chunk size (chars)</Typography>
                        <SliderWithValue
                            value={settings.chunkSize}
                            min={2000}
                            max={5000}
                            step={100}
                            onChange={v => dispatch(setChunkSize(v))}
                        />
                    </Paper>
                    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                        <Typography gutterBottom>Relation whitelist policy</Typography>
                        <Select
                            value={settings.relationWhitelistPolicy}
                            onChange={e => dispatch(setRelationWhitelistPolicy(e.target.value))}
                            fullWidth
                        >
                            <MenuItem value="On">On</MenuItem>
                            <MenuItem value="Off">Off</MenuItem>
                        </Select>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.aliasNormalization}
                                    onChange={e => dispatch(setAliasNormalization(e.target.checked))}
                                />
                            }
                            label="Alias normalization"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.skipEdgesWithoutEvidence}
                                    onChange={e => dispatch(setSkipEdgesWithoutEvidence(e.target.checked))}
                                />
                            }
                            label="Skip edges without evidence"
                        />
                    </Paper>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Typography gutterBottom>Louvin resolution</Typography>
                        <SliderWithValue
                            value={settings.louvinResolution}
                            min={0.2}
                            max={2}
                            step={0.01}
                            onChange={v => dispatch(setLouvinResolution(v))}
                        />
                        <Typography gutterBottom>Random state</Typography>
                        <SliderWithValue
                            value={settings.randomState}
                            min={1}
                            max={999}
                            step={1}
                            onChange={v => dispatch(setRandomState(v))}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Settings;