# part 생성 가이드

## 작업 순서

1. part 폴더에 원하는 아이템 생성 후 /part/index.tsx에서 만든 아이템을 export
2. PartMapping 에서 원하는 아이템을 import 하면 연동 완료

## part item 생성 폼 예시 코드

```
import React from 'react';
//type
import { IPartComponentsProps } from '../PartMapping';
//components

export const [컴포넌트 이름]: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formRegister,
        collectionData,
    } = props;

    const {
        key,
        label,
        option,
    } = data;

    return (
        <div></div>
    );
};
```