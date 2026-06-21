import { Sliders, Type, Layout } from 'lucide-react';

const FONTS = [
  { value: 'Arial, sans-serif', label: 'Arial (Sans-serif)' },
  { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, Times, serif', label: 'Georgia (Serif)' },
  { value: 'Times New Roman, Times, serif', label: 'Times New Roman' },
  { value: 'Courier New, Courier, monospace', label: 'Courier New' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
  { value: 'Verdana, Geneva, sans-serif', label: 'Verdana' }
];

export default function Inspector({ 
  selectedBlock, 
  globalSettings, 
  onUpdateBlock, 
  onUpdateGlobalSettings,
  activeTab,
  setActiveTab
}) {

  const handleStyleChange = (key, value) => {
    if (!selectedBlock) return;
    onUpdateBlock(selectedBlock.id, {
      style: {
        ...selectedBlock.style,
        [key]: value
      }
    });
  };

  const handleContentChange = (content) => {
    if (!selectedBlock) return;
    onUpdateBlock(selectedBlock.id, { content });
  };

  const renderCardInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Card Title</label>
        <input
          type="text"
          value={selectedBlock.title || ''}
          onChange={(e) => onUpdateBlock(selectedBlock.id, { title: e.target.value })}
          placeholder="Notification alert"
        />

        <label>Title Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.titleColor || '#000000'}
            onChange={(e) => handleStyleChange('titleColor', e.target.value)}
          />
          <input
            type="text"
            value={style.titleColor || ''}
            onChange={(e) => handleStyleChange('titleColor', e.target.value)}
          />
        </div>

        <label>Card Content</label>
        <textarea
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Enter body text..."
          rows={4}
        />

        <label>Content Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.textColor || '#333333'}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
          <input
            type="text"
            value={style.textColor || ''}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
        </div>

        <label>Card Background</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
          <input
            type="text"
            value={style.backgroundColor || ''}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
        </div>

        <div className="dual-inputs">
          <div>
            <label>Border style</label>
            <select
              value={style.borderStyle || 'solid'}
              onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="none">None</option>
            </select>
          </div>
          <div>
            <label>Border color</label>
            <input
              type="color"
              value={style.borderColor || '#e2e8f0'}
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            />
          </div>
        </div>

        <div className="dual-inputs">
          <div>
            <label>Border width</label>
            <input
              type="number"
              value={parseInt(style.borderThickness) || 1}
              onChange={(e) => handleStyleChange('borderThickness', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Corner radius</label>
            <input
              type="number"
              value={parseInt(style.borderRadius) || 8}
              onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
            />
          </div>
        </div>

        <div className="accent-bar-settings" style={{ borderTop: '1px solid var(--border-color)', marginTop: '15px', paddingTop: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>LEFT ACCENT BAR</span>
          <div className="dual-inputs" style={{ marginTop: '8px' }}>
            <div>
              <label>Thickness</label>
              <input
                type="number"
                value={parseInt(style.leftBorderThickness) || 0}
                onChange={(e) => handleStyleChange('leftBorderThickness', `${e.target.value}px`)}
                placeholder="e.g. 4"
              />
            </div>
            <div>
              <label>Color</label>
              <input
                type="color"
                value={style.leftBorderColor || '#7c3aed'}
                onChange={(e) => handleStyleChange('leftBorderColor', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="integrated-btn-settings" style={{ borderTop: '1px solid var(--border-color)', marginTop: '15px', paddingTop: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none', cursor: 'pointer', margin: 0 }}>
            <input
              type="checkbox"
              checked={!!style.showButton}
              onChange={(e) => handleStyleChange('showButton', e.target.checked)}
              style={{ width: 'auto', margin: 0 }}
            />
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>INTEGRATED CALL-TO-ACTION</span>
          </label>
          
          {style.showButton && (
            <div style={{ marginTop: '10px' }}>
              <label>Button Text</label>
              <input
                type="text"
                value={style.buttonText || ''}
                onChange={(e) => handleStyleChange('buttonText', e.target.value)}
                placeholder="Verify Draft"
              />

              <label>Button Link URL</label>
              <input
                type="text"
                value={style.buttonUrl || ''}
                onChange={(e) => handleStyleChange('buttonUrl', e.target.value)}
                placeholder="https://example.com/action"
              />

              <div className="dual-inputs">
                <div>
                  <label>BG Color</label>
                  <input
                    type="color"
                    value={style.buttonBg || '#7c3aed'}
                    onChange={(e) => handleStyleChange('buttonBg', e.target.value)}
                  />
                </div>
                <div>
                  <label>Text Color</label>
                  <input
                    type="color"
                    value={style.buttonTextColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('buttonTextColor', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="dual-inputs" style={{ marginTop: '15px' }}>
          <div>
            <label>Padding V</label>
            <input
              type="number"
              value={parseInt(style.paddingTop) || 16}
              onChange={(e) => {
                handleStyleChange('paddingTop', `${e.target.value}px`);
                handleStyleChange('paddingBottom', `${e.target.value}px`);
              }}
            />
          </div>
          <div>
            <label>Padding H</label>
            <input
              type="number"
              value={parseInt(style.paddingLeft) || 20}
              onChange={(e) => {
                handleStyleChange('paddingLeft', `${e.target.value}px`);
                handleStyleChange('paddingRight', `${e.target.value}px`);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderTableInspector = () => {
    const style = selectedBlock.style || {};
    const headers = selectedBlock.headers || [];
    const rows = selectedBlock.rows || [];

    const handleAddRow = () => {
      const colCount = headers.length || 1;
      const newRow = Array(colCount).fill('Cell Content');
      onUpdateBlock(selectedBlock.id, {
        rows: [...rows, newRow]
      });
    };

    const handleRemoveLastRow = () => {
      if (rows.length <= 1) return;
      onUpdateBlock(selectedBlock.id, {
        rows: rows.slice(0, -1)
      });
    };

    const handleAddColumn = () => {
      const nextColIdx = headers.length + 1;
      const newHeaders = [...headers, `Column ${nextColIdx}`];
      const newRows = rows.map(r => [...r, 'Cell Content']);
      onUpdateBlock(selectedBlock.id, {
        headers: newHeaders,
        rows: newRows
      });
    };

    const handleRemoveLastColumn = () => {
      if (headers.length <= 1) return;
      const newHeaders = headers.slice(0, -1);
      const newRows = rows.map(r => r.slice(0, -1));
      onUpdateBlock(selectedBlock.id, {
        headers: newHeaders,
        rows: newRows
      });
    };

    return (
      <div className="inspector-group">
        <label>Header Background</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.headerBg || '#7c3aed'}
            onChange={(e) => handleStyleChange('headerBg', e.target.value)}
          />
          <input
            type="text"
            value={style.headerBg || ''}
            onChange={(e) => handleStyleChange('headerBg', e.target.value)}
          />
        </div>

        <label>Header Text Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.headerColor || '#ffffff'}
            onChange={(e) => handleStyleChange('headerColor', e.target.value)}
          />
          <input
            type="text"
            value={style.headerColor || ''}
            onChange={(e) => handleStyleChange('headerColor', e.target.value)}
          />
        </div>

        <div className="dual-inputs">
          <div>
            <label>Row BG Odd</label>
            <input
              type="color"
              value={style.rowBgOdd || '#ffffff'}
              onChange={(e) => handleStyleChange('rowBgOdd', e.target.value)}
            />
          </div>
          <div>
            <label>Row BG Even</label>
            <input
              type="color"
              value={style.rowBgEven || '#f8fafc'}
              onChange={(e) => handleStyleChange('rowBgEven', e.target.value)}
            />
          </div>
        </div>

        <div className="dual-inputs">
          <div>
            <label>Border Color</label>
            <input
              type="color"
              value={style.borderColor || '#e2e8f0'}
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            />
          </div>
          <div>
            <label>Text Color</label>
            <input
              type="color"
              value={style.textColor || '#334155'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
            />
          </div>
        </div>

        <label>Cell Padding ({style.cellPadding || '10px'})</label>
        <input
          type="range"
          min="4"
          max="24"
          value={parseInt(style.cellPadding) || 10}
          onChange={(e) => handleStyleChange('cellPadding', `${e.target.value}px`)}
        />

        <label>Font Size ({style.fontSize || '14px'})</label>
        <input
          type="range"
          min="10"
          max="20"
          value={parseInt(style.fontSize) || 14}
          onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
        />

        <div className="grid-dimension-editor" style={{ borderTop: '1px solid var(--border-color)', marginTop: '15px', paddingTop: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>MANAGE COLUMNS & ROWS</span>
          
          <div className="dual-inputs" style={{ marginTop: '10px' }}>
            <button
              type="button"
              className="header-btn"
              onClick={handleAddRow}
              style={{ padding: '6px', fontSize: '12px' }}
            >
              + Add Row
            </button>
            <button
              type="button"
              className="header-btn"
              onClick={handleRemoveLastRow}
              disabled={rows.length <= 1}
              style={{ padding: '6px', fontSize: '12px' }}
            >
              - Remove Row
            </button>
          </div>

          <div className="dual-inputs" style={{ marginTop: '8px' }}>
            <button
              type="button"
              className="header-btn"
              onClick={handleAddColumn}
              style={{ padding: '6px', fontSize: '12px' }}
            >
              + Add Column
            </button>
            <button
              type="button"
              className="header-btn"
              onClick={handleRemoveLastColumn}
              disabled={headers.length <= 1}
              style={{ padding: '6px', fontSize: '12px' }}
            >
              - Remove Col
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHeadingInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Heading Level</label>
        <div className="segmented-control">
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={style.level === lvl ? 'active' : ''}
              onClick={() => handleStyleChange('level', lvl)}
            >
              H{lvl}
            </button>
          ))}
        </div>

        <label>Heading Text</label>
        <textarea
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Enter title text..."
          rows={2}
        />

        <label>Font Size ({style.fontSize || '28px'})</label>
        <input
          type="range"
          min="16"
          max="48"
          value={parseInt(style.fontSize) || 28}
          onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
        />

        <label>Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
          <input
            type="text"
            value={style.color || ''}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>

        <label>Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.textAlign === align ? 'active' : ''}
              onClick={() => handleStyleChange('textAlign', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        <label>Spacing Top ({style.paddingTop || '10px'})</label>
        <input
          type="range"
          min="0"
          max="80"
          value={parseInt(style.paddingTop) || 0}
          onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
        />

        <label>Spacing Bottom ({style.paddingBottom || '10px'})</label>
        <input
          type="range"
          min="0"
          max="80"
          value={parseInt(style.paddingBottom) || 0}
          onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
        />
      </div>
    );
  };

  const renderParagraphInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Text Content</label>
        <textarea
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Enter paragraph text..."
          rows={5}
        />

        <label>Font Size ({style.fontSize || '16px'})</label>
        <input
          type="range"
          min="12"
          max="24"
          value={parseInt(style.fontSize) || 16}
          onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
        />

        <label>Text Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.color || '#333333'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
          <input
            type="text"
            value={style.color || ''}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>

        <label>Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.textAlign === align ? 'active' : ''}
              onClick={() => handleStyleChange('textAlign', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        <label>Line Spacing / Height ({style.lineHeight || '1.6'})</label>
        <input
          type="range"
          min="1"
          max="2.5"
          step="0.1"
          value={parseFloat(style.lineHeight) || 1.6}
          onChange={(e) => handleStyleChange('lineHeight', e.target.value)}
        />

        <label>Spacing Top ({style.paddingTop || '5px'})</label>
        <input
          type="range"
          min="0"
          max="60"
          value={parseInt(style.paddingTop) || 0}
          onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
        />

        <label>Spacing Bottom ({style.paddingBottom || '5px'})</label>
        <input
          type="range"
          min="0"
          max="60"
          value={parseInt(style.paddingBottom) || 0}
          onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
        />
      </div>
    );
  };

  const renderButtonInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Button Text</label>
        <input
          type="text"
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Click Here"
        />

        <label>Link URL</label>
        <input
          type="text"
          value={style.url || ''}
          onChange={(e) => handleStyleChange('url', e.target.value)}
          placeholder="https://example.com"
        />

        <label>Button Background</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.backgroundColor || '#7c3aed'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
          <input
            type="text"
            value={style.backgroundColor || ''}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
        </div>

        <label>Text Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.textColor || '#ffffff'}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
          <input
            type="text"
            value={style.textColor || ''}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
        </div>

        <label>Font Size ({style.fontSize || '16px'})</label>
        <input
          type="range"
          min="12"
          max="24"
          value={parseInt(style.fontSize) || 16}
          onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
        />

        <label>Corner Radius ({style.borderRadius || '6px'})</label>
        <input
          type="range"
          min="0"
          max="30"
          value={parseInt(style.borderRadius) || 0}
          onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
        />

        <label>Button Align</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.textAlign === align ? 'active' : ''}
              onClick={() => handleStyleChange('textAlign', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        <div className="dual-inputs">
          <div>
            <label>Padding V</label>
            <input
              type="number"
              value={parseInt(style.paddingTop) || 10}
              onChange={(e) => {
                handleStyleChange('paddingTop', `${e.target.value}px`);
                handleStyleChange('paddingBottom', `${e.target.value}px`);
              }}
            />
          </div>
          <div>
            <label>Padding H</label>
            <input
              type="number"
              value={parseInt(style.paddingLeft) || 20}
              onChange={(e) => {
                handleStyleChange('paddingLeft', `${e.target.value}px`);
                handleStyleChange('paddingRight', `${e.target.value}px`);
              }}
            />
          </div>
        </div>

        <div className="dual-inputs">
          <div>
            <label>Block Margin Top</label>
            <input
              type="number"
              value={parseInt(style.paddingTopBlock) || 15}
              onChange={(e) => handleStyleChange('paddingTopBlock', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Block Margin Bottom</label>
            <input
              type="number"
              value={parseInt(style.paddingBottomBlock) || 15}
              onChange={(e) => handleStyleChange('paddingBottomBlock', `${e.target.value}px`)}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px', padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textTransform: 'none', margin: 0 }}>
            <input
              type="checkbox"
              checked={!!style.neumorphicShadow}
              onChange={(e) => handleStyleChange('neumorphicShadow', e.target.checked)}
              style={{ width: 'auto', margin: 0 }}
            />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Neumorphic Shadow (Soft UI)</span>
          </label>
          {style.neumorphicShadow && (
            <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '6px', marginBot: 0, lineHeight: '1.4' }}>
              ⚠️ Box-shadows are stripped by Gmail/Outlook. This button will automatically fallback to standard flat styling in those clients.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderLinkInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Link Text</label>
        <input
          type="text"
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Click here"
        />

        <label>URL</label>
        <input
          type="text"
          value={style.url || ''}
          onChange={(e) => handleStyleChange('url', e.target.value)}
          placeholder="https://example.com"
        />

        <label>Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.textColor || '#2563eb'}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
          <input
            type="text"
            value={style.textColor || ''}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
        </div>

        <label>Font Size ({style.fontSize || '15px'})</label>
        <input
          type="range"
          min="12"
          max="20"
          value={parseInt(style.fontSize) || 15}
          onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
        />

        <label>Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.textAlign === align ? 'active' : ''}
              onClick={() => handleStyleChange('textAlign', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderImageInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Image URL</label>
        <input
          type="text"
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="https://example.com/image.png"
        />
        <div className="image-presets">
          <button 
            type="button" 
            onClick={() => handleContentChange('https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=60')}
          >
            Office
          </button>
          <button 
            type="button" 
            onClick={() => handleContentChange('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60')}
          >
            Laptop
          </button>
          <button 
            type="button" 
            onClick={() => handleContentChange('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60')}
          >
            Cyber
          </button>
        </div>

        <label>Alt Text (SEO / Accessibility)</label>
        <input
          type="text"
          value={style.alt || ''}
          onChange={(e) => handleStyleChange('alt', e.target.value)}
          placeholder="Description of image"
        />

        <label>Image Width (px)</label>
        <input
          type="text"
          value={style.width || '550px'}
          onChange={(e) => handleStyleChange('width', e.target.value)}
          placeholder="e.g. 300px or 100%"
        />
        <input
          type="range"
          min="50"
          max="560"
          value={parseInt(style.width) || 550}
          onChange={(e) => handleStyleChange('width', `${e.target.value}px`)}
        />

        <label>Image Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.alignment === align ? 'active' : ''}
              onClick={() => handleStyleChange('alignment', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        <label>Wrap Link URL (Optional)</label>
        <input
          type="text"
          value={style.linkUrl || ''}
          onChange={(e) => handleStyleChange('linkUrl', e.target.value)}
          placeholder="https://example.com"
        />

        <div className="dual-inputs">
          <div>
            <label>Padding Top</label>
            <input
              type="number"
              value={parseInt(style.paddingTop) || 10}
              onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Padding Bottom</label>
            <input
              type="number"
              value={parseInt(style.paddingBottom) || 10}
              onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderDividerInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Line Style</label>
        <div className="segmented-control">
          {['solid', 'dashed', 'dotted'].map((st) => (
            <button
              key={st}
              type="button"
              className={style.borderStyle === st ? 'active' : ''}
              onClick={() => handleStyleChange('borderStyle', st)}
            >
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </button>
          ))}
        </div>

        <label>Line Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.color || '#e2e8f0'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
          <input
            type="text"
            value={style.color || ''}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>

        <label>Thickness ({style.thickness || '1px'})</label>
        <input
          type="range"
          min="1"
          max="8"
          value={parseInt(style.thickness) || 1}
          onChange={(e) => handleStyleChange('thickness', `${e.target.value}px`)}
        />

        <label>Line Width ({style.width || '100%'})</label>
        <input
          type="range"
          min="10"
          max="100"
          value={parseInt(style.width) || 100}
          onChange={(e) => handleStyleChange('width', `${e.target.value}%`)}
        />

        <div className="dual-inputs">
          <div>
            <label>Padding Top</label>
            <input
              type="number"
              value={parseInt(style.paddingTop) || 15}
              onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Padding Bottom</label>
            <input
              type="number"
              value={parseInt(style.paddingBottom) || 15}
              onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSpacerInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Spacer Height ({style.height || '20px'})</label>
        <input
          type="range"
          min="5"
          max="120"
          value={parseInt(style.height) || 20}
          onChange={(e) => handleStyleChange('height', `${e.target.value}px`)}
        />
      </div>
    );
  };

  const renderColumnsInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <p className="column-info">
          This is a two-column row block. You can drop other elements directly into either column inside the canvas.
        </p>
        
        <div className="dual-inputs">
          <div>
            <label>Margin Top</label>
            <input
              type="number"
              value={parseInt(style.paddingTop) || 15}
              onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Margin Bottom</label>
            <input
              type="number"
              value={parseInt(style.paddingBottom) || 15}
              onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSocialBarInspector = () => {
    const style = selectedBlock.style || {};
    const platforms = selectedBlock.platforms || [];

    const handlePlatformUrlChange = (idx, url) => {
      const newPlatforms = [...platforms];
      newPlatforms[idx] = { ...newPlatforms[idx], url };
      onUpdateBlock(selectedBlock.id, { platforms: newPlatforms });
    };

    const handlePlatformToggle = (idx, enabled) => {
      const newPlatforms = [...platforms];
      newPlatforms[idx] = { ...newPlatforms[idx], enabled };
      onUpdateBlock(selectedBlock.id, { platforms: newPlatforms });
    };

    return (
      <div className="inspector-group">
        <label>Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.align === align ? 'active' : ''}
              onClick={() => handleStyleChange('align', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        <label>Icon Style</label>
        <select
          value={style.iconStyle || 'circle'}
          onChange={(e) => handleStyleChange('iconStyle', e.target.value)}
        >
          <option value="circle">Circular Background</option>
          <option value="square">Rounded Square Background</option>
          <option value="plain">Plain Icon (No Background)</option>
        </select>

        <label>Color Theme</label>
        <select
          value={style.colorTheme || 'custom'}
          onChange={(e) => handleStyleChange('colorTheme', e.target.value)}
        >
          <option value="original">Original Brand Colors</option>
          <option value="dark">Monochrome Dark</option>
          <option value="light">Monochrome Light</option>
          <option value="custom">Custom Color</option>
        </select>

        {style.colorTheme === 'custom' && (
          <>
            <label>Custom Icon Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={style.customColor || '#7c3aed'}
                onChange={(e) => handleStyleChange('customColor', e.target.value)}
              />
              <input
                type="text"
                value={style.customColor || ''}
                onChange={(e) => handleStyleChange('customColor', e.target.value)}
              />
            </div>
          </>
        )}

        <label>Icon Size ({style.iconSize || '24px'})</label>
        <input
          type="range"
          min="16"
          max="48"
          value={parseInt(style.iconSize) || 24}
          onChange={(e) => handleStyleChange('iconSize', `${e.target.value}px`)}
        />

        <label>Icon Spacing ({style.spacing || '16px'})</label>
        <input
          type="range"
          min="8"
          max="32"
          value={parseInt(style.spacing) || 16}
          onChange={(e) => handleStyleChange('spacing', `${e.target.value}px`)}
        />

        <div className="platforms-editor" style={{ borderTop: '1px solid var(--border-color)', marginTop: '15px', paddingTop: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>MANAGE PROFILE LINKS</span>
          {platforms.map((p, idx) => (
            <div key={p.name} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'capitalize', margin: 0, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!!p.enabled}
                  onChange={(e) => handlePlatformToggle(idx, e.target.checked)}
                  style={{ width: 'auto', margin: 0 }}
                />
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{p.name}</span>
              </label>
              {p.enabled && (
                <input
                  type="text"
                  value={p.url || ''}
                  onChange={(e) => handlePlatformUrlChange(idx, e.target.value)}
                  placeholder={`https://${p.name}.com/yourprofile`}
                  style={{ fontSize: '12px', padding: '6px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideoBlockInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Video Cover Image URL</label>
        <input
          type="text"
          value={selectedBlock.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="https://example.com/video-cover.png"
        />

        <label>Video Destination URL</label>
        <input
          type="text"
          value={style.videoUrl || ''}
          onChange={(e) => handleStyleChange('videoUrl', e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />

        <label>Play Button Style</label>
        <select
          value={style.playStyle || 'circle'}
          onChange={(e) => handleStyleChange('playStyle', e.target.value)}
        >
          <option value="circle">Circular Translucent</option>
          <option value="triangle">Triangle Outline Overlay</option>
          <option value="rectangular">YouTube Red Style</option>
        </select>

        <label>Play Button Theme Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.playColor || '#ef4444'}
            onChange={(e) => handleStyleChange('playColor', e.target.value)}
          />
          <input
            type="text"
            value={style.playColor || ''}
            onChange={(e) => handleStyleChange('playColor', e.target.value)}
          />
        </div>

        <label>Player Width ({style.width || '550px'})</label>
        <input
          type="text"
          value={style.width || '550px'}
          onChange={(e) => handleStyleChange('width', e.target.value)}
          placeholder="e.g. 100% or 550px"
        />
        <input
          type="range"
          min="150"
          max="560"
          value={parseInt(style.width) || 550}
          onChange={(e) => handleStyleChange('width', `${e.target.value}px`)}
        />

        <label>Player Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.alignment === align ? 'active' : ''}
              onClick={() => handleStyleChange('alignment', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSenderSignatureInspector = () => {
    const style = selectedBlock.style || {};
    return (
      <div className="inspector-group">
        <label>Sender Full Name</label>
        <input
          type="text"
          value={selectedBlock.name || ''}
          onChange={(e) => onUpdateBlock(selectedBlock.id, { name: e.target.value })}
        />

        <label>Job Title / Role</label>
        <input
          type="text"
          value={selectedBlock.title || ''}
          onChange={(e) => onUpdateBlock(selectedBlock.id, { title: e.target.value })}
        />

        <label>Company Name</label>
        <input
          type="text"
          value={selectedBlock.company || ''}
          onChange={(e) => onUpdateBlock(selectedBlock.id, { company: e.target.value })}
        />

        <label>Contact Phone</label>
        <input
          type="text"
          value={selectedBlock.phone || ''}
          onChange={(e) => onUpdateBlock(selectedBlock.id, { phone: e.target.value })}
        />

        <label>Website URL</label>
        <input
          type="text"
          value={selectedBlock.website || ''}
          onChange={(e) => onUpdateBlock(selectedBlock.id, { website: e.target.value })}
        />

        <label>Avatar Photo URL</label>
        <input
          type="text"
          value={style.avatarUrl || ''}
          onChange={(e) => handleStyleChange('avatarUrl', e.target.value)}
        />

        <div className="dual-inputs">
          <div>
            <label>Avatar size</label>
            <input
              type="number"
              value={parseInt(style.avatarSize) || 60}
              onChange={(e) => handleStyleChange('avatarSize', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Avatar shape</label>
            <select
              value={style.avatarRadius || '50%'}
              onChange={(e) => handleStyleChange('avatarRadius', e.target.value)}
            >
              <option value="50%">Circle</option>
              <option value="8px">Rounded Square</option>
              <option value="0px">Square</option>
            </select>
          </div>
        </div>

        <div className="dual-inputs" style={{ marginTop: '10px' }}>
          <div>
            <label>Accent Color</label>
            <input
              type="color"
              value={style.accentColor || '#7c3aed'}
              onChange={(e) => handleStyleChange('accentColor', e.target.value)}
            />
          </div>
          <div>
            <label>Text Color</label>
            <input
              type="color"
              value={style.textColor || '#334155'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
            />
          </div>
        </div>

        <div className="accent-bar-settings" style={{ borderTop: '1px solid var(--border-color)', marginTop: '15px', paddingTop: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>SIGNATURE ACCENT BAR</span>
          <div className="dual-inputs" style={{ marginTop: '8px' }}>
            <div>
              <label>Thickness</label>
              <input
                type="number"
                value={parseInt(style.borderLeftThickness) || 3}
                onChange={(e) => handleStyleChange('borderLeftThickness', `${e.target.value}px`)}
              />
            </div>
            <div>
              <label>Accent Bar Color</label>
              <input
                type="color"
                value={style.borderLeftColor || '#7c3aed'}
                onChange={(e) => handleStyleChange('borderLeftColor', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNavMenuInspector = () => {
    const style = selectedBlock.style || {};
    const items = selectedBlock.items || [];

    const handleItemTextChange = (idx, text) => {
      const newItems = [...items];
      newItems[idx] = { ...newItems[idx], text };
      onUpdateBlock(selectedBlock.id, { items: newItems });
    };

    const handleItemUrlChange = (idx, url) => {
      const newItems = [...items];
      newItems[idx] = { ...newItems[idx], url };
      onUpdateBlock(selectedBlock.id, { items: newItems });
    };

    const handleAddItem = () => {
      const newItems = [...items, { text: 'New Link', url: 'https://example.com' }];
      onUpdateBlock(selectedBlock.id, { items: newItems });
    };

    const handleRemoveItem = (idx) => {
      if (items.length <= 1) return;
      const newItems = items.filter((_, i) => i !== idx);
      onUpdateBlock(selectedBlock.id, { items: newItems });
    };

    return (
      <div className="inspector-group">
        <label>Alignment</label>
        <div className="segmented-control">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              type="button"
              className={style.align === align ? 'active' : ''}
              onClick={() => handleStyleChange('align', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        <label>Divider style</label>
        <select
          value={style.dividerType || 'pipe'}
          onChange={(e) => handleStyleChange('dividerType', e.target.value)}
        >
          <option value="pipe">Pipe ( | )</option>
          <option value="slash">Slash ( / )</option>
          <option value="bullet">Bullet ( • )</option>
          <option value="space">Space spacer</option>
        </select>

        <label>Text Color</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={style.textColor || '#475569'}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
          <input
            type="text"
            value={style.textColor || ''}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
          />
        </div>

        <div className="dual-inputs">
          <div>
            <label>Font Size</label>
            <input
              type="number"
              value={parseInt(style.fontSize) || 14}
              onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
            />
          </div>
          <div>
            <label>Item Spacing</label>
            <input
              type="number"
              value={parseInt(style.itemSpacing) || 12}
              onChange={(e) => handleStyleChange('itemSpacing', `${e.target.value}px`)}
            />
          </div>
        </div>

        <div className="menu-nodes-editor" style={{ borderTop: '1px solid var(--border-color)', marginTop: '15px', paddingTop: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>EDIT MENU ITEMS</span>
          {items.map((it, idx) => (
            <div key={idx} style={{ marginTop: '12px', padding: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: 'var(--text-muted)' }}>ITEM #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  disabled={items.length <= 1}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger)',
                    fontSize: '10px',
                    cursor: 'pointer',
                    opacity: items.length <= 1 ? 0.3 : 1
                  }}
                >
                  Remove
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input
                  type="text"
                  value={it.text || ''}
                  onChange={(e) => handleItemTextChange(idx, e.target.value)}
                  placeholder="Link label"
                  style={{ fontSize: '11.5px', padding: '5px' }}
                />
                <input
                  type="text"
                  value={it.url || ''}
                  onChange={(e) => handleItemUrlChange(idx, e.target.value)}
                  placeholder="URL Destination"
                  style={{ fontSize: '11.5px', padding: '5px' }}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="header-btn"
            onClick={handleAddItem}
            style={{ width: '100%', padding: '6px', fontSize: '12px', marginTop: '12px' }}
          >
            + Add Menu Item
          </button>
        </div>
      </div>
    );
  };

  const renderRawHTMLInspector = () => {
    return (
      <div className="inspector-group">
        <label>Custom HTML Code</label>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: '1.4' }}>
          ⚠️ Input raw, inline-styled HTML code. Ensure tags are correctly nested to avoid breaking email rendering. Scripts will be omitted by most clients.
        </p>
        <textarea
          value={selectedBlock.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="<table border='0'>..."
          rows={12}
          style={{ fontFamily: 'monospace', fontSize: '12px' }}
        />
      </div>
    );
  };

  const renderElementTab = () => {
    if (!selectedBlock) {
      return (
        <div className="no-selection">
          <Sliders size={28} />
          <p>Select any item on the canvas to customize its options.</p>
        </div>
      );
    }

    return (
      <div className="element-inspector">
        <div className="element-type-badge">
          <Type size={14} /> {selectedBlock.type.replace('_', ' ').toUpperCase()} PROPERTIES
        </div>

        {selectedBlock.type === 'heading' && renderHeadingInspector()}
        {selectedBlock.type === 'paragraph' && renderParagraphInspector()}
        {selectedBlock.type === 'button' && renderButtonInspector()}
        {selectedBlock.type === 'link' && renderLinkInspector()}
        {selectedBlock.type === 'image' && renderImageInspector()}
        {selectedBlock.type === 'divider' && renderDividerInspector()}
        {selectedBlock.type === 'spacer' && renderSpacerInspector()}
        {selectedBlock.type === 'columns_2' && renderColumnsInspector()}
        {selectedBlock.type === 'card' && renderCardInspector()}
        {selectedBlock.type === 'table' && renderTableInspector()}
        {selectedBlock.type === 'social_bar' && renderSocialBarInspector()}
        {selectedBlock.type === 'video_block' && renderVideoBlockInspector()}
        {selectedBlock.type === 'sender_signature' && renderSenderSignatureInspector()}
        {selectedBlock.type === 'nav_menu' && renderNavMenuInspector()}
        {selectedBlock.type === 'raw_html' && renderRawHTMLInspector()}
      </div>
    );
  };

  const renderGlobalTab = () => {
    return (
      <div className="global-inspector">
        <div className="inspector-group">
          <label>Default Font Family</label>
          <select
            value={globalSettings.defaultFont}
            onChange={(e) => onUpdateGlobalSettings('defaultFont', e.target.value)}
          >
            {FONTS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>

          <label>Default Text Color</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={globalSettings.defaultTextColor || '#333333'}
              onChange={(e) => onUpdateGlobalSettings('defaultTextColor', e.target.value)}
            />
            <input
              type="text"
              value={globalSettings.defaultTextColor || ''}
              onChange={(e) => onUpdateGlobalSettings('defaultTextColor', e.target.value)}
            />
          </div>

          <label>Canvas Width</label>
          <input
            type="text"
            value={globalSettings.contentWidth}
            onChange={(e) => onUpdateGlobalSettings('contentWidth', e.target.value)}
            placeholder="e.g. 600px"
          />

          <label>Template Background</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={globalSettings.canvasBg || '#ffffff'}
              onChange={(e) => onUpdateGlobalSettings('canvasBg', e.target.value)}
            />
            <input
              type="text"
              value={globalSettings.canvasBg || ''}
              onChange={(e) => onUpdateGlobalSettings('canvasBg', e.target.value)}
            />
          </div>

          <label>Client Viewport Background</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={globalSettings.bodyBg || '#f4f4f5'}
              onChange={(e) => onUpdateGlobalSettings('bodyBg', e.target.value)}
            />
            <input
              type="text"
              value={globalSettings.bodyBg || ''}
              onChange={(e) => onUpdateGlobalSettings('bodyBg', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="inspector-container">
      <div className="inspector-tabs">
        <button
          className={`tab-btn ${activeTab === 'element' ? 'active' : ''}`}
          onClick={() => setActiveTab('element')}
          disabled={!selectedBlock}
          title={!selectedBlock ? 'Select a block to inspect it' : ''}
        >
          <Sliders size={16} /> Block settings
        </button>
        <button
          className={`tab-btn ${activeTab === 'global' ? 'active' : ''}`}
          onClick={() => setActiveTab('global')}
        >
          <Layout size={16} /> Global settings
        </button>
      </div>

      <div className="inspector-content">
        {activeTab === 'element' ? renderElementTab() : renderGlobalTab()}
      </div>
    </div>
  );
}
