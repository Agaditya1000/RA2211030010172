import React from 'react';
import useSWR from 'swr';
import { api } from '../lib/api';
import { MessageSquare } from 'lucide-react';

export default function TrendingPosts() {
  const { data: users, error: usersError } = useSWR('users', api.getUsers);
  const { data: postsMap, error: postsError } = useSWR(
    users ? 'all-posts' : null,
    async () => {
      const allPosts = await Promise.all(
        users!.map(user => api.getUserPosts(user.id))
      );
      return allPosts.flat();
    }
  );

  if (usersError || postsError) return <div className="text-red-500">Failed to load posts</div>;
  if (!postsMap) return <div>Loading...</div>;

  const trendingPosts = [...postsMap]
    .sort((a, b) => b.commentCount - a.commentCount)
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Trending Posts</h1>
      <div className="space-y-4">
        {trendingPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={`https://images.unsplash.com/photo-1557853197-aefb550b6fdc?auto=format&fit=crop&w=800&h=400&q=80&sig=${post.id}`}
                alt={post.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/800/400?random=${post.id}`;
                }}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center text-gray-500">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>{post.commentCount} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}