import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { AppContextType, Draft, EntryFormData, Activity } from '../types';
import { saveData, loadData, removeData, multiLoad } from '../utils/storage';

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
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const data = await multiLoad([
        'currentSessionFormData',
        'drafts',
        'reportsGenerated',
        'reportsShared',
        'lastPdfGenerated',
        'lastDraftModified',
        'lastFeedbackReceived',
        'recentActivities',
      ]);

      if (data.currentSessionFormData) setFormDataState(data.currentSessionFormData);
      if (data.drafts) setDrafts(data.drafts);
      if (data.reportsGenerated) setReportsGenerated(Number(data.reportsGenerated));
      if (data.reportsShared) setReportsShared(Number(data.reportsShared));
      if (data.lastPdfGenerated) setLastPdfGenerated(Number(data.lastPdfGenerated));
      if (data.lastDraftModified) setLastDraftModified(Number(data.lastDraftModified));
      if (data.lastFeedbackReceived) setLastFeedbackReceived(Number(data.lastFeedbackReceived));
      if (data.recentActivities) setRecentActivities(data.recentActivities);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const setFormData = useCallback(async (data: EntryFormData) => {
    setFormDataState(data);
    await saveData('currentSessionFormData', data);
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

    const now = Date.now();
    setLastDraftModified(now);

    await saveData('drafts', updatedDrafts);
    await saveData('lastDraftModified', now);

    addActivity({
      type: 'draft_saved',
      title: 'Draft Saved',
      description: 'Report draft saved successfully',
      icon: 'Edit',
      color: '#10b981'
    });

    return newDraft;
  }, [drafts]);

  const updateDraft = useCallback(async (id: string, draftData: Partial<Draft>) => {
    const updatedDrafts = drafts.map(draft =>
      draft.id === id
        ? { ...draft, ...draftData, updatedAt: new Date().toISOString() }
        : draft
    );
    setDrafts(updatedDrafts);

    const now = Date.now();
    setLastDraftModified(now);

    await saveData('drafts', updatedDrafts);
    await saveData('lastDraftModified', now);
  }, [drafts]);

  const deleteDraft = useCallback(async (id: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    setDrafts(updatedDrafts);

    await saveData('drafts', updatedDrafts);
  }, [drafts]);

  const clearSession = useCallback(async () => {
    setFormDataState(null);
    await removeData('currentSessionFormData');
  }, []);

  const incrementReportsGenerated = useCallback(async () => {
    const newCount = reportsGenerated + 1;
    setReportsGenerated(newCount);

    const now = Date.now();
    setLastPdfGenerated(now);

    await saveData('reportsGenerated', newCount);
    await saveData('lastPdfGenerated', now);
  }, [reportsGenerated]);

  const incrementReportsShared = useCallback(async () => {
    const newCount = reportsShared + 1;
    setReportsShared(newCount);

    const now = Date.now();
    setLastPdfGenerated(now);

    await saveData('reportsShared', newCount);
    await saveData('lastPdfGenerated', now);
  }, [reportsShared]);

  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };

    const updatedActivities = [newActivity, ...recentActivities].slice(0, 3);
    setRecentActivities(updatedActivities);

    saveData('recentActivities', updatedActivities).catch(error => {
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
