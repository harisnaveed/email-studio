/**
 * Compiles the builder's state into a responsive, table-based HTML email template
 * using strict inline CSS styling for maximum client compatibility.
 */
export function generateEmailHTML(blocks, globalSettings) {
  const {
    bodyBg = '#f4f4f5',
    canvasBg = '#ffffff',
    contentWidth = '600px',
    defaultFont = 'Arial, sans-serif',
    defaultTextColor = '#333333'
  } = globalSettings;

  // Compile helper to turn specific blocks into HTML
  const compileBlocks = (blocksList, isNested = false) => {
    return blocksList.map(block => {
      // Setup padding overrides (nested columns have reduced side padding)
      const px = isNested ? '0' : '20px';
      
      switch (block.type) {
        case 'heading': {
          const level = block.style.level || 1;
          const tag = `h${level}`;
          const fontSize = block.style.fontSize || (level === 1 ? '28px' : level === 2 ? '22px' : '18px');
          const color = block.style.color || defaultTextColor;
          const textAlign = block.style.textAlign || 'left';
          const lineHeight = block.style.lineHeight || '1.3';
          const paddingTop = block.style.paddingTop || '10px';
          const paddingBottom = block.style.paddingBottom || '10px';

          return `
            <tr>
              <td style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px}; text-align: ${textAlign};">
                <${tag} style="font-family: ${defaultFont}; font-size: ${fontSize}; color: ${color}; line-height: ${lineHeight}; text-align: ${textAlign}; font-weight: bold; margin: 0; padding: 0;">
                  ${block.content}
                </${tag}>
              </td>
            </tr>
          `;
        }

        case 'paragraph': {
          const fontSize = block.style.fontSize || '16px';
          const color = block.style.color || defaultTextColor;
          const textAlign = block.style.textAlign || 'left';
          const lineHeight = block.style.lineHeight || '1.6';
          const paddingTop = block.style.paddingTop || '5px';
          const paddingBottom = block.style.paddingBottom || '5px';

          // Preserve newlines as <br/>
          const formattedContent = block.content.replace(/\n/g, '<br />');

          return `
            <tr>
              <td style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px}; text-align: ${textAlign};">
                <p style="font-family: ${defaultFont}; font-size: ${fontSize}; color: ${color}; line-height: ${lineHeight}; text-align: ${textAlign}; margin: 0; padding: 0;">
                  ${formattedContent}
                </p>
              </td>
            </tr>
          `;
        }

        case 'button': {
          const url = block.style.url || '#';
          const backgroundColor = block.style.backgroundColor || '#7c3aed';
          const textColor = block.style.textColor || '#ffffff';
          const fontSize = block.style.fontSize || '16px';
          const fontWeight = block.style.fontWeight || 'bold';
          const borderRadius = block.style.borderRadius || '6px';
          
          const paddingTop = block.style.paddingTop || '12px';
          const paddingBottom = block.style.paddingBottom || '12px';
          const paddingLeft = block.style.paddingLeft || '24px';
          const paddingRight = block.style.paddingRight || '24px';
          
          const textAlign = block.style.textAlign || 'center';
          const paddingTopBlock = block.style.paddingTopBlock || '15px';
          const paddingBottomBlock = block.style.paddingBottomBlock || '15px';

          const shadowStyle = block.style.neumorphicShadow
            ? 'box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12), -4px -4px 8px rgba(255, 255, 255, 0.6);'
            : '';

          return `
            <tr>
              <td align="${textAlign}" style="padding-top: ${paddingTopBlock}; padding-bottom: ${paddingBottomBlock}; padding-left: ${px}; padding-right: ${px};">
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:${parseInt(paddingTop) * 2 + parseInt(fontSize)}px;v-text-anchor:middle;width:200px;" arcsize="${parseInt(borderRadius) * 2}%" stroke="f" fillcolor="${backgroundColor}">
                  <w:anchorlock/>
                  <center style="color:${textColor};font-family:${defaultFont};font-size:${fontSize};font-weight:${fontWeight};">
                    ${block.content}
                  </center>
                </v:roundrect>
                <![endif]-->
                <!--[if !mso]><!-->
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; display: inline-block; border-radius: ${borderRadius}; ${shadowStyle}">
                  <tr>
                    <td align="center" bgcolor="${backgroundColor}" style="border-radius: ${borderRadius};">
                      <a href="${url}" target="_blank" style="font-family: ${defaultFont}; font-size: ${fontSize}; font-weight: ${fontWeight}; color: ${textColor}; text-decoration: none; padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}; display: inline-block; border-radius: ${borderRadius}; border: 1px solid ${backgroundColor};">
                        ${block.content}
                      </a>
                    </td>
                  </tr>
                </table>
                <!--<![endif]-->
              </td>
            </tr>
          `;
        }

        case 'link': {
          const url = block.style.url || '#';
          const textColor = block.style.textColor || '#2563eb';
          const fontSize = block.style.fontSize || '15px';
          const textAlign = block.style.textAlign || 'center';
          const paddingTop = block.style.paddingTop || '5px';
          const paddingBottom = block.style.paddingBottom || '5px';

          return `
            <tr>
              <td style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px}; text-align: ${textAlign};">
                <a href="${url}" target="_blank" style="font-family: ${defaultFont}; font-size: ${fontSize}; color: ${textColor}; text-decoration: underline;">
                  ${block.content}
                </a>
              </td>
            </tr>
          `;
        }

        case 'image': {
          const url = block.content || 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=60';
          const alt = block.style.alt || 'Template image';
          const width = block.style.width || '100%';
          const alignment = block.style.alignment || 'center';
          const paddingTop = block.style.paddingTop || '10px';
          const paddingBottom = block.style.paddingBottom || '10px';
          const linkUrl = block.style.linkUrl || '';

          const imgHTML = `<img src="${url}" alt="${alt}" width="${width.replace('px', '')}" style="display: block; max-width: 100%; height: auto; border: 0; outline: none; text-decoration: none; margin: ${alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0 auto 0 0'};" />`;

          return `
            <tr>
              <td align="${alignment}" style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                ${linkUrl ? `<a href="${linkUrl}" target="_blank" style="text-decoration: none; display: inline-block;">${imgHTML}</a>` : imgHTML}
              </td>
            </tr>
          `;
        }

        case 'divider': {
          const color = block.style.color || '#e2e8f0';
          const borderStyle = block.style.borderStyle || 'solid';
          const thickness = block.style.thickness || '1px';
          const width = block.style.width || '100%';
          const paddingTop = block.style.paddingTop || '15px';
          const paddingBottom = block.style.paddingBottom || '15px';

          return `
            <tr>
              <td align="center" style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" width="${width}" style="border-collapse: collapse; border-top: ${thickness} ${borderStyle} ${color}; font-size: 1px; line-height: 1px;">
                  <tr>
                    <td style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'spacer': {
          const height = block.style.height || '20px';
          return `
            <tr>
              <td height="${parseInt(height)}" style="font-size: 1px; line-height: 1px; height: ${height};">&nbsp;</td>
            </tr>
          `;
        }

        case 'card': {
          const cardStyle = block.style || {};
          const cardBg = cardStyle.backgroundColor || '#f8fafc';
          const borderThickness = cardStyle.borderThickness || '1px';
          const borderStyle = cardStyle.borderStyle || 'solid';
          const borderColor = cardStyle.borderColor || '#e2e8f0';
          const leftBorderThickness = cardStyle.leftBorderThickness || '0px';
          const leftBorderColor = cardStyle.leftBorderColor || '#7c3aed';
          const borderRadius = cardStyle.borderRadius || '8px';
          
          const paddingTop = cardStyle.paddingTop || '16px';
          const paddingBottom = cardStyle.paddingBottom || '16px';
          const paddingLeft = cardStyle.paddingLeft || '20px';
          const paddingRight = cardStyle.paddingRight || '20px';

          const titleColor = cardStyle.titleColor || '#0f172a';
          const textColor = cardStyle.textColor || '#475569';

          const formattedContent = block.content.replace(/\n/g, '<br />');

          const buttonHTML = cardStyle.showButton
            ? `
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 12px;">
                <tr>
                  <td align="center" bgcolor="${cardStyle.buttonBg || '#7c3aed'}" style="border-radius: ${cardStyle.buttonBorderRadius || '6px'};">
                    <a href="${cardStyle.buttonUrl || '#'}" target="_blank" style="font-family: ${defaultFont}; font-size: 13.5px; font-weight: bold; color: ${cardStyle.buttonTextColor || '#ffffff'}; text-decoration: none; padding: 8px 16px; display: inline-block; border-radius: ${cardStyle.buttonBorderRadius || '6px'}; border: 1px solid ${cardStyle.buttonBg || '#7c3aed'};">
                      ${cardStyle.buttonText || 'Click Here'}
                    </a>
                  </td>
                </tr>
              </table>
            `
            : '';

          return `
            <tr>
              <td style="padding-top: 10px; padding-bottom: 10px; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${cardBg}; border: ${borderThickness} ${borderStyle} ${borderColor}; border-left: ${leftBorderThickness} solid ${leftBorderColor}; border-radius: ${borderRadius}; border-collapse: separate; width: 100%;">
                  <tr>
                    <td style="padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};">
                      <div style="font-family: ${defaultFont}; font-size: 17px; font-weight: bold; color: ${titleColor}; margin-bottom: 8px; line-height: 1.3;">
                        ${block.title || 'Alert'}
                      </div>
                      <div style="font-family: ${defaultFont}; font-size: 14px; color: ${textColor}; line-height: 1.5;">
                        ${formattedContent}
                      </div>
                      ${buttonHTML}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'table': {
          const tableStyle = block.style || {};
          const headers = block.headers || [];
          const rows = block.rows || [];
          
          const headerBg = tableStyle.headerBg || '#7c3aed';
          const headerColor = tableStyle.headerColor || '#ffffff';
          const rowBgOdd = tableStyle.rowBgOdd || '#ffffff';
          const rowBgEven = tableStyle.rowBgEven || '#f8fafc';
          const borderColor = tableStyle.borderColor || '#e2e8f0';
          const cellPadding = tableStyle.cellPadding || '10px';
          const fontSize = tableStyle.fontSize || '14px';
          const textColor = tableStyle.textColor || '#334155';

          const headersHTML = headers.map(hdr => `
            <th align="left" style="padding: ${cellPadding}; border-bottom: 2px solid ${borderColor}; font-family: ${defaultFont}; font-size: ${fontSize}; font-weight: bold;">
              ${hdr}
            </th>
          `).join('');

          const rowsHTML = rows.map((row, rIdx) => {
            const rowBg = rIdx % 2 === 0 ? rowBgOdd : rowBgEven;
            const cellsHTML = row.map(cell => `
              <td style="padding: ${cellPadding}; border-bottom: 1px solid ${borderColor}; font-family: ${defaultFont}; font-size: ${fontSize};">
                ${cell}
              </td>
            `).join('');
            
            return `
              <tr bgcolor="${rowBg}">
                ${cellsHTML}
              </tr>
            `;
          }).join('\n');

          return `
            <tr>
              <td style="padding-top: 15px; padding-bottom: 15px; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width: 100%; color: ${textColor};">
                  <thead>
                    <tr bgcolor="${headerBg}" style="color: ${headerColor};">
                      ${headersHTML}
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHTML}
                  </tbody>
                </table>
              </td>
            </tr>
          `;
        }

        case 'columns_2': {
          const paddingTop = block.style.paddingTop || '15px';
          const paddingBottom = block.style.paddingBottom || '15px';
          
          const col1Blocks = block.column1 || [];
          const col2Blocks = block.column2 || [];
          
          const col1HTML = compileBlocks(col1Blocks, true);
          const col2HTML = compileBlocks(col2Blocks, true);

          return `
            <tr>
              <td style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                  <tr>
                    <td class="col-stack" width="48%" valign="top" style="width: 48%; padding-bottom: 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        ${col1HTML || `
                          <tr>
                            <td align="center" style="padding: 10px; border: 1px dashed #cbd5e1; font-family: ${defaultFont}; font-size: 13px; color: #94a3b8;">
                              Column 1
                            </td>
                          </tr>
                        `}
                      </table>
                    </td>
                    <td class="col-spacer" width="4%" style="width: 4%; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    <td class="col-stack" width="48%" valign="top" style="width: 48%; padding-bottom: 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        ${col2HTML || `
                          <tr>
                            <td align="center" style="padding: 10px; border: 1px dashed #cbd5e1; font-family: ${defaultFont}; font-size: 13px; color: #94a3b8;">
                              Column 2
                            </td>
                          </tr>
                        `}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'social_bar': {
          const platforms = block.platforms || [];
          const align = block.style.align || 'center';
          const iconSizeVal = parseInt(block.style.iconSize) || 24;
          const spacingVal = parseInt(block.style.spacing) || 16;
          const iconStyle = block.style.iconStyle || 'circle';
          const colorTheme = block.style.colorTheme || 'custom';
          const customColor = block.style.customColor || '#7c3aed';
          
          const paddingTop = block.style.paddingTop || '15px';
          const paddingBottom = block.style.paddingBottom || '15px';

          const activePlatforms = platforms.filter(p => p.enabled);
          if (activePlatforms.length === 0) return '';

          const getColors = (name) => {
            let bg = 'transparent';
            let fg = '7c3aed';

            if (colorTheme === 'original') {
              if (name === 'facebook') bg = '1877F2';
              else if (name === 'twitter') bg = '0f1419';
              else if (name === 'instagram') bg = 'E4405F';
              else if (name === 'linkedin') bg = '0A66C2';
              else if (name === 'youtube') bg = 'FF0000';
            } else if (colorTheme === 'dark') {
              bg = '334155';
              fg = bg;
            } else if (colorTheme === 'light') {
              bg = 'e2e8f0';
              fg = '475569';
            } else {
              bg = customColor.replace('#', '');
              fg = bg;
            }

            return { bg: '#' + bg, fg };
          };

          const iconsHTML = activePlatforms.map((p, idx) => {
            const { bg, fg } = getColors(p.name);
            
            let icons8Name = p.name;
            if (p.name === 'facebook') icons8Name = 'facebook-new';
            else if (p.name === 'twitter') icons8Name = 'twitterx';
            else if (p.name === 'instagram') icons8Name = 'instagram-new';
            else if (p.name === 'youtube') icons8Name = 'youtube-play';

            let imgUrl;
            if (colorTheme === 'original') {
              imgUrl = `https://img.icons8.com/color/${iconSizeVal * 2}/${icons8Name}.png`;
            } else if (colorTheme === 'light') {
              imgUrl = `https://img.icons8.com/ios-filled/${iconSizeVal * 2}/475569/${icons8Name}.png`;
            } else {
              imgUrl = `https://img.icons8.com/ios-filled/${iconSizeVal * 2}/${fg}/${icons8Name}.png`;
            }

            const cellDim = Math.round(iconSizeVal * 1.6);
            const radius = iconStyle === 'circle' ? '50%' : iconStyle === 'square' ? '6px' : '0';
            const cellBg = iconStyle === 'plain' ? 'transparent' : bg;

            const separatorCell = idx > 0 ? `<td width="${spacingVal}" style="width: ${spacingVal}px; font-size: 1px; line-height: 1px;">&nbsp;</td>` : '';

            return `
              ${separatorCell}
              <td align="center" valign="middle" bgcolor="${cellBg}" style="background-color: ${cellBg}; border-radius: ${radius}; width: ${cellDim}px; height: ${cellDim}px; padding: 0; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <a href="${p.url}" target="_blank" style="text-decoration: none; display: block; height: ${cellDim}px; width: ${cellDim}px; line-height: ${cellDim}px;">
                  <img src="${imgUrl}" width="${iconSizeVal}" height="${iconSizeVal}" alt="${p.name}" style="display: inline-block; vertical-align: middle; border: 0; outline: none; text-decoration: none;" />
                </a>
              </td>
            `;
          }).join('');

          return `
            <tr>
              <td align="${align}" style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; display: inline-block; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tr>
                    ${iconsHTML}
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'video_block': {
          const coverUrl = block.content || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';
          const videoUrl = block.style.videoUrl || '#';
          const align = block.style.alignment || 'center';
          const width = block.style.width || '550px';
          const playColor = block.style.playColor || '#ef4444';
          const playStyle = block.style.playStyle || 'circle';
          
          const paddingTop = block.style.paddingTop || '15px';
          const paddingBottom = block.style.paddingBottom || '15px';

          const bgPlay = playStyle === 'rectangular' ? playColor : playStyle === 'circle' ? playColor : 'transparent';
          const radPlay = playStyle === 'rectangular' ? '8px' : '50%';
          const borderPlay = playStyle === 'triangle' ? `4px solid ${playColor}` : 'none';

          return `
            <tr>
              <td align="${align}" style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" width="${width.replace('px', '')}" style="border-collapse: collapse; width: ${width}; max-width: 100%;">
                  <tr>
                    <td align="center" style="position: relative;">
                      <a href="${videoUrl}" target="_blank" style="text-decoration: none; display: block; border: 0; outline: none;">
                        <img src="${coverUrl}" width="${width.replace('px', '')}" style="display: block; width: 100%; border: 0; max-width: 100%; border-radius: 6px;" alt="Play video" />
                        <span style="position: absolute; top: 50%; left: 50%; margin-top: -30px; margin-left: -30px; display: inline-block; width: 60px; height: 60px; line-height: 60px; background-color: ${bgPlay}; border-radius: ${radPlay}; border: ${borderPlay}; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); vertical-align: middle;">
                          <img src="https://img.icons8.com/ios-glyphs/60/ffffff/play.png" width="30" height="30" style="display: inline-block; margin-top: 15px; border: 0; outline: none; text-decoration: none; vertical-align: top;" alt="Play" />
                        </span>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'sender_signature': {
          const name = block.name || 'Sarah Jenkins';
          const title = block.title || '';
          const company = block.company || '';
          const phone = block.phone || '';
          const website = block.website || '';
          
          const avatarUrl = block.style.avatarUrl || '';
          const avatarSize = parseInt(block.style.avatarSize) || 60;
          const avatarRadius = block.style.avatarRadius || '50%';
          const textColor = block.style.textColor || '#334155';
          const accentColor = block.style.accentColor || '#7c3aed';
          const fontSizeVal = block.style.fontSize || '14px';
          const borderLeftThickness = block.style.borderLeftThickness || '3px';
          const borderLeftColor = block.style.borderLeftColor || '#7c3aed';
          
          const paddingTop = block.style.paddingTop || '20px';
          const paddingBottom = block.style.paddingBottom || '20px';

          const accentBorderStyle = `${borderLeftThickness} solid ${borderLeftColor}`;

          return `
            <tr>
              <td style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; text-align: left; border-left: ${accentBorderStyle};">
                  <tr>
                    <td style="padding-left: 16px;">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          ${avatarUrl ? `
                            <td valign="top" style="padding-right: 16px; width: ${avatarSize}px;">
                              <img src="${avatarUrl}" width="${avatarSize}" height="${avatarSize}" style="display: block; border-radius: ${avatarRadius}; border: 0; max-width: ${avatarSize}px; object-fit: cover;" alt="${name}" />
                            </td>
                          ` : ''}
                          <td valign="middle" style="font-family: ${defaultFont}; font-size: ${fontSizeVal}; color: ${textColor}; line-height: 1.4;">
                            <div style="font-weight: bold; font-size: 16px; color: ${accentColor}; margin-bottom: 2px;">${name}</div>
                            <div style="font-style: italic; margin-bottom: 2px;">${title}</div>
                            <div style="font-weight: 600; margin-bottom: 2px;">${company}</div>
                            <div style="margin-top: 4px; font-size: 12px; opacity: 0.85;">
                              ${phone ? `<span>${phone}</span>` : ''}
                              ${phone && website ? ' &nbsp;|&nbsp; ' : ''}
                              ${website ? `<a href="${website}" target="_blank" style="color: ${accentColor}; text-decoration: underline;">${website.replace('https://', '').replace('http://', '')}</a>` : ''}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'nav_menu': {
          const items = block.items || [];
          const align = block.style.align || 'center';
          const fontSizeVal = block.style.fontSize || '14px';
          const textColor = block.style.textColor || '#475569';
          const dividerType = block.style.dividerType || 'pipe';
          const itemSpacingVal = parseInt(block.style.itemSpacing) || 12;
          
          const paddingTop = block.style.paddingTop || '15px';
          const paddingBottom = block.style.paddingBottom || '15px';

          const getDividerChar = () => {
            if (dividerType === 'pipe') return '|';
            if (dividerType === 'slash') return '/';
            if (dividerType === 'bullet') return '•';
            return '';
          };

          const dividerChar = getDividerChar();

          const linksHTML = items.map((item, idx) => {
            const separatorHTML = dividerChar && idx > 0 
              ? `<td style="font-family: ${defaultFont}; font-size: ${fontSizeVal}; color: ${textColor}; padding: 0 ${itemSpacingVal}px; opacity: 0.5;">${dividerChar}</td>`
              : '';

            return `
              ${separatorHTML}
              <td align="center" style="font-family: ${defaultFont}; font-size: ${fontSizeVal};">
                <a href="${item.url}" target="_blank" style="color: ${textColor}; text-decoration: none; font-weight: bold; padding: 5px 0; display: inline-block;">
                  ${item.text}
                </a>
              </td>
            `;
          }).join('');

          return `
            <tr>
              <td align="${align}" style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; display: inline-block;">
                  <tr>
                    ${linksHTML}
                  </tr>
                </table>
              </td>
            </tr>
          `;
        }

        case 'raw_html': {
          const paddingTop = block.style.paddingTop || '15px';
          const paddingBottom = block.style.paddingBottom || '15px';
          return `
            <tr>
              <td style="padding-top: ${paddingTop}; padding-bottom: ${paddingBottom}; padding-left: ${px}; padding-right: ${px};">
                ${block.content || ''}
              </td>
            </tr>
          `;
        }

        default:
          return '';
      }
    }).join('\n');
  };

  const bodyContentHTML = compileBlocks(blocks, false);

  // Return the full responsive email template
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <title>Email Template</title>
  <style type="text/css">
    /* Universal resets */
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    
    /* Responsive styles */
    @media screen and (max-width: ${parseInt(contentWidth) + 40}px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
      .col-stack {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        padding-bottom: 20px !important;
      }
      .col-spacer {
        display: none !important;
      }
    }
  </style>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: ${bodyBg};">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${bodyBg}; font-family: ${defaultFont}; color: ${defaultTextColor}; margin: 0; padding: 0; border-collapse: collapse;">
    <tr>
      <td align="center" valign="top" style="padding: 20px 0;">
        <!-- Centered Container -->
        <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="${contentWidth}" style="width: ${contentWidth}; max-width: 100%; background-color: ${canvasBg}; border-collapse: collapse; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin: 0 auto;">
          ${bodyContentHTML}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
