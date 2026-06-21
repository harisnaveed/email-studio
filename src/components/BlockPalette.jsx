import { 
  Heading1, 
  AlignLeft, 
  Square, 
  Link2, 
  Image as ImageIcon, 
  Minus, 
  MoveVertical, 
  Columns2,
  Mail,
  Newspaper,
  Plus,
  Layers,
  Table,
  Bell,
  Share2,
  Video,
  UserRound,
  Menu,
  Code2
} from 'lucide-react';

const ELEMENTS = [
  { type: 'heading', label: 'Heading', icon: Heading1, desc: 'Large title text' },
  { type: 'paragraph', label: 'Paragraph', icon: AlignLeft, desc: 'Body text block' },
  { type: 'button', label: 'Button', icon: Square, desc: 'Call to action button' },
  { type: 'link', label: 'Link', icon: Link2, desc: 'Hyperlink' },
  { type: 'image', label: 'Image', icon: ImageIcon, desc: 'Image block with link' },
  { type: 'divider', label: 'Divider', icon: Minus, desc: 'Horizontal separation line' },
  { type: 'spacer', label: 'Spacer', icon: MoveVertical, desc: 'Empty vertical space' },
  { type: 'columns_2', label: '2 Columns', icon: Columns2, desc: 'Side-by-side elements' },
  { type: 'card', label: 'Callout Card', icon: Bell, desc: 'Popup style notification alert' },
  { type: 'table', label: 'Table Grid', icon: Table, desc: 'Pricing comparison list' },
  { type: 'social_bar', label: 'Social Bar', icon: Share2, desc: 'Social profile links' },
  { type: 'video_block', label: 'Video link', icon: Video, desc: 'Simulated video block' },
  { type: 'sender_signature', label: 'Signature', icon: UserRound, desc: 'Sender signature sign-off' },
  { type: 'nav_menu', label: 'Footer Links', icon: Menu, desc: 'Footer navigation row (unsubscribe, privacy, etc.)' },
  { type: 'raw_html', label: 'Raw HTML', icon: Code2, desc: 'Insert custom HTML code' },
];

export default function BlockPalette({ onLoadPreset, onAddBlock }) {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="palette-container">
      <div className="palette-section">
        <h3 className="section-title">
          <Layers size={16} /> Elements
        </h3>
        <p className="section-subtitle">Drag into canvas or click to append</p>
        
        <div className="elements-grid">
          {ELEMENTS.map((el) => {
            const Icon = el.icon;
            return (
              <div
                key={el.type}
                className="element-card"
                draggable
                onDragStart={(e) => handleDragStart(e, el.type)}
                onClick={() => onAddBlock(el.type)}
              >
                <div className="element-icon-wrapper">
                  <Icon size={20} className="element-icon" />
                </div>
                <div className="element-info">
                  <span className="element-label">{el.label}</span>
                  <span className="element-desc">{el.desc}</span>
                </div>
                <button className="element-add-btn" title="Add to bottom">
                  <Plus size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="palette-section presets-section">
        <h3 className="section-title">
          <Mail size={16} /> Presets
        </h3>
        <p className="section-subtitle">Load a starting template</p>
        
        <div className="presets-list">
          <button 
            className="preset-btn" 
            onClick={() => onLoadPreset('welcome')}
          >
            <Mail size={18} className="preset-icon" />
            <div className="preset-info">
              <span className="preset-name">Welcome Email</span>
              <span className="preset-desc">Header, banner, paragraphs, and CTA</span>
            </div>
          </button>

          <button 
            className="preset-btn" 
            onClick={() => onLoadPreset('newsletter')}
          >
            <Newspaper size={18} className="preset-icon" />
            <div className="preset-info">
              <span className="preset-name">Monthly Newsletter</span>
              <span className="preset-desc">Masthead, lead article, 2-column details</span>
            </div>
          </button>

          <button 
            className="preset-btn empty-preset" 
            onClick={() => onLoadPreset('blank')}
          >
            <div className="preset-info">
              <span className="preset-name">Clear Canvas</span>
              <span className="preset-desc">Start completely fresh</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
