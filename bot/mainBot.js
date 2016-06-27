import { Bot } from './constants';

const textMatch = (text, context) => {
  const regex = new RegExp(`\\b(${context})(.?|y|i)(es\\b|\\b)`, 'ig');
  return text.match(regex);
};

const setContext = text => {
  let result = '';
  Bot.Contexts.forEach(context => {
    if (!!textMatch(text, Bot[context]) && !!textMatch(text, Bot[context])[0])
    result = context;
  });
  return result;
};

const getBrandName = text => {
  return textMatch(text, Bot.Brands)[1]
  .replace(/^\w/, (matcher) => { return matcher.toUpperCase(); });
};

const getCategoryName = text => {
  return textMatch(text, Bot.Categories)[1];
};

const getAnswer = (context, name, brand, category) => {
  switch (context) {
    case 'Greetings':
      return `Hi ${name}, would you like to browse giftcards or get assistance?`;
    case 'Brands':
      return `These are the best deals for ${brand}`;
    case 'Giftcards':
      return 'What brand or category are you interested in?';
    case 'Categories':
      return `These are the options for ${category}`;
    case 'Positives':
      return `Aww! Thank you ${name}! :)`;
    case 'Negatives':
      return 'I\'m sorry to hear that :(';
    case 'Farewell':
      return 'Good talking to you!';
    default:
      return `${name}, let me find someone for you.`;
  }
};

export const MatchAnswer = (firstName, text) => {
  const context = setContext(text);
  const brand = context === 'Brands' ? getBrandName(text) : null;
  const category = context === 'Categories' ? getCategoryName(text) : null;
  const answer = getAnswer(context, firstName, brand, category);
  debugger;
  return {answer, brand};
};
