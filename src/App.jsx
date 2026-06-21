import { useState, useRef } from 'react';
import { 
  Undo2, 
  Redo2, 
  Eye, 
  Download, 
  Upload, 
  Sparkles,
  FileCode2
} from 'lucide-react';
import './App.css';

// Utils & Helpers
import { generateEmailHTML } from './utils/emailGenerator';
import { PRESET_TEMPLATES } from './utils/presets';

// Subcomponents
import BlockPalette from './components/BlockPalette';
import Inspector from './components/Inspector';
import BlockWrapper from './components/BlockWrapper';
import DevicePreview from './components/DevicePreview';

// Helper block generator declared outside of the React Component to satisfy purity rules
const createNewBlock = (type) => {
  const id = `${type}-${Math.random().toString(36).substring(2, 9)}`;
  switch (type) {
    case 'heading':
      return {
        id,
        type,
        content: 'New Section Heading',
        style: {
          level: 2,
          fontSize: '22px',
          color: '#0f172a',
          textAlign: 'left',
          lineHeight: '1.3',
          paddingTop: '15px',
          paddingBottom: '10px'
        }
      };
    case 'paragraph':
      return {
        id,
        type,
        content: 'Double-click to edit text content directly on the canvas, or configure font style and alignment in the settings sidebar.',
        style: {
          fontSize: '15px',
          color: '#334155',
          textAlign: 'left',
          lineHeight: '1.6',
          paddingTop: '5px',
          paddingBottom: '10px'
        }
      };
    case 'button':
      return {
        id,
        type,
        content: 'Click Me',
        style: {
          url: 'https://example.com',
          backgroundColor: '#7c3aed',
          textColor: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '6px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          textAlign: 'center',
          paddingTopBlock: '15px',
          paddingBottomBlock: '15px'
        }
      };
    case 'link':
      return {
        id,
        type,
        content: 'Unsubscribe',
        style: {
          url: 'https://example.com/unsubscribe',
          textColor: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
          paddingTop: '5px',
          paddingBottom: '10px'
        }
      };
    case 'image':
      return {
        id,
        type,
        content: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=60',
        style: {
          alt: 'Image description',
          width: '550px',
          alignment: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
          linkUrl: ''
        }
      };
    case 'divider':
      return {
        id,
        type,
        content: '',
        style: {
          color: '#e2e8f0',
          borderStyle: 'solid',
          thickness: '1px',
          width: '100%',
          paddingTop: '15px',
          paddingBottom: '15px'
        }
      };
    case 'spacer':
      return {
        id,
        type,
        content: '',
        style: {
          height: '20px'
        }
      };
    case 'columns_2':
      return {
        id,
        type,
        content: '',
        style: {
          paddingTop: '15px',
          paddingBottom: '15px'
        },
        column1: [],
        column2: []
      };
    case 'card':
      return {
        id,
        type,
        title: '🔔 Notification Alert',
        content: 'Your scheduled newsletter draft is complete! Click the action button below to head to your dashboard and verify the settings.',
        style: {
          backgroundColor: '#f8fafc',
          titleColor: '#0f172a',
          textColor: '#475569',
          borderColor: '#e2e8f0',
          borderStyle: 'solid',
          borderThickness: '1px',
          leftBorderColor: '#7c3aed',
          leftBorderThickness: '4px',
          borderRadius: '8px',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          showButton: true,
          buttonText: 'Verify Draft',
          buttonUrl: 'https://example.com/drafts',
          buttonBg: '#7c3aed',
          buttonTextColor: '#ffffff',
          buttonBorderRadius: '6px'
        }
      };
    case 'table':
      return {
        id,
        type,
        headers: ['Item Name', 'Qty', 'Unit Price'],
        rows: [
          ['Premium Subscription', '1', '$29.00'],
          ['Priority Support Addon', '1', '$10.00']
        ],
        style: {
          headerBg: '#7c3aed',
          headerColor: '#ffffff',
          rowBgOdd: '#ffffff',
          rowBgEven: '#f8fafc',
          borderColor: '#e2e8f0',
          cellPadding: '10px',
          fontSize: '14px',
          textColor: '#334155'
        }
      };
    case 'social_bar':
      return {
        id,
        type,
        style: {
          align: 'center',
          iconSize: '24px',
          spacing: '16px',
          iconStyle: 'circle', // 'circle' | 'square' | 'plain'
          colorTheme: 'custom', // 'original' | 'dark' | 'light' | 'custom'
          customColor: '#7c3aed',
          paddingTop: '15px',
          paddingBottom: '15px'
        },
        platforms: [
          { name: 'facebook', url: 'https://facebook.com', enabled: true },
          { name: 'twitter', url: 'https://twitter.com', enabled: true },
          { name: 'instagram', url: 'https://instagram.com', enabled: true },
          { name: 'linkedin', url: 'https://linkedin.com', enabled: true }
        ]
      };
    case 'video_block':
      return {
        id,
        type,
        content: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
        style: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          playColor: '#ef4444',
          playStyle: 'circle', // 'circle' | 'triangle' | 'rectangular'
          width: '550px',
          alignment: 'center',
          paddingTop: '15px',
          paddingBottom: '15px'
        }
      };
    case 'sender_signature':
      return {
        id,
        type,
        name: 'Sarah Jenkins',
        title: 'Lead Product Designer',
        company: 'Email Studio',
        phone: '+1 (555) 019-2834',
        website: 'https://example.com',
        style: {
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          avatarSize: '60px',
          avatarRadius: '50%',
          textColor: '#334155',
          accentColor: '#7c3aed',
          fontSize: '14px',
          borderLeftThickness: '3px',
          borderLeftColor: '#7c3aed',
          paddingTop: '20px',
          paddingBottom: '20px'
        }
      };
    case 'nav_menu':
      return {
        id,
        type,
        style: {
          align: 'center',
          fontSize: '12px',
          textColor: '#94a3b8',
          dividerType: 'pipe', // 'pipe' | 'slash' | 'bullet' | 'space'
          itemSpacing: '12px',
          paddingTop: '15px',
          paddingBottom: '15px'
        },
        items: [
          { text: 'Unsubscribe', url: 'https://example.com/unsubscribe' },
          { text: 'Privacy Policy', url: 'https://example.com/privacy' },
          { text: 'Terms of Service', url: 'https://example.com/terms' },
          { text: 'Help Center', url: 'https://example.com/help' }
        ]
      };
    case 'raw_html':
      return {
        id,
        type,
        content: '<div style="padding: 20px; background-color: #f1f5f9; border-radius: 6px; text-align: center; border: 1px dashed #cbd5e1;">\n  <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #475569;">Custom HTML Element</p>\n</div>',
        style: {
          paddingTop: '15px',
          paddingBottom: '15px'
        }
      };
    default:
      return null;
  }
};

export default function App() {
  // Core state
  const [blocks, setBlocks] = useState(PRESET_TEMPLATES.welcome.blocks);
  const [globalSettings, setGlobalSettings] = useState(PRESET_TEMPLATES.welcome.globalSettings);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [activeTab, setActiveTab] = useState('global');
  const [neumorphicUI, setNeumorphicUI] = useState(false);
  
  // History state for undo/redo
  const [history, setHistory] = useState([
    { blocks: PRESET_TEMPLATES.welcome.blocks, globalSettings: PRESET_TEMPLATES.welcome.globalSettings }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Drag over states
  const [dragOverBlockId, setDragOverBlockId] = useState(null);
  const [dragOverPosition, setDragOverPosition] = useState(null); // 'top' | 'bottom'

  // Modals & UI toggles
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  // Helper to register new editor state in undo/redo history
  const pushHistory = (newBlocks, newGlobal) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    setHistory([...updatedHistory, { blocks: newBlocks, globalSettings: newGlobal }]);
    setHistoryIndex(updatedHistory.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setBlocks(prev.blocks);
      setGlobalSettings(prev.globalSettings);
      setHistoryIndex(historyIndex - 1);
      setSelectedBlockId(null);
      setActiveTab('global');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setBlocks(next.blocks);
      setGlobalSettings(next.globalSettings);
      setHistoryIndex(historyIndex + 1);
      setSelectedBlockId(null);
      setActiveTab('global');
    }
  };

  // Selection wraps tab updates
  const handleSelectBlock = (id) => {
    setSelectedBlockId(id);
    if (id) {
      setActiveTab('element');
    } else {
      setActiveTab('global');
    }
  };

  // Preset loader
  const handleLoadPreset = (key) => {
    const preset = PRESET_TEMPLATES[key];
    if (!preset) return;
    
    // Clear selection & reset state
    handleSelectBlock(null);
    setBlocks(preset.blocks);
    setGlobalSettings(preset.globalSettings);
    pushHistory(preset.blocks, preset.globalSettings);
  };

  // State-safe Recursive Block Modifiers
  const recursiveRemove = (list, targetId) => {
    let removed = null;
    const filtered = list.filter(item => {
      if (item.id === targetId) {
        removed = item;
        return false;
      }
      if (item.type === 'columns_2') {
        const [col1, r1] = recursiveRemove(item.column1 || [], targetId);
        const [col2, r2] = recursiveRemove(item.column2 || [], targetId);
        if (r1) { removed = r1; item.column1 = col1; }
        if (r2) { removed = r2; item.column2 = col2; }
      }
      return true;
    });
    return [filtered, removed];
  };

  const recursiveInsert = (list, blockToInsert, targetId, position) => {
    if (!targetId) {
      return [...list, blockToInsert];
    }
    const result = [];
    for (const item of list) {
      if (item.id === targetId) {
        if (position === 'top') {
          result.push(blockToInsert);
          result.push(item);
        } else {
          result.push(item);
          result.push(blockToInsert);
        }
      } else {
        if (item.type === 'columns_2') {
          const col1 = recursiveInsert(item.column1 || [], blockToInsert, targetId, position);
          const col2 = recursiveInsert(item.column2 || [], blockToInsert, targetId, position);
          result.push({
            ...item,
            column1: col1,
            column2: col2
          });
        } else {
          result.push(item);
        }
      }
    }
    return result;
  };

  const recursiveAppendToColumn = (list, parentId, columnKey, blockToAppend) => {
    return list.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          [columnKey]: [...(item[columnKey] || []), blockToAppend]
        };
      }
      if (item.type === 'columns_2') {
        return {
          ...item,
          column1: recursiveAppendToColumn(item.column1 || [], parentId, columnKey, blockToAppend),
          column2: recursiveAppendToColumn(item.column2 || [], parentId, columnKey, blockToAppend)
        };
      }
      return item;
    });
  };

  const recursiveFind = (list, targetId) => {
    for (const item of list) {
      if (item.id === targetId) return item;
      if (item.type === 'columns_2') {
        const f1 = recursiveFind(item.column1 || [], targetId);
        if (f1) return f1;
        const f2 = recursiveFind(item.column2 || [], targetId);
        if (f2) return f2;
      }
    }
    return null;
  };

  // Modify API
  const handleAddBlock = (type) => {
    const newBlock = createNewBlock(type);
    if (!newBlock) return;
    const nextBlocks = [...blocks, newBlock];
    setBlocks(nextBlocks);
    handleSelectBlock(newBlock.id);
    pushHistory(nextBlocks, globalSettings);
  };

  const handleUpdateBlock = (id, updatedFields) => {
    const recursiveUpdate = (list) => {
      return list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            style: updatedFields.style ? { ...item.style, ...updatedFields.style } : item.style
          };
        }
        if (item.type === 'columns_2') {
          return {
            ...item,
            column1: recursiveUpdate(item.column1 || []),
            column2: recursiveUpdate(item.column2 || [])
          };
        }
        return item;
      });
    };
    const nextBlocks = recursiveUpdate(blocks);
    setBlocks(nextBlocks);
    pushHistory(nextBlocks, globalSettings);
  };

  const handleDeleteBlock = (id) => {
    const [nextBlocks] = recursiveRemove(blocks, id);
    setBlocks(nextBlocks);
    handleSelectBlock(null);
    pushHistory(nextBlocks, globalSettings);
  };

  const handleDuplicateBlock = (id) => {
    const recursiveDuplicate = (list) => {
      const result = [];
      for (const item of list) {
        if (item.id === id) {
          const newId = `${item.type}-${Math.random().toString(36).substring(2, 9)}`;
          const copy = {
            ...item,
            id: newId,
            column1: item.column1 ? item.column1.map(c => ({...c, id: `${c.type}-${Math.random().toString(36).substring(2, 9)}`})) : undefined,
            column2: item.column2 ? item.column2.map(c => ({...c, id: `${c.type}-${Math.random().toString(36).substring(2, 9)}`})) : undefined,
            platforms: item.platforms ? item.platforms.map(p => ({...p})) : undefined,
            items: item.items ? item.items.map(it => ({...it})) : undefined,
          };
          result.push(item);
          result.push(copy);
        } else {
          if (item.type === 'columns_2') {
            result.push({
              ...item,
              column1: recursiveDuplicate(item.column1 || []),
              column2: recursiveDuplicate(item.column2 || [])
            });
          } else {
            result.push(item);
          }
        }
      }
      return result;
    };
    const nextBlocks = recursiveDuplicate(blocks);
    setBlocks(nextBlocks);
    pushHistory(nextBlocks, globalSettings);
  };

  const handleMoveBlock = (id, direction) => {
    const recursiveMove = (list) => {
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        const targetIdx = idx + direction;
        if (targetIdx >= 0 && targetIdx < list.length) {
          const result = [...list];
          const temp = result[idx];
          result[idx] = result[targetIdx];
          result[targetIdx] = temp;
          return [result, true];
        }
        return [list, false];
      }
      
      let moved = false;
      const result = list.map(item => {
        if (item.type === 'columns_2') {
          const [col1, m1] = recursiveMove(item.column1 || []);
          const [col2, m2] = recursiveMove(item.column2 || []);
          if (m1 || m2) moved = true;
          return {
            ...item,
            column1: col1,
            column2: col2
          };
        }
        return item;
      });
      return [result, moved];
    };
    
    const [nextBlocks] = recursiveMove(blocks);
    setBlocks(nextBlocks);
    pushHistory(nextBlocks, globalSettings);
  };

  const handleUpdateContent = (id, contentOrObj) => {
    if (contentOrObj && typeof contentOrObj === 'object') {
      handleUpdateBlock(id, contentOrObj);
    } else {
      handleUpdateBlock(id, { content: contentOrObj });
    }
  };

  // Global settings changes
  const handleUpdateGlobalSettings = (key, value) => {
    const nextGlobal = {
      ...globalSettings,
      [key]: value
    };
    setGlobalSettings(nextGlobal);
    pushHistory(blocks, nextGlobal);
  };

  // Drag reorder indicator tracking
  const handleDragOverBlock = (e, targetBlockId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const position = relativeY < rect.height / 2 ? 'top' : 'bottom';
    
    setDragOverBlockId(targetBlockId);
    setDragOverPosition(position);
  };

  const handleDragLeaveBlock = () => {
    setDragOverBlockId(null);
    setDragOverPosition(null);
  };

  const handleDropBlock = (e, targetParentId = null, targetColumnKey = null) => {
    e.preventDefault();
    e.stopPropagation();
    
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    let cleanedBlocks = blocks;
    let blockToPlace;

    if (data.startsWith('move:')) {
      const blockId = data.substring(5);
      const [f, rem] = recursiveRemove(blocks, blockId);
      cleanedBlocks = f;
      blockToPlace = rem;
    } else {
      blockToPlace = createNewBlock(data);
    }

    if (!blockToPlace) return;

    let finalBlocks;

    // Case 1: Drop over a specific block
    if (dragOverBlockId) {
      finalBlocks = recursiveInsert(cleanedBlocks, blockToPlace, dragOverBlockId, dragOverPosition);
    } 
    // Case 2: Drop on an empty column container
    else if (targetParentId && targetColumnKey) {
      finalBlocks = recursiveAppendToColumn(cleanedBlocks, targetParentId, targetColumnKey, blockToPlace);
    } 
    // Case 3: Drop at root canvas bottom
    else {
      finalBlocks = [...cleanedBlocks, blockToPlace];
    }

    setBlocks(finalBlocks);
    handleSelectBlock(blockToPlace.id);
    pushHistory(finalBlocks, globalSettings);
    
    // Reset drop tracking
    setDragOverBlockId(null);
    setDragOverPosition(null);
  };

  // Nested columns drop handler proxy
  const handleDropNested = (dragData, parentBlockId, columnKey) => {
    let cleanedBlocks = blocks;
    let blockToPlace;

    if (dragData.startsWith('move:')) {
      const blockId = dragData.substring(5);
      const [f, rem] = recursiveRemove(blocks, blockId);
      cleanedBlocks = f;
      blockToPlace = rem;
    } else {
      blockToPlace = createNewBlock(dragData);
    }

    if (!blockToPlace) return;

    const finalBlocks = recursiveAppendToColumn(cleanedBlocks, parentBlockId, columnKey, blockToPlace);
    setBlocks(finalBlocks);
    handleSelectBlock(blockToPlace.id);
    pushHistory(finalBlocks, globalSettings);
  };

  // Export/Import Files
  const handleExportHTML = () => {
    const html = generateEmailHTML(blocks, globalSettings);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const data = JSON.stringify({ blocks, globalSettings }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.blocks && data.globalSettings) {
          setBlocks(data.blocks);
          setGlobalSettings(data.globalSettings);
          handleSelectBlock(null);
          pushHistory(data.blocks, data.globalSettings);
        } else {
          alert('Incorrect JSON format: missing blocks or settings.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Find currently selected block object
  const selectedBlock = selectedBlockId ? recursiveFind(blocks, selectedBlockId) : null;

  return (
    <div className={`app-container ${neumorphicUI ? 'neumorphic-ui' : ''}`}>
      {/* Top Navigation Control Bar */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo-wrapper">
            <Sparkles size={18} />
          </div>
          <h1 className="brand-title">Email Studio</h1>
        </div>

        <div className="header-center">
          <button 
            className="header-btn" 
            onClick={handleUndo} 
            disabled={historyIndex === 0}
            title="Undo"
          >
            <Undo2 size={15} />
          </button>
          <button 
            className="header-btn" 
            onClick={handleRedo} 
            disabled={historyIndex === history.length - 1}
            title="Redo"
          >
            <Redo2 size={15} />
          </button>
        </div>

        <div className="header-actions">
          <button 
            className={`header-btn ${neumorphicUI ? 'active-theme' : ''}`} 
            onClick={() => setNeumorphicUI(!neumorphicUI)}
            title="Toggle Neumorphic Editor Theme"
          >
            <Sparkles size={14} /> {neumorphicUI ? 'Glass UI' : 'Soft UI'}
          </button>
          <button className="header-btn" onClick={triggerFileInput}>
            <Upload size={14} /> Import template
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".json"
            onChange={handleImportJSON}
          />
          <button className="header-btn" onClick={handleExportJSON}>
            Save schema
          </button>
          <button className="header-btn" onClick={() => setShowPreview(true)}>
            <Eye size={14} /> Preview
          </button>
          <button className="header-btn primary-btn" onClick={handleExportHTML}>
            <Download size={14} /> Export HTML
          </button>
        </div>
      </header>

      {/* Main Workspace split in Palette, Canvas, Settings */}
      <div className="workspace-container">
        {/* Left Elements Sidebar */}
        <aside className="sidebar-left">
          <BlockPalette 
            onLoadPreset={handleLoadPreset} 
            onAddBlock={handleAddBlock}
          />
        </aside>

        {/* Center Canvas Viewport */}
        <main 
          className="canvas-viewport"
          onClick={() => handleSelectBlock(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropBlock(e)}
        >
          <div 
            className="email-canvas-wrapper"
            style={{
              width: globalSettings.contentWidth,
              backgroundColor: globalSettings.canvasBg,
              fontFamily: globalSettings.defaultFont,
              color: globalSettings.defaultTextColor
            }}
          >
            {blocks.length > 0 ? (
              blocks.map((block) => (
                <div
                  key={block.id}
                  style={{ position: 'relative' }}
                  onDragOver={(e) => handleDragOverBlock(e, block.id)}
                  onDragLeave={handleDragLeaveBlock}
                  onDrop={(e) => handleDropBlock(e, block.id)}
                >
                  {/* Visual Drop Guideline */}
                  {dragOverBlockId === block.id && dragOverPosition === 'top' && (
                    <div className="drag-indicator-line position-top" />
                  )}

                  <BlockWrapper
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={handleSelectBlock}
                    onDelete={handleDeleteBlock}
                    onDuplicate={handleDuplicateBlock}
                    onMoveUp={(id) => handleMoveBlock(id, -1)}
                    onMoveDown={(id) => handleMoveBlock(id, 1)}
                    onUpdateContent={handleUpdateContent}
                    onDropNested={handleDropNested}
                    onSelectNested={handleSelectBlock}
                  />

                  {/* Visual Drop Guideline */}
                  {dragOverBlockId === block.id && dragOverPosition === 'bottom' && (
                    <div className="drag-indicator-line position-bottom" />
                  )}
                </div>
              ))
            ) : (
              <div className="empty-canvas-prompt">
                <FileCode2 size={40} />
                <span>Canvas is empty. Drag blocks here or select a template preset on the left.</span>
              </div>
            )}
          </div>
        </main>

        {/* Right Settings Sidebar */}
        <aside className="sidebar-right">
          <Inspector
            selectedBlock={selectedBlock}
            globalSettings={globalSettings}
            onUpdateBlock={handleUpdateBlock}
            onUpdateGlobalSettings={handleUpdateGlobalSettings}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>
      </div>

      {/* Real-time Iframe Device Preview Overlay */}
      {showPreview && (
        <DevicePreview
          htmlContent={generateEmailHTML(blocks, globalSettings)}
          onClose={() => setShowPreview(false)}
          onDownload={handleExportHTML}
        />
      )}
    </div>
  );
}
