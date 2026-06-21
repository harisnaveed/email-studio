import { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Code, Copy, Check, X, FileDown } from 'lucide-react';

export default function DevicePreview({ htmlContent, onClose, onDownload }) {
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile' | 'code'
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);

  // Write content to iframe whenever content or viewMode changes
  useEffect(() => {
    if (viewMode !== 'code' && iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }, [htmlContent, viewMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="preview-backdrop" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-header">
          <div className="preview-title">
            <h3>Template Preview</h3>
            <span className="subtitle">Realtime client simulation</span>
          </div>
          
          <div className="preview-toggles">
            <button
              className={`toggle-btn ${viewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewMode('desktop')}
            >
              <Monitor size={16} /> Desktop
            </button>
            <button
              className={`toggle-btn ${viewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone size={16} /> Mobile
            </button>
            <button
              className={`toggle-btn ${viewMode === 'code' ? 'active' : ''}`}
              onClick={() => setViewMode('code')}
            >
              <Code size={16} /> HTML Code
            </button>
          </div>

          <div className="preview-actions">
            {viewMode === 'code' ? (
              <button className="preview-action-btn copy-btn" onClick={handleCopy}>
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            ) : null}
            <button className="preview-action-btn download-btn" onClick={onDownload}>
              <FileDown size={16} /> Export HTML
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="preview-body">
          {viewMode === 'desktop' && (
            <div className="viewport-desktop">
              <iframe
                ref={iframeRef}
                title="Desktop Email Preview"
                className="preview-iframe"
              />
            </div>
          )}

          {viewMode === 'mobile' && (
            <div className="viewport-mobile-wrapper">
              <div className="phone-bezel">
                <div className="phone-speaker" />
                <div className="phone-screen">
                  <iframe
                    ref={iframeRef}
                    title="Mobile Email Preview"
                    className="preview-iframe"
                  />
                </div>
                <div className="phone-home-button" />
              </div>
            </div>
          )}

          {viewMode === 'code' && (
            <div className="viewport-code">
              <pre className="code-block-display">
                <code>{htmlContent}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
