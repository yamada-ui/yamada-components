import { CategoriesGroup, Category } from './types';
// import images from './images';

export const CATEGORIES: CategoriesGroup[] = [
  {
    name: 'Application UI',
    categories: [
      { slug: 'navbars', name: 'Navbars', },
      { slug: 'headers', name: 'Headers', },
      { slug: 'footers', name: 'Footers', },
      { slug: 'grids', name: 'Grids', },
      { slug: 'users', name: 'User info and controls', },
      { slug: 'inputs', name: 'Inputs', },
      { slug: 'buttons', name: 'Buttons', },
      { slug: 'sliders', name: 'Sliders', },
      { slug: 'dropzones', name: 'Dropzones', },
      { slug: 'app-cards', name: 'Application cards', },
      { slug: 'stats', name: 'Stats', },
      { slug: 'tables', name: 'Tables', },
      { slug: 'dnd', name: "Drag'n'Drop", },
      { slug: 'carousels', name: 'Carousels', },
    ],
  },
  {
    name: 'Page sections',
    categories: [
      { slug: 'hero', name: 'Hero headers', },
      { slug: 'features', name: 'Features section', },
      { slug: 'authentication', name: 'Authentication', },
      { slug: 'faq', name: 'Frequently asked questions', },
      { slug: 'contact', name: 'Contact us section', },
      { slug: 'error-pages', name: 'Error pages', },
      { slug: 'banners', name: 'Banners', },
    ],
  },
  {
    name: 'Blog UI',
    categories: [
      { slug: 'article-cards', name: 'Article cards', },
      { slug: 'toc', name: 'Table of contents', },
      { slug: 'comments', name: 'Comments', },
    ],
  },
];

const ALL_CATEGORIES = CATEGORIES.reduce<Category[]>((acc, group) => {
  acc.push(...group.categories);
  return acc;
}, []);

export const CATEGORIES_SLUGS = ALL_CATEGORIES.map((item) => item.slug);

export const getCategoryData = (category: string) =>
  ALL_CATEGORIES.find((item) => item.slug === category);
