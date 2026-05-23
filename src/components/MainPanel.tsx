'use client';

import { useState } from 'react';
import { FileSystemNode } from '@/types/filesystem';
import { Folder, FileText, Plus, Pencil, Trash2, X, Check } from 'lucide-react';

interface MainPanelProps {
  contents: FileSystemNode[];
  selectedFolderId: string;
  onSelectFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onCreateNode: (
    parentId: string,
    type: 'folder' | 'file',
    name: string,
  ) => void;
  onRenameNode: (id: string, newName: string) => void;
  onDeleteNode: (id: string) => void;
}

const MainPanel = ({
  contents,
  selectedFolderId,
  onSelectFolder,
  onOpenFile,
  onCreateNode,
  onRenameNode,
  onDeleteNode,
}: MainPanelProps) => {
  const [creating, setCreating] = useState<'folder' | 'file' | null>(null);
  const [newName, setNewName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleCreate = () => {
    if (!newName.trim() || !creating) return;
    onCreateNode(selectedFolderId, creating, newName.trim());
    setCreating(null);
    setNewName('');
  };

  const handleRenameStart = (node: FileSystemNode) => {
    setRenamingId(node.id);
    setRenameValue(node.name);
  };

  const handleRenameSave = () => {
    if (!renameValue.trim() || !renamingId) return;
    onRenameNode(renamingId, renameValue.trim());
    setRenamingId(null);
    setRenameValue('');
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200">
        <button
          onClick={() => {
            setCreating('folder');
            setNewName('');
          }}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          <Plus size={14} /> New Folder
        </button>
        <button
          onClick={() => {
            setCreating('file');
            setNewName('');
          }}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          <Plus size={14} /> New File
        </button>
      </div>

      {/* Create Input */}
      {creating && (
        <div className="flex items-center gap-2 px-6 py-3 bg-blue-50 border-b border-blue-100">
          <span className="text-sm text-gray-600">
            {creating === 'folder' ? '📁' : '📄'} Name:
          </span>
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder={creating === 'folder' ? 'Folder name' : 'filename.txt'}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCreate}
            className="text-green-600 hover:text-green-700"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => setCreating(null)}
            className="text-red-500 hover:text-red-600"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Contents */}
      <div className="flex-1 p-6">
        {contents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Folder size={48} className="mb-2 opacity-30" />
            <p className="text-sm">This folder is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {contents.map(node => (
              <div
                key={node.id}
                className="group relative flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                onDoubleClick={() =>
                  node.type === 'folder'
                    ? onSelectFolder(node.id)
                    : onOpenFile(node.id)
                }
              >
                {/* Icon */}
                {node.type === 'folder' ? (
                  <Folder size={40} className="text-yellow-400 mb-1" />
                ) : (
                  <FileText size={40} className="text-blue-400 mb-1" />
                )}

                {/* Name or Rename Input */}
                {renamingId === node.id ? (
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleRenameSave()}
                      className="w-20 px-1 text-xs border border-blue-400 rounded outline-none"
                    />
                    <button
                      onClick={handleRenameSave}
                      className="text-green-600"
                    >
                      <Check size={12} />
                    </button>
                    <button
                      onClick={() => setRenamingId(null)}
                      className="text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-center text-gray-700 truncate w-full text-center">
                    {node.name}
                  </span>
                )}

                {/* Action Buttons */}
                <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleRenameStart(node);
                    }}
                    className="p-1 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50"
                    title="Rename"
                  >
                    <Pencil size={10} className="text-gray-500" />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteNode(node.id);
                    }}
                    className="p-1 bg-white border border-gray-200 rounded shadow-sm hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={10} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPanel;
