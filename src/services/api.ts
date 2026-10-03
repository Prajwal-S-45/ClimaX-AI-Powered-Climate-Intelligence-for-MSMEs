import { mockMSMEProfile, mockClimateRisks, mockInterventions } from '../data/mockData';
import { MSMEProfile, ClimateRiskItem, Intervention } from '../types';

export const fetchMSMEProfile = async (): Promise<MSMEProfile> => {
  return Promise.resolve(mockMSMEProfile);
};

export const fetchClimateRisks = async (): Promise<ClimateRiskItem[]> => {
  return Promise.resolve(mockClimateRisks);
};

export const fetchInterventions = async (): Promise<Intervention[]> => {
  return Promise.resolve(mockInterventions);
};
