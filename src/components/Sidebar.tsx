'use client';

import { FileSystemNode } from '@/types/filesystem';
import TreeNode from './TreeNode';

interface SidebarProps {
  tree: FileSystemNode;
  selectedFolderId: string;
  openFileId: string | null;
  onSelectFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
}

const Sidebar = ({
  tree,
  selectedFolderId,
  openFileId,
  onSelectFolder,
  onOpenFile,
}: SidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          File Explorer
        </h2>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <TreeNode
          node={tree}
          selectedFolderId={selectedFolderId}
          openFileId={openFileId}
          onSelectFolder={onSelectFolder}
          onOpenFile={onOpenFile}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
