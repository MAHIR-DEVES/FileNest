'use client';

import { useState } from 'react';
import { FileSystemNode } from '@/types/filesystem';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
} from 'lucide-react';

interface TreeNodeProps {
  node: FileSystemNode;
  selectedFolderId: string;
  openFileId: string | null;
  onSelectFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
}

const TreeNode = ({
  node,
  selectedFolderId,
  openFileId,
  onSelectFolder,
  onOpenFile,
}: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSelected = node.id === selectedFolderId || node.id === openFileId;
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(prev => !prev);
      onSelectFolder(node.id);
    } else {
      onOpenFile(node.id);
    }
  };

  return (
    <div className="select-none">
      <div
        onClick={handleClick}
        className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-sm
          ${isSelected ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
      >
        {/* Expand/Collapse Arrow */}
        {node.type === 'folder' ? (
          <span className="w-4 h-4 flex items-center justify-center text-gray-400">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )
            ) : (
              <span className="w-4" />
            )}
          </span>
        ) : (
          <span className="w-4" />
        )}

        {/* Icon */}
        {node.type === 'folder' ? (
          isExpanded ? (
            <FolderOpen size={16} className="text-yellow-500" />
          ) : (
            <Folder size={16} className="text-yellow-500" />
          )
        ) : (
          <FileText size={16} className="text-blue-400" />
        )}

        {/* Name */}
        <span className="truncate">{node.name}</span>
      </div>

      {/* Children - Recursive */}
      {node.type === 'folder' && isExpanded && node.children && (
        <div className="ml-4 border-l border-gray-200">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              selectedFolderId={selectedFolderId}
              openFileId={openFileId}
              onSelectFolder={onSelectFolder}
              onOpenFile={onOpenFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
