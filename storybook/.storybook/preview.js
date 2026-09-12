import '../src/sdc.css';
import './storybook.css';

export default {
  parameters: {
    layout: 'padded',
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components', 'Patterns'] },
    },
    backgrounds: { disable: true },
    controls: { expanded: true },
  },
  globalTypes: {
    theme: {
      description: 'Site theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light (shipped default)' },
          { value: 'dark', title: 'Dark (alternate)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      const wrap = document.createElement('div');
      wrap.className = 'sb-canvas';
      const node = story();
      wrap.append(typeof node === 'string' ? document.createRange().createContextualFragment(node) : node);
      return wrap;
    },
  ],
};
