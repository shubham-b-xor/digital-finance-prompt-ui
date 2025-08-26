import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  enableLlambdaIndex: boolean;
  vectorTopK: number;
  baseIRI: string;
  ontologyIRI: string;
  useOntologyClustering: boolean;
  extractionTemperature: number;
  strictPrompt: boolean;
  evidencePrompt: boolean;
  enableCooccurrence: boolean;
  maxCooccurrence: number;
  chunkSize: number;
  relationWhitelistPolicy: string;
  aliasNormalization: boolean;
  skipEdgesWithoutEvidence: boolean;
  louvinResolution: number;
  randomState: number;
}

const initialState: SettingsState = {
  enableLlambdaIndex: false,
  vectorTopK: 4,
  baseIRI: '',
  ontologyIRI: '',
  useOntologyClustering: false,
  extractionTemperature: 0.5,
  strictPrompt: false,
  evidencePrompt: false,
  enableCooccurrence: false,
  maxCooccurrence: 3,
  chunkSize: 3000,
  relationWhitelistPolicy: 'On',
  aliasNormalization: false,
  skipEdgesWithoutEvidence: false,
  louvinResolution: 1,
  randomState: 42,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setEnableLlambdaIndex(state, action: PayloadAction<boolean>) {
      state.enableLlambdaIndex = action.payload;
    },
    setVectorTopK(state, action: PayloadAction<number>) {
      state.vectorTopK = action.payload;
    },
    setBaseIRI(state, action: PayloadAction<string>) {
      state.baseIRI = action.payload;
    },
    setOntologyIRI(state, action: PayloadAction<string>) {
      state.ontologyIRI = action.payload;
    },
    setUseOntologyClustering(state, action: PayloadAction<boolean>) {
      state.useOntologyClustering = action.payload;
    },
    setExtractionTemperature(state, action: PayloadAction<number>) {
      state.extractionTemperature = action.payload;
    },
    setStrictPrompt(state, action: PayloadAction<boolean>) {
      state.strictPrompt = action.payload;
    },
    setEvidencePrompt(state, action: PayloadAction<boolean>) {
      state.evidencePrompt = action.payload;
    },
    setEnableCooccurrence(state, action: PayloadAction<boolean>) {
      state.enableCooccurrence = action.payload;
    },
    setMaxCooccurrence(state, action: PayloadAction<number>) {
      state.maxCooccurrence = action.payload;
    },
    setChunkSize(state, action: PayloadAction<number>) {
      state.chunkSize = action.payload;
    },
    setRelationWhitelistPolicy(state, action: PayloadAction<string>) {
      state.relationWhitelistPolicy = action.payload;
    },
    setAliasNormalization(state, action: PayloadAction<boolean>) {
      state.aliasNormalization = action.payload;
    },
    setSkipEdgesWithoutEvidence(state, action: PayloadAction<boolean>) {
      state.skipEdgesWithoutEvidence = action.payload;
    },
    setLouvinResolution(state, action: PayloadAction<number>) {
      state.louvinResolution = action.payload;
    },
    setRandomState(state, action: PayloadAction<number>) {
      state.randomState = action.payload;
    },
  },
});

export const {
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
  setRandomState,
} = settingsSlice.actions;

export default settingsSlice.reducer;