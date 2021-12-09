/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { debounce } from 'lodash';
import styled, { createGlobalStyle } from 'styled-components';
import { Controller, createPerfLazyRenderPlugin } from '@ali/4ever-cangjie';
import { Select } from '@ali/we-design';
import { Serializer as Mo, createMoPlugins } from '@ali/4ever-mo';
import {
  Provider,
  Content,
  NewToolbar,
  plugins,
  cardFactory,
  ColumnsPlugin,
  createCustomizedBiPlugins,
  ImagePlugin,
  CommentPlugin,
  CalloutPlugin,
  locale_zh_CN as locale,
  MentionPlugin,
  LeftToolbar,
} from '@ali/4ever-bi';
import asl from './asl.json';
import selectFile from './utils/selectFile';
import { renderInsertMenu } from './menubar';
import '@ali/4ever-bamboo/styles';
import './index.less';
import { DocToolbarTextNormal } from '@ali/we-icon';

const style: React.CSSProperties = {
  width: '768px',
  minHeight: '600px',
  margin: '16px auto',
  padding: '96px 72px',
  border: '1px solid #e8e8e8',
  background: '#fff',
  boxShadow: '0 1px 10px rgba(0, 0, 0, 0.12)',
};

const leftToolbarConfig = [
  {
    key: 'draggable',
  },
  {
    key: 'newlineGuide',
  },
];


const BaseCardWapper = styled.div<{ focusBackgroundColor?: string }>`
  text-align: center;
  border-radius: 15px;
  height: 100%;
  cursor: auto;
  background-color: ${(props) => props.focusBackgroundColor || 'rgb(245, 246, 249)'};
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F6F6F7;
  }
`;

const mo = Mo({
  plugins: createMoPlugins({
    paragraph: {
      useWebLineHeight: false,
    },
  }),
});

const IS_WEB_MODE = true;

const MOCK_UPLOADED_IMAGE =
  'https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/12245659213/2142502792/87ef0906-05b8-4bf8-9f3d-0ad4a158fcc4';

let counter = 0;
const demoCardPlugin = cardFactory((config) => {
  return {
    cardType: 'demo',
    renderNode: (props, controller: Controller) => {
      // throw new Error('test for unknownCard!');
    },
  };
});
const voteCardPlugin = cardFactory((config) => {
  return {
    cardType: 'vote',
    renderNode: (props, controller: Controller) => {
      return <BaseCardWapper {...props}>投票卡片</BaseCardWapper>;
    },
  };
});

const quickInsertMention = MentionPlugin.quickInsert;
const createBiPlugins = createCustomizedBiPlugins({
  lazyRender: createPerfLazyRenderPlugin,
  comment: CommentPlugin,
  columns: ColumnsPlugin,
  callout: CalloutPlugin,
  ...plugins,
  demoCardPlugin,
  voteCardPlugin,
  quickInsertMention,
});

const getDefaultLinkCardInfo = () => new Promise<any>((resolve, reject) => {
  setTimeout(() => {
    if (false) {
      resolve({ imgURL: 'https://gw.alicdn.com/tfs/TB1WX3LLwHqK1RjSZFEXXcGMXXa-200-200.png' });
    } else {
      reject();
    }
  }, 1000);
});

const mockComments = [];
let onCommentsChanged;

class Basic extends React.Component {
  renderGuideMenu = () => {
    return renderInsertMenu();
  };

  private readonly plugins = createBiPlugins({
    ...locale,
    basic: {
      serializer: mo,
    },
    clearStyle: {
      ignores: [CommentPlugin.types.MARK_TYPE_DATA],
    },
    link: {
      locale: locale.link.locale,
      getLinkInfo: getDefaultLinkCardInfo,
      enableCard: true,
      enableLinkCardBlock: true,
    },
    templateButton: {
      ...locale.templateButton,
      enable: {
        direction: true,
        isOnce: true,
      },
    },
    draggable: {
      ...locale.draggable,
      enabled: true,
      getCopyURL: (id) => `${location.href}${location.search ? '&' : '?'}subjectId=${id}`,
      forbiddenElements: {
        card_unknown: true,
      },
      extraTransformMenu: [{
        menuKey: 'heading.paragraph',
        title: 'demo',
        icon: <DocToolbarTextNormal />,
      }],
      draggableInlineElements: {
        image: true,
        mention: true,
        link_card: true,
        tag: true,
      },
    },
    newlineGuide: {
      ...locale.newlineGuide,
      enabled: true,
      enableKeyboard: true,
      renderGuideMenu: this.renderGuideMenu,
    },
    clipboard: {
      serializer: mo,
    },
    imTag: {
      locale: {
        imFrom: '来自会话adsfas',
      },
      jumpToConversition: (cid) => {
        console.log('跳转至im对话框：', cid);
      },
      getConversitionNameFromCid: (cid) => {
        return new Promise((success) => {
          success({ success: true, imTitle: new Date().getTime() });
        });
      },
    },
    quickInsert: {
      ...locale.quickInsert,
      triggers: {
        '@': 'mention',
      },
      groups: [
        {
          title: '提及(@)',
          key: '@',
          items: ['quickInsertMention'],
        },
        {
          title: '插入内容（+）',
          key: 'content',
          items: [
            'image',
            // 'table',
            'embed',
            'code',
          ],
        },
        {
          title: '插入格式',
          key: 'format',
          items: [
            'blockquote',
            'link',
            'hr',
          ],
        },
      ],
    },
    heading: {
      ...locale.heading,
    },
    image: {
      ...locale.image,
      onInit: (src) => console.log('onInit Bi PC', src),
      onLoad: (src) => console.log('onLoad Bi PC', src),
      onError: (src) => console.log('onError Bi PC', src),
      uploadImage: (file, id, notifyProgress) => this.handleUploadImage(file, id, notifyProgress),
      previewImage: (url) => this.handleZoomImage(url),
      downloadImage: (url) => this.handleDownloadImage(url),
      // getImageSize: url => this.getImageSize(url),
      // getIsStretchMode: () => true,
      transformImageURL: (url) => {
        return `${url}?v=123`;
      },
      shouldProcessExif: (url: string) => {
        return url && url.includes('alidocs');
      },
      shouldTransferImageURL: (url: string) => {
        return (
          url &&
          !url.includes('alidocs') &&
          !url.includes('static.dingtalk.com')
        );
      },
      transferImageURL: (url: string) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            counter += 1;
            if (counter % 3 === 0) {
              // 转存失败
              console.log('transfer image error: ', url);
              reject(new Error('transfer error'));
            } else if (counter % 3 === 1) {
              // 转存成功,加载失败
              console.log('transfer image success, but load error: ', url);
              resolve({
                url: 'https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/13972286228/2142502792/3d3b9615-d7ae-4739-b649-215d819928ffxxxxxxxxxxxxxxxx',
              });
            } else {
              console.log('transfer image success, load image success: ', url);
              // 转存成功,加载成功
              resolve({
                url: 'https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/13972286228/2142502792/3d3b9615-d7ae-4739-b649-215d819928ff',
              });
            }
          }, 1500);
        });
      },
      shouldInsert: (file: File) => {
        console.log('file', file);
        const size = file.size / 1024 / 1024;
        console.log('size', size);
        if (size > 5) {
          alert('图片超过最大限制');
          return false;
        }
      },
    },
    placeholder: {
      ...locale.placeholder,
      renderText: (name: string) => `此${name}暂无法解析`,
    },
    mention: {
      ...locale.mention,
      getMentionId() {
        return '';
      },
      searchSuggestions: (keyword, callback) => this.handleMentionSearch(keyword, callback),
      onSuggestionSelected: (suggestion, callback) => this.handleMentionSelect(suggestion, callback),
      loadMoreSuggestions: (keyword, offset, callback) => this.handleNextPage(keyword, offset, callback),
      popupOptions: {
        offsetBottom: 0,
        alignment: 'bottom',
        suggestionWidth: 300,
      },
      onMentionClick: (node) => { console.log('onMentionClick', node); },
      onMentionHover: (node) => { console.log('onMentionHover', node); },
    },
    calendarCard: {
      locale: {
        refresh: '刷新',
        refreshTips: '日程卡片有更新',
        receiverCount: '等{count}人参会',
        viewCalendardetails: '查看日程详情',
        noresponse: '未响应',
        received: '已接收',
        refused: '已拒绝',
        pending: '待定',
        organizer: '组织人',
      },
      jumpToCalendar: (link?: string) => {
        console.log('跳转到日程的链接为：', link);
      },
      openProfile: (uid: number) => {
        console.log('打开Profile参数为：', uid);
      },
      jumpToAttachment: (url: string) => {
        console.log('打开附件的地址为：', url);
      },
      refresh: (calendarId: string) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              status: 'success',
              message: 'success',
              data: {
                calendarId: 19439192,
                comment: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述',
                totalCount: 2,
                place: '10-3-2',
                redirectUrl: '跳转链接地址233',
                startTime: 1598572800000,
                endTime: 1598659200000,
                timezone: 'Asia/Shanghai',
                time: '08月30日 周日 09:00 - 10:30',
                subject: '日程模板测试-会议纪要',
                topReceivers: [
                  {
                    name: 'qiuhongzhan',
                    type: 1,
                    uid: 3208003,
                  },
                  {
                    name: '童岭',
                    type: 0,
                    uid: 3452016,
                  },
                  {
                    name: '平澜',
                    type: 1,
                    uid: 3452116,
                  }, {
                    name: '墨朽',
                    type: 3,
                    uid: 3451116,
                  },
                ],
                attachments: [
                  {
                    type: 7,
                    fileName: '市场营销方案1.png',
                    authMediaId: '1',
                  },
                  {
                    type: 7,
                    fileName: '测试文档2.png',
                    authMediaId: '111',
                  }, {
                    type: 7,
                    fileName: '市场营销方案3.png',
                    authMediaId: '2',
                  },
                  {
                    type: 7,
                    fileName: '测试文档4.png',
                    authMediaId: '2222',
                  }, {
                    type: 7,
                    fileName: '市场营销方案5.png',
                    authMediaId: '3',
                  },
                  {
                    type: 7,
                    fileName: '测试文档6.png',
                    authMediaId: '333',
                  }, {
                    type: 7,
                    fileName: '市场营销方案7.png',
                    authMediaId: '4',
                  },
                  {
                    type: 7,
                    fileName: '测试文档8.png',
                    authMediaId: '444',
                  }, {
                    type: 7,
                    fileName: '市场营销方案9.png',
                    authMediaId: '5',
                  },
                  {
                    type: 7,
                    fileName: '测试文档10.png',
                    authMediaId: '555',
                  },
                ],
              },
            });
          }, 1000);
        });
      },
    },
    voteCard: {},
    comment: {
      sendComment: (req) => {
        const { content, contentId, replyId } = req;
        return new Promise((resolve) => {
          mockComments.push({
            id: '123',
            date: '12-25',
            author: '多鱼',
            content,
            contentId,
            replyId,
          });
          setTimeout(() => {
            resolve();
            onCommentsChanged && onCommentsChanged();
          }, 100);
        });
      },
      getCommentList: (contentId: string) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockComments.filter((c) => c.contentId === contentId));
          }, 0);
        });
      },
      fetchCachedComment: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockComments);
          }, 0);
        });
      },
      onCommentsChangeRef: (ref: any) => {
        // @ts-ignore
        onCommentsChanged = ref;
      },
    },
  });

  state = {
    value: mo.jsonMLToValue(asl),
    zoom: 1,
    defaultSuggestions: [
      {
        name: '又清0',
        login: '0',
        avatarUrl:
          'https://static.dingtalk.com/media/lADPBbCc1h2tUUPNA8DNA74_958_960.jpg_60x60q90.jpg',
      },
      {
        name: '又清1',
        login: '1',
        avatarUrl:
          'https://static.dingtalk.com/media/lADPBbCc1h2tUUPNA8DNA74_958_960.jpg_60x60q90.jpg',
      },
    ],
    suggestions: [],
  };

  editorRef = React.createRef();

  handleAction = (action, controller: Controller, next) => {
    const { type } = action;
    if (type === ImagePlugin.actions.IMAGE_SELECT) {
      selectFile().then((file: File) => {
        return controller.command('insertImageFile', file);
      });
      return;
    }
    return next();
  };

  getControllerRef = (controller) => {
    (window as any).controller = controller;
  };

  handleChange = (change) => {
    this.setState({
      value: change.value,
    });
  };

  handleUploadImage = (file, id, notifyProgress) => {
    const fire = this.createFireProgress(notifyProgress);
    fire(20, 100);
    fire(50, 500);
    fire(80, 800);
    fire(100, 1100);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ url: MOCK_UPLOADED_IMAGE }), 1500);
    });
  };

  createFireProgress = (notifyProgress) => {
    return (percent, delay) => {
      setTimeout(() => {
        notifyProgress(percent);
      }, delay);
    };
  };

  handleZoomImage = (url) => {
    console.warn('Missing `onZoomImage`', url);
  };

  handleDownloadImage = (url) => {
    console.warn('Missing `onDownloadImage`', url);
  };

  handleMentionSearch = debounce((keyword, callback) => {
    const { defaultSuggestions } = this.state;
    if (!keyword) {
      callback(defaultSuggestions);
      return;
    }
    setTimeout(() => {
      const mockSuggestions = [];
      for (let i = 0; i < 10; i += 1) {
        mockSuggestions.push({
          name: `${keyword} ${i}`,
          login: `${i}`,
          avatarUrl:
            'https://static.dingtalk.com/media/lADPBbCc1h2tUUPNA8DNA74_958_960.jpg_60x60q90.jpg',
        });
      }

      callback(mockSuggestions);
    }, 1000);
  }, 250);

  handleMentionSelect = (suggestion, callback) => {
    callback(suggestion);
  };

  handleNextPage = (keyword, offset, callback) => {
    const mockSuggestions = [];
    for (let i = 0; i < 10; i += 1) {
      mockSuggestions.push({
        name: `${keyword} ${offset + i}`,
        login: `${offset + i}`,
        avatarUrl:
          'https://static.dingtalk.com/media/lADPBbCc1h2tUUPNA8DNA74_958_960.jpg_60x60q90.jpg',
      });
    }
    const newSuggestions = [...mockSuggestions];
    callback(newSuggestions);
  };

  handleSave = () => {
    const asl = mo.valueToJsonML(this.state.value);
    console.log('Saved ASL: ', JSON.stringify(asl));
    console.log('Saved HTML: ', mo.jsonMLToHTML(asl));
  };

  getImageSize = (url) => {
    return {
      width: 230,
      height: 320,
    };
  };

  getScrollableContent = () => {
    return document.querySelector('[data-cangjie-content-wrapper="true"]') || document.body;
  };

  getScrollableContainer = () => {
    return document.documentElement || document.body;
  };

  setZoom = (val) => {
    this.setState({
      zoom: parseFloat(val),
    });
  };

  render() {
    const { value, zoom } = this.state;
    if (IS_WEB_MODE) {
      style.width = '100%';
      style.maxWidth = '790px';
    }
    return (
      <Provider
        plugins={this.plugins}
        value={value}
        onChange={this.handleChange}
        onAction={this.handleAction}
        controllerRef={this.getControllerRef}
        options={{
          enablePending: true,
        }}
      >
        <GlobalStyle />
        <div className="bi">
          <div className="bi-toolbar" style={{ position: 'sticky', top: 0 }}>
            <NewToolbar />
          </div>
          <div className="bi-content">
            <Content
              placeholder="请输入..."
              style={style}
              zoom={zoom}
              getScrollableContent={this.getScrollableContent}
              getScrollableContainer={this.getScrollableContainer}
            />
          </div>
        </div>
        <div style={{ position: 'fixed', top: 70, left: 30 }}>
          <Select
            defaultValue="1"
            title="放大比例"
            style={{ width: 80, backgroundColor: '#f9fafe' }}
            onChange={this.setZoom}
          >
            <Select.Option value="0.25">25%</Select.Option>
            <Select.Option value="0.5">50%</Select.Option>
            <Select.Option value="0.75">75%</Select.Option>
            <Select.Option value="1">100%</Select.Option>
            <Select.Option value="1.25">125%</Select.Option>
            <Select.Option value="1.5" >150%</Select.Option>
            <Select.Option value="1.75">175%</Select.Option>
            <Select.Option value="2">200%</Select.Option>
          </Select>
        </div>
        <LeftToolbar
          config={leftToolbarConfig}
          getScrollableContent={this.getScrollableContent}
        />
      </Provider>
    );
  }
}

const basic = () => <Basic />;

export default basic;