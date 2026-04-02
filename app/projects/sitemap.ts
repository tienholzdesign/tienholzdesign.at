import { generateCollectionSitemap } from '../../utils/generateCollectionSitemap';

export default function sitemap() {
  return generateCollectionSitemap('projectConnection', 'projects');
}
