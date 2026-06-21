import { useState, useRef } from 'react';
import { 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Move,
  Play,
  Code2
} from 'lucide-react';

export default function BlockWrapper({
  block,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onUpdateContent,
  isNested = false,
  parentBlockId = null,
  columnKey = null, // 'column1' or 'column2'
  onDropNested,
  onSelectNested
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingInline, setIsEditingInline] = useState(false);
  const contentEditableRef = useRef(null);

  const style = block.style || {};

  const handleDoubleClick = () => {
    if (block.type === 'heading' || block.type === 'paragraph' || block.type === 'button' || block.type === 'link') {
      setIsEditingInline(true);
      setTimeout(() => {
        if (contentEditableRef.current) {
          contentEditableRef.current.focus();
          // Select all text
          const range = document.createRange();
          range.selectNodeContents(contentEditableRef.current);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 50);
    }
  };

  const handleBlur = () => {
    setIsEditingInline(false);
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerText;
      onUpdateContent(block.id, text, parentBlockId, columnKey);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && block.type !== 'paragraph') {
      e.preventDefault();
      contentEditableRef.current.blur();
    }
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', `move:${block.id}`);
    e.dataTransfer.setData('sourceParentId', parentBlockId || '');
    e.dataTransfer.setData('sourceColumnKey', columnKey || '');
    e.dataTransfer.effectAllowed = 'move';
  };

  // Prevent default drag over behavior on this wrapper
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Render elements in the editor
  const renderContent = () => {

    
    switch (block.type) {
      case 'heading': {
        const level = style.level || 1;
        const Tag = `h${level}`;
        return (
          <Tag
            ref={isEditingInline ? contentEditableRef : null}
            contentEditable={isEditingInline}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning
            style={{
              fontSize: style.fontSize || '24px',
              color: style.color || '#1e293b',
              textAlign: style.textAlign || 'left',
              lineHeight: style.lineHeight || '1.3',
              paddingTop: style.paddingTop || '10px',
              paddingBottom: style.paddingBottom || '10px',
              margin: 0,
              outline: 'none',
              cursor: isEditingInline ? 'text' : 'pointer'
            }}
          >
            {block.content}
          </Tag>
        );
      }

      case 'paragraph': {
        return (
          <div
            ref={isEditingInline ? contentEditableRef : null}
            contentEditable={isEditingInline}
            onBlur={handleBlur}
            suppressContentEditableWarning
            style={{
              fontSize: style.fontSize || '16px',
              color: style.color || '#475569',
              textAlign: style.textAlign || 'left',
              lineHeight: style.lineHeight || '1.6',
              paddingTop: style.paddingTop || '5px',
              paddingBottom: style.paddingBottom || '5px',
              outline: 'none',
              cursor: isEditingInline ? 'text' : 'pointer',
              whiteSpace: 'pre-wrap'
            }}
          >
            {block.content}
          </div>
        );
      }

      case 'button': {
        return (
          <div style={{ 
            textAlign: style.textAlign || 'center',
            paddingTop: style.paddingTopBlock || '10px',
            paddingBottom: style.paddingBottomBlock || '10px'
          }}>
            <span
              ref={isEditingInline ? contentEditableRef : null}
              contentEditable={isEditingInline}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning
              style={{
                display: 'inline-block',
                backgroundColor: style.backgroundColor || '#7c3aed',
                color: style.textColor || '#ffffff',
                fontSize: style.fontSize || '16px',
                fontWeight: style.fontWeight || 'bold',
                borderRadius: style.borderRadius || '6px',
                paddingTop: style.paddingTop || '12px',
                paddingBottom: style.paddingBottom || '12px',
                paddingLeft: style.paddingLeft || '24px',
                paddingRight: style.paddingRight || '24px',
                border: `1px solid ${style.backgroundColor || '#7c3aed'}`,
                outline: 'none',
                cursor: isEditingInline ? 'text' : 'pointer',
                boxShadow: style.neumorphicShadow 
                  ? '5px 5px 10px rgba(0, 0, 0, 0.12), -5px -5px 10px rgba(255, 255, 255, 0.6)' 
                  : 'none'
              }}
            >
              {block.content}
            </span>
          </div>
        );
      }

      case 'link': {
        return (
          <div style={{ textAlign: style.textAlign || 'center', paddingTop: style.paddingTop || '5px', paddingBottom: style.paddingBottom || '5px' }}>
            <span
              ref={isEditingInline ? contentEditableRef : null}
              contentEditable={isEditingInline}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning
              style={{
                color: style.textColor || '#2563eb',
                fontSize: style.fontSize || '15px',
                textDecoration: 'underline',
                outline: 'none',
                cursor: isEditingInline ? 'text' : 'pointer'
              }}
            >
              {block.content}
            </span>
          </div>
        );
      }

      case 'image': {
        const url = block.content || 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=60';
        return (
          <div 
            style={{ 
              textAlign: style.alignment || 'center',
              paddingTop: style.paddingTop || '10px',
              paddingBottom: style.paddingBottom || '10px'
            }}
          >
            <img
              src={url}
              alt={style.alt || 'Visual content'}
              style={{
                maxWidth: '100%',
                width: style.width || '550px',
                height: 'auto',
                display: 'block',
                margin: style.alignment === 'center' ? '0 auto' : style.alignment === 'right' ? '0 0 0 auto' : '0 auto 0 0',
                borderRadius: '4px'
              }}
            />
          </div>
        );
      }

      case 'divider': {
        return (
          <div 
            style={{ 
              paddingTop: style.paddingTop || '15px',
              paddingBottom: style.paddingBottom || '15px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <hr
              style={{
                border: 'none',
                borderTop: `${style.thickness || '1px'} ${style.borderStyle || 'solid'} ${style.color || '#e2e8f0'}`,
                width: style.width || '100%',
                margin: 0
              }}
            />
          </div>
        );
      }

      case 'spacer': {
        return (
          <div
            style={{
              height: style.height || '20px',
              backgroundColor: isHovered || isSelected ? 'rgba(124, 58, 237, 0.05)' : 'transparent',
              border: isHovered || isSelected ? '1px dashed rgba(124, 58, 237, 0.3)' : '1px dashed transparent',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#94a3b8'
            }}
          >
            {isHovered || isSelected ? `Spacer: ${style.height || '20px'}` : ''}
          </div>
        );
      }

      case 'card': {
        const cardStyle = block.style || {};
        return (
          <div
            style={{
              backgroundColor: cardStyle.backgroundColor || '#f8fafc',
              border: `${cardStyle.borderThickness || '1px'} ${cardStyle.borderStyle || 'solid'} ${cardStyle.borderColor || '#e2e8f0'}`,
              borderLeft: `${cardStyle.leftBorderThickness || '4px'} solid ${cardStyle.leftBorderColor || '#7c3aed'}`,
              borderRadius: cardStyle.borderRadius || '8px',
              paddingTop: cardStyle.paddingTop || '16px',
              paddingBottom: cardStyle.paddingBottom || '16px',
              paddingLeft: cardStyle.paddingLeft || '20px',
              paddingRight: cardStyle.paddingRight || '20px',
              textAlign: 'left'
            }}
          >
            {/* Inline Title */}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdateContent(block.id, { title: e.target.innerText })}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
              style={{
                fontSize: '17px',
                fontWeight: 'bold',
                color: cardStyle.titleColor || '#0f172a',
                marginBottom: '8px',
                outline: 'none',
                cursor: 'text'
              }}
            >
              {block.title || 'Click to edit title'}
            </div>
            
            {/* Inline Body Content */}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdateContent(block.id, { content: e.target.innerText })}
              style={{
                fontSize: '14px',
                color: cardStyle.textColor || '#475569',
                lineHeight: '1.5',
                outline: 'none',
                cursor: 'text',
                marginBottom: cardStyle.showButton ? '12px' : '0px'
              }}
            >
              {block.content || 'Click to edit description.'}
            </div>

            {/* CTA Button inside Card */}
            {cardStyle.showButton && (
              <div style={{ marginTop: '12px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: cardStyle.buttonBg || '#7c3aed',
                    color: cardStyle.buttonTextColor || '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: 'bold',
                    borderRadius: cardStyle.buttonBorderRadius || '6px',
                    padding: '8px 16px',
                    cursor: 'default'
                  }}
                >
                  {cardStyle.buttonText || 'Click Here'}
                </span>
              </div>
            )}
          </div>
        );
      }

      case 'table': {
        const tableStyle = block.style || {};
        const headers = block.headers || [];
        const rows = block.rows || [];

        return (
          <div style={{ overflowX: 'auto', padding: '4px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: tableStyle.fontSize || '14px',
                color: tableStyle.textColor || '#334155'
              }}
            >
              <thead>
                <tr style={{ backgroundColor: tableStyle.headerBg || '#7c3aed', color: tableStyle.headerColor || '#ffffff', fontWeight: 'bold' }}>
                  {headers.map((hdr, hIdx) => (
                    <th
                      key={hIdx}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newHeaders = [...headers];
                        newHeaders[hIdx] = e.target.innerText;
                        onUpdateContent(block.id, { headers: newHeaders });
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                      style={{
                        padding: tableStyle.cellPadding || '10px',
                        border: `1px solid ${tableStyle.borderColor || '#e2e8f0'}`,
                        textAlign: 'left',
                        outline: 'none',
                        cursor: 'text'
                      }}
                    >
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      backgroundColor: rIdx % 2 === 0 ? (tableStyle.rowBgOdd || '#ffffff') : (tableStyle.rowBgEven || '#f8fafc')
                    }}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newRows = rows.map((r, rIndex) => {
                            if (rIndex === rIdx) {
                              const newR = [...r];
                              newR[cIdx] = e.target.innerText;
                              return newR;
                            }
                            return r;
                          });
                          onUpdateContent(block.id, { rows: newRows });
                        }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                        style={{
                          padding: tableStyle.cellPadding || '10px',
                          border: `1px solid ${tableStyle.borderColor || '#e2e8f0'}`,
                          textAlign: 'left',
                          outline: 'none',
                          cursor: 'text'
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case 'columns_2': {
        const col1Blocks = block.column1 || [];
        const col2Blocks = block.column2 || [];

        // Inner drop handlers for columns
        const handleInnerDragOver = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };

        const handleInnerDrop = (e, colKey) => {
          e.preventDefault();
          e.stopPropagation();
          const dropData = e.dataTransfer.getData('text/plain');
          const sourceParentId = e.dataTransfer.getData('sourceParentId');
          const sourceColumnKey = e.dataTransfer.getData('sourceColumnKey');
          
          onDropNested(dropData, block.id, colKey, sourceParentId, sourceColumnKey);
        };

        return (
          <div 
            className="editor-columns-row"
            style={{
              paddingTop: style.paddingTop || '15px',
              paddingBottom: style.paddingBottom || '15px'
            }}
          >
            <div 
              className="editor-column col-left"
              onDragOver={handleInnerDragOver}
              onDrop={(e) => handleInnerDrop(e, 'column1')}
            >
              {col1Blocks.length > 0 ? (
                col1Blocks.map((childBlock) => (
                  <BlockWrapper
                    key={childBlock.id}
                    block={childBlock}
                    isSelected={isSelected} // check in App if child selected
                    onSelect={() => onSelectNested(childBlock.id)}
                    onDelete={() => onDelete(childBlock.id, block.id, 'column1')}
                    onDuplicate={() => onDuplicate(childBlock.id, block.id, 'column1')}
                    onMoveUp={() => onMoveUp(childBlock.id, block.id, 'column1')}
                    onMoveDown={() => onMoveDown(childBlock.id, block.id, 'column1')}
                    onUpdateContent={onUpdateContent}
                    isNested={true}
                    parentBlockId={block.id}
                    columnKey="column1"
                    onDropNested={onDropNested}
                    onSelectNested={onSelectNested}
                  />
                ))
              ) : (
                <div className="column-placeholder">
                  Column 1: Drop element here
                </div>
              )}
            </div>
            
            <div className="editor-column-spacer" />

            <div 
              className="editor-column col-right"
              onDragOver={handleInnerDragOver}
              onDrop={(e) => handleInnerDrop(e, 'column2')}
            >
              {col2Blocks.length > 0 ? (
                col2Blocks.map((childBlock) => (
                  <BlockWrapper
                    key={childBlock.id}
                    block={childBlock}
                    isSelected={isSelected}
                    onSelect={() => onSelectNested(childBlock.id)}
                    onDelete={() => onDelete(childBlock.id, block.id, 'column2')}
                    onDuplicate={() => onDuplicate(childBlock.id, block.id, 'column2')}
                    onMoveUp={() => onMoveUp(childBlock.id, block.id, 'column2')}
                    onMoveDown={() => onMoveDown(childBlock.id, block.id, 'column2')}
                    onUpdateContent={onUpdateContent}
                    isNested={true}
                    parentBlockId={block.id}
                    columnKey="column2"
                    onDropNested={onDropNested}
                    onSelectNested={onSelectNested}
                  />
                ))
              ) : (
                <div className="column-placeholder">
                  Column 2: Drop element here
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'social_bar': {
        const platforms = block.platforms || [];
        const align = style.align || 'center';
        const iconSize = parseInt(style.iconSize) || 24;
        const spacing = style.spacing || '16px';
        const iconStyle = style.iconStyle || 'circle';
        const colorTheme = style.colorTheme || 'custom';
        const customColor = style.customColor || '#7c3aed';

        // Brand colors for "original" theme
        const BRAND_COLORS = {
          facebook: '#1877F2',
          twitter: '#0f1419',
          instagram: '#E4405F',
          linkedin: '#0A66C2',
          youtube: '#FF0000',
        };

        // Inline SVG paths for each platform
        const SVG_PATHS = {
          facebook: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z',
          twitter:  'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.894l4.383 5.794L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
          instagram:'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
          linkedin: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z',
          youtube:  'M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z',
        };

        const getColors = (name) => {
          let bg = customColor;
          let fg = '#ffffff';

          if (colorTheme === 'original') {
            bg = BRAND_COLORS[name] || customColor;
          } else if (colorTheme === 'dark') {
            bg = '#334155';
          } else if (colorTheme === 'light') {
            bg = '#e2e8f0';
            fg = '#334155';
          }

          if (iconStyle === 'plain') {
            fg = colorTheme === 'original' ? (BRAND_COLORS[name] || customColor) : (colorTheme === 'light' ? '#334155' : customColor);
            bg = 'transparent';
          }

          return { bg, fg };
        };

        return (
          <div style={{
            display: 'flex',
            justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
            gap: spacing,
            paddingTop: style.paddingTop || '15px',
            paddingBottom: style.paddingBottom || '15px',
            alignItems: 'center'
          }}>
            {platforms.filter(p => p.enabled).map(p => {
              const { bg, fg } = getColors(p.name);
              const svgPath = SVG_PATHS[p.name] || SVG_PATHS.twitter;
              const sz = iconSize;

              const containerStyle = iconStyle === 'plain' ? {
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', width: `${sz}px`, height: `${sz}px`
              } : {
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: `${sz * 1.6}px`, height: `${sz * 1.6}px`,
                borderRadius: iconStyle === 'circle' ? '50%' : '6px',
                backgroundColor: bg, cursor: 'pointer',
                flexShrink: 0
              };

              return (
                <div key={p.name} style={containerStyle} title={`${p.name}: ${p.url}`}>
                  <svg
                    width={sz}
                    height={sz}
                    viewBox="0 0 24 24"
                    fill={fg}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'block', flexShrink: 0 }}
                  >
                    <path d={svgPath} />
                  </svg>
                </div>
              );
            })}
          </div>
        );
      }

      case 'video_block': {
        const coverUrl = block.content || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';
        const align = style.alignment || 'center';
        const width = style.width || '550px';
        const playColor = style.playColor || '#ef4444';
        const playStyle = style.playStyle || 'circle';

        const isCircle = playStyle === 'circle';
        const isRect = playStyle === 'rectangular';

        return (
          <div style={{
            textAlign: align,
            paddingTop: style.paddingTop || '15px',
            paddingBottom: style.paddingBottom || '15px'
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '100%',
              width: width,
              cursor: 'pointer'
            }}>
              <img
                src={coverUrl}
                alt="Video preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '6px'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: isRect ? playColor : isCircle ? playColor : 'transparent',
                padding: isRect ? '12px 24px' : '16px',
                borderRadius: isRect ? '8px' : '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                border: playStyle === 'triangle' ? `4px solid ${playColor}` : 'none',
                background: playStyle === 'triangle' ? 'rgba(0,0,0,0.5)' : undefined
              }}>
                <Play size={28} fill="#ffffff" color="#ffffff" style={{ marginLeft: playStyle === 'rectangular' || isCircle ? '2px' : '0' }} />
              </div>
            </div>
          </div>
        );
      }

      case 'sender_signature': {
        const borderStyleVal = `${style.borderLeftThickness || '3px'} solid ${style.borderLeftColor || '#7c3aed'}`;
        return (
          <div style={{
            paddingTop: style.paddingTop || '20px',
            paddingBottom: style.paddingBottom || '20px',
            paddingLeft: '15px',
            paddingRight: '15px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderLeft: borderStyleVal,
              paddingLeft: '16px',
              textAlign: 'left'
            }}>
              {style.avatarUrl && (
                <img
                  src={style.avatarUrl}
                  alt={block.name}
                  style={{
                    width: style.avatarSize || '60px',
                    height: style.avatarSize || '60px',
                    borderRadius: style.avatarRadius || '50%',
                    objectFit: 'cover'
                  }}
                />
              )}
              <div style={{ fontFamily: 'inherit', fontSize: style.fontSize || '14px', color: style.textColor || '#334155' }}>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdateContent(block.id, { name: e.target.innerText })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                  style={{ fontWeight: 'bold', fontSize: '16px', color: style.accentColor || '#7c3aed', outline: 'none', cursor: 'text' }}
                >
                  {block.name}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdateContent(block.id, { title: e.target.innerText })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                  style={{ fontStyle: 'italic', outline: 'none', cursor: 'text' }}
                >
                  {block.title}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdateContent(block.id, { company: e.target.innerText })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                  style={{ fontWeight: '600', outline: 'none', cursor: 'text' }}
                >
                  {block.company}
                </div>
                <div style={{ marginTop: '4px', fontSize: '12px', opacity: 0.85 }}>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdateContent(block.id, { phone: e.target.innerText })}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                    style={{ outline: 'none', cursor: 'text' }}
                  >
                    {block.phone}
                  </span>
                  {' | '}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdateContent(block.id, { website: e.target.innerText })}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                    style={{ outline: 'none', cursor: 'text', textDecoration: 'underline', color: style.accentColor }}
                  >
                    {block.website}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'nav_menu': {
        const items = block.items || [];
        const align = style.align || 'center';
        const fontSize = style.fontSize || '14px';
        const textColor = style.textColor || '#475569';
        const dividerType = style.dividerType || 'pipe';
        const itemSpacing = style.itemSpacing || '12px';

        const getDividerChar = () => {
          if (dividerType === 'pipe') return '|';
          if (dividerType === 'slash') return '/';
          if (dividerType === 'bullet') return '•';
          return '';
        };

        const dividerChar = getDividerChar();

        return (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
            alignItems: 'center',
            fontSize: fontSize,
            paddingTop: style.paddingTop || '15px',
            paddingBottom: style.paddingBottom || '15px',
            color: textColor
          }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newItems = [...items];
                    newItems[idx].text = e.target.innerText;
                    onUpdateContent(block.id, { items: newItems });
                  }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                  style={{
                    color: textColor,
                    textDecoration: 'none',
                    fontWeight: '600',
                    outline: 'none',
                    cursor: 'text',
                    padding: `0 ${itemSpacing}`
                  }}
                >
                  {item.text}
                </span>
                {dividerChar && idx < items.length - 1 && (
                  <span style={{ opacity: 0.5, fontSize: '0.9em' }}>{dividerChar}</span>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'raw_html': {
        return (
          <div style={{
            paddingTop: style.paddingTop || '15px',
            paddingBottom: style.paddingBottom || '15px'
          }}>
            <div style={{
              border: '1px dashed #cbd5e1',
              borderRadius: '6px',
              backgroundColor: '#f8fafc',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#475569',
              textAlign: 'left'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code2 size={12} /> Raw HTML Block
              </div>
              <div style={{ whiteSpace: 'pre-wrap', opacity: 0.85, maxHeight: '100px', overflow: 'hidden' }}>
                {block.content || '<!-- Empty HTML block -->'}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const wrapperClass = `block-wrapper ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''} ${isNested ? 'is-nested' : ''}`;

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(block.id);
      }}
      draggable={!isEditingInline}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      {/* Element Header Control Ribbon */}
      {(isHovered || isSelected) && (
        <div className="block-toolbar" onClick={(e) => e.stopPropagation()}>
          <div className="drag-handle" title="Drag to reorder">
            <Move size={12} />
          </div>
          <span className="block-type-label">
            {block.type === 'columns_2' ? '2 Col Row' : block.type === 'nav_menu' ? 'Footer Links' : block.type === 'social_bar' ? 'Social Bar' : block.type === 'video_block' ? 'Video Block' : block.type === 'sender_signature' ? 'Signature' : block.type === 'raw_html' ? 'Raw HTML' : block.type}
          </span>
          <div className="toolbar-spacer" />
          <button onClick={() => onMoveUp(block.id, parentBlockId, columnKey)} title="Move Up">
            <ArrowUp size={12} />
          </button>
          <button onClick={() => onMoveDown(block.id, parentBlockId, columnKey)} title="Move Down">
            <ArrowDown size={12} />
          </button>
          <button onClick={() => onDuplicate(block.id, parentBlockId, columnKey)} title="Duplicate">
            <Copy size={12} />
          </button>
          <button onClick={() => onDelete(block.id, parentBlockId, columnKey)} className="delete-btn" title="Delete">
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Actual Rendered Content */}
      <div 
        className="block-content-area"
        onDoubleClick={handleDoubleClick}
        title="Double click to edit text directly"
      >
        {renderContent()}
      </div>
    </div>
  );
}
