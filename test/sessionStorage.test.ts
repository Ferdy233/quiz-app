// src/utils/sessionStorage.test.ts

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { sessionStorageAPI } from '../src/utils/sessionStorage';

describe('Session Storage API', () => {
  const topicKey = 'topic';
  const questionKey = 'question';
  const scoreKey = 'score';
  const gameEndedKey = 'gameEnded';
  const testTopic = 'science';
  const testQuestion = 1;
  const testScore = 10;
  const testGameEnded = true;

  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
  });

  afterEach(() => {
    // Clear sessionStorage after each test
    sessionStorage.clear();
  });

  it('should insert topic into sessionStorage', () => {
    sessionStorageAPI.setItem<string>(topicKey, testTopic);
    const storedValue = sessionStorageAPI.getItem<string>(topicKey); // Use the API method here
    expect(storedValue).toBeTruthy();
    expect(storedValue).toEqual(testTopic);
});
  it('should retrieve topic from sessionStorage', () => {
    sessionStorage.setItem(topicKey, JSON.stringify(testTopic));
    const retrievedValue = sessionStorageAPI.getItem<string>(topicKey);
    expect(retrievedValue).toEqual(testTopic);
  });

  it('should return null for non-existing topic key', () => {
    const retrievedValue = sessionStorageAPI.getItem<string>('nonExistingKey');
    expect(retrievedValue).toBeNull();
  });

  it('should update existing question in sessionStorage', () => {
    sessionStorageAPI.setItem<number>(questionKey, testQuestion);
    sessionStorageAPI.updateItem<number>(questionKey, 2);
    const updatedValue = sessionStorageAPI.getItem<number>(questionKey);
    expect(updatedValue).toEqual(2);
  });

  it('should not update non-existing question', () => {
    sessionStorageAPI.updateItem<number>(questionKey, 2);
    const retrievedValue = sessionStorageAPI.getItem<number>(questionKey);
    expect(retrievedValue).toBeNull();
  });

  it('should remove topic from sessionStorage', () => {
    sessionStorageAPI.setItem<string>(topicKey, testTopic);
    sessionStorageAPI.removeItem(topicKey);
    const retrievedValue = sessionStorageAPI.getItem<string>(topicKey);
    expect(retrievedValue).toBeNull();
  });

  it('should clear all data from sessionStorage', () => {
    sessionStorageAPI.setItem<string>(topicKey, testTopic);
    sessionStorageAPI.clear();
    const retrievedValue = sessionStorageAPI.getItem<string>(topicKey);
    expect(retrievedValue).toBeNull();
  });

  it('should insert and retrieve score from sessionStorage', () => {
    sessionStorageAPI.setItem<number>(scoreKey, testScore);
    const storedValue = sessionStorageAPI.getItem<number>(scoreKey);
    expect(storedValue).toEqual(testScore);
  });

  it('should insert and retrieve game ended status from sessionStorage', () => {
    sessionStorageAPI.setItem<boolean>(gameEndedKey, testGameEnded);
    const storedValue = sessionStorageAPI.getItem<boolean>(gameEndedKey);
    expect(storedValue).toEqual(testGameEnded);
  });
});