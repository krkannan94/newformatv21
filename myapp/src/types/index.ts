export interface EntryFormData {
  account: string;
  site: string;
  pmTaskName: string;
  serviceProvider: string;
  dateOfMaintenance: string;
  serviceCompletedBy: string;
}

export interface ImageData {
  id: string;
  uri: string;
  text?: string;
  type: 'before' | 'after' | 'upload';
}

export interface Draft {
  id: string;
  formData: EntryFormData;
  beforeImages: ImageData[];
  afterImages: ImageData[];
  uploadImages: ImageData[];
  createdAt: string;
  updatedAt: string;
}

export interface AppContextType {
  formData: EntryFormData | null;
  setFormData: (data: EntryFormData) => void;
  drafts: Draft[];
  saveDraft: (draft: Omit<Draft, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Draft>;
  updateDraft: (id: string, draft: Partial<Draft>) => Promise<void>;
  deleteDraft: (id: string) => Promise<void>;
  clearSession: () => void;
  reportsGenerated: number;
  reportsShared: number;
  incrementReportsGenerated: () => Promise<void>;
  incrementReportsShared: () => Promise<void>;
  lastPdfGenerated: number | null;
  lastDraftModified: number | null;
  lastFeedbackReceived: number | null;
  recentActivities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

export interface Activity {
  id: string;
  type: 'report_generated' | 'draft_saved' | 'draft_updated' | 'feedback_sent';
  title: string;
  description: string;
  filename?: string;
  timestamp: number;
  icon: 'FileText' | 'Edit' | 'Mail' | 'Share2';
  color: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Entry: undefined;
  Dashboard: undefined;
  GenerateReport: { draftId?: string };
  SavedDrafts: undefined;
  Preview: undefined;
};
