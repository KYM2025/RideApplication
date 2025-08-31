/**
 * Notes Service for analyzing special instructions
 */

import { ApiService, simulateDelay } from './apiService';
import { NotesAnalysis } from '../types/models';

// Keywords for different categories
const ACCESSIBILITY_KEYWORDS = [
  'wheelchair', 'accessible', 'disability', 'disabled', 'mobility', 
  'assistance', 'assist', 'help', 'cane', 'walker', 'aid'
];

const SPECIAL_NEEDS_KEYWORDS = [
  'car seat', 'carseat', 'baby', 'child', 'infant', 'pet', 'dog', 'cat', 
  'animal', 'luggage', 'baggage', 'suitcase', 'groceries', 'shopping'
];

const FLAG_KEYWORDS = [
  'urgent', 'emergency', 'medical', 'hospital', 'doctor', 'appointment', 
  'rush', 'hurry', 'quick', 'fast', 'asap', 'immediately'
];

export class NotesService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Analyze notes for special instructions
   * @param notes The user's notes/special instructions
   * @returns Promise with analysis results
   */
  async analyzeNotes(notes: string): Promise<NotesAnalysis> {
    try {
      await simulateDelay(700); // Simulate network delay
      
      // In a real app, this would use NLP or AI to analyze the notes
      // For mock purposes, we'll use simple keyword matching
      
      const notesLower = notes.toLowerCase();
      
      // Check for accessibility needs
      const hasAccessibilityNeeds = ACCESSIBILITY_KEYWORDS.some(keyword => 
        notesLower.includes(keyword)
      );
      
      // Identify special needs
      const specialNeeds = SPECIAL_NEEDS_KEYWORDS.filter(keyword => 
        notesLower.includes(keyword)
      );
      
      // Identify flags for dispatch
      const flags = FLAG_KEYWORDS.filter(keyword => 
        notesLower.includes(keyword)
      );
      
      const analysis: NotesAnalysis = {
        flags,
        accessibility: hasAccessibilityNeeds,
        specialNeeds
      };
      
      console.log('Notes analysis:', analysis);
      return analysis;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get suggestions for common notes
   * @returns Promise with array of suggestion strings
   */
  async getNoteSuggestions(): Promise<string[]> {
    try {
      await simulateDelay(300);
      
      // In a real app, this might be personalized based on user history
      // For mock purposes, we'll return a fixed set of suggestions
      const suggestions = [
        'I have luggage',
        'I need help with groceries',
        'I have a car seat',
        'I need wheelchair accessibility',
        'I have a pet with me',
        'Please call when you arrive'
      ];
      
      return suggestions;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Validate notes for inappropriate content
   * @param notes The user's notes/special instructions
   * @returns Promise with validation result
   */
  async validateNotes(notes: string): Promise<{ valid: boolean; reason?: string }> {
    try {
      await simulateDelay(400);
      
      // In a real app, this would check for inappropriate content
      // For mock purposes, we'll do a simple length check
      
      if (notes.length > 200) {
        return {
          valid: false,
          reason: 'Notes must be 200 characters or less'
        };
      }
      
      // Check for potentially inappropriate content (simplified)
      const inappropriateWords = ['inappropriate', 'offensive'];
      const hasInappropriateContent = inappropriateWords.some(word => 
        notes.toLowerCase().includes(word)
      );
      
      if (hasInappropriateContent) {
        return {
          valid: false,
          reason: 'Notes contain inappropriate content'
        };
      }
      
      return { valid: true };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Create a singleton instance
export const notesService = new NotesService();