import * as React from 'react';
import { QuoteBetaNormal, DividingLineNormal } from '@ali/we-design';
import {
  DocToolbarH1Normal,
  DocToolbarH2Normal,
  DocToolbarH3Normal,
  DocToolbarH4Normal,
  ToolbarOrderListNormal,
  ToolbarCheckBoxNormal,
  ToolbarUnorderListNormal,
  ToolbarEmojiNormal,
} from '@ali/we-icon';
import {
  MenuBar,
  MenuBarItemProps,
  Menu as BiMenu,
  TYPE_MENU_ITEM,
  TYPE_SUB_MENU,
  TYPE_GROUP,
  TYPE_MENU_DATA,
  TYPE_INLINE_MENU_GROUP,
  TYPE_INLINE_MENU_ITEM,
  TYPE_INLINE_MENU_WRAPPER,
} from '@ali/4ever-bi';

const voidFunc = () => {};

const insertMenuData: TYPE_MENU_DATA = [
  {
    type: TYPE_INLINE_MENU_GROUP,
    menus: [
      {
        type: TYPE_INLINE_MENU_WRAPPER,
        menus: [
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'heading.heading1Inline',
            icon: <DocToolbarH1Normal />,
            tooltip: '标题一',
            query: '标题一',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'heading.heading2Inline',
            icon: <DocToolbarH2Normal />,
            tooltip: '标题二',
            query: '标题二',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'heading.heading3Inline',
            icon: <DocToolbarH3Normal />,
            tooltip: '标题三',
            query: '标题三',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'heading.heading4Inline',
            icon: <DocToolbarH4Normal />,
            tooltip: '标题四',
            query: '标题四',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'blockquote',
            tooltip: '引用',
            icon: <QuoteBetaNormal />,
            query: '引用',
          },
        ],
      },
      {
        type: TYPE_INLINE_MENU_WRAPPER,
        menus: [
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'list.tlistInline',
            icon: <ToolbarCheckBoxNormal />,
            tooltip: '待办',
            query: '待办',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'list.olistInline',
            icon: <ToolbarOrderListNormal />,
            tooltip: '有序列表',
            query: '有序列表',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'list.ulistInline',
            icon: <ToolbarUnorderListNormal />,
            tooltip: '无序列表',
            query: '无序列表',
          },
        ],
      },
      {
        type: TYPE_INLINE_MENU_WRAPPER,
        menus: [
          {
            type: TYPE_INLINE_MENU_ITEM,
            menuKey: 'sticker',
            icon: <ToolbarEmojiNormal />,
            tooltip: '表情',
            query: '表情',
          },
          {
            type: TYPE_INLINE_MENU_ITEM,
            icon: <DividingLineNormal />,
            menuKey: 'hr',
            tooltip: '分割线',
            query: '分割线',
          },
        ],
      },
    ],
  },
  {
    type: TYPE_GROUP,
    title: '提及@',
    menus: [
      {
        type: TYPE_MENU_ITEM,
        title: '提及人',
        menuKey: 'quickInsertMention',
        query: '提及人',
      },
    ],
  },
  {
    type: TYPE_GROUP,
    title: '插入内容',
    menus: [
      {
        type: TYPE_MENU_ITEM,
        title: '图片',
        menuKey: 'image',
        query: '图片',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '表格',
        menuKey: 'table',
        query: '表格',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '本地文件',
        menuKey: 'embed',
        query: '本地文件',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '代码块',
        menuKey: 'code',
        query: '代码块',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '高亮块',
        menuKey: 'callout',
        query: '高亮块',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '插入群',
        menuKey: 'imTagPlugin',
        query: '插入群',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '在线视频',
        menuKey: 'onlineVideo',
        query: '在线视频',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '钉盘文件',
        menuKey: 'refer.dingpan',
        query: '钉盘文件',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '导入便签',
        menuKey: 'embed.memo',
        query: '导入便签',
      },
      {
        type: TYPE_MENU_ITEM,
        title: '模板按钮',
        menuKey: 'templateButton',
        query: '模板按钮',
      },
    ],
  },
  {
    type: TYPE_GROUP,
    title: '插入格式',
    menus: [
      {
        type: TYPE_MENU_ITEM,
        title: '链接',
        menuKey: 'link',
        query: '链接',
      },
    ],
  },
];

export const FORMAT_MENU_UNI18N_TEXT = {
  menu_title: '格式',
  sub_menu_title_text: '文本',
  menu_item_title_text_bold: '粗体',
  menu_item_title_text_italics: '斜体',
  menu_item_title_text_underline: '下划线',
  menu_item_title_text_strikethrough: '删除线',
  menu_item_title_text_superscript: '上标',
  menu_item_title_text_subscript: '下标',
  menu_item_title_text_letterSpacing: '字间距',
  sub_menu_title_size: '字号',
  menu_item_title_text_increase_size: '增大字号',
  menu_item_title_text_decrease_size: '缩小字号',
  sub_menu_title_align: '对齐',
  sub_menu_title_indent: '缩进',
  sub_menu_title_list: '项目符号',
  menu_item_title_list_unorder: '无序列表',
  menu_item_title_list_order: '有序列表',
  menu_item_title_list_task: '任务列表',
};

export default (setState) => {
  const setStateCallback = setState || voidFunc;

  const layoutMenuData: TYPE_MENU_DATA = [
    {
      type: TYPE_GROUP,
      title: '页面设置',
      menus: [
        {
          type: TYPE_SUB_MENU,
          title: '大小',
          menus: [
            {
              type: TYPE_MENU_ITEM,
              title: 'A4',
              selected: true,
              menuKey: 'sectionProperty.pageSize',
            },
            {
              type: TYPE_MENU_ITEM,
              title: 'A3',
              menuKey: 'pageSizeA3',
            },
          ],
        },
        {
          type: TYPE_SUB_MENU,
          title: '方向',
          disabled: true,
          menus: [
            {
              type: TYPE_MENU_ITEM,
              title: '纵向',
              selected: true,
              menuKey: 'pageDirecV',
            },
            {
              type: TYPE_MENU_ITEM,
              title: '横向',
              menuKey: 'pageDirecH',
            },
          ],
        },
        {
          type: TYPE_SUB_MENU,
          title: '页边距',
          disabled: true,
          menus: [
            {
              type: TYPE_MENU_ITEM,
              title: '普通',
              selected: true,
              menuKey: 'pageMarginNormal',
            },
            {
              type: TYPE_MENU_ITEM,
              title: '窄',
              menuKey: 'pageMarginSmall',
            },
            {
              type: TYPE_MENU_ITEM,
              title: '大',
              menuKey: 'pageMarginBig',
            },
          ],
        },
      ],
    },
    {
      type: TYPE_GROUP,
      title: '段落',
      menus: [
        {
          type: TYPE_MENU_ITEM,
          title: '水平对齐',
          menuKey: 'alignment',
        },
        {
          type: TYPE_MENU_ITEM,
          title: '减少缩进',
          menuKey: 'indent.left',
        },
        {
          type: TYPE_MENU_ITEM,
          title: '增加缩进',
          menuKey: 'indent.right',
        },
        {
          type: TYPE_MENU_ITEM,
          title: '段落间距',
          menuKey: 'paragraphSpacing',
          onClick: () => {
            setStateCallback({
              sidebarType: 'paragraph',
              sidebarVisible: true,
            });
          },
        },
      ],
    },
    {
      type: TYPE_GROUP,
      title: '设计',
      menus: [
        {
          type: TYPE_MENU_ITEM,
          title: '页眉页脚',
          disabled: true,
          menuKey: 'headerAndfooterStyle',
        },
        {
          type: TYPE_MENU_ITEM,
          title: '页面背景',
          disabled: false,
          menuKey: 'paragraphBackground',
          onClick: () => {
            setStateCallback({
              sidebarType: 'background.bgColor',
              sidebarVisible: true,
            });
          },
        },
      ],
    },
  ];
  const toolMenuData: TYPE_MENU_DATA = [
    {
      type: TYPE_GROUP,
      title: '翻译',
      menus: [
        {
          type: TYPE_MENU_ITEM,
          title: '翻译全文',
          disabled: true,
          menuKey: 'test_translte.all',
        },
        {
          type: TYPE_MENU_ITEM,
          title: '翻译所选',
          menuKey: 'test_translte.selected',
          onClick: () => {
            setStateCallback({
              sidebarType: 'translate',
              sidebarVisible: true,
            });
          },
        },
      ],
    },
  ];
  const formatMenuData: TYPE_MENU_DATA = [
    {
      type: TYPE_SUB_MENU,
      title: FORMAT_MENU_UNI18N_TEXT.sub_menu_title_text,
      menus: [
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_letterSpacing,
          menuKey: 'letterSpacing',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_bold,
          menuKey: 'bold',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_italics,
          menuKey: 'italic',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_underline,
          menuKey: 'underline',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_strikethrough,
          menuKey: 'strike',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_superscript,
          menuKey: 'vertAlign.sup',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_subscript,
          menuKey: 'vertAlign.sub',
        },
      ],
    },
    {
      type: TYPE_SUB_MENU,
      title: FORMAT_MENU_UNI18N_TEXT.sub_menu_title_size,
      menus: [
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_increase_size,
          menuKey: 'sz.bigger',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_text_decrease_size,
          menuKey: 'sz.smaller',
        },
      ],
    },
    {
      type: TYPE_MENU_ITEM,
      title: '行高',
      menuKey: 'lineheight',
      MenuContentWrapper: ({ children }) => (
        <div>
          <div>自定义行高</div>
          {children}
        </div>
      ),
    },
    {
      type: TYPE_SUB_MENU,
      title: FORMAT_MENU_UNI18N_TEXT.sub_menu_title_list,
      menus: [
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_list_unorder,
          menuKey: 'list.ulist',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_list_order,
          menuKey: 'list.olist',
        },
        {
          type: TYPE_MENU_ITEM,
          title: FORMAT_MENU_UNI18N_TEXT.menu_item_title_list_task,
          menuKey: 'list.tlist',
        },
      ],
    },
  ];
  const menuBarData: MenuBarItemProps[] = [
    {
      title: '插入',
      children: <BiMenu menus={insertMenuData} />,
    },
    {
      title: '格式',
      children: <BiMenu menus={formatMenuData} />,
    },
    {
      title: '布局',
      children: <BiMenu menus={layoutMenuData} />,
    },
    {
      title: '工具',
      children: <BiMenu menus={toolMenuData} />,
    },
  ];

  return <MenuBar menus={menuBarData} />;
};

export function renderInsertMenu(query?: string) {
  return <BiMenu menus={insertMenuData} query={query} />;
}