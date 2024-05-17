import styled from 'styled-components';
import BubbleType1 from './BubbleType1';
import BubbleType2 from './BubbleType2';
import BubbleType3 from './BubbleType3';
import Profile from './Profile';
import { useEffect, useState } from 'react';
import { parseNewsData } from '../../utils/handleChat';

const ChatContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const NewsChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ChatSystem = ({ content, type, chatImg }) => {
  const [tempList, setTempList] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [bubbleContent, setBubbleContent] = useState(null);
  const [bubbleType, setBubbleType] = useState('');
  const [showBubble, setShowBubble] = useState(0);

  useEffect(() => {
    if (content && type === 'NEWS') {
      const answerToJson = parseNewsData(content);
      console.log('answerToJson : ', answerToJson);
      if (answerToJson.articles) {
        const newTempList = answerToJson.articles.slice(0, 3);
        setTempList(newTempList);
      }
    }
    setBubbleContent(content);
    setBubbleType(type);
  }, [content]);

  const clickYes = () => {
    const answerToJson = parseNewsData(content);

    setTempList(answerToJson.articles);
    setShowNext(true);
  };

  const clickNo = () => {
    setShowNext(true);
  };

  let BubbleComponent;

  switch (bubbleType) {
    case 'GENERAL':
    case 'WEATHER':
      BubbleComponent = <BubbleType1 content={bubbleContent} />;
      break;
    case 'NEWS':
      BubbleComponent = (
        <NewsChatContainer>
          <BubbleType2
            content={bubbleContent}
            showList={tempList}
            clickYes={clickYes}
            clickNo={clickNo}
            showNext={showNext}
          />
        </NewsChatContainer>
      );
      break;
    default:
      BubbleComponent = <BubbleType3 content={bubbleContent} />;
  }

  return (
    <ChatContainer>
      <Profile type={'System'} chatImg={chatImg} />
      {BubbleComponent}
    </ChatContainer>
  );
};

export default ChatSystem;
