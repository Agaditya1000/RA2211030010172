import React from 'react';
import useSWR from 'swr';
import { api } from '../lib/api';
import { User } from '../types';

export default function TopUsers() {
  const { data: users, error } = useSWR('users', api.getUsers);

  if (error) return <div className="text-red-500">Failed to load users</div>;
  if (!users) return <div>Loading...</div>;

  const topUsers = [...users]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Top Users</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topUsers.map((user, index) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-6">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=300&q=80&sig=${user.id}`}
                alt={user.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/400/300?random=${user.id}`;
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.postCount} posts</p>
              </div>
              <div className="text-2xl font-bold text-indigo-600">#{index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}