'use client';

import { useFileSystem } from '@/hooks/useFileSystem';
import Sidebar from '@/components/Sidebar';
import MainPanel from '@/components/MainPanel';
import FileEditor from '@/components/FileEditor';
import { findNode } from '@/utils/fileSystem';

export default function Home() {
  const {
    tree,
    selectedFolderId,
    openFileId,
    setSelectedFolderId,
    setOpenFileId,
    createNode,
    renameNode,
    deleteNode,
    updateContent,
    getSelectedFolderContents,
  } = useFileSystem();

  const openFile = openFileId ? findNode(tree, openFileId) : null;
  const contents = getSelectedFolderContents();

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        tree={tree}
        selectedFolderId={selectedFolderId}
        openFileId={openFileId}
        onSelectFolder={setSelectedFolderId}
        onOpenFile={setOpenFileId}
      />

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb */}
        <div className="px-6 py-2 border-b border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            {openFile
              ? `Editing: ${openFile.name}`
              : `Folder: ${selectedFolderId}`}
          </p>
        </div>

        {/* File Editor or Main Panel */}
        {openFile ? (
          <FileEditor
            file={openFile}
            onSave={updateContent}
            onClose={() => setOpenFileId(null)}
          />
        ) : (
          <MainPanel
            contents={contents}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            onOpenFile={setOpenFileId}
            onCreateNode={createNode}
            onRenameNode={renameNode}
            onDeleteNode={deleteNode}
          />
        )}
      </main>
    </div>
  );
}
