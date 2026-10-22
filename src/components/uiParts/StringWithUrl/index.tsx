import React from 'react';
import { splitTextByUrl } from '../../../libs/utils/splitTextByUrl';

type Props = {
  content: string;
};
export const StringWithUrl: React.FC<Props> = React.memo(({ content }) => {
  return (
    <>
      {/* 行と区切りの並びは content から一意に決まり、並び替えや途中への挿入が起きないため index を key にしている */}
      {content.split('\n').map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {splitTextByUrl(line).map((segment, segmentIndex) =>
            segment.type === 'url' ? (
              <a key={segmentIndex} href={segment.value} target="_blank" rel="noopener noreferrer">
                {segment.value}
              </a>
            ) : (
              <React.Fragment key={segmentIndex}>{segment.value}</React.Fragment>
            ),
          )}
          <br />
        </React.Fragment>
      ))}
    </>
  );
});
