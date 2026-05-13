/**
 * Convert a string to URL-safe slug
 * Supports Vietnamese characters
 */
const slugify = (str, separator = '-') => {
  const map = {
    'à|á|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ': 'a',
    'è|é|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ': 'e',
    'ì|í|ỉ|ĩ|ị': 'i',
    'ò|ó|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ': 'o',
    'ù|ú|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự': 'u',
    'ỳ|ý|ỷ|ỹ|ỵ': 'y',
    'đ': 'd',
  };
  let slug = str.toLowerCase().trim();
  for (const [pattern, replacement] of Object.entries(map)) {
    slug = slug.replace(new RegExp(pattern, 'g'), replacement);
  }
  return slug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, separator)
    .replace(/-+/g, separator);
};

module.exports = { slugify };
