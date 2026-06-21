export const INITIAL_GLOBAL_SETTINGS = {
  bodyBg: '#f4f4f5',
  canvasBg: '#ffffff',
  contentWidth: '600px',
  defaultFont: 'Arial, sans-serif',
  defaultTextColor: '#333333'
};

export const PRESET_TEMPLATES = {
  welcome: {
    name: 'Welcome Onboarding',
    globalSettings: {
      bodyBg: '#f1f5f9',
      canvasBg: '#ffffff',
      contentWidth: '600px',
      defaultFont: 'Helvetica, Arial, sans-serif',
      defaultTextColor: '#334155'
    },
    blocks: [
      {
        id: 'welcome-nav-menu',
        type: 'nav_menu',
        style: {
          align: 'center',
          fontSize: '14px',
          textColor: '#7c3aed',
          dividerType: 'pipe',
          itemSpacing: '14px',
          paddingTop: '15px',
          paddingBottom: '15px'
        },
        items: [
          { text: 'Home', url: 'https://example.com' },
          { text: 'Features', url: 'https://example.com/features' },
          { text: 'Pricing', url: 'https://example.com/pricing' }
        ]
      },
      {
        id: 'welcome-heading-1',
        type: 'heading',
        content: 'Welcome to Email Studio! 🚀',
        style: {
          level: 1,
          fontSize: '28px',
          color: '#1e293b',
          textAlign: 'center',
          lineHeight: '1.3',
          paddingTop: '20px',
          paddingBottom: '10px'
        }
      },
      {
        id: 'welcome-img-1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=60',
        style: {
          alt: 'Welcome onboard image',
          width: '550px',
          alignment: 'center',
          paddingTop: '10px',
          paddingBottom: '20px',
          linkUrl: ''
        }
      },
      {
        id: 'welcome-p-1',
        type: 'paragraph',
        content: 'Hey there! We are absolutely thrilled to have you onboard. Email Studio is designed to help you create stunning, fully responsive emails that render beautifully on any device and email client.',
        style: {
          fontSize: '16px',
          color: '#475569',
          textAlign: 'left',
          lineHeight: '1.6',
          paddingTop: '10px',
          paddingBottom: '10px'
        }
      },
      {
        id: 'welcome-p-2',
        type: 'paragraph',
        content: 'To help you get started, we have loaded this interactive builder. You can drag and drop elements, edit text inline, customize colors, and download the finished vanilla HTML code instantly.',
        style: {
          fontSize: '16px',
          color: '#475569',
          textAlign: 'left',
          lineHeight: '1.6',
          paddingTop: '10px',
          paddingBottom: '20px'
        }
      },
      {
        id: 'welcome-card-alert',
        type: 'card',
        title: '🎉 Premium Upgrade Offer',
        content: 'As a welcoming gift, we have applied a 25% discount to your account for any upgrade within the first 7 days. Make sure to claim it today!',
        style: {
          backgroundColor: '#faf5ff',
          titleColor: '#6d28d9',
          textColor: '#581c87',
          borderColor: '#f3e8ff',
          borderStyle: 'solid',
          borderThickness: '1px',
          leftBorderColor: '#a855f7',
          leftBorderThickness: '4px',
          borderRadius: '8px',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          showButton: true,
          buttonText: 'Claim 25% Off',
          buttonUrl: 'https://example.com/upgrade',
          buttonBg: '#7c3aed',
          buttonTextColor: '#ffffff',
          buttonBorderRadius: '6px'
        }
      },
      {
        id: 'welcome-btn-1',
        type: 'button',
        content: 'Go to Dashboard',
        style: {
          url: 'https://example.com/dashboard',
          backgroundColor: '#7c3aed',
          textColor: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          textAlign: 'center',
          paddingTopBlock: '15px',
          paddingBottomBlock: '15px'
        }
      },
      {
        id: 'welcome-sig',
        type: 'sender_signature',
        name: 'Sarah Jenkins',
        title: 'Lead Onboarding Specialist',
        company: 'Email Studio',
        phone: '+1 (555) 019-2834',
        website: 'https://example.com',
        style: {
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          avatarSize: '50px',
          avatarRadius: '50%',
          textColor: '#475569',
          accentColor: '#7c3aed',
          fontSize: '13px',
          borderLeftThickness: '3px',
          borderLeftColor: '#7c3aed',
          paddingTop: '15px',
          paddingBottom: '15px'
        }
      },
      {
        id: 'welcome-divider-1',
        type: 'divider',
        content: '',
        style: {
          color: '#e2e8f0',
          borderStyle: 'solid',
          thickness: '2px',
          width: '90%',
          paddingTop: '25px',
          paddingBottom: '25px'
        }
      },
      {
        id: 'welcome-social',
        type: 'social_bar',
        style: {
          align: 'center',
          iconSize: '20px',
          spacing: '16px',
          iconStyle: 'circle',
          colorTheme: 'custom',
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
      },
      {
        id: 'welcome-p-footer',
        type: 'paragraph',
        content: 'If you have any questions, feel free to reply to this email. Our support team is here 24/7.',
        style: {
          fontSize: '13px',
          color: '#64748b',
          textAlign: 'center',
          lineHeight: '1.5',
          paddingTop: '10px',
          paddingBottom: '5px'
        }
      },
      {
        id: 'welcome-link-footer',
        type: 'link',
        content: 'Unsubscribe from these emails',
        style: {
          url: 'https://example.com/unsubscribe',
          textColor: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
          paddingTop: '5px',
          paddingBottom: '15px'
        }
      }
    ]
  },
  newsletter: {
    name: 'Monthly Newsletter',
    globalSettings: {
      bodyBg: '#f8fafc',
      canvasBg: '#ffffff',
      contentWidth: '600px',
      defaultFont: 'Georgia, Times, serif',
      defaultTextColor: '#1e293b'
    },
    blocks: [
      {
        id: 'news-hdr-1',
        type: 'heading',
        content: 'THE CHRONICLE',
        style: {
          level: 1,
          fontSize: '32px',
          color: '#0f172a',
          textAlign: 'center',
          lineHeight: '1.2',
          paddingTop: '25px',
          paddingBottom: '5px'
        }
      },
      {
        id: 'news-divider-hdr',
        type: 'divider',
        content: '',
        style: {
          color: '#0f172a',
          borderStyle: 'solid',
          thickness: '3px',
          width: '100%',
          paddingTop: '5px',
          paddingBottom: '15px'
        }
      },
      {
        id: 'news-p-subtitle',
        type: 'paragraph',
        content: 'Issue #42 — Curated tech insights, development tips, and updates.',
        style: {
          fontSize: '14px',
          color: '#64748b',
          textAlign: 'center',
          lineHeight: '1.4',
          paddingTop: '0px',
          paddingBottom: '15px'
        }
      },
      {
        id: 'news-img-lead',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
        style: {
          alt: 'Coding desk',
          width: '560px',
          alignment: 'center',
          paddingTop: '10px',
          paddingBottom: '15px',
          linkUrl: ''
        }
      },
      {
        id: 'news-h2-title',
        type: 'heading',
        content: 'Feature Story: The Future of Server-Side Rendering',
        style: {
          level: 2,
          fontSize: '22px',
          color: '#0f172a',
          textAlign: 'left',
          lineHeight: '1.3',
          paddingTop: '10px',
          paddingBottom: '10px'
        }
      },
      {
        id: 'news-p-lead',
        type: 'paragraph',
        content: 'Web performance metrics are increasingly tied to business conversion rates. This month, we explore how React server components, hybrid rendering pipelines, and edge-native deployments are shaping the speed of the user experience. Developers report up to 40% improvements in load times...',
        style: {
          fontSize: '15px',
          color: '#334155',
          textAlign: 'left',
          lineHeight: '1.6',
          paddingTop: '5px',
          paddingBottom: '15px'
        }
      },
      {
        id: 'news-btn-read',
        type: 'button',
        content: 'Read Full Article',
        style: {
          url: 'https://example.com/newsletter/ssr',
          backgroundColor: '#0f172a',
          textColor: '#ffffff',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '4px',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          textAlign: 'left',
          paddingTopBlock: '5px',
          paddingBottomBlock: '25px'
        }
      },
      {
        id: 'news-video',
        type: 'video_block',
        content: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
        style: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          playColor: '#ef4444',
          playStyle: 'circle',
          width: '560px',
          alignment: 'center',
          paddingTop: '15px',
          paddingBottom: '25px'
        }
      },
      {
        id: 'news-cols',
        type: 'columns_2',
        content: '',
        style: {
          paddingTop: '15px',
          paddingBottom: '15px'
        },
        column1: [
          {
            id: 'col1-img',
            type: 'image',
            content: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60',
            style: {
              alt: 'AI cybersecurity',
              width: '260px',
              alignment: 'center',
              paddingTop: '5px',
              paddingBottom: '10px',
              linkUrl: ''
            }
          },
          {
            id: 'col1-h',
            type: 'heading',
            content: 'Security Insights',
            style: {
              level: 3,
              fontSize: '18px',
              color: '#0f172a',
              textAlign: 'left',
              lineHeight: '1.3',
              paddingTop: '5px',
              paddingBottom: '5px'
            }
          },
          {
            id: 'col1-p',
            type: 'paragraph',
            content: 'Recent trends in package manager dependency confusion attacks require audit sweeps of internal feeds.',
            style: {
              fontSize: '13px',
              color: '#475569',
              textAlign: 'left',
              lineHeight: '1.5',
              paddingTop: '5px',
              paddingBottom: '10px'
            }
          }
        ],
        column2: [
          {
            id: 'col2-img',
            type: 'image',
            content: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60',
            style: {
              alt: 'Analytics charts',
              width: '260px',
              alignment: 'center',
              paddingTop: '5px',
              paddingBottom: '10px',
              linkUrl: ''
            }
          },
          {
            id: 'col2-h',
            type: 'heading',
            content: 'Growth Analytics',
            style: {
              level: 3,
              fontSize: '18px',
              color: '#0f172a',
              textAlign: 'left',
              lineHeight: '1.3',
              paddingTop: '5px',
              paddingBottom: '5px'
            }
          },
          {
            id: 'col2-p',
            type: 'paragraph',
            content: 'Optimize your landing pages by following clean user layout flows, minimizing layout shifts, and using interactive items.',
            style: {
              fontSize: '13px',
              color: '#475569',
              textAlign: 'left',
              lineHeight: '1.5',
              paddingTop: '5px',
              paddingBottom: '10px'
            }
          }
        ]
      },
      {
        id: 'news-table-pricing',
        type: 'table',
        headers: ['Plan tier', 'Monthly price', 'Key benefit'],
        rows: [
          ['Developer Pro', '$19 / mo', 'Full API Access & 24/7 Support'],
          ['Team Premium', '$49 / mo', 'Collaborative Spaces & Multi-user Seats'],
          ['Enterprise Cloud', 'Custom Pricing', 'Dedicated Infrastructure & SLA']
        ],
        style: {
          headerBg: '#0f172a',
          headerColor: '#ffffff',
          rowBgOdd: '#ffffff',
          rowBgEven: '#f8fafc',
          borderColor: '#e2e8f0',
          cellPadding: '10px',
          fontSize: '13px',
          textColor: '#475569'
        }
      },
      {
        id: 'news-divider-ftr',
        type: 'divider',
        content: '',
        style: {
          color: '#e2e8f0',
          borderStyle: 'solid',
          thickness: '1px',
          width: '100%',
          paddingTop: '20px',
          paddingBottom: '20px'
        }
      },
      {
        id: 'news-social',
        type: 'social_bar',
        style: {
          align: 'center',
          iconSize: '20px',
          spacing: '12px',
          iconStyle: 'plain',
          colorTheme: 'dark',
          paddingTop: '15px',
          paddingBottom: '15px'
        },
        platforms: [
          { name: 'facebook', url: 'https://facebook.com', enabled: true },
          { name: 'twitter', url: 'https://twitter.com', enabled: true },
          { name: 'linkedin', url: 'https://linkedin.com', enabled: true }
        ]
      },
      {
        id: 'news-footer-p',
        type: 'paragraph',
        content: '© 2026 The Chronicle. All rights reserved. 123 Dev Lane, Silicon Valley.',
        style: {
          fontSize: '12px',
          color: '#64748b',
          textAlign: 'center',
          lineHeight: '1.5',
          paddingTop: '5px',
          paddingBottom: '5px'
        }
      }
    ]
  },
  blank: {
    name: 'Blank Canvas',
    globalSettings: {
      bodyBg: '#f8fafc',
      canvasBg: '#ffffff',
      contentWidth: '600px',
      defaultFont: 'Arial, sans-serif',
      defaultTextColor: '#333333'
    },
    blocks: [
      {
        id: 'blank-heading',
        type: 'heading',
        content: 'Start Building Your Template',
        style: {
          level: 1,
          fontSize: '26px',
          color: '#334155',
          textAlign: 'center',
          lineHeight: '1.3',
          paddingTop: '40px',
          paddingBottom: '10px'
        }
      },
      {
        id: 'blank-p',
        type: 'paragraph',
        content: 'Drag elements from the left panel or click them to add blocks here. Select any block to customize its inline styles in the panel on the right.',
        style: {
          fontSize: '15px',
          color: '#64748b',
          textAlign: 'center',
          lineHeight: '1.6',
          paddingTop: '10px',
          paddingBottom: '40px'
        }
      }
    ]
  }
};
