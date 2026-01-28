import React, { useEffect, useState, type ReactElement } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { get } from 'lodash-es';
import { useDebounceFn } from 'ahooks';

type Props<T> = {
    value?: T;
    onChange?: (value: T) => void;
    valuePath?: string;
    children: ReactElement<any>;
};

function EventWrap<T>(props: Props<T>) {
    const { value, valuePath, onChange, children, ...rest } = props;

    const [innerValue, setInnerValue] = useState(value);

    const isMobile = useIsMobile();

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
            if (!isMobile) {
                run(v);
            }
        },
        onBlur: (e: any) => {
            const v = valuePath ? get(e, valuePath) : e;
            if (isMobile) {
                run(v);
            }
        },
    });
}

export default EventWrap;
