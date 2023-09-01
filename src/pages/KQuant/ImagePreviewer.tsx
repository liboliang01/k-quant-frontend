import { Button, Image } from 'antd';
import React, { useState } from 'react';

interface PropsType {
  text: string;
  url: string;
}

const ImagePreviewer: React.FC<PropsType> = (props) => {
  const { text, url } = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        {text}
      </Button>
      {visible && (
        <Image
          width={200}
          style={{ display: 'none' }}
          src={url}
          preview={{
            visible,
            src: url,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      )}
    </>
  );
};

export default ImagePreviewer;
