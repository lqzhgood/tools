import React, { useEffect, useState, type ReactElement } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { get } from 'lodash-es';
import { useDebounceFn } from 'ahooks';

type Props<T> = {
    value?: T;
    onChange?: (value: T) => void;
    valuePath?: string;
    /** 提交时机;不传时移动端用 onBlur、桌面端用 onChange */
    trigger?: 'onChange' | 'onBlur';
    children: ReactElement<any>;
};

function EventWrap<T>(props: Props<T>) {
    const { value, valuePath, onChange, trigger, children, ...rest } = props;

    const [innerValue, setInnerValue] = useState(value);

    const isMobile = useIsMobile();

    const effectiveTrigger = trigger ?? (isMobile ? 'onBlur' : 'onChange');

    useEffect(() => {
        if (innerValue !== value) {
            setInnerValue(value);
        }
    }, [value]);

    const { run } = useDebounceFn(
        v => {
            onChange?.(v);
        },
        {
            wait: 100,
        },
    );

    return React.cloneElement(children, {
        ...rest,
        value: innerValue,
        onChange: (e: any) => {
            const v = valuePath ? get(e, valuePath) : e;
            setInnerValue(v);
            if (effectiveTrigger === 'onChange') {
                run(v);
            }
        },
        onBlur: (e: any) => {
            const v = valuePath ? get(e, valuePath) : e;
            if (effectiveTrigger === 'onBlur') {
                run(v);
            }
        },
    });
}

export default EventWrap;
