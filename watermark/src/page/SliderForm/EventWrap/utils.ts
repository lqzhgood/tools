type EventHandler<E> = ((event: E) => void) | undefined;

export function composeEventHandlers<E>(
    parentHandler: EventHandler<E>,
    childHandler: EventHandler<E>,
) {
    return (event: E) => {
        parentHandler?.(event);
        if (!(event as any).defaultPrevented) {
            childHandler?.(event);
        }
    };
}

export function mergeProps(
    parentProps: Record<string, any>,
    childProps: Record<string, any>,
) {
    const mergedProps: Record<string, any> = {
        ...parentProps,
        ...childProps,
    };

    // className
    if (parentProps.className || childProps.className) {
        mergedProps.className = [parentProps.className, childProps.className]
            .filter(Boolean)
            .join(' ');
    }

    // style
    if (parentProps.style || childProps.style) {
        mergedProps.style = {
            ...parentProps.style,
            ...childProps.style,
        };
    }

    // events
    Object.keys(parentProps).forEach(key => {
        if (
            key.startsWith('on') &&
            typeof parentProps[key] === 'function' &&
            typeof childProps[key] === 'function'
        ) {
            mergedProps[key] = composeEventHandlers(
                parentProps[key],
                childProps[key],
            );
        }
    });

    return mergedProps;
}
