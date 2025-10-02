import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContextType, Draft, EntryFormData, Activity } from '../types';
import { format } from 'date-fns';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormDataState] = useState<EntryFormData | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [reportsGenerated, setReportsGenerated] = useState(0);
  const [reportsShared, setReportsShared] = useState(0);
  const [lastPdfGenerated, setLastPdfGenerated] = useState<number | null>(null);
  const [lastDraftModified, setLastDraftModified] = useState<number | null>(null);
  const [lastFeedbackReceived, setLastFeedbackReceived] = useState<number | null>(null);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        savedSession,
        savedDrafts,
        savedReportsGenerated,
        savedReportsShared,
        savedPdfTimestamp,
        savedDraftTimestamp,
        savedFeedbackTimestamp,
        savedActivities,
      ] = await Promise.all([
        AsyncStorage.getItem('currentSessionFormData'),
        AsyncStorage.getItem('drafts'),
        AsyncStorage.getItem('reportsGenerated'),
        AsyncStorage.getItem('reportsShared'),
        AsyncStorage.getItem('lastPdfGenerated'),
        AsyncStorage.getItem('lastDraftModified'),
        AsyncStorage.getItem('lastFeedbackReceived'),
        AsyncStorage.getItem('recentActivities'),
      ]);

      if (savedSession) setFormDataState(JSON.parse(savedSession));
      if (savedDrafts) setDrafts(JSON.parse(savedDrafts));
      if (savedReportsGenerated) setReportsGenerated(parseInt(savedReportsGenerated));
      if (savedReportsShared) setReportsShared(parseInt(savedReportsShared));
      if (savedPdfTimestamp) setLastPdfGenerated(parseInt(savedPdfTimestamp));
      if (savedDraftTimestamp) setLastDraftModified(parseInt(savedDraftTimestamp));
      if (savedFeedbackTimestamp) setLastFeedbackReceived(parseInt(savedFeedbackTimestamp));
      if (savedActivities) setRecentActivities(JSON.parse(savedActivities));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const setFormData = useCallback(async (data: EntryFormData) => {
    setFormDataState(data);
    try {
      await AsyncStorage.setItem('currentSessionFormData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  }, []);

  const saveDraft = useCallback(async (draftData: Omit<Draft, 'id' | 'createdAt' | 'updatedAt'>): Promise<Draft> => {
    const newDraft: Draft = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...draftData,
    };

    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);

    try {
      await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));

      const now = Date.now();
      setLastDraftModified(now);
      await AsyncStorage.setItem('lastDraftModified', now.toString());

      addActivity({
        type: 'draft_saved',
        title: 'Draft Saved',
        description: 'Report draft saved successfully',
        icon: 'Edit',
        color: '#10b981'
      });
    } catch (error) {
      console.error('Failed to save draft:', error);
    }

    return newDraft;
  }, [drafts]);

  const updateDraft = useCallback(async (id: string, draftData: Partial<Draft>) => {
    const updatedDrafts = drafts.map(draft =>
      draft.id === id
        ? { ...draft, ...draftData, updatedAt: new Date().toISOString() }
        : draft
    );
    setDrafts(updatedDrafts);

    try {
      await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));

      const now = Date.now();
      setLastDraftModified(now);
      await AsyncStorage.setItem('lastDraftModified', now.toString());
    } catch (error) {
      console.error('Failed to update draft:', error);
    }
  }, [drafts]);

  const deleteDraft = useCallback(async (id: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    setDrafts(updatedDrafts);

    try {
      await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    } catch (error) {
      console.error('Failed to delete draft:', error);
    }
  }, [drafts]);

  const clearSession = useCallback(async () => {
    setFormDataState(null);
    try {
      await AsyncStorage.removeItem('currentSessionFormData');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }, []);

  const incrementReportsGenerated = useCallback(async () => {
    const newCount = reportsGenerated + 1;
    setReportsGenerated(newCount);

    try {
      await AsyncStorage.setItem('reportsGenerated', newCount.toString());

      const now = Date.now();
      setLastPdfGenerated(now);
      await AsyncStorage.setItem('lastPdfGenerated', now.toString());
    } catch (error) {
      console.error('Failed to increment reports generated:', error);
    }
  }, [reportsGenerated]);

  const incrementReportsShared = useCallback(async () => {
    const newCount = reportsShared + 1;
    setReportsShared(newCount);

    try {
      await AsyncStorage.setItem('reportsShared', newCount.toString());

      const now = Date.now();
      setLastPdfGenerated(now);
      await AsyncStorage.setItem('lastPdfGenerated', now.toString());
    } catch (error) {
      console.error('Failed to increment reports shared:', error);
    }
  }, [reportsShared]);

  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };

    const updatedActivities = [newActivity, ...recentActivities].slice(0, 3);
    setRecentActivities(updatedActivities);

    AsyncStorage.setItem('recentActivities', JSON.stringify(updatedActivities)).catch(error => {
      console.error('Failed to save activities:', error);
    });
  }, [recentActivities]);

  const contextValue = useMemo(() => ({
    formData,
    setFormData,
    drafts,
    saveDraft,
    updateDraft,
    deleteDraft,
    clearSession,
    reportsGenerated,
    reportsShared,
    incrementReportsGenerated,
    incrementReportsShared,
    lastPdfGenerated,
    lastDraftModified,
    lastFeedbackReceived,
    recentActivities,
    addActivity,
  }), [
    formData,
    setFormData,
    drafts,
    saveDraft,
    updateDraft,
    deleteDraft,
    clearSession,
    reportsGenerated,
    reportsShared,
    incrementReportsGenerated,
    incrementReportsShared,
    lastPdfGenerated,
    lastDraftModified,
    lastFeedbackReceived,
    recentActivities,
    addActivity,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
