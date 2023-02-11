import React, { memo, useCallback, useRef, useState } from "react";

import { ArrowDownSvg } from "../../img";

type FaqType = {
  title: string;
  content: string;
}

const Faq: React.FC<FaqType> = ({ title, content }) => {

  const [isShow, setIsShow] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  const handleOnClick = useCallback(() => {
    setIsShow(prev => !prev);

    if (!ref.current) return;

    if (ref.current.style.maxHeight && ref.current.style.maxHeight !== '0px') {
      ref.current.style.maxHeight = '0px';
      ref.current.style.marginTop = '0px';
    }
    else {
      ref.current.style.marginTop = '24px';
      ref.current.style.maxHeight = ref.current.scrollHeight + 'px';
    }

  }, []);

  return (
    <li className="faq">
      <div className="faq__header"
        onClick={handleOnClick}>
        <span className="medium fz-16">{ title }</span>
        <ArrowDownSvg style={{
          rotate: `${isShow ? '180deg' : '360deg'}`,
          fill: `${isShow ? '#113ACA' : '#717583'}`
        }} />
      </div>
      <p ref={ref}
        className="fz-14 faq__content">{ content }</p>
    </li>
  );
};

export default memo(Faq);