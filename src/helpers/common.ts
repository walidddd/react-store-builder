import { UpdateQueryParamsUrl, IframeMessage } from './interfaces';

export const updateQueryParams = ({ key, value }: UpdateQueryParamsUrl) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (value) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }
  const newSearchString = searchParams.toString();
  const newUrl = `${window.location.pathname}${newSearchString ? `?${newSearchString}` : ''}`;
  window.history.replaceState({}, '', newUrl);
};

let number = 0;

// Utility function to send message to iframe
export function sendMessageToLexEditor(message: IframeMessage) {
  number += 1;
  const iframe = document.getElementById(
    'myIframe'
  ) as HTMLIFrameElement | null;
  if (iframe) {
    console.log(message, `send ${number}`);
    iframe.contentWindow?.postMessage(message, '*');
  } else {
    console.error('Iframe element not found');
  }
}

export const listenOnMessagesFromLexEditor = (
  callBackFunction: (message: IframeMessage) => void
) => {
  window.addEventListener('message', (event) => {
    console.log('listen');
    const data = event.data;
    return callBackFunction(data);
  });
};
