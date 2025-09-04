import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MasterConfigState {
  model: 'GPT-4' | 'GPT-3';
  temperature: number;
  topP: number;
  topK: number;
  maxTokens: number;
  chunkSize: number;
  chunkOverlap: number;
  batchSize: number;
  enableOCR: boolean;
  enableSummarization: boolean;
  medicalTerms: boolean;
  complianceLevel: string;
  specialProcessing: boolean;
  financialTerms: boolean;
  riskAnalysis: boolean;
  regulatoryCompliance: boolean;
  technicalTerms: boolean;
  codeAnalysis: boolean;
  patentAnalysis: boolean;
}

const initialState: MasterConfigState = {
  model: 'GPT-4',
  temperature: 1,
  topP: 1,
  topK: 50,
  maxTokens: 100,
  chunkSize: 500,
  chunkOverlap: 50,
  batchSize: 10,
  enableOCR: true,
  enableSummarization: false,
  medicalTerms: true,
  complianceLevel: 'GDPR',
  specialProcessing: false,
  financialTerms: true,
  riskAnalysis: false,
  regulatoryCompliance: true,
  technicalTerms: false,
  codeAnalysis: true,
  patentAnalysis: false,
};

const masterConfigSlice = createSlice({
  name: 'masterConfig',
  initialState,
  reducers: {
    resetState: () => initialState,
    setModel: (state, action: PayloadAction<MasterConfigState['model']>) => {
      state.model = action.payload;
    },
    setTemperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
    setTopP: (state, action: PayloadAction<number>) => {
      state.topP = action.payload;
    },
    setTopK: (state, action: PayloadAction<number>) => {
      state.topK = action.payload;
    },
    setMaxTokens: (state, action: PayloadAction<number>) => {
      state.maxTokens = action.payload;
    },
    setChunkSize: (state, action: PayloadAction<number>) => {
      state.chunkSize = action.payload;
    },
    setChunkOverlap: (state, action: PayloadAction<number>) => {
      state.chunkOverlap = action.payload;
    },
    setBatchSize: (state, action: PayloadAction<number>) => {
      state.batchSize = action.payload;
    },
    setEnableOCR: (state, action: PayloadAction<boolean>) => {
      state.enableOCR = action.payload;
    },
    setEnableSummarization: (state, action: PayloadAction<boolean>) => {
      state.enableSummarization = action.payload;
    },
    setMedicalTerms: (state, action: PayloadAction<boolean>) => {
      state.medicalTerms = action.payload;
    },
    setComplianceLevel: (state, action: PayloadAction<MasterConfigState['complianceLevel']>) => {
      state.complianceLevel = action.payload;
    },
    setSpecialProcessing: (state, action: PayloadAction<boolean>) => {
      state.specialProcessing = action.payload;
    },
    setFinancialTerms: (state, action: PayloadAction<boolean>) => {
      state.financialTerms = action.payload;
    },
    setRiskAnalysis: (state, action: PayloadAction<boolean>) => {
      state.riskAnalysis = action.payload;
    },
    setRegulatoryCompliance: (state, action: PayloadAction<boolean>) => {
      state.regulatoryCompliance = action.payload;
    },
    setTechnicalTerms: (state, action: PayloadAction<boolean>) => {
      state.technicalTerms = action.payload;
    },
    setCodeAnalysis: (state, action: PayloadAction<boolean>) => {
      state.codeAnalysis = action.payload;
    },
    setPatentAnalysis: (state, action: PayloadAction<boolean>) => {
      state.patentAnalysis = action.payload;
    },
  },
});

export const {
  resetState,
  setModel,
  setTemperature,
  setTopP,
  setTopK,
  setMaxTokens,
  setChunkSize,
  setChunkOverlap,
  setBatchSize,
  setEnableOCR,
  setEnableSummarization,
  setMedicalTerms,
  setComplianceLevel,
  setSpecialProcessing,
  setFinancialTerms,
  setRiskAnalysis,
  setRegulatoryCompliance,
  setTechnicalTerms,
  setCodeAnalysis,
  setPatentAnalysis,
} = masterConfigSlice.actions;

export default masterConfigSlice.reducer;
