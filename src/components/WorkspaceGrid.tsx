import React from 'react';
import { Folder, MoreVertical } from 'lucide-react';
import type { Workspace } from '../types';

const workspaces: Workspace[] = [
  {
    id: '1',
    name: 'Personal',
    description: 'Personal tasks and notes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Work',
    description: 'Work-related projects and tasks',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function WorkspaceGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Folder className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{workspace.name}</h3>
                <p className="text-sm text-gray-500">{workspace.description}</p>
              </div>
            </div>
            <button className="rounded-md p-1 hover:bg-gray-50">
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded bg-gray-100"></div>
                <div className="h-2 w-1/2 rounded bg-gray-100"></div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <img
                  className="h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <span className="text-xs text-gray-500">
                Updated {new Date(workspace.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}