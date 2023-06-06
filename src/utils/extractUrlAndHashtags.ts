export default function extractUrlAndHashtags(text: string): string {
  const linkRegex = /(https?:\/\/\S+)|(www\.\S+)|(\w+:\/\/\S+)/gi;
  const hashtagRegex = /(^|\s)#(\w+)/g;

  const replacedText = text
    .replace(linkRegex, (url) => {
      const href = url.startsWith("http") ? url : `https://${url}`;
      return `<a style='color:#60a5fa' href="${href}" target="_blank">${url}</a>`;
    })
    .replace(hashtagRegex, (match, space, hashtag) => {
      return `${space}<a style='color:#60a5fa' href="/hashtag/${hashtag}">${match}</a>`;
    });

  return replacedText;
}
