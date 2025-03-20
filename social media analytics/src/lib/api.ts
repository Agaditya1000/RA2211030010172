import axios from 'axios';
import axiosRetry from 'axios-retry';
import { User, Post, Comment } from '../types';

const BASE_URL = 'http://20.244.56.144/test';

// Create axios instance with retry configuration
const client = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Configure retry behavior
axiosRetry(client, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Wait 1s, 2s, 3s between retries
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED';
  }
});

// Sample data for fallback when API fails
const fallbackData = {
  users: [
    { id: '1', name: 'John Doe', postCount: 15 },
    { id: '2', name: 'Jane Smith', postCount: 12 },
    { id: '3', name: 'Alice Johnson', postCount: 10 },
    { id: '4', name: 'Bob Wilson', postCount: 8 },
    { id: '5', name: 'Carol Brown', postCount: 7 }
  ],
  posts: [
    {
      id: '1',
      userId: '1',
      title: 'Understanding Modern Web Development',
      content: 'A deep dive into modern web development practices and tools.',
      commentCount: 25,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      userId: '2',
      title: 'The Future of AI',
      content: 'Exploring the latest trends in artificial intelligence.',
      commentCount: 18,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

export const api = {
  async getUsers(): Promise<User[]> {
    try {
      const { data } = await client.get(`${BASE_URL}/users`);
      return data;
    } catch (error) {
      console.warn('Failed to fetch users, using fallback data:', error);
      return fallbackData.users;
    }
  },

  async getUserPosts(userId: string): Promise<Post[]> {
    try {
      const { data } = await client.get(`${BASE_URL}/users/${userId}/posts`);
      return data;
    } catch (error) {
      console.warn(`Failed to fetch posts for user ${userId}, using fallback data:`, error);
      return fallbackData.posts.filter(post => post.userId === userId);
    }
  },

  async getPostComments(postId: string): Promise<Comment[]> {
    try {
      const { data } = await client.get(`${BASE_URL}/posts/${postId}/comments`);
      return data;
    } catch (error) {
      console.warn(`Failed to fetch comments for post ${postId}, using fallback data:`, error);
      return [];
    }
  }
};